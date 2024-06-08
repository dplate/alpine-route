const heightSnapDistance = 10;

export default (cameras, route, pixels) => {
  const snapHeight = cameras.profile.transformPixelDistanceToHeightDifference(heightSnapDistance);
  const newPoint = cameras.profile.transformPixelsToMeters(pixels);
  return Boolean(route.elevateEdit(newPoint, snapHeight));
};