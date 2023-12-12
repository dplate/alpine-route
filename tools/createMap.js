import fs from 'fs';
import { Readable } from 'stream';
import { finished } from 'stream/promises';

import extract from 'extract-zip';
import { PNG } from 'pngjs';

const mapName = 'saentis';
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
  let minHeight = null;
  let maxHeight = null;

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
            if (minHeight === null || height < minHeight) {
              minHeight = height;
            }
            if (maxHeight === null || height > maxHeight) {
              maxHeight = height;
            }
          }
        }
      });
    }
  }

  return { minHeight, maxHeight, points };
}

const createTexture = async (mapData) => {
  const texture = new PNG({
    width: textureWidth,
    height: textureHeight
  });

  for (let x = 0; x < textureWidth; x++) {
    for (let y = 0; y < textureHeight; y++) {
      const index = (textureWidth * y + x) << 2;
      const heightColor = Math.floor(255 * (mapData.points[x][y].height - mapData.minHeight) / (mapData.maxHeight - mapData.minHeight))
      texture.data[index] = heightColor;
      texture.data[index + 1] = heightColor;
      texture.data[index + 2] = heightColor;
      texture.data[index + 3] = 255;
    }
  }

  return texture;
}

const segmentUrls = fs.readFileSync(`${mapDirectory}/segmentUrls.csv`, 'utf8').toString().split('\n');

await downloadSegments(segmentUrls);

const mapData = await collectMapData(segmentUrls)

console.log(mapData.minHeight, mapData.maxHeight);

const texture = await createTexture(mapData);

fs.writeFileSync(`${mapDirectory}/map.png`, PNG.sync.write(texture, { colorType: 6 }));

