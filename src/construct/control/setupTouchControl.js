import handleMapDrag from './handleMapDrag.js';
import handleProfileDrag from './handleProfileDrag.js';
import proposeRouteEditPoint from './proposeRouteEditPoint.js';

const transformTouchToPixels = (touch, canvas) => {
  const boundingRect = canvas.getBoundingClientRect();
  return { x: touch.clientX - boundingRect.x, y: touch.clientY - boundingRect.y };
};

export default (layout, cameras, route, renderer) => {
  const state = {
    touchInterval: null,
    previousTouchOfDrag: null,
    previousPinchDistance: null
  };

  const startEditing = (createOnGround) => {
    clearInterval(state.touchInterval);
    state.touchInterval = setInterval(() => {
      if (route.activateEdit(createOnGround)) {
        renderer.route.render();
      }
    }, 20);
  };

  const stopEditing = (event) => {
    state.previousTouchOfDrag = null;
    state.previousPinchDistance = null;
    clearInterval(state.touchInterval);
    cameras.magnifier.disable();
    route.confirmEdit();
    renderer.renderAll();
    event.preventDefault();
  };

  layout.mapContainer.ontouchstart = (event) => {
    startEditing(true);
    const touch = event.targetTouches[0];
    const pixels = transformTouchToPixels(touch, layout.mapContainer);
    handleMapDrag(cameras, route, renderer, pixels, { x: 0, y: 0 }, false)
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
      renderer.renderAll();
      event.preventDefault();
      return;
    }
        
    const movementPixels = state.previousTouchOfDrag ? 
      { x: -(touch.clientX - state.previousTouchOfDrag.clientX), y: -(touch.clientY - state.previousTouchOfDrag.clientY) } :
      { x: 0, y: 0 };
    handleMapDrag(cameras, route, renderer, pixels, movementPixels, true)

    state.previousTouchOfDrag = touch;
  };

  layout.mapContainer.ontouchend = stopEditing;
  layout.mapContainer.ontouchcancel = stopEditing;

  layout.profile.ontouchstart = (event) => {
    startEditing(false);
    const pixels = transformTouchToPixels(event.targetTouches[0], layout.profile);
    handleProfileDrag(cameras, route, renderer, pixels, false);
  }

  layout.profile.ontouchmove = (event) => {
    const pixels = transformTouchToPixels(event.targetTouches[0], layout.profile);
    handleProfileDrag(cameras, route, renderer, pixels, true);
  };

  layout.profile.ontouchend = stopEditing;
  layout.profile.ontouchcancel = stopEditing;
};