export default (route, segment) => {
  return Math.abs(segment.gradient - route.gradient.mean);
};