export default (system, layout, cameras, route) => {
  const render = () => {
    const segments = route.segments;

    const context = layout.mapRoute.getContext('2d');
    context.clearRect(0, 0, layout.mapRoute.width, layout.mapRoute.height);

    context.beginPath();
    const startPixels = cameras.transformMetersToPixels(segments[0]);
    context.moveTo(startPixels.x, startPixels.y);
    route.segments.forEach((segment) => {
      const pixels = cameras.transformMetersToPixels(segment);
      context.lineTo(pixels.x, pixels.y);
    });
    context.lineWidth = 5;
    context.strokeStyle = 'rgb(150, 0, 0)';
    context.lineCap = 'round';
    context.stroke();
  };

  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const canvas = entry.target;
      const width = entry.contentBoxSize[0].inlineSize;
      const height = entry.contentBoxSize[0].blockSize;
      canvas.width = Math.max(1, Math.min(width, system.gpuDevice.limits.maxTextureDimension2D));
      canvas.height = Math.max(1, Math.min(height, system.gpuDevice.limits.maxTextureDimension2D));
      cameras.restrictToLimits();
    }
    render();
  });
  observer.observe(layout.mapRoute);

  return {
    render
  };
};