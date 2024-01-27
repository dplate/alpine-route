export default (system, layout, cameras, route) => {
  const renderTargets = [
    {
      canvas: layout.mapRoute,
      transformMetersToPixels: cameras.transformMetersToPixels
    },
    {
      canvas: layout.magnifierRoute,
      transformMetersToPixels: cameras.transformMetersToPixelsOnMagnifier
    }
  ];

  const render = () => {
    const segments = route.segments;

    renderTargets.forEach(renderTarget => {
      const context = renderTarget.canvas.getContext('2d');
      context.clearRect(0, 0, renderTarget.canvas.width, renderTarget.canvas.height);
  
      context.beginPath();
      const startPixels = renderTarget.transformMetersToPixels(segments[0]);
      context.moveTo(startPixels.x, startPixels.y);
      route.segments.forEach((segment) => {
        const pixels = renderTarget.transformMetersToPixels(segment);
        context.lineTo(pixels.x, pixels.y);
      });
      context.lineWidth = 5;
      context.strokeStyle = 'rgb(150, 0, 0)';
      context.lineCap = 'round';
      context.stroke();
    });
    
  };

  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const canvas = entry.target;
      const width = entry.contentBoxSize[0].inlineSize;
      const height = entry.contentBoxSize[0].blockSize;
      canvas.width = Math.max(1, Math.min(width, system.gpuDevice.limits.maxTextureDimension2D));
      canvas.height = Math.max(1, Math.min(height, system.gpuDevice.limits.maxTextureDimension2D));
    }
    render();
  });
  renderTargets.forEach(renderTarget => observer.observe(renderTarget.canvas));

  return {
    render
  };
};