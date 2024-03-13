import {ROUTE_TYPE_BRIDGE, ROUTE_TYPE_GROUND, ROUTE_TYPE_TUNNEL} from './routeTypes.js';

const createInitialCosts = () => ({
  sum: 0,
  min: Number.MAX_VALUE,
  max: 0,
});

export default (route, level, map) => {
  route.costs = {
    [ROUTE_TYPE_TUNNEL]: createInitialCosts(),
    [ROUTE_TYPE_BRIDGE]: createInitialCosts(),
    [ROUTE_TYPE_GROUND]: createInitialCosts(),
    total: createInitialCosts(),
  };

  let previousSegment = null;
  let tunnelEntranceMeter = 0;
  let tunnelExitMeter = null;
  route.segments.forEach((segment, segmentIndex) => {
    const segmentMeters = segment.meter - (previousSegment?.meter || 0);

    switch(segment.type) {
      case ROUTE_TYPE_TUNNEL:
        if (previousSegment?.type !== ROUTE_TYPE_TUNNEL) {
          tunnelEntranceMeter = previousSegment.meter;
          tunnelExitMeter = route.segments[route.segments.length - 1].meter;
          for (let i = segmentIndex; i < route.segments.length; i++) {
            if (route.segments[i].type !== ROUTE_TYPE_TUNNEL) {
              tunnelExitMeter = route.segments[i].meter;
              break;
            }
          }
        }
        const distanceToOutside = Math.min(
          segment.meter - tunnelEntranceMeter,
          tunnelExitMeter - segment.meter
        );
        segment.costs = segmentMeters * level.costs.tunnelMeter * distanceToOutside * level.costs.tunnelDepthFactor;
        break;
      case ROUTE_TYPE_BRIDGE:
        const heightAboveGround = segment.z - segment.mapHeight;
        segment.costs = segmentMeters * level.costs.bridgeMeter * heightAboveGround * level.costs.bridgeHeightFactor;
        break;
      default: 
        const slope = map.getSlopeAtPoint(segment);
        segment.costs = segmentMeters * level.costs.groundMeter * slope * level.costs.groundSlopeFactor;
        break;
    }

    route.costs[segment.type].sum += segment.costs;
    route.costs[segment.type].min = Math.min(route.costs[segment.type].min, segment.costs || route.costs[segment.type].min);
    route.costs[segment.type].max = Math.max(route.costs[segment.type].max, segment.costs);

    route.costs.total.sum += segment.costs;
    route.costs.total.min = Math.min( route.costs.total.min, segment.costs || route.costs.total.min);
    route.costs.total.max = Math.max(route.costs.total.max, segment.costs);

    previousSegment = segment;
  });
};