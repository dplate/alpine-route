import handleMapDrag from './handleMapDrag.js';
import handleProfileDrag from './handleProfileDrag.js';
import proposeRouteEditPoint from './proposeRouteEditPoint.js';

const transformTouchToPixels = (touch, canvas) => {
  const boundingRect = canvas.getBoundingClientRect();
  return { x: touch.clientX - boundingRect.x, y: touch.clientY - boundingRect.y };
};

export default (layout, cameras, route, mapRenderer, routeRenderer, notesRenderer) => {
  const state = {
    touchInterval: null,
    previousTouchOfDrag: null,
    previousPinchDistance: null
  };

  const startEditing = (createOnGround) => {
    clearInterval(state.touchInterval);
    state.touchInterval = setInterval(() => {
      if (route.activateEdit(createOnGround)) {
        routeRenderer.render();
      }
    }, 20);
  };

  const stopEditing = (event) => {
    state.previousTouchOfDrag = null;
    state.previousPinchDistance = null;
    clearInterval(state.touchInterval);
    route.confirmEdit();
    mapRenderer.render();
    routeRenderer.render();
    event.preventDefault();
  };

  layout.mapContainer.ontouchstart = (event) => {
    startEditing(true);
    proposeRouteEditPoint(
      cameras.map, 
      route,
      transformTouchToPixels(event.targetTouches[0], layout.mapContainer),
      (point) => route.findNearestEditableControlPointByMapMeters(point),
      (point) => route.findNearestSegmentByMapMeters(point)
    );
  };

  layout.mapContainer.ontouchmove = (event) => {
    const touch = event.targetTouches[0];
    const pixels = transformTouchToPixels(touch, layout.mapContainer);

    if (event.targetTouches[1]) {
      const pixels2 = transformTouchToPixels(event.targetTouches[1], layout.mapContainer);
      const pinchDistance = Math.sqrt(
        (pixels.x - pixels2.x) ** 2 +
        (pixels.y - pixels2.y) ** 2
      );
      const centerPixels = {
        x: (pixels.x + pixels2.x) / 2.0,
        y: (pixels.y + pixels2.y) / 2.0
      };
      if (!state.previousPinchDistance) {
        state.previousPinchDistance = pinchDistance;
      }
      cameras.map.zoomIn(pinchDistance / state.previousPinchDistance, centerPixels);

      state.previousPinchDistance = pinchDistance;
      mapRenderer.render();
      routeRenderer.render();
      event.preventDefault();
      return;
    }
        
    const movementPixels = state.previousTouchOfDrag ? 
      { x: -(touch.clientX - state.previousTouchOfDrag.clientX), y: -(touch.clientY - state.previousTouchOfDrag.clientY) } :
      { x: 0, y: 0 };
    handleMapDrag(cameras, route, mapRenderer, routeRenderer, notesRenderer, pixels, movementPixels, true)

    state.previousTouchOfDrag = touch;
  };

  layout.mapContainer.ontouchend = stopEditing;
  layout.mapContainer.ontouchcancel = stopEditing;

  layout.profile.ontouchstart = (event) => {
    startEditing(false);
    proposeRouteEditPoint(
      cameras.profile, 
      route,
      transformTouchToPixels(event.targetTouches[0], layout.profile),
      (point) => route.findNearestEditableControlPointByProfileMeters(point),
      (point) => route.findNearestSegmentByProfileMeters(point)
    );
  }

  layout.profile.ontouchmove = (event) => {
    const pixels = transformTouchToPixels(event.targetTouches[0], layout.profile);
    handleProfileDrag(cameras, route, routeRenderer, notesRenderer, pixels, true);
  };

  layout.profile.ontouchend = stopEditing;
  layout.profile.ontouchcancel = stopEditing;
};