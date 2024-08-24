const makeContinuousTangent = (previous, current, next) => {
  const distanceToPrevious = {
    x: previous.x - current.x,
    y: previous.y - current.y,
    z: previous.z - current.z,
  };
  const distanceToNext = {
    x: next.x - current.x,
    y: next.y - current.y,
    z: next.z - current.z
  };
  const factorToPrevious = Math.pow(
    distanceToPrevious.x * distanceToPrevious.x + distanceToPrevious.y * distanceToPrevious.y + distanceToPrevious.z * distanceToPrevious.z, 
    0.5
  );
  const factorToNext = Math.pow(
    distanceToNext.x * distanceToNext.x + distanceToNext.y * distanceToNext.y + distanceToNext.z * distanceToNext.z, 
    0.5
  );
  const factor = {
    x: (factorToNext * factorToNext * distanceToPrevious.x - factorToPrevious * factorToPrevious * distanceToNext.x),
    y: (factorToNext * factorToNext * distanceToPrevious.y - factorToPrevious * factorToPrevious * distanceToNext.y),
    z: (factorToNext * factorToNext * distanceToPrevious.z - factorToPrevious * factorToPrevious * distanceToNext.z)
  }
  const previousNormalizer = 2.75 * factorToNext * (factorToPrevious + factorToNext);
  const nextNormalizer = 2.75 * factorToPrevious * (factorToPrevious + factorToNext);
  return {
    previous: {
      x: current.x + (previousNormalizer && factor.x / previousNormalizer),
      y: current.y + (previousNormalizer && factor.y / previousNormalizer),
      z: current.z + (previousNormalizer && factor.z / previousNormalizer)
    },
    next: {
      x: current.x - (nextNormalizer && factor.x / nextNormalizer),
      y: current.y - (nextNormalizer && factor.y / nextNormalizer),
      z: current.z - (nextNormalizer && factor.z / nextNormalizer)
    }
  };
};

const createSplineEvaluator = (points) => {
  if (points.length < 3) {
    return (t) => ({
      x: (1 - t) * points[0].x + t * points[1].x,
      y: (1 - t) * points[0].y + t * points[1].y,
      z: (1 - t) * points[0].z + t * points[1].z
    });
  }
  const tangents = [];
  for (let i = 1; i < points.length - 1; i++) {
      tangents.push(makeContinuousTangent(points[i - 1], points[i], points[i + 1]));
  }

  return (t) => {
    const correctedT = Math.max(0, Math.min(points.length - 1, t));
    const previousIndex = Math.min(Math.floor(correctedT), points.length - 2);
    const remainder = correctedT - previousIndex;
    const inverseRemainder = 1 - remainder;

    const previousPoint = points[previousIndex];
    const currentPoint = points[previousIndex + 1];

    if (previousIndex === 0 || previousIndex === points.length - 2) {
      const tangentPoint = previousIndex === 0 ? tangents[previousIndex].previous : tangents[previousIndex - 1].next;
      const previousPointWeight = inverseRemainder * inverseRemainder;
      const tangentWeight = 2 * inverseRemainder * remainder;
      const currentPointWeight = remainder * remainder;
      return {
        x: previousPointWeight * previousPoint.x + tangentWeight * tangentPoint.x + currentPointWeight * currentPoint.x,
        y: previousPointWeight * previousPoint.y + tangentWeight * tangentPoint.y + currentPointWeight * currentPoint.y,
        z: previousPointWeight * previousPoint.z + tangentWeight * tangentPoint.z + currentPointWeight * currentPoint.z
      };
    } 

    const previousTangentPoint = tangents[previousIndex - 1].next;
    const nextTangentPoint = tangents[previousIndex].previous;
    const nextPoint = points[previousIndex + 1];

    const previousPointWeight = inverseRemainder * inverseRemainder * inverseRemainder;
    const previousTangentWeight = 3 * inverseRemainder * inverseRemainder * remainder;
    const nextTangentWeight = 3 * inverseRemainder * remainder * remainder;
    const nextPointWeight = remainder * remainder * remainder;

    return {
      x: previousPointWeight * previousPoint.x + 
        previousTangentWeight * previousTangentPoint.x + 
        nextTangentWeight * nextTangentPoint.x + 
        nextPointWeight * nextPoint.x,
      y: previousPointWeight * previousPoint.y + 
        previousTangentWeight * previousTangentPoint.y + 
        nextTangentWeight * nextTangentPoint.y + 
        nextPointWeight * nextPoint.y,
      z: previousPointWeight * previousPoint.z + 
        previousTangentWeight * previousTangentPoint.z + 
        nextTangentWeight * nextTangentPoint.z + 
        nextPointWeight * nextPoint.z
    };
  }
};

