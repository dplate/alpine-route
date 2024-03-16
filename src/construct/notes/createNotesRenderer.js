import { HIGHLIGHT_COSTS } from '../cameras/highlightTypes.js';
import { LIMIT_TYPES, LIMIT_TYPES_TO_HIGHLIGHTS, LIMIT_TYPES_TO_LABEL, LIMIT_TYPE_MAX_GRADIENT, LIMIT_TYPE_MIN_RADIUS } from '../route/limitTypes.js';
import { ROUTE_TYPES, ROUTE_TYPES_TO_HIGHLIGHTS, ROUTE_TYPES_TO_COSTS_LABEL } from '../route/routeTypes.js';

export default (system, level, layout, cameras, route) => {
  ROUTE_TYPES.forEach(routeType => {
    layout.routeTypeCosts[routeType].label.textContent = system.text.get(ROUTE_TYPES_TO_COSTS_LABEL[routeType]);
  });
  layout.totalCosts.label.textContent = system.text.get('COSTS_LABEL');

  LIMIT_TYPES.forEach(limitType => {
    layout.limits[limitType].label.textContent = system.text.get(LIMIT_TYPES_TO_LABEL[limitType]);
  });

  const formatLimitValue = (limitType) => {
    switch(limitType) {
      case LIMIT_TYPE_MIN_RADIUS:
        return `${route.limits[limitType].value < 1000 ? Math.round(route.limits[limitType].value) + 'm' : '∞'} > ${level.limits[limitType]}m`;
      case LIMIT_TYPE_MAX_GRADIENT:
        return `${Math.round(route.limits[limitType].value)}% < ${level.limits[limitType]}%`;
      default:
        return '?'  
    }
  };

  const getSelectorOpacity = (highlightType) => {
    return cameras.highlight === highlightType ? 1.0 : 0.5;
  };

  const render = () => {
    ROUTE_TYPES.forEach(routeType => {
      layout.routeTypeCosts[routeType].value.textContent = system.text.formatCurrency(route.costs[routeType].sum);
      layout.routeTypeCosts[routeType].selector.style.opacity = getSelectorOpacity(ROUTE_TYPES_TO_HIGHLIGHTS[routeType]);
    });

    layout.totalCosts.value.textContent = system.text.formatCurrency(route.costs.total.sum);
    layout.totalCosts.selector.style.opacity = getSelectorOpacity(HIGHLIGHT_COSTS);

    LIMIT_TYPES.forEach(limitType => {
      layout.limits[limitType].value.textContent = formatLimitValue(limitType);
      layout.limits[limitType].value.style.color = route.limits[limitType].valid ? 'rgba(0, 150, 0, 1.0)' : 'rgba(255, 0, 0, 1.0)';
      layout.limits[limitType].selector.style.opacity = getSelectorOpacity(LIMIT_TYPES_TO_HIGHLIGHTS[limitType]);
    });
  };

  return {
    render
  };
};