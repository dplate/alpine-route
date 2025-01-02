import createCameras from './cameras/createCameras.js';
import createConstructLayout from './createConstructLayout.js';
import createRoute from './route/createRoute.js';
import loadMap from './map/loadMap.js';
import setupConstructControl from './control/setupConstructControl.js';
import createRenderer from './createRenderer.js';
import setupHelper from './helper/setupHelper.js';

export default async (system, level) => {
  const layout = createConstructLayout(system, level);
  setupHelper(system, level, layout);
  const map = await loadMap(system, level);
  const route = createRoute(system, level, map);
  const cameras = createCameras(layout, map, route);
  const renderer = createRenderer(system, level, layout, cameras, map, route);
  layout.desk.classList.remove('loading');
  await setupConstructControl(layout, cameras, route, renderer);
};
