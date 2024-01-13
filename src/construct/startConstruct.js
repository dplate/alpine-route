import createLayout from './createLayout.js';
import createMapRenderer from './createMapRenderer.js';
import setupControl from './setupControl.js';

export default async (system, level) => {
    const layout = createLayout(system);
    const mapRenderer = await createMapRenderer(system, layout, level);
    window.mapRenderer = mapRenderer;
    setupControl(layout, mapRenderer);
};