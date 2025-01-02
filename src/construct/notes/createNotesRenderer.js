import {
  LIMIT_TYPES,
  LIMIT_TYPES_TO_HIGHLIGHTS,
  LIMIT_TYPES_TO_LABEL,
  LIMIT_TYPE_MAX_GRADIENT,
  LIMIT_TYPE_MAX_VARIANCE,
  LIMIT_TYPE_MIN_RADIUS,
  LIMIT_TYPE_MIN_GAP,
} from '../route/limitTypes.js';
import {
  ROUTE_TYPES,
  ROUTE_TYPES_TO_HIGHLIGHTS,
  ROUTE_TYPES_TO_COSTS_LABEL,
} from '../route/routeTypes.js';

const successColor = '#5bb798';
const failColor = '#e66d3d';

const formatPercent = (value) => {
  if (value < 10) {
    return `${Math.round(value * 10)}‰`;
  }
  return `${Math.round(value)}%`;
};

export default (system, level, layout, cameras, route) => {
  layout.budget.label.textContent = system.text.get('BUDGET_LABEL');
  ROUTE_TYPES.forEach((routeType) => {
    layout.routeTypeCosts[routeType].label.textContent = system.text.get(
      ROUTE_TYPES_TO_COSTS_LABEL[routeType],
    );
  });
  layout.balance.label.textContent = system.text.get('BALANCE_LABEL');

  LIMIT_TYPES.forEach((limitType) => {
    if (level.limits[limitType] !== null) {
      layout.limits[limitType].label.textContent = system.text.get(
        LIMIT_TYPES_TO_LABEL[limitType],
      );
    }
  });

  const formatLimitValue = (limitType) => {
    switch (limitType) {
      case LIMIT_TYPE_MIN_RADIUS:
        return `${route.limits[limitType].value < 1000 ? Math.round(route.limits[limitType].value) + 'm' : '∞'} > ${level.limits[limitType]}m`;
      case LIMIT_TYPE_MAX_VARIANCE:
        return `Δ${formatPercent(route.limits[limitType].value)} < ${formatPercent(level.limits[limitType])}`;
      case LIMIT_TYPE_MAX_GRADIENT:
        return `${formatPercent(route.limits[limitType].value)} < ${formatPercent(level.limits[limitType])}`;
      case LIMIT_TYPE_MIN_GAP:
        return `${route.limits[limitType].value < 100 ? Math.round(route.limits[limitType].value) + 'm' : '∞'} > ${level.limits[limitType]}m`;
      default:
        return '?';
    }
  };

  const getSelectorOpacity = (highlightType) => {
    return cameras.highlights.has(highlightType) ? 1.0 : 0.5;
  };

  const render = () => {
    layout.budget.value.textContent = system.text.formatCurrency(level.budget);
    ROUTE_TYPES.forEach((routeType) => {
      layout.routeTypeCosts[routeType].value.textContent =
        '-' + system.text.formatCurrency(route.costs[routeType].sum);
      layout.routeTypeCosts[routeType].selector.style.opacity =
        getSelectorOpacity(ROUTE_TYPES_TO_HIGHLIGHTS[routeType]);
    });
    layout.balance.value.textContent = system.text.formatCurrency(
      level.budget - route.costs.total.sum,
    );
    const inBudget = level.budget >= route.costs.total.sum;
    layout.balance.value.style.color = inBudget ? successColor : failColor;

    let limitsValid = true;
    LIMIT_TYPES.forEach((limitType) => {
      if (level.limits[limitType] !== null) {
        layout.limits[limitType].value.textContent =
          formatLimitValue(limitType);
        const valid = route.limits[limitType].valid;
        layout.limits[limitType].value.style.color = valid
          ? successColor
          : failColor;
        layout.limits[limitType].selector.style.opacity = getSelectorOpacity(
          LIMIT_TYPES_TO_HIGHLIGHTS[limitType],
        );
        limitsValid = limitsValid && valid;
      }
    });

    if (limitsValid) {
      layout.notesToggle.style.borderColor = successColor;
      layout.endButton.style.backgroundColor = successColor;
      layout.endButton.textContent = system.text.get('END_BUTTON_FINISH');
    } else {
      layout.notesToggle.style.borderColor = failColor;
      layout.endButton.style.backgroundColor = failColor;
      layout.endButton.textContent = system.text.get('END_BUTTON_SUSPEND');
    }
  };

  return {
    render,
  };
};