const measureSegment = (evaluateSpline, tStart, pointStart, tEnd, pointEnd, length) => {
  const tCenter = (tEnd + tStart) / 2.0;
  const pointCenter = evaluateSpline(tCenter);
  const firstSubSegmentLength = Math.sqrt((pointStart.x - pointCenter.x)**2 + (pointStart.y - pointCenter.y)**2 + (pointStart.z - pointCenter.z)**2);
  const secondSubSegmentLength = Math.sqrt((pointEnd.x - pointCenter.x)**2 + (pointEnd.y - pointCenter.y)**2 + (pointEnd.z - pointCenter.z)**2);
  const detailLength = firstSubSegmentLength + secondSubSegmentLength;
  if (length === undefined || Math.abs(detailLength - length) > 0.1) {
    const firstSubSegmentMeasurement = measureSegment(evaluateSpline, tStart, pointStart, tCenter, pointCenter, firstSubSegmentLength);
    const secondSubSegmentMeasurement = measureSegment(evaluateSpline, tCenter, pointCenter, tEnd, pointEnd, secondSubSegmentLength);
    return {
      length: firstSubSegmentMeasurement.length + secondSubSegmentMeasurement.length,
      flatLength: firstSubSegmentMeasurement.flatLength + secondSubSegmentMeasurement.flatLength
    };
  }
  return {
    length: detailLength,
    flatLength: Math.sqrt((pointStart.x - pointCenter.x)**2 + (pointStart.y - pointCenter.y)**2) +
                Math.sqrt((pointEnd.x - pointCenter.x)**2 + (pointEnd.y - pointCenter.y)**2)
  };
}

export default (points) => {
  const evaluateSpline = createSplineEvaluator(points);

  const segmentMeasurements = [{
    length: 0,
    flatLength: 0
  }];
  for (let i = 0; i < points.length - 1; i++) {
    const measurement = measureSegment(
      evaluateSpline, i, evaluateSpline(i), 
      i + 1, evaluateSpline(i + 1)
    );
    segmentMeasurements.push(measurement);
  }
  const measurement = segmentMeasurements.reduce((measurement, segmentMeasurement) => ({
    length: measurement.length + segmentMeasurement.length,
    flatLength: measurement.flatLength + segmentMeasurement.flatLength
  }), { length: 0, flatLength: 0 });

  return {
    length: measurement.length,
    flatLength: measurement.flatLength,
    getLengthAtPointIndex: (pointIndex) => {
      return segmentMeasurements.slice(0, pointIndex + 1).reduce((sum, measurement) => sum + measurement.length, 0);
    },
    getFlatLengthAtPointIndex: (pointIndex) => {
      return segmentMeasurements.slice(0, pointIndex + 1).reduce((sum, measurement) => sum + measurement.flatLength, 0);
    },
    getAtMeter: (meter) => {
      let totalSegmentLength = 0;
      let segmentIndex = 0;
      while (meter > totalSegmentLength + segmentMeasurements[segmentIndex + 1].length) {
        segmentIndex++;
        totalSegmentLength += segmentMeasurements[segmentIndex].length;
      }
  
      const segmentLength = segmentMeasurements[segmentIndex + 1].length;
      const remainingLength = meter - totalSegmentLength;
      const fraction = remainingLength / segmentLength;
      return evaluateSpline(segmentIndex + fraction);
    }
  };
};