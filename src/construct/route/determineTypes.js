import {
  ROUTE_TYPE_TUNNEL,
  ROUTE_TYPE_BRIDGE,
  ROUTE_TYPE_GROUND,
} from './routeTypes.js';

const determineType = (segment) => {
  if (!segment) {
    return null;
  }
  const difference = segment.z - segment.mapHeight;
  if (difference > 5) {
    return ROUTE_TYPE_BRIDGE;
  }
  if (difference < -5) {
    return ROUTE_TYPE_TUNNEL;
  }
  return ROUTE_TYPE_GROUND;
};

export default (route) => {
  route.segments.forEach((segment) => {
    segment.type = determineType(segment);
  });
};
