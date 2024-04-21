import createMapRenderer from './map/createMapRenderer.js';
import createRouteRenderer from './route/createRouteRenderer.js';
import createNotesRenderer from './notes/createNotesRenderer.js';
import createLabelRenderer from './map/createLabelRenderer.js';

export default (system, level, layout, cameras, map, route) => {
  const labelRenderer = createLabelRenderer(map);

  const renderer = {
    map: createMapRenderer(system, layout, cameras, map),
    route: createRouteRenderer(system, level, layout, cameras, route, labelRenderer),
    notes: createNotesRenderer(system, level, layout, cameras, route),
  };

  renderer.renderAll = () => {
    renderer.map.render();
    renderer.route.render();
    renderer.notes.render();
  };
  
  return renderer;
}