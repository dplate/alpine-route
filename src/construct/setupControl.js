export default (layout, cameras, mapRenderer) => {
  layout.map.onwheel = (event) => {
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.zoomIn(-amount) : cameras.zoomOut(amount);
    mapRenderer.render();
  };
  layout.map.onmousemove = (event) => {
    if (event.buttons === 1) {
      cameras.moveMapByPixels(-event.movementX, -event.movementY);
    }
    cameras.setMagnifierByPixels(event.offsetX, event.offsetY);
    mapRenderer.render();
  };
};