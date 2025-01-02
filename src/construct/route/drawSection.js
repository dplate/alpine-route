import { ROUTE_TYPE_BRIDGE, ROUTE_TYPE_TUNNEL } from './routeTypes.js';

const maxJitterPixelDistance = 10;
const detailPixelDistance = 6;

const calculateDistanceFromLine = (start, end, pixels) => {
  const diff = {
    x: end.x - start.x,
    y: end.y - start.y,
  };
  return (
    Math.abs(diff.x * (start.y - pixels.y) - diff.y * (start.x - pixels.x)) /
    Math.sqrt(diff.x ** 2 + diff.y ** 2)
  );
};

const splitSection = (section) => {
  if (!section.visible || section.corners.length <= 1) {
    return [];
  }

  const start = section.corners[0].pixels;
  const end = section.corners[section.corners.length - 1].pixels;
  section.corners[0].startDistance = section.corners[0].startDistance || 0;
  const splitCorner = {
    index: 0,
    lineDistance: 0,
  };
  section.corners.forEach((corner, index) => {
    if (index > 0) {
      const previousCorner = section.corners[index - 1];
      corner.startDistance =
        previousCorner.startDistance +
        Math.sqrt(
          (corner.pixels.x - previousCorner.pixels.x) ** 2 +
            (corner.pixels.y - previousCorner.pixels.y) ** 2,
        );
    }
    const distance = calculateDistanceFromLine(start, end, corner.pixels);
    if (distance > splitCorner.lineDistance) {
      splitCorner.index = index;
      splitCorner.lineDistance = distance;
    }
  });
  if (splitCorner.lineDistance < maxJitterPixelDistance) {
    return [section];
  }

  return [
    {
      type: section.type,
      corners: section.corners.slice(0, splitCorner.index + 1),
    },
    {
      type: section.type,
      corners: section.corners.slice(splitCorner.index),
    },
  ].reduce((splitSections, subSection) => {
    subSection.visible = subSection.corners.some((corner) => corner.visible);
    return [...splitSections, ...splitSection(subSection)];
  }, []);
};

const drawSubSection = (context, section) => {
  const firstCorner = section.corners[0];
  const lastCorner = section.corners[section.corners.length - 1];

  context.setLineDash([]);
  context.beginPath();
  context.moveTo(firstCorner.pixels.x, firstCorner.pixels.y);
  let previousUsedPixels = firstCorner.pixels;

  const gradient = context.createLinearGradient(
    firstCorner.pixels.x,
    firstCorner.pixels.y,
    lastCorner.pixels.x,
    lastCorner.pixels.y,
  );
  gradient.addColorStop(0, section.corners[0].color);
  section.corners.forEach((corner, index) => {
    if (
      index > 0 &&
      (index >= section.corners.length - 1 ||
        Math.abs(previousUsedPixels.x - corner.pixels.x) >
          detailPixelDistance ||
        Math.abs(previousUsedPixels.y - corner.pixels.y) > detailPixelDistance)
    ) {
      context.lineTo(corner.pixels.x, corner.pixels.y);
      gradient.addColorStop(
        (corner.startDistance - firstCorner.startDistance) /
          (lastCorner.startDistance - firstCorner.startDistance),
        corner.color,
      );
      previousUsedPixels = corner.pixels;
    }
  });

  if (section.type === ROUTE_TYPE_BRIDGE) {
    context.lineCap = 'butt';
    context.lineWidth = 8;
    context.strokeStyle = `rgb(10, 10, 10)`;
    context.stroke();
  }

  if (section.type === ROUTE_TYPE_TUNNEL) {
    const lineDash = [5, 15];
    context.lineDashOffset =
      section.corners[0].startDistance % (lineDash[0] + lineDash[1]);
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
  subSections.forEach((subSection) => {
    drawSubSection(context, subSection);
  });
};
