import createCameras from './cameras/createCameras.js';
import createLayout from './createLayout.js';
import createMapRenderer from './map/createMapRenderer.js';
import createRoute from './route/createRoute.js';
import createRouteRenderer from './route/createRouteRenderer.js';
import loadMap from './map/loadMap.js';
import setupControl from './setupControl.js';

export default async (system, level) => {
    const layout = createLayout(system);
    const map = await loadMap(system, level);
    const route = createRoute(level, map);
    const cameras = createCameras(layout, map, route);
    const mapRenderer = createMapRenderer(system, layout, cameras, map);
    const routeRenderer = createRouteRenderer(system, layout, cameras, route);
    setupControl(layout, cameras, route, mapRenderer, routeRenderer);
};