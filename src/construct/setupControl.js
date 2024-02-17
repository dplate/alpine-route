import calculateMapDistance from './map/calculateMapDistance.js';
import calculateProfileDistance from './route/calculateProfileDistance.js';

const controlPointSnapDistance = 50;
const segmentSnapDistances = 20;

const proposeRouteEditPointOnMap = (cameras, route, pixels) => {
  const point = cameras.map.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.findNearestEditableControlPointByMapMeters(point);
  if (nearestControlPoint) {
    const nearestControlPixels = cameras.map.transformMetersToPixels(nearestControlPoint);
    if (calculateMapDistance(pixels, nearestControlPixels) < controlPointSnapDistance) {
      route.createEditByControlPoint(nearestControlPoint);
      return;
    }
  }
  const nearestSegment = route.findNearestSegmentByMapMeters(point);
  const nearestSegmentPixels = cameras.map.transformMetersToPixels(nearestSegment);
  if (calculateMapDistance(pixels, nearestSegmentPixels) < segmentSnapDistances) {
    route.createEditBySegment(nearestSegment);
  } else {
    route.abortEdit();
  }
};

const proposeRouteEditPointOnProfile = (cameras, route, pixels) => {
  const point = cameras.profile.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.findNearestEditableControlPointByProfileMeters(point);
  if (nearestControlPoint) {
    const nearestControlPixels = cameras.profile.transformMetersToPixels(nearestControlPoint);
    if (calculateMapDistance(pixels, nearestControlPixels) < controlPointSnapDistance) {
      route.createEditByControlPoint(nearestControlPoint);
      return;
    }
  }
  const nearestSegment = route.findNearestSegmentByProfileMeters(point);
  const nearestSegmentPixels = cameras.profile.transformMetersToPixels(nearestSegment);
  if (calculateMapDistance(pixels, nearestSegmentPixels) < segmentSnapDistances) {
    route.createEditBySegment(nearestSegment);
  } else {
    route.abortEdit();
  }
};

const handleRouteEditing = (cameras, route, pixels) => {
  const newPoint = cameras.map.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.moveEdit(newPoint);
  if (!nearestControlPoint) {
    return false;
  }
  const nearestControlPixels = cameras.map.transformMetersToPixels(nearestControlPoint);
  route.markEditAsDeletable(calculateMapDistance(pixels, nearestControlPixels) < segmentSnapDistances);
  return true;
};

export default (layout, cameras, route, mapRenderer, routeRenderer) => {
  const state = {
    touchInterval: null
  };

  layout.mapContainer.onwheel = (event) => {
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.map.zoomIn(-amount) : cameras.map.zoomOut(amount);
    mapRenderer.render();
    routeRenderer.render();
  };
  layout.mapContainer.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    if (event.buttons === 1) {
      if (!handleRouteEditing(cameras, route, pixels)) {
        cameras.map.moveByPixels({ x: -event.movementX, y: -event.movementY });
      }
    }
    cameras.magnifier.setByMapPixels(pixels);

    proposeRouteEditPointOnMap(cameras, route, pixels);

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
    console.log(cameras.map.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
  }

  layout.profile.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    
    cameras.magnifier.setByProfilePixels(pixels);

    proposeRouteEditPointOnProfile(cameras, route, pixels);

    routeRenderer.render();
  };

  layout.profile.onclick = (event) => {
    console.log(cameras.profile.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
  }
};