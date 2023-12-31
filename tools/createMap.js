import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

import extract from 'extract-zip';
import { PNG } from 'pngjs';

const mapName = 'albula';
const textureWidth = 4096;
const textureHeight = 4096;
const resolutionInMeter = 2;

const mapDirectory = `${process.cwd()}/${mapName}`
const segmentsDirectory = `${mapDirectory}/segments`;
if (!fs.existsSync(segmentsDirectory)) {
  fs.mkdirSync(segmentsDirectory);
}

const downloadSegments = async (segmentUrls) => {
  for (const segmentUrl of segmentUrls) {
    const res = await fetch(segmentUrl);
    const fileStream = fs.createWriteStream(`${mapDirectory}/tmp.zip`);
    await finished(Readable.fromWeb(res.body).pipe(fileStream));
    await extract(`${mapDirectory}/tmp.zip`, { dir: segmentsDirectory })
  };
}

const collectMapData = async (segmentUrls) => {
  const [, minSegmentXString] = segmentUrls[0].match(/swissalti3d_\d+_(\d+)/);
  const [, maxSegmentYString] = segmentUrls[segmentUrls.length - 1].match(/swissalti3d_\d+_\d+-(\d+)/);
  const minSegmentX = parseInt(minSegmentXString);
  const maxSegmentY = parseInt(maxSegmentYString);
  const maxSegmentX = minSegmentX + Math.floor(textureWidth / (1000 / resolutionInMeter));
  const minSegmentY = maxSegmentY - Math.floor(textureHeight / (1000 / resolutionInMeter));

  const points = Array.from({ length: textureWidth }, () => 
    Array.from({ length: textureHeight }, () => ({}))
  );

  for (let segmentX = minSegmentX; segmentX <= maxSegmentX; segmentX++) {
    for (let segmentY = minSegmentY; segmentY <= maxSegmentY; segmentY++) {
      const rows = fs.readFileSync(
        `${segmentsDirectory}/SWISSALTI3D_2_XYZ_CHLV95_LN02_${segmentX}_${segmentY}.xyz`, 
        'utf8'
      ).toString().split('\n');
      rows.shift();
      
      rows.forEach(row => {
        const [absoluteXString, absoluteYString, heightString] = row.split(' ');
        if (heightString) {
          const absoluteX = parseInt(absoluteXString);
          const absoluteY = parseInt(absoluteYString);
          const height = parseInt(heightString.replace('.', ''));
          const x = (absoluteX - minSegmentX * 1000 - 1) / resolutionInMeter;
          const y = textureHeight - (absoluteY - minSegmentY * 1000 - 1) / resolutionInMeter - 1;
          if (x < textureWidth && y >= 0) {
            points[x][y].height = height;
          }
        }
      });
    }
  }

  return { points };
}

const createTexture = async (mapData) => {
  const texture = new PNG({
    width: textureWidth,
    height: textureHeight
  });

  const buffer = Buffer.alloc(textureWidth * textureHeight * 3);
  const bitmap = new Uint8Array(buffer.buffer);
  for (let x = 0; x < textureWidth; x++) {
    for (let y = 0; y < textureHeight; y++) {
      const point = mapData.points[x][y];
      const heightColor = Math.floor(0xFFFFFF & point.height);
      
      const index = (textureWidth * y + x) * 3;
            
      bitmap[index] = (heightColor >> 16) & 0xFF;
      bitmap[index + 1] = (heightColor >> 8) & 0xFF;
      bitmap[index + 2] = heightColor & 0xFF;
    }
  }
  texture.data = buffer;

  fs.writeFileSync(
    `${mapDirectory}/map.png`, 
    PNG.sync.write(texture, { 
      colorType: 2, 
      inputHasAlpha: false
    }));
}

console.log('Loading segmentUrls...')
const segmentUrls = fs.readFileSync(`${mapDirectory}/segmentUrls.csv`, 'utf8').toString().split('\n');

console.log('Downloading segments...')
//await downloadSegments(segmentUrls);

console.log('Collecting map data...')
const mapData = await collectMapData(segmentUrls);

console.log('Creating texture...')
await createTexture(mapData);

console.log('Done');