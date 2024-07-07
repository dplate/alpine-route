import createCameras from './cameras/createCameras.js';
import createConstructLayout from './createConstructLayout.js';
import createRoute from './route/createRoute.js';
import loadMap from './map/loadMap.js';
import setupConstructControl from './control/setupConstructControl.js';
import createRenderer from './createRenderer.js';

export default async (system, level) => {
  const layout = createConstructLayout(system, level);
  const map = await loadMap(system, level);
  const route = createRoute(system, level, map);
  const cameras = createCameras(layout, map, route);
  const renderer = createRenderer(system, level, layout, cameras, map, route);
  await setupConstructControl(layout, cameras, route, renderer);
};