import { HIGHLIGHT_BRIDGE_COSTS, HIGHLIGHT_GROUND_COSTS, HIGHLIGHT_TUNNEL_COSTS } from '../cameras/highlightTypes.js';
import drawRidge from './drawRidge.js';
import drawSection from './drawSection.js';
import { TYPE_BRIDGE, TYPE_GROUND, TYPE_TUNNEL } from './routeTypes.js';

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

const isSegmentHighlighted = (segment, highlightType) => {
  switch(highlightType) {
    case HIGHLIGHT_TUNNEL_COSTS: return segment.type === TYPE_TUNNEL;
    case HIGHLIGHT_BRIDGE_COSTS: return segment.type === TYPE_BRIDGE;
    case HIGHLIGHT_GROUND_COSTS: return segment.type === TYPE_GROUND
    default: return true;
  }
};

const getHighlightCosts = (route, highlightType) => {
  switch(highlightType) {
    case HIGHLIGHT_TUNNEL_COSTS: return route.costs.tunnel;
    case HIGHLIGHT_BRIDGE_COSTS: return route.costs.bridge;
    case HIGHLIGHT_GROUND_COSTS: return route.costs.ground;
    default: return route.costs.total;
  }
};

const getColorForSegment = (route, segment, highlightType) => {
  if (!isSegmentHighlighted(segment, highlightType)) {
    return 'rgba(200, 200, 255, 1.0)';
  }
  const highlightCosts = getHighlightCosts(route, highlightType);
  const normalizedCosts = (segment.costs - highlightCosts.min) / (highlightCosts.max - highlightCosts.min);
  const red = Math.round(255 * Math.min(normalizedCosts * 2.0, 1.0));
  const green = Math.round(255 * Math.min((1.0 - normalizedCosts) * 2.0, 1.0));
  return `rgba(${red}, ${green}, 0, 1.0)`;
}

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

const drawSegments = (context, route, renderTarget, highlightType) => {
  const section = {
    visible: false,
    type: null,
    corners: [],
  };
  route.segments.forEach((segment, index) => {
    if (route.edit?.segment === segment) {
      drawPoint(
        context, 
        segment, 
        pointVariants.editPoint, 
        route.edit.activateFactor || 0.0,
        renderTarget
      );
    }

    const pixels = renderTarget.camera.transformMetersToPixels(segment);
    const visible = pixels.x >= 0 && pixels.x < renderTarget.canvas.width &&
      pixels.y >= 0 && pixels.y < renderTarget.canvas.height;
    const corner = {
      pixels,
      visible,
      color: getColorForSegment(route, segment, highlightType)
    };
    section.type = section.type || segment.type;
    section.corners.push(corner);
    section.visible = section.visible || visible;

    const nextType = route.segments[index + 1]?.type;
    if (index >= route.segments.length - 1 ||
      (segment.type === TYPE_GROUND && nextType !== TYPE_GROUND) || 
      segment.type !== section.type
    ) {
      drawSection(context, section);

      section.visible = visible;
      section.type = (segment.type === TYPE_GROUND && nextType) || segment.type;
      section.corners = [corner];
    }
  });
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
      drawSegments(context, route, renderTarget, cameras.highlight);
    });
    
  };

  system.handleCanvasResize(renderTargets.map(renderTarget => renderTarget.canvas), render);

  return {
    render
  };
};