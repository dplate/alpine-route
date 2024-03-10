import {TYPE_BRIDGE, TYPE_TUNNEL} from './routeTypes.js';

export default (route, level, map) => {
  route.costs = {
    tunnels: 0,
    bridges: 0,
    grounds: 0,
    total: 0,
    minTotal: Number.MAX_VALUE,
    maxTotal: 0
  };

  let previousSegment = null;
  let tunnelEntranceMeter = 0;
  let tunnelExitMeter = null;
  route.segments.forEach((segment, segmentIndex) => {
    const segmentMeters = segment.meter - (previousSegment?.meter || 0);

    switch(segment.type) {
      case TYPE_TUNNEL:
        if (previousSegment?.type !== TYPE_TUNNEL) {
          tunnelEntranceMeter = previousSegment.meter;
          tunnelExitMeter = route.segments[route.segments.length - 1].meter;
          for (let i = segmentIndex; i < route.segments.length; i++) {
            if (route.segments[i].type !== TYPE_TUNNEL) {
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
        route.costs.tunnels += segment.costs;
        break;
      case TYPE_BRIDGE:
        const heightAboveGround = segment.z - segment.mapHeight;
        segment.costs = segmentMeters * level.costs.bridgeMeter * heightAboveGround * level.costs.bridgeHeightFactor;
        route.costs.bridges += segment.costs;
        break;
      default: 
        const slope = map.getSlopeAtPoint(segment);
        segment.costs = segmentMeters * level.costs.groundMeter * slope * level.costs.groundSlopeFactor;
        route.costs.grounds += segment.costs;
        break;
    }
    route.costs.minTotal = Math.min(route.costs.minTotal, segment.costs);
    route.costs.maxTotal = Math.max(route.costs.maxTotal, segment.costs);
    previousSegment = segment;
  });

  route.costs.total = route.costs.tunnels + route.costs.bridges + route.costs.grounds;
};