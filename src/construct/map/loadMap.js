import maps from './maps.js';

const resolutionInMeters = 2;
const slopeDistanceInMeters = 5;

export default async (system, level) => {
  const data = await fetch(`assets/maps/${level.map}.webp`);
  const bitmap = await createImageBitmap(await data.blob(), {
    colorSpaceConversion: 'none',
  });

  const canvas = system.window.document.createElement('canvas');
  canvas.width = bitmap.width;
  canvas.height = bitmap.height;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  context.drawImage(bitmap, 0, 0, bitmap.width, bitmap.height);
  let pixelData = Array.from(Array(bitmap.height), (_) =>
    Array(bitmap.height).fill(null),
  );

  // delete array on unload, because Chrome fills memory otherwise with every reload
  system.window.addEventListener('beforeunload', () => (pixelData = null));

  const getHeightAtPoint = (meters) => {
    const pixels = {
      x: meters.x / resolutionInMeters,
      y: meters.y / resolutionInMeters,
    };
    const topLeft = {
      x: Math.floor(pixels.x),
      y: Math.floor(pixels.y),
    };
    const surroundingHeights = [
      pixelData[topLeft.x][topLeft.y],
      pixelData[topLeft.x + 1][topLeft.y],
      pixelData[topLeft.x][topLeft.y + 1],
      pixelData[topLeft.x + 1][topLeft.y + 1],
    ];
    if (surroundingHeights.includes(null)) {
      const imageData = context.getImageData(topLeft.x, topLeft.y, 2, 2).data;
      for (let index = 0; index < 4; index++) {
        if (surroundingHeights[index] === null) {
          const height =
            ((imageData[index * 4] << 8) + imageData[index * 4 + 1]) / 10.0;
          pixelData[topLeft.x + (index % 2)][
            topLeft.y + Math.floor(index / 2)
          ] = height;
          surroundingHeights[index] = height;
        }
      }
    }
    const weight = {
      x: pixels.x % 1,
      y: pixels.y % 1,
    };
    const interpolatedTop =
      surroundingHeights[0] * (1.0 - weight.x) +
      surroundingHeights[1] * weight.x;
    const interpolatedBottom =
      surroundingHeights[2] * (1.0 - weight.x) +
      surroundingHeights[3] * weight.x;
    return interpolatedTop * (1.0 - weight.y) + interpolatedBottom * weight.y;
  };

  return {
    bitmap,
    resolutionInMeters,
    widthInMeters: bitmap.width * resolutionInMeters,
    heightInMeters: bitmap.height * resolutionInMeters,
    getHeightAtPoint,
    getSlopeAtPoint: (meters) => {
      const centerHeight = getHeightAtPoint(meters);
      let maxSlope = 0;
      for (let angle = 0; angle < 2 * Math.PI; angle += 0.25 * Math.PI) {
        const surroundingPoint = {
          x: meters.x + Math.sin(angle) * slopeDistanceInMeters,
          y: meters.y + Math.cos(angle) * slopeDistanceInMeters,
        };
        const surroundingHeight = getHeightAtPoint(surroundingPoint);
        const slope = Math.abs(centerHeight - surroundingHeight);
        maxSlope = Math.max(slope, maxSlope);
      }
      return maxSlope;
    },
    ...maps[level.map],
  };
};
