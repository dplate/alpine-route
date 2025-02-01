import { LIMIT_TYPE_MIN_RADIUS } from './limitTypes.js';

const calculateCenter = (previous, middle, next) => {
  const ab = {
    x: next.x - previous.x,
    y: next.y - previous.y,
  };
  const ac = {
    x: middle.x - previous.x,
    y: middle.y - previous.y,
  };

  const coefficient = (ab.x * ac.x + ab.y * ac.y) / (ab.x ** 2 + ab.y ** 2);
  const d = {
    x: previous.x + ab.x * coefficient,
    y: previous.y + ab.y * coefficient,
  };

  const cdLength = Math.sqrt((d.x - middle.x) ** 2 + (d.y - middle.y) ** 2);
  const scale = middle.radius / cdLength;

  return {
    x: middle.x + (d.x - middle.x) * scale,
    y: middle.y + (d.y - middle.y) * scale,
  };
};

export default (context, level, route, renderTarget) => {
  if (route.limits[LIMIT_TYPE_MIN_RADIUS].valid) {
    return;
  }

  context.lineWidth = 3;
  context.strokeStyle = 'red';
  context.setLineDash([]);
  context.beginPath();

  route.segments.forEach((segment, index) => {
    if (
      index >= 2 &&
      index < route.segments.length - 2 &&
      level.limits[LIMIT_TYPE_MIN_RADIUS] > segment.radius
    ) {
      const center = calculateCenter(
        route.segments[index - 2],
        segment,
        route.segments[index + 2],
      );
      const centerPixels = renderTarget.camera.transformMetersToPixels(center);
      const pixels = renderTarget.camera.transformMetersToPixels(segment);

      context.moveTo(pixels.x, pixels.y);
      context.lineTo(centerPixels.x, centerPixels.y);
    }
  });

  context.stroke();
};
