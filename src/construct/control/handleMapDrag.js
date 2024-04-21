import handleRouteEditingOnMap from './handleRouteEditingOnMap.js';
import proposeRouteEditPoint from './proposeRouteEditPoint.js';

export default (cameras, route, renderer, pixels, movementPixels, touched) => {
  cameras.magnifier.setByMapPixels(pixels);
  if (touched && !handleRouteEditingOnMap(cameras, route, pixels)) {
    cameras.map.moveByPixels(movementPixels);
    cameras.update();
  } else {
    proposeRouteEditPoint(
      cameras.map, 
      route,
      pixels,
      (point) => route.findNearestEditableControlPointByMapMeters(point),
      (point) => route.findNearestSegmentByMapMeters(point)
    );
  }

  renderer.renderAll();
};