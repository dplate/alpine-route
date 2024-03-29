import calculateVariance from './calculateVariance.js';
import { LIMIT_TYPE_MAX_GRADIENT, LIMIT_TYPE_MAX_VARIANCE, LIMIT_TYPE_MIN_RADIUS, LIMIT_TYPE_MIN_GAP } from './limitTypes.js';

export default (route, level) => {
  const varianceValue = Math.max(route.gradient.mean - route.gradient.min, route.gradient.max - route.gradient.mean);
  route.limits = {
    [LIMIT_TYPE_MIN_RADIUS]: {
      value: Number.MAX_VALUE,
      valid: true
    },
    [LIMIT_TYPE_MAX_GRADIENT]: {
      value: 0,
      valid: true
    },
    [LIMIT_TYPE_MAX_VARIANCE]: {
      value: varianceValue,
      valid: varianceValue <= level.limits[LIMIT_TYPE_MAX_VARIANCE]
    },
    [LIMIT_TYPE_MIN_GAP]: {
      value: Number.MAX_VALUE,
      valid: true
    },
  };
  route.segments.forEach((segment) => {
    segment.limits = {
      [LIMIT_TYPE_MIN_RADIUS]: segment.radius >= level.limits[LIMIT_TYPE_MIN_RADIUS],
      [LIMIT_TYPE_MAX_GRADIENT]: Math.abs(segment.gradient) <= level.limits[LIMIT_TYPE_MAX_GRADIENT],
      [LIMIT_TYPE_MAX_VARIANCE]: calculateVariance(route, segment) <= level.limits[LIMIT_TYPE_MAX_VARIANCE],
      [LIMIT_TYPE_MIN_GAP]: segment.gap >= level.limits[LIMIT_TYPE_MIN_GAP],
    };
    
    route.limits[LIMIT_TYPE_MIN_RADIUS].value = Math.min(route.limits[LIMIT_TYPE_MIN_RADIUS].value, segment.radius);
    route.limits[LIMIT_TYPE_MIN_RADIUS].valid = route.limits[LIMIT_TYPE_MIN_RADIUS].valid && segment.limits[LIMIT_TYPE_MIN_RADIUS];

    route.limits[LIMIT_TYPE_MAX_GRADIENT].value = Math.max(route.limits[LIMIT_TYPE_MAX_GRADIENT].value, Math.abs(segment.gradient));
    route.limits[LIMIT_TYPE_MAX_GRADIENT].valid = route.limits[LIMIT_TYPE_MAX_GRADIENT].valid && segment.limits[LIMIT_TYPE_MAX_GRADIENT];

    route.limits[LIMIT_TYPE_MIN_GAP].value = Math.min(route.limits[LIMIT_TYPE_MIN_GAP].value, segment.gap);
    route.limits[LIMIT_TYPE_MIN_GAP].valid = route.limits[LIMIT_TYPE_MIN_GAP].valid && segment.limits[LIMIT_TYPE_MIN_GAP];
  });

}