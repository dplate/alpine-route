import createSpline from './createSpline.js';

export default (level) => {
  const route = {
    controlPoints: [
      {
        x: level.start.x,
        y: level.start.y
      },
      {
        x: level.start.x,
        y: level.end.y
      },
      {
        x: level.end.x,
        y: level.end.y
      }
    ],
    segments: [],
  };

  const updateSegments = () => {
    route.segments = [];
    const spline = createSpline(route.controlPoints);
    for (let meter = 0; meter < spline.length; meter += 5) {
      route.segments.push({
        ...spline.getAtMeter(meter)
      });
    }
  };
  updateSegments();

  return {
    ...route,
    updateSegments
  };
};