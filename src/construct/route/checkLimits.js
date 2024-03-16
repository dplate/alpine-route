import calculateVariance from './calculateVariance.js';
import { LIMIT_TYPE_MAX_GRADIENT, LIMIT_TYPE_MAX_VARIANCE, LIMIT_TYPE_MIN_RADIUS } from './limitTypes.js';

export default (route, level) => {
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
      value: route.gradient.max - route.gradient.min,
      valid: route.gradient.max - route.gradient.min <= level.limits[LIMIT_TYPE_MAX_VARIANCE]
    },
  };
  route.segments.forEach((segment) => {
    segment.limits = {
      [LIMIT_TYPE_MIN_RADIUS]: segment.radius >= level.limits[LIMIT_TYPE_MIN_RADIUS],
      [LIMIT_TYPE_MAX_GRADIENT]: Math.abs(segment.gradient) <= level.limits[LIMIT_TYPE_MAX_GRADIENT],
      [LIMIT_TYPE_MAX_VARIANCE]: calculateVariance(route, segment) <= level.limits[LIMIT_TYPE_MAX_VARIANCE]
    };
    
    route.limits[LIMIT_TYPE_MIN_RADIUS].value = Math.min(route.limits[LIMIT_TYPE_MIN_RADIUS].value, segment.radius);
    route.limits[LIMIT_TYPE_MIN_RADIUS].valid = route.limits[LIMIT_TYPE_MIN_RADIUS].valid && segment.limits[LIMIT_TYPE_MIN_RADIUS];

    route.limits[LIMIT_TYPE_MAX_GRADIENT].value = Math.max(route.limits[LIMIT_TYPE_MAX_GRADIENT].value, Math.abs(segment.gradient));
    route.limits[LIMIT_TYPE_MAX_GRADIENT].valid = route.limits[LIMIT_TYPE_MAX_GRADIENT].valid && segment.limits[LIMIT_TYPE_MAX_GRADIENT];
  });

}