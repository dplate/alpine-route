export default (layout, mapRenderer) => {
  mapRenderer.magnifierCamera.scale = mapRenderer.mapCamera.scale * 15;
  
  layout.map.onwheel = (event) => {
    mapRenderer.mapCamera.scale /= event.deltaY < 0 ? (-90/event.deltaY) : (event.deltaY/90);
    mapRenderer.magnifierCamera.scale = mapRenderer.mapCamera.scale * 15;
    mapRenderer.render();
  };
  layout.map.onmousemove = (event) => {
    if (event.buttons === 1) {
      mapRenderer.mapCamera.center.x -= event.movementX / layout.map.height / mapRenderer.mapCamera.scale;
      mapRenderer.mapCamera.center.y -= event.movementY / layout.map.height / mapRenderer.mapCamera.scale;
    }
    mapRenderer.magnifierCamera.center.x = (event.offsetX / layout.map.width - 0.5) * layout.map.width / layout.map.height / mapRenderer.mapCamera.scale + mapRenderer.mapCamera.center.x;
    mapRenderer.magnifierCamera.center.y = (event.offsetY / layout.map.height - 0.5) / mapRenderer.mapCamera.scale + mapRenderer.mapCamera.center.y;

    mapRenderer.render();
  };
};