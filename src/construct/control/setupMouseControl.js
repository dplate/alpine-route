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

  layout.mapContainer.addEventListener('wheel', (event) => {
    console.log('wheel event', event.offsetX, event.offsetY, event.deltaY);
    
    const pixels = { x: event.offsetX, y: event.offsetY };
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.map.zoomIn(-amount, pixels) : cameras.map.zoomOut(amount, pixels);
    renderer.renderAll();

    event.stopPropagation();
    event.preventDefault();
  }, { passive: false });

  layout.mapContainer.onmousedown = (event) => {
    console.log(cameras.map.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
    startEditing(true);
  }

  layout.mapContainer.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    const movementPixels = { x: -event.movementX, y: -event.movementY };
    handleMapDrag(cameras, route, renderer, pixels, movementPixels, event.buttons === 1);
  };

  layout.mapContainer.onmouseup = stopEditing;

  layout.profile.onmousedown = () => startEditing(false);

  layout.profile.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    handleProfileDrag(cameras, route, renderer, pixels, event.buttons === 1);
  };

  layout.profile.onmouseup = stopEditing;
};