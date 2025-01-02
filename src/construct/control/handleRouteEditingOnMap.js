import calculateMapDistance from '../map/calculateMapDistance.js';

const segmentSnapDistance = 20;

export default (cameras, route, pixels) => {
  const newPoint = cameras.map.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.moveEdit(newPoint);
  if (!nearestControlPoint) {
    return false;
  }
  const nearestControlPixels =
    cameras.map.transformMetersToPixels(nearestControlPoint);
  route.markEditAsDeletable(
    calculateMapDistance(pixels, nearestControlPixels) < segmentSnapDistance,
  );
  return true;
};
