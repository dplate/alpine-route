import createCameras from './createCameras.js';
import createLayout from './createLayout.js';
import createMapRenderer from './createMapRenderer.js';
import setupControl from './setupControl.js';

export default async (system, level) => {
    const layout = createLayout(system);
    const cameras = createCameras(layout);
    const mapRenderer = await createMapRenderer(system, layout, cameras, level);
    setupControl(layout, cameras, mapRenderer);
};