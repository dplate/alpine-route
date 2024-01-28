const pointVariants = {
  fixPoint: {
    fillStyle: 'rgba(150, 0, 0, 0.3)',
    strokeStyle: 'rgba(150, 0, 0, 0.6)'
  },
  editPoint: {
    fillStyle: 'rgba(200, 200, 50, 0.6)',
    strokeStyle: 'rgba(200, 200, 50, 1.0)'
  },
  deletablePoint: {
    fillStyle: 'rgba(200, 50, 200, 0.6)',
    strokeStyle: 'rgba(200, 50, 200, 1.0)'
  }
};

const drawPoint = (context, point, variant, fillFactor, renderTarget) => {
  const realRadius = 15;
  const minStrokeWidth = 2;
  const strokeWidth = minStrokeWidth + (realRadius - minStrokeWidth) * fillFactor;
  const radius = realRadius - strokeWidth / 2.0;
  const pixels = renderTarget.transformMetersToPixels(point);
  context.beginPath();
  context.arc(pixels.x, pixels.y, radius, 0, 2 * Math.PI);
  context.fillStyle = variant.fillStyle;
  context.fill();
  context.lineWidth = strokeWidth
  context.strokeStyle = variant.strokeStyle;
  context.stroke();
}

const drawControlPoints = (context, route, renderTarget) => {
  route.controlPoints.forEach(controlPoint => {
    if (controlPoint.editable) {
      const isEdit = route.edit?.controlPoint === controlPoint;
      drawPoint(
        context, 
        controlPoint, 
        isEdit ? (route.edit.deletable ? pointVariants.deletablePoint : pointVariants.editPoint) : pointVariants.fixPoint, 
        isEdit ? 1.0 : 0.0, 
        renderTarget
        );
    }
  });
};

const drawSegments = (context, route, renderTarget) => {
  route.segments.forEach((segment) => {
    if (route.edit?.segment === segment) {
      drawPoint(
        context, 
        segment, 
        pointVariants.editPoint, 
        route.edit.activateFactor || 0.0,
        renderTarget
      );
    }
  });

  context.beginPath();
  const startPixels = renderTarget.transformMetersToPixels(route.segments[0]);
  context.moveTo(startPixels.x, startPixels.y);
  route.segments.forEach((segment) => {
    const pixels = renderTarget.transformMetersToPixels(segment);
    context.lineTo(pixels.x, pixels.y);
  });
  context.lineWidth = 5;
  context.strokeStyle = 'rgb(150, 0, 0)';
  context.lineCap = 'round';
  context.stroke();
};

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
    renderTargets.forEach(renderTarget => {
      const context = renderTarget.canvas.getContext('2d');
      context.clearRect(0, 0, renderTarget.canvas.width, renderTarget.canvas.height);
  
      drawControlPoints(context, route, renderTarget);
      drawSegments(context, route, renderTarget);
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