import { LIMIT_TYPE_MIN_RADIUS } from './limitTypes.js';

export default (route, level) => {
  route.limits = {
    [LIMIT_TYPE_MIN_RADIUS]: {
      value: Number.MAX_VALUE,
      valid: true
    },
  };
  route.segments.forEach((segment) => {
    segment.limits = {
      [LIMIT_TYPE_MIN_RADIUS]: segment.radius > level.limits[LIMIT_TYPE_MIN_RADIUS]
    };
    route.limits[LIMIT_TYPE_MIN_RADIUS].value = Math.min(route.limits[LIMIT_TYPE_MIN_RADIUS].value, segment.radius);
    route.limits[LIMIT_TYPE_MIN_RADIUS].valid = route.limits[LIMIT_TYPE_MIN_RADIUS].valid && segment.limits[LIMIT_TYPE_MIN_RADIUS];
  });

}