import calculateVariance from './calculateVariance.js';
import drawSection from './drawSection.js';
import {
  LIMIT_TYPES,
  LIMIT_TYPES_TO_HIGHLIGHTS,
  LIMIT_TYPE_MAX_GRADIENT,
  LIMIT_TYPE_MAX_VARIANCE,
  LIMIT_TYPE_MIN_RADIUS,
  LIMIT_TYPE_MIN_GAP,
} from './limitTypes.js';
import {
  ROUTE_TYPES,
  ROUTE_TYPES_TO_HIGHLIGHTS,
  ROUTE_TYPE_GROUND,
} from './routeTypes.js';

const neutralColor = 'rgba(200, 200, 255, 1.0)';
const impossibleColor = 'red';

const convertNormalizedToColor = (normalized, coloredLimits) => {
  if (normalized === null) {
    return neutralColor;
  }
  if (normalized > 1.0) {
    return impossibleColor;
  }
  if (coloredLimits) {
    const green = Math.round(
      255.0 * Math.max(0.0, Math.min(1.0 - normalized, 1.0)),
    );
    return `rgba(0, ${green}, 255, 1.0)`;
  } else {
    const red = Math.round(
      255.0 * Math.max(0.0, Math.min(normalized * 2.0, 1.0)),
    );
    const green = Math.round(
      255.0 * Math.max(0.0, Math.min((1.0 - normalized) * 2.0, 1.0)),
    );
    return `rgba(${red}, ${green}, 0, 1.0)`;
  }
};

const mergeNormalized = (normalized1, normalized2) => {
  if (normalized1 === null) {
    return normalized2;
  }
  if (normalized2 === null) {
    return normalized1;
  }
  return Math.max(normalized1, normalized2);
};

const getNormalizedForLimit = (level, route, segment, highlightType) => {
  const limitType = LIMIT_TYPES.find(
    (limitType) => highlightType === LIMIT_TYPES_TO_HIGHLIGHTS[limitType],
  );
  if (!segment.limits[limitType]) {
    return 1.1;
  }
  if (level.limits[limitType] === null) {
    return null;
  }
  switch (limitType) {
    case LIMIT_TYPE_MIN_RADIUS:
      return (
        1.0 -
        (segment.radius - level.limits[limitType]) /
          (2 * level.limits[limitType])
      );
    case LIMIT_TYPE_MAX_GRADIENT:
      return (
        (Math.abs(segment.gradient) - 0.5 * level.limits[limitType]) /
        (0.5 * level.limits[limitType])
      );
    case LIMIT_TYPE_MAX_VARIANCE:
      return calculateVariance(route, segment) / level.limits[limitType];
    case LIMIT_TYPE_MIN_GAP:
      return (
        1.0 -
        (segment.gap - level.limits[limitType]) / (2 * level.limits[limitType])
      );
    default:
      return null;
  }
};

const getNormalizedForLimits = (level, route, segment, highlights) => {
  return highlights.values().reduce((normalized, highlightType) => {
    return mergeNormalized(
      normalized,
      getNormalizedForLimit(level, route, segment, highlightType),
    );
  }, null);
};

const getNormalizedForCosts = (route, segment, highlights) => {
  if (!highlights.has(ROUTE_TYPES_TO_HIGHLIGHTS[segment.type])) {
    return null;
  }
  const highlightCosts = ROUTE_TYPES.reduce(
    (highlightCosts, routeType) => {
      if (highlights.has(ROUTE_TYPES_TO_HIGHLIGHTS[routeType])) {
        return {
          min: Math.min(highlightCosts.min, route.costs[routeType].min),
          max: Math.max(highlightCosts.max, route.costs[routeType].max),
        };
      }
      return highlightCosts;
    },
    {
      min: Number.MAX_VALUE,
      max: 0,
    },
  );

  if (highlightCosts.max === highlightCosts.min) {
    return 1.0;
  }

  return (
    (segment.costs - highlightCosts.min) /
    (highlightCosts.max - highlightCosts.min)
  );
};

const getColorForSegment = (level, route, segment, highlights) => {
  const coloredLimits = LIMIT_TYPES.some((limitType) =>
    highlights.has(LIMIT_TYPES_TO_HIGHLIGHTS[limitType]),
  );
  const normalized = coloredLimits
    ? getNormalizedForLimits(level, route, segment, highlights)
    : getNormalizedForCosts(route, segment, highlights);
  return convertNormalizedToColor(normalized, coloredLimits);
};

export default (context, level, route, renderTarget, highlights) => {
  const section = {
    visible: false,
    type: null,
    corners: [],
  };
  route.segments.forEach((segment, index) => {
    const pixels = renderTarget.camera.transformMetersToPixels(segment);
    const visible =
      pixels.x >= 0 &&
      pixels.x < renderTarget.canvas.width &&
      pixels.y >= 0 &&
      pixels.y < renderTarget.canvas.height;
    const corner = {
      pixels,
      visible,
      color: getColorForSegment(level, route, segment, highlights),
    };
    section.type = section.type || segment.type;
    section.corners.push(corner);
    section.visible = section.visible || visible;

    const nextType = route.segments[index + 1]?.type;
    if (
      index >= route.segments.length - 1 ||
      (segment.type === ROUTE_TYPE_GROUND && nextType !== ROUTE_TYPE_GROUND) ||
      segment.type !== section.type
    ) {
      drawSection(context, section);

      section.visible = visible;
      section.type =
        (segment.type === ROUTE_TYPE_GROUND && nextType) || segment.type;
      section.corners = [corner];
    }
  });
};
