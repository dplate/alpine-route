import {HIGHLIGHT_COSTS} from '../cameras/highlightTypes.js';
import drawSection from './drawSection.js';
import { LIMIT_TYPES, LIMIT_TYPES_TO_HIGHLIGHTS } from './limitTypes.js';
import {ROUTE_TYPES, ROUTE_TYPES_TO_HIGHLIGHTS, ROUTE_TYPE_GROUND} from './routeTypes.js';

const convertNormalizedToColor = (normalized) => {
  const red = Math.round(255 * Math.min(normalized * 2.0, 1.0));
  const green = Math.round(255 * Math.min((1.0 - normalized) * 2.0, 1.0));
  return `rgba(${red}, ${green}, 0, 1.0)`;
};

const getColorForSegment = (route, segment, highlightType) => {
  const limitType = LIMIT_TYPES.find((limitType) => LIMIT_TYPES_TO_HIGHLIGHTS[limitType] === highlightType);
  if (limitType) {
    return convertNormalizedToColor(segment.limits[limitType] ? 0.0 : 1.0);
  } else {
    const routeType = ROUTE_TYPES.find((routeType) => ROUTE_TYPES_TO_HIGHLIGHTS[routeType] === highlightType);
    const highlightCosts = route.costs[routeType] || route.costs.total;
    if (highlightType !== HIGHLIGHT_COSTS && ROUTE_TYPES_TO_HIGHLIGHTS[segment.type] !== highlightType) {
      return 'rgba(200, 200, 255, 1.0)';
    }
    return convertNormalizedToColor((segment.costs - highlightCosts.min) / (highlightCosts.max - highlightCosts.min));
  }
}

export default (context, route, renderTarget, highlightType) => {
  const section = {
    visible: false,
    type: null,
    corners: [],
  };
  route.segments.forEach((segment, index) => {
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
      (segment.type === ROUTE_TYPE_GROUND && nextType !== ROUTE_TYPE_GROUND) || 
      segment.type !== section.type
    ) {
      drawSection(context, section);

      section.visible = visible;
      section.type = (segment.type === ROUTE_TYPE_GROUND && nextType) || segment.type;
      section.corners = [corner];
    }
  });
};