import { ROUTE_TYPE_BRIDGE, ROUTE_TYPE_TUNNEL } from './routeTypes.js';

const maxJitterPixelDistance = 10;

const calculateDistanceFromLine = (start, end, pixels) => {
  const diff = {
    x: end.x - start.x,
    y: end.y - start.y
  };
  return Math.abs(diff.x * (start.y - pixels.y) - diff.y * (start.x - pixels.x)) / 
    Math.sqrt(diff.x ** 2, diff.y ** 2);
};

const splitSection = (section) => {
  if (!section.visible || section.corners.length <= 1) {
    return [];
  }
  
  const start = section.corners[0].pixels;
  const end = section.corners[section.corners.length - 1].pixels;
  const startDistance = section.startDistance || 0;
  const splitCorner = {
    index: 0,
    lineDistance: 0,
    startDistance
  };
  let currentStartDistance = startDistance;
  section.corners.forEach((corner, index) => {
    if (index > 0) {
      const previousPixels = section.corners[index - 1].pixels;
      currentStartDistance += Math.sqrt(
        (corner.pixels.x - previousPixels.x) ** 2 + 
        (corner.pixels.y - previousPixels.y) ** 2
      );
    }
    const distance = calculateDistanceFromLine(start, end, corner.pixels);
    if (distance > splitCorner.lineDistance) {
      splitCorner.index = index;
      splitCorner.lineDistance = distance;
      splitCorner.startDistance = currentStartDistance;
    }
  });
  if (splitCorner.lineDistance < maxJitterPixelDistance) {
    return [section];
  }

  return [
    {
      type: section.type,
      corners: section.corners.slice(0, splitCorner.index + 1),
      startDistance
    },
    {
      type: section.type,
      corners: section.corners.slice(splitCorner.index),
      startDistance: splitCorner.startDistance
    }
  ].reduce((splitSections, section) => {
    section.visible = section.corners.some(corner => corner.visible);
    return [
      ...splitSections,
      ...splitSection(section)
    ];
  }, [])
};

const drawSubSection = (context, section) => {
  const firstPixels = section.corners[0].pixels;
  const lastPixels = section.corners[section.corners.length - 1].pixels;

  context.setLineDash([]);
  context.beginPath();
  context.moveTo(firstPixels.x, firstPixels.y);

  const gradient = context.createLinearGradient(firstPixels.x, firstPixels.y, lastPixels.x, lastPixels.y); 
  section.corners.forEach((corner, index) => {
    if (index > 0) {
      context.lineTo(corner.pixels.x, corner.pixels.y);
    }
    gradient.addColorStop(index / (section.corners.length - 1), corner.color);
  });

  if (section.type === ROUTE_TYPE_BRIDGE) {
    context.lineCap = 'butt';
    context.lineWidth = 8;
    context.strokeStyle = `rgb(10, 10, 10)`;
    context.stroke();
  }

  if (section.type === ROUTE_TYPE_TUNNEL) {
    const lineDash = [5, 15];
    context.lineDashOffset = section.startDistance % (lineDash[0] + lineDash[1]);
    context.setLineDash(lineDash);
  } else {
    context.setLineDash([]);
  }

  context.lineCap = 'round';
  context.lineWidth = 5;
  context.strokeStyle = gradient;
  context.stroke();
  context.setLineDash([]);
};

export default (context, section) => {
  const subSections = splitSection(section);
   subSections.forEach((subSection) => drawSubSection(context, subSection));
};