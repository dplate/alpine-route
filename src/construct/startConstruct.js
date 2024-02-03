import createCameras from './createCameras.js';
import createLayout from './createLayout.js';
import createMapRenderer from './createMapRenderer.js';
import createRoute from './createRoute.js';
import createRouteRenderer from './createRouteRenderer.js';
import loadMap from './loadMap.js';
import setupControl from './setupControl.js';

export default async (system, level) => {
    const layout = createLayout(system);
    const map = await loadMap(system, level);
    const route = createRoute(level, map);
    const cameras = createCameras(layout, map);
    const mapRenderer = createMapRenderer(system, layout, cameras, map);
    const routeRenderer = createRouteRenderer(system, layout, cameras, route);
    setupControl(layout, cameras, route, mapRenderer, routeRenderer);
};