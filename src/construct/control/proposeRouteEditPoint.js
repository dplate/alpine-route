import calculateMapDistance from '../map/calculateMapDistance.js';

const controlPointSnapDistance = 50;
const segmentSnapDistance = 20;

export default (
  camera,
  route,
  pixels,
  findNearestEditableControlPoint,
  findNearestSegment,
) => {
  const point = camera.transformPixelsToMeters(pixels);
  const nearestControlPoint = findNearestEditableControlPoint(point);
  if (nearestControlPoint) {
    const nearestControlPixels =
      camera.transformMetersToPixels(nearestControlPoint);
    if (
      calculateMapDistance(pixels, nearestControlPixels) <
      controlPointSnapDistance
    ) {
      route.createEditByControlPoint(nearestControlPoint);
      return nearestControlPixels;
    }
  }
  const nearestSegment = findNearestSegment(point);
  const nearestSegmentPixels = camera.transformMetersToPixels(nearestSegment);
  if (
    calculateMapDistance(pixels, nearestSegmentPixels) < segmentSnapDistance
  ) {
    route.createEditBySegment(nearestSegment);
    return nearestSegmentPixels;
  }
  route.abortEdit();
  return null;
};
