import { HIGHLIGHT_COSTS } from '../cameras/highlightTypes.js';
import { ROUTE_TYPES, ROUTE_TYPES_TO_HIGHLIGHTS, ROUTE_TYPES_TO_COSTS_LABEL } from '../route/routeTypes.js';

export default (system, layout, cameras, route) => {
  ROUTE_TYPES.forEach(routeType => {
    layout.routeTypeCosts[routeType].label.textContent = system.text.get(ROUTE_TYPES_TO_COSTS_LABEL[routeType]);
  });
  layout.totalCosts.label.textContent = system.text.get('COSTS_LABEL');

  const render = () => {
    ROUTE_TYPES.forEach(routeType => {
      layout.routeTypeCosts[routeType].costs.textContent = system.text.formatCurrency(route.costs[routeType].sum);
      layout.routeTypeCosts[routeType].selector.style.opacity = 
        cameras.highlight === ROUTE_TYPES_TO_HIGHLIGHTS[routeType] ? 1.0 : 0.5;
    });

    layout.totalCosts.costs.textContent = system.text.formatCurrency(route.costs.total.sum);
    layout.totalCosts.selector.style.opacity = cameras.highlight === HIGHLIGHT_COSTS ? 1.0 : 0.5;
  };

  return {
    render
  };
};