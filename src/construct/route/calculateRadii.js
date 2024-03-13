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

export default (route) => {
  route.segments.forEach((segment, index) => {
    if (index <= 0 || index >= route.segments.length - 1) {
      segment.radius = Number.MAX_VALUE;
    } else {
      segment.radius = calculateRadius(segment, route.segments[index - 1], route.segments[index + 1]);
    }
  });
};