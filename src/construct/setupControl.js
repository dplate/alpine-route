import calculateDistance from './calculateDistance.js';

const proposeRouteEditPoint = (cameras, route, pixels) => {
  const point = cameras.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.findNearestEditableControlPoint(point);
  if (nearestControlPoint) {
    const nearestControlPixels = cameras.transformMetersToPixels(nearestControlPoint);
    if (calculateDistance(pixels, nearestControlPixels) < 50) {
      route.createEditByControlPoint(nearestControlPoint);
      return;
    }
  }
  const nearestSegment = route.findNearestSegment(point);
  const nearestSegmentPixels = cameras.transformMetersToPixels(nearestSegment);
  if (calculateDistance(pixels, nearestSegmentPixels) < 20) {
    route.createEditBySegment(nearestSegment);
  } else {
    route.abortEdit();
  }
};

const handleRouteEditing = (cameras, route, pixels) => {
  const newPoint = cameras.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.moveEdit(newPoint);
  if (!nearestControlPoint) {
    return false;
  }
  const nearestControlPixels = cameras.transformMetersToPixels(nearestControlPoint);
  route.markEditAsDeletable(calculateDistance(pixels, nearestControlPixels) < 20);
  return true;
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
      if (!handleRouteEditing(cameras, route, pixels)) {
        cameras.moveMapByPixels({ x: -event.movementX, y: -event.movementY });
      }
    }
    cameras.setMagnifierByPixels(pixels);

    proposeRouteEditPoint(cameras, route, pixels);

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
    route.confirmEdit();
  };
  layout.mapContainer.onclick = (event) => {
    console.log(cameras.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }), cameras.profile);
  }
};