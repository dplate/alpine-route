import handleRouteEditingOnProfile from './handleRouteEditingOnProfile.js';
import proposeRouteEditPoint from './proposeRouteEditPoint.js';

export default (cameras, route, renderer, pixels, touched) => {
  cameras.magnifier.setByProfilePixels(pixels);
  if (touched) {
    handleRouteEditingOnProfile(cameras, route, pixels);
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
    }
  }

  renderer.renderAll();
};