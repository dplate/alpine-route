import {ROUTE_TYPE_TUNNEL, ROUTE_TYPE_BRIDGE, ROUTE_TYPE_GROUND} from './routeTypes.js';

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
  route.segments.forEach((segment, index) => {
    segment.type = determineType(segment);
    if (segment.type !== ROUTE_TYPE_GROUND) {
      return;
    }

    const previousType = determineType(route.segments[index - 1]);
    const nextType = determineType(route.segments[index]);
    if (previousType === ROUTE_TYPE_BRIDGE || nextType === ROUTE_TYPE_BRIDGE) {
      segment.type = ROUTE_TYPE_BRIDGE;
    } else if (previousType === ROUTE_TYPE_TUNNEL || nextType === ROUTE_TYPE_TUNNEL) {
      segment.type = ROUTE_TYPE_TUNNEL;
    }
  });
};