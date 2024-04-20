import { LIMIT_TYPES, LIMIT_TYPES_TO_HIGHLIGHTS } from '../route/limitTypes.js';
import { ROUTE_TYPES_TO_HIGHLIGHTS, ROUTE_TYPES } from '../route/routeTypes.js';
import addHighlightSelectorHandling from './addHighlightSelectorHandling.js';
import setupMouseControl from './setupMouseControl.js';
import setupTouchControl from './setupTouchControl.js';

export default (layout, cameras, route, mapRenderer, routeRenderer, notesRenderer) => {
  setupMouseControl(layout, cameras, route, mapRenderer, routeRenderer, notesRenderer);
  setupTouchControl(layout, cameras, route, mapRenderer, routeRenderer, notesRenderer);

  ROUTE_TYPES.forEach(routeType => {
    addHighlightSelectorHandling(
      cameras, 
      routeRenderer, 
      notesRenderer,
      layout.routeTypeCosts[routeType], 
      ROUTE_TYPES_TO_HIGHLIGHTS[routeType]
    );
  });
  LIMIT_TYPES.forEach(limitType => {
    addHighlightSelectorHandling(
      cameras, 
      routeRenderer, 
      notesRenderer,
      layout.limits[limitType], 
      LIMIT_TYPES_TO_HIGHLIGHTS[limitType]
    );
  });
};