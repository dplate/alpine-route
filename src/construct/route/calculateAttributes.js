import calculateMapDistance from '../map/calculateMapDistance.js';

const minOverlappingDistance = 10;

const calculateRadius = (current, previous, next) => {
  const diffPrevious = {
    x: previous.x - current.x,
    y: previous.y - current.y
  };
  const diffNext = {
    x: next.x - current.x,
    y: next.y - current.y
  };
  const denominator = 2 * ( 
    diffPrevious.x * diffNext.y - diffNext.x * diffPrevious.y
  );
  if (!denominator) {
    return Number.MAX_VALUE;
  }
  const numerator1 = 
    diffPrevious.x**2 * diffNext.y - diffNext.x**2 * diffPrevious.y + 
    diffPrevious.y**2 * diffNext.y - diffNext.y**2 * diffPrevious.y;
  const numerator2 = 
    diffPrevious.x**2 * diffNext.x - diffNext.x**2 * diffPrevious.x + 
    diffPrevious.y**2 * diffNext.x - diffNext.y**2 * diffPrevious.x;

  return Math.sqrt((numerator1 / denominator)**2 + (numerator2 / denominator)**2);  
};

const calculateGradient = (previous, next) => {
  const heightDiff = next.z - previous.z;
  const length = next.meter - previous.meter;

  return heightDiff / length * 100;
};

export default (route) => {
  route.gradient = {
    absMin: Number.MAX_VALUE,
    absMax: 0,
    mean: calculateGradient(route.segments[0], route.segments[route.segments.length - 1])
  };
  route.segments.forEach((segment, index) => {
    if (index <= 0) {
      segment.radius = Number.MAX_VALUE;
      segment.gradient = calculateGradient(segment, route.segments[index + 1]);
    } else if (index >= route.segments.length - 1) {
      segment.radius = Number.MAX_VALUE;
      segment.gradient = calculateGradient(route.segments[index - 1], segment);
    } else {
      segment.radius = calculateRadius(segment, route.segments[index - 1], route.segments[index + 1]);
      segment.gradient = calculateGradient(route.segments[index - 1], route.segments[index + 1]);
    }
    route.gradient.absMin = Math.min(route.gradient.absMin, Math.abs(segment.gradient));
    route.gradient.absMax = Math.max(route.gradient.absMax, Math.abs(segment.gradient));

    segment.gap = Number.MAX_VALUE;
    for (let previousIndex = 0; previousIndex < index; previousIndex++) {
      const otherSegment = route.segments[previousIndex];
      if (Math.abs(segment.flatMeter - otherSegment.flatMeter) > minOverlappingDistance * 5 && 
        calculateMapDistance(segment, otherSegment) < minOverlappingDistance) {
        const gap = Math.abs(segment.z - otherSegment.z);
        otherSegment.gap = Math.min(otherSegment.gap, gap);
        segment.gap = Math.min(segment.gap, gap);
      }
    }
  });
};