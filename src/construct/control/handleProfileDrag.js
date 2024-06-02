import handleRouteEditingOnProfile from './handleRouteEditingOnProfile.js';
import proposeRouteEditPoint from './proposeRouteEditPoint.js';

export default (cameras, route, renderer, pixels, touched) => {
  if (touched) {
    handleRouteEditingOnProfile(cameras, route, pixels);
    cameras.magnifier.disable();
  } else {
    const editPointPixels = proposeRouteEditPoint(
      cameras.profile, 
      route,
      pixels,
      (point) => route.findNearestEditableControlPointByProfileMeters(point),
      (point) => route.findNearestSegmentByProfileMeters(point)
    );
    if (editPointPixels) {
      cameras.magnifier.setByProfilePixels(editPointPixels);
    } else {
      cameras.magnifier.disable();
    }
  }

  renderer.renderAll();
};