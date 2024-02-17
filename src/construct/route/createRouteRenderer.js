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
  const pixels = renderTarget.camera.transformMetersToPixels(point);
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

  const startPixels = renderTarget.camera.transformMetersToPixels(route.segments[0]);
  context.moveTo(startPixels.x, startPixels.y);
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.strokeStyle = `rgb(150, 0, 0)`;
  context.beginPath();
  route.segments.forEach((segment) => {
    const pixels = renderTarget.camera.transformMetersToPixels(segment);
    context.lineTo(pixels.x, pixels.y);
  });
  context.stroke(); 
};

const drawRidge = (context, route, renderTarget) => {
  context.fillStyle = 'rgb(250, 255, 245)';
  context.fillRect(0, 0, renderTarget.canvas.width, renderTarget.canvas.height);

  const transformToPixels = (segment) => renderTarget.camera.transformMetersToPixels({ meter: segment.meter, z: segment.mapHeight });
  const startPixels = transformToPixels(route.segments[0]);
  
  context.save();
  context.moveTo(0, renderTarget.canvas.height);
  context.beginPath();
  route.segments.forEach((segment) => {
    const pixels = transformToPixels(segment);
    context.lineTo(pixels.x, pixels.y);
  });
  context.lineTo(renderTarget.canvas.width, renderTarget.canvas.height);
  context.lineTo(0, renderTarget.canvas.height);
  context.clip();

  context.moveTo(startPixels.x, startPixels.y);
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.strokeStyle = 'rgb(150, 150, 150)';
  context.shadowColor = 'rgba(0, 0, 0)';
  context.shadowBlur = 30; 
  
  context.beginPath();
  route.segments.forEach((segment) => {
    const pixels = transformToPixels(segment);
    context.lineTo(pixels.x, pixels.y);
  });
  context.stroke(); 
  
  context.restore();
};

export default (system, layout, cameras, route) => {
  const renderTargets = [
    {
      canvas: layout.mapRoute,
      camera: cameras.map,
    },
    {
      canvas: layout.profile,
      camera: cameras.profile,
    },
    {
      canvas: layout.magnifierRoute,
      camera: cameras.magnifier,
    }
  ];

  const render = () => {
    renderTargets.forEach(renderTarget => {
      const context = renderTarget.canvas.getContext('2d');
      context.clearRect(0, 0, renderTarget.canvas.width, renderTarget.canvas.height);
  
      if (renderTarget.camera.isProfile()) {
        drawRidge(context, route, renderTarget)
      }
      drawControlPoints(context, route, renderTarget);
      drawSegments(context, route, renderTarget);
    });
    
  };

  system.handleCanvasResize(renderTargets.map(renderTarget => renderTarget.canvas), render);

  return {
    render
  };
};