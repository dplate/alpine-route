import handleRouteEditingOnProfile from './handleRouteEditingOnProfile.js';
import proposeRouteEditPoint from './proposeRouteEditPoint.js';

export default (cameras, route, routeRenderer, notesRenderer, pixels, touched) => {
  cameras.magnifier.setByProfilePixels(pixels);
  if (touched) {
    handleRouteEditingOnProfile(cameras, route, pixels);
  } else {
    proposeRouteEditPoint(
      cameras.profile, 
      route,
      pixels,
      (point) => route.findNearestEditableControlPointByProfileMeters(point),
      (point) => route.findNearestSegmentByProfileMeters(point)
    );
  }

  routeRenderer.render();
  notesRenderer.render();
};