import createCameras from './cameras/createCameras.js';
import createLayout from './createLayout.js';
import createRoute from './route/createRoute.js';
import loadMap from './map/loadMap.js';
import setupControl from './control/setupControl.js';
import createRenderer from './createRenderer.js';

export default async (system, level) => {
  const layout = createLayout(system);
  const map = await loadMap(system, level);
  const route = createRoute(level, map);
  const cameras = createCameras(layout, map, route);
  const renderer = createRenderer(system, level, layout, cameras, map, route);
  setupControl(layout, cameras, route, renderer);
};