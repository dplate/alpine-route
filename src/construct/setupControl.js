export default (layout, cameras, mapRenderer, routeRenderer) => {
  layout.mapContainer.onwheel = (event) => {
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.zoomIn(-amount) : cameras.zoomOut(amount);
    mapRenderer.render();
    routeRenderer.render();
  };
  layout.mapContainer.onmousemove = (event) => {
    if (event.buttons === 1) {
      cameras.moveMapByPixels(-event.movementX, -event.movementY);
    }
    cameras.setMagnifierByPixels(event.offsetX, event.offsetY);
    mapRenderer.render();
    routeRenderer.render();
  };
  layout.mapContainer.onclick = (event) => {
    console.log(cameras.transformPixelsToMeters(event.offsetX, event.offsetY));
  }
};