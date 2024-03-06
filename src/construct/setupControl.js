import calculateMapDistance from './map/calculateMapDistance.js';

const controlPointSnapDistance = 50;
const segmentSnapDistances = 20;
const heightSnapDistance = 20;

const proposeRouteEditPoint = (camera, route, pixels, findNearestEditableControlPoint, findNearestSegment) => {
  const point = camera.transformPixelsToMeters(pixels);
  const nearestControlPoint = findNearestEditableControlPoint(point);
  if (nearestControlPoint) {
    const nearestControlPixels = camera.transformMetersToPixels(nearestControlPoint);
    if (calculateMapDistance(pixels, nearestControlPixels) < controlPointSnapDistance) {
      route.createEditByControlPoint(nearestControlPoint);
      return;
    }
  }
  const nearestSegment = findNearestSegment(point);
  const nearestSegmentPixels = camera.transformMetersToPixels(nearestSegment);
  if (calculateMapDistance(pixels, nearestSegmentPixels) < segmentSnapDistances) {
    route.createEditBySegment(nearestSegment);
  } else {
    route.abortEdit();
  }
};

const handleRouteEditingOnMap = (cameras, route, pixels) => {
  const newPoint = cameras.map.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.moveEdit(newPoint);
  if (!nearestControlPoint) {
    return false;
  }
  const nearestControlPixels = cameras.map.transformMetersToPixels(nearestControlPoint);
  route.markEditAsDeletable(calculateMapDistance(pixels, nearestControlPixels) < segmentSnapDistances);
  return true;
};

const handleRouteEditingOnProfile = (cameras, route, pixels) => {
  const snapHeight = cameras.profile.transformPixelDistanceToHeightDifference(heightSnapDistance);
  const newPoint = cameras.profile.transformPixelsToMeters(pixels);
  route.elevateEdit(newPoint, snapHeight);
};

export default (layout, cameras, route, mapRenderer, routeRenderer) => {
  const state = {
    touchInterval: null
  };

  const startEditing = (createOnGround) => {
    clearInterval(state.touchInterval);
    state.touchInterval = setInterval(() => {
      if (route.activateEdit(createOnGround)) {
        routeRenderer.render();
      }
    }, 20);
  };

  const stopEditing = () => {
    clearInterval(state.touchInterval);
    route.confirmEdit();
    cameras.update();
    routeRenderer.render();
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
      if (!handleRouteEditingOnMap(cameras, route, pixels)) {
        cameras.map.moveByPixels({ x: -event.movementX, y: -event.movementY });
      }
    }
    cameras.magnifier.setByMapPixels(pixels);

    proposeRouteEditPoint(
      cameras.map, 
      route,
      pixels,
      (point) => route.findNearestEditableControlPointByMapMeters(point),
      (point) => route.findNearestSegmentByMapMeters(point)
    );

    mapRenderer.render();
    routeRenderer.render();
  };
  layout.mapContainer.onmousedown = () => startEditing(true);
  layout.mapContainer.onmouseup = stopEditing;
  layout.mapContainer.onclick = (event) => {
    console.log(cameras.map.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
  }

  layout.profile.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    if (event.buttons === 1) {
      handleRouteEditingOnProfile(cameras, route, pixels);
    }
    
    cameras.magnifier.setByProfilePixels(pixels);

    proposeRouteEditPoint(
      cameras.profile, 
      route,
      pixels,
      (point) => route.findNearestEditableControlPointByProfileMeters(point),
      (point) => route.findNearestSegmentByProfileMeters(point)
    );

    routeRenderer.render();
  };

  layout.profile.onmousedown =  () => startEditing(false);
  layout.profile.onmouseup = stopEditing;

  layout.profile.onclick = (event) => {
    console.log(cameras.profile.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
  }
};