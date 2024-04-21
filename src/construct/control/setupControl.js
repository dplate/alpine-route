import { LIMIT_TYPES, LIMIT_TYPES_TO_HIGHLIGHTS } from '../route/limitTypes.js';
import { ROUTE_TYPES_TO_HIGHLIGHTS, ROUTE_TYPES } from '../route/routeTypes.js';
import addHighlightSelectorHandling from './addHighlightSelectorHandling.js';
import setupMouseControl from './setupMouseControl.js';
import setupTouchControl from './setupTouchControl.js';

export default (layout, cameras, route, renderer) => {
  setupMouseControl(layout, cameras, route, renderer);
  setupTouchControl(layout, cameras, route, renderer);

  ROUTE_TYPES.forEach(routeType => {
    addHighlightSelectorHandling(
      cameras, 
      renderer,
      layout.routeTypeCosts[routeType], 
      ROUTE_TYPES_TO_HIGHLIGHTS[routeType]
    );
  });
  LIMIT_TYPES.forEach(limitType => {
    addHighlightSelectorHandling(
      cameras, 
      renderer,
      layout.limits[limitType], 
      LIMIT_TYPES_TO_HIGHLIGHTS[limitType]
    );
  });
};