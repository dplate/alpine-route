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
      const scrollPixels = Math.abs(
        event.deltaMode === 1 ? event.deltaY * 20.0 : event.deltaY
      );
      const zoomAmount = 1.0 + scrollPixels * 0.001;
      event.deltaY < 0
        ? cameras.map.zoomIn(zoomAmount, pixels)
        : cameras.map.zoomOut(zoomAmount, pixels);
      renderer.renderAll();

      event.stopPropagation();
      event.preventDefault();
    },
    { passive: false },
  );

  layout.mapContainer.onmousedown = (event) => {
    console.log(cameras.map.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
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
