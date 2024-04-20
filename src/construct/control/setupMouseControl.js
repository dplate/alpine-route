import handleMapDrag from './handleMapDrag.js';
import handleProfileDrag from './handleProfileDrag.js';

export default (layout, cameras, route, mapRenderer, routeRenderer, notesRenderer) => {
  const state = {
    touchInterval: null,
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
    clearInterval(state.touchInterval);
    route.confirmEdit();
    mapRenderer.render();
    routeRenderer.render();
    event.preventDefault();
  };

  layout.mapContainer.onwheel = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.map.zoomIn(-amount, pixels) : cameras.map.zoomOut(amount, pixels);
    mapRenderer.render();
    routeRenderer.render();
  };

  layout.mapContainer.onmousedown = () => startEditing(true);

  layout.mapContainer.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    const movementPixels = { x: -event.movementX, y: -event.movementY };
    handleMapDrag(cameras, route, mapRenderer, routeRenderer, notesRenderer, pixels, movementPixels, event.buttons === 1);
  };

  layout.mapContainer.onmouseup = stopEditing;

  layout.profile.onmousedown = () => startEditing(false);

  layout.profile.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    handleProfileDrag(cameras, route, routeRenderer, notesRenderer, pixels, event.buttons === 1);
  };

  layout.profile.onmouseup = stopEditing;
};