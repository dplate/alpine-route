const catmullRomSpline = (points, t) => {
  const i = Math.floor(t);
  if (i + 3 > points.length - 1) {
    return points[points.length - 2];
  }

  const p0 = points[i];
  const p1 = points[i + 1];
  const p2 = points[i + 2];
  const p3 = points[i + 3];

  const remainder = t - i;

  const q0 = (-1 * remainder ** 3) + (2 * remainder ** 2) + (-1 * remainder);
  const q1 = (3 * remainder ** 3) + (-5 * remainder ** 2) + 2;
  const q2 = (-3 * remainder ** 3) + (4 * remainder ** 2) + remainder;
  const q3 = remainder ** 3 - remainder ** 2;

  return {
    x: 0.5 * ((p0.x * q0) + (p1.x * q1) + (p2.x * q2) + (p3.x * q3)),
    y: 0.5 * ((p0.y * q0) + (p1.y * q1) + (p2.y * q2) + (p3.y * q3))
  };
}

const measureSegment = (points, min, max) => {
  const detailPoints = [];
  for (let t = min; t <= max; t += 0.001) {
    detailPoints.push(catmullRomSpline(points, t));
  }

  let length = 0;
  let lastPoint = detailPoints[0];
  for (let i = 1; i < detailPoints.length; i++){
    const currentPoint = detailPoints[i];
    length += Math.sqrt((currentPoint.x - lastPoint.x)**2 + (currentPoint.y - lastPoint.y)**2);
    lastPoint = currentPoint;
  }
  return length;
};

export default (controlPoints) => {
  const points = [
    controlPoints[0],
    ...controlPoints,
    controlPoints[controlPoints.length - 1]
  ];

  const segmentLengths = [0];
  for (let i = 0; i < points.length - 2; i++){
    segmentLengths.push(measureSegment(points, i, i + 1));
  }
  const length = segmentLengths.reduce((sum, l) => sum + l, 0);

  return {
    length,
    getAtMeter: (meter) => {
      let totalSegmentLength = 0;
      let segmentIndex = 0;
      while (meter > totalSegmentLength + segmentLengths[segmentIndex + 1]) {
        segmentIndex++;
        totalSegmentLength += segmentLengths[segmentIndex];
      }
  
      const segmentLength = segmentLengths[segmentIndex + 1];
      const remainingLength = meter - totalSegmentLength;
      const fraction = remainingLength / segmentLength;
      return catmullRomSpline(points, segmentIndex + fraction);
    }
  };
};