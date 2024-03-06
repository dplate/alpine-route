import { TYPE_BRIDGE, TYPE_GROUND, TYPE_TUNNEL } from './createRoute.js';
import drawRidge from './drawRidge.js';

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

const drawTunnels = (context, route, renderTarget) => {
  let previousSegment = null;
  route.segments.forEach((segment) => {
    if (previousSegment?.type === TYPE_TUNNEL && segment.type !== TYPE_TUNNEL) {
      const pixels = renderTarget.camera.transformMetersToPixels(segment);
      context.lineTo(pixels.x, pixels.y);
      context.stroke(); 
    }
    if (previousSegment?.type !== TYPE_TUNNEL && segment.type === TYPE_TUNNEL) {
      context.lineWidth = 5;
      context.strokeStyle = `rgb(150, 0, 0)`;
      context.setLineDash([10, 10]);
      context.beginPath();
      const pixels = renderTarget.camera.transformMetersToPixels(previousSegment || segment);
      context.moveTo(pixels.x, pixels.y);
    }
    if (segment.type === TYPE_TUNNEL) {
      const pixels = renderTarget.camera.transformMetersToPixels(segment);
      context.lineTo(pixels.x, pixels.y);
    }
    previousSegment = segment;
  });
  if (previousSegment?.type === TYPE_TUNNEL) {
    context.stroke(); 
  }
};

const drawBridges = (context, route, renderTarget) => {
  let previousSegment = null;
  route.segments.forEach((segment) => {
    if (previousSegment?.type === TYPE_BRIDGE && segment.type !== TYPE_BRIDGE) {
      const pixels = renderTarget.camera.transformMetersToPixels(segment);
      context.lineTo(pixels.x, pixels.y);
      context.stroke(); 
    }
    if (previousSegment?.type !== TYPE_BRIDGE && segment.type === TYPE_BRIDGE) {
      context.lineWidth = 8;
      context.strokeStyle = `rgb(10, 10, 10)`;
      context.setLineDash([]);
      context.beginPath();
      const pixels = renderTarget.camera.transformMetersToPixels(previousSegment || segment);
      context.moveTo(pixels.x, pixels.y);
    }
    if (segment.type === TYPE_BRIDGE) {
      const pixels = renderTarget.camera.transformMetersToPixels(segment);
      context.lineTo(pixels.x, pixels.y);
    }
    previousSegment = segment;
  });
  if (previousSegment?.type === TYPE_BRIDGE) {
    context.stroke(); 
  }
};

const drawTrack = (context, route, renderTarget) => {
  let previousSegment = null;
  route.segments.forEach((segment) => {
    if ((previousSegment?.type === TYPE_GROUND || previousSegment?.type === TYPE_BRIDGE) && 
      segment.type !== TYPE_GROUND && segment.type !== TYPE_BRIDGE) {
      context.stroke(); 
    }
    if (segment.type === TYPE_GROUND || segment.type === TYPE_BRIDGE) {
      if (previousSegment?.type !== TYPE_GROUND && previousSegment?.type !== TYPE_BRIDGE) {
        context.lineWidth = 5;
        context.strokeStyle = `rgb(150, 0, 0)`;
        context.setLineDash([]);
        context.beginPath();
        const pixels = renderTarget.camera.transformMetersToPixels(previousSegment || segment);
        context.moveTo(pixels.x, pixels.y);
      }
      const pixels = renderTarget.camera.transformMetersToPixels(segment);
      context.lineTo(pixels.x, pixels.y);
    }
    
    previousSegment = segment;
  });
  if (previousSegment?.type === TYPE_GROUND || previousSegment?.type === TYPE_BRIDGE) {
    context.stroke(); 
  }
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
  context.lineCap = 'round';

  drawBridges(context, route, renderTarget);
  drawTrack(context, route, renderTarget);
  drawTunnels(context, route, renderTarget);

  context.setLineDash([]);
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
        drawRidge(context, route, renderTarget, cameras.profile);
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