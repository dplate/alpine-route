import createMagnifierCamera from './createMagnifierCamera.js';
import createMapCamera from './createMapCamera.js';
import createProfileCamera from './createProfileCamera.js';
import {
  HIGHLIGHT_MAX_GRADIENT_LIMIT,
  HIGHLIGHT_MAX_VARIANCE_LIMIT,
  HIGHLIGHT_MIN_GAP_LIMIT,
} from './highlightTypes.js';

export default (layout, map, route) => {
  const mapCamera = createMapCamera(layout, route, map);
  const profileCamera = createProfileCamera(layout, route, mapCamera);
  const magnifierCamera = createMagnifierCamera(
    layout,
    mapCamera,
    profileCamera,
  );

  const update = () => {
    mapCamera.update();
    profileCamera.update();
    magnifierCamera.update();
  };

  mapCamera.updateCameras = update;

  return {
    map: mapCamera,
    magnifier: magnifierCamera,
    profile: profileCamera,
    update,
    highlights: new Set([ HIGHLIGHT_MAX_GRADIENT_LIMIT ]),
  };
};
