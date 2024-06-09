import createMagnifierCamera from './createMagnifierCamera.js';
import createMapCamera from './createMapCamera.js';
import createProfileCamera from './createProfileCamera.js';
import {LIMIT_HIGHLIGHTS} from './highlightTypes.js';

export default (layout, map, route) => {
  const mapCamera = createMapCamera(layout, route, map);
  const profileCamera = createProfileCamera(layout, route, mapCamera);
  const magnifierCamera = createMagnifierCamera(layout, mapCamera, profileCamera);
  
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
    highlights: new Set(LIMIT_HIGHLIGHTS)
  };
};