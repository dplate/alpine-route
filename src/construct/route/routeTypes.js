import { HIGHLIGHT_BRIDGE_COSTS, HIGHLIGHT_GROUND_COSTS, HIGHLIGHT_TUNNEL_COSTS } from '../cameras/highlightTypes.js';

export const ROUTE_TYPE_TUNNEL = 'tunnel';
export const ROUTE_TYPE_BRIDGE = 'bridge';
export const ROUTE_TYPE_GROUND = 'ground';

export const ROUTE_TYPES = [ROUTE_TYPE_TUNNEL, ROUTE_TYPE_BRIDGE, ROUTE_TYPE_GROUND];

export const ROUTE_TYPES_TO_HIGHLIGHTS = {
  [ROUTE_TYPE_TUNNEL]: HIGHLIGHT_TUNNEL_COSTS,
  [ROUTE_TYPE_BRIDGE]: HIGHLIGHT_BRIDGE_COSTS,
  [ROUTE_TYPE_GROUND]: HIGHLIGHT_GROUND_COSTS
};

export const ROUTE_TYPES_TO_COSTS_LABEL = {
  [ROUTE_TYPE_TUNNEL]: 'TUNNEL_COSTS_LABEL',
  [ROUTE_TYPE_BRIDGE]: 'BRIDGE_COSTS_LABEL',
  [ROUTE_TYPE_GROUND]: 'GROUND_COSTS_LABEL'
};