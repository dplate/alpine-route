import { LIMIT_TYPES, LIMIT_TYPES_TO_HIGHLIGHTS } from '../route/limitTypes.js';
import { ROUTE_TYPES_TO_HIGHLIGHTS, ROUTE_TYPES } from '../route/routeTypes.js';
import addHighlightSelectorHandling from './addHighlightSelectorHandling.js';
import setupMouseControl from './setupMouseControl.js';
import setupTouchControl from './setupTouchControl.js';
import handleMapDrag from './handleMapDrag.js';

export default (layout, cameras, route, renderer) => {
  return new Promise(resolve => {
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
      if (layout.limits[limitType]) {
        addHighlightSelectorHandling(
          cameras, 
          renderer,
          layout.limits[limitType], 
          LIMIT_TYPES_TO_HIGHLIGHTS[limitType]
        );
      }
    });

    layout.profileToggle.onclick = () => {
      if (layout.profile.classList.toggle("toggled")) {
        layout.notesToggle.style.display = 'none';
      } else {
        layout.notesToggle.style.removeProperty('display');
      }
    };
    layout.notesToggle.onclick = () => {
      if (layout.notesContainer.classList.toggle("toggled")) {
        layout.profileToggle.style.display = 'none';
      } else {
        layout.profileToggle.style.removeProperty('display');
      }
    };

    handleMapDrag(cameras, route, renderer, { x: 0, y: 0 }, { x: 0, y: 0 }, false);

    layout.endButton.onclick = resolve;
  });
};