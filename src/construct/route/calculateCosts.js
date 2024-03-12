import {TYPE_BRIDGE, TYPE_TUNNEL} from './routeTypes.js';

export default (route, level, map) => {
  route.costs = {
    tunnel: {
      sum: 0,
      min: Number.MAX_VALUE,
      max: 0,
    },
    bridge: {
      sum: 0,
      min: Number.MAX_VALUE,
      max: 0,
    },
    ground: {
      sum: 0,
      min: Number.MAX_VALUE,
      max: 0,
    },
    total: {
      sum:0,
      min: Number.MAX_VALUE,
      max: 0
    }
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
        route.costs.tunnel.sum += segment.costs;
        route.costs.tunnel.min = Math.min( route.costs.tunnel.min, segment.costs || route.costs.tunnel.min);
        route.costs.tunnel.max = Math.max(route.costs.tunnel.max, segment.costs);
        break;
      case TYPE_BRIDGE:
        const heightAboveGround = segment.z - segment.mapHeight;
        segment.costs = segmentMeters * level.costs.bridgeMeter * heightAboveGround * level.costs.bridgeHeightFactor;
        route.costs.bridge.sum += segment.costs;
        route.costs.bridge.min = Math.min( route.costs.bridge.min, segment.costs || route.costs.bridge.min);
        route.costs.bridge.max = Math.max(route.costs.bridge.max, segment.costs);
        break;
      default: 
        const slope = map.getSlopeAtPoint(segment);
        segment.costs = segmentMeters * level.costs.groundMeter * slope * level.costs.groundSlopeFactor;
        route.costs.ground.sum += segment.costs;
        route.costs.ground.min = Math.min( route.costs.ground.min, segment.costs || route.costs.ground.min);
        route.costs.ground.max = Math.max(route.costs.ground.max, segment.costs);
        break;
    }
    route.costs.total.sum += segment.costs;
    route.costs.total.min = Math.min( route.costs.total.min, segment.costs || route.costs.total.min);
    route.costs.total.max = Math.max(route.costs.total.max, segment.costs);
    previousSegment = segment;
  });
};