const resolutionInMeters = 2;

export default async (level) => {
  const data = await fetch(`assets/maps/${level.map}.webp`);
  const bitmap = await createImageBitmap(await data.blob(), { colorSpaceConversion: 'none' });

  return {
    bitmap,
    resolutionInMeters,
    getWidthInMeters: () => bitmap.width * resolutionInMeters,
    getHeightInMeters: () => bitmap.height * resolutionInMeters
  };
}