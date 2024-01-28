import calculateDistance from './calculateDistance.js';

const updateRouteEditPoint = (cameras, route, pixels) => {
  const point = cameras.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.findNearestControlPoint(point);
  const nearestControlPixels = cameras.transformMetersToPixels(nearestControlPoint);
  if (calculateDistance(pixels, nearestControlPixels) < 50) {
    route.createEditByControlPoint(nearestControlPoint);
  } else {
    const nearestSegment = route.findNearestSegment(point);
    const nearestSegmentPixels = cameras.transformMetersToPixels(nearestSegment);
    if (calculateDistance(pixels, nearestSegmentPixels) < 20) {
      route.createEditBySegment(nearestSegment);
    } else {
      route.removeEdit(null);
    }
  }
};

export default (layout, cameras, route, mapRenderer, routeRenderer) => {
  const state = {
    touchInterval: null
  };

  layout.mapContainer.onwheel = (event) => {
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.zoomIn(-amount) : cameras.zoomOut(amount);
    mapRenderer.render();
    routeRenderer.render();
  };
  layout.mapContainer.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    if (event.buttons === 1) {
      if (!route.moveEdit(cameras.transformPixelsToMeters(pixels))) {
        cameras.moveMapByPixels({ x: -event.movementX, y: -event.movementY });
      }
    }
    cameras.setMagnifierByPixels(pixels);

    updateRouteEditPoint(cameras, route, pixels);

    mapRenderer.render();
    routeRenderer.render();
  };
  layout.mapContainer.onmousedown = () => {
    clearInterval(state.touchInterval);
    state.touchInterval = setInterval(() => {
      if (route.activateEdit()) {
        routeRenderer.render();
      }
    }, 20);
  };
  layout.mapContainer.onmouseup = () => {
    clearInterval(state.touchInterval);
    route.removeEdit();
  };
  layout.mapContainer.onclick = (event) => {
    console.log(cameras.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
  }
};