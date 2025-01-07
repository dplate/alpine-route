import handleMapDrag from './handleMapDrag.js';
import handleProfileDrag from './handleProfileDrag.js';

export default (layout, cameras, route, renderer) => {
  const state = {
    touchInterval: null,
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
    clearInterval(state.touchInterval);
    route.confirmEdit();
    renderer.renderAll();
    event.preventDefault();
  };

  layout.mapContainer.addEventListener(
    'wheel',
    (event) => {
      const pixels = { x: event.offsetX, y: event.offsetY };
      event.deltaY < 0
        ? cameras.map.zoomIn(1.1, pixels)
        : cameras.map.zoomOut(1.1, pixels);
      renderer.renderAll();

      event.stopPropagation();
      event.preventDefault();
    },
    { passive: false },
  );

  layout.mapContainer.onmousedown = () => {
    startEditing(true);
  };

  layout.mapContainer.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    const movementPixels = { x: -event.movementX, y: -event.movementY };
    handleMapDrag(
      cameras,
      route,
      renderer,
      pixels,
      movementPixels,
      event.buttons === 1,
    );
  };

  layout.mapContainer.onmouseup = stopEditing;

  layout.profile.onmousedown = () => startEditing(false);

  layout.profile.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    handleProfileDrag(cameras, route, renderer, pixels, event.buttons === 1);
  };

  layout.profile.onmouseup = stopEditing;
};
