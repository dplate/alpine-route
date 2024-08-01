const profilePadding = 15;

export default (layout, route, mapCamera) => {
  const canvas = layout.profile;
  const camera = {
    minFlatMeter: 0,
    maxFlatMeter: 100,
    minHeight: 0,
    maxHeight: 100
  };
  const leftToRight = route.segments[0].x < route.segments[route.segments.length - 1].x;

  camera.normalizePixels = (pixels) => ({
    flatMeter: leftToRight ? pixels.x / canvas.width : 1.0 - pixels.x / canvas.width,
    z: 1.0 - (pixels.y  - profilePadding) / (canvas.height - 2 * profilePadding)
  });

  camera.normalizeMeters = (point) => ({
    flatMeter: (point.flatMeter - camera.minFlatMeter) / (camera.maxFlatMeter - camera.minFlatMeter),
    z: (point.z - camera.minHeight) / (camera.maxHeight - camera.minHeight)
  });

  camera.transformNormalizedToPixels = (normalized) => ({
    x: leftToRight ? normalized.flatMeter * canvas.width : canvas.width - normalized.flatMeter * canvas.width,
    y: profilePadding + (1.0 - normalized.z) * (canvas.height - 2 * profilePadding)
  });

  camera.transformMetersToPixels = (point) => {
    const normalized = camera.normalizeMeters(point);
    return camera.transformNormalizedToPixels(normalized);
  };

  camera.transformPixelsToMeters = (pixels) => {
    const normalized = camera.normalizePixels(pixels);
    return {
      flatMeter: normalized.flatMeter * (camera.maxFlatMeter - camera.minFlatMeter) + camera.minFlatMeter,
      z: normalized.z * (camera.maxHeight - camera.minHeight) + camera.minHeight
    };
  };

  camera.transformPixelDistanceToHeightDifference = (pixelDistance) => {
    const normalizedZDifference = camera.normalizePixels({ x: 0, y: 0 }).z - 
      camera.normalizePixels({ x: 0, y: pixelDistance }).z;
    return normalizedZDifference * (camera.maxHeight - camera.minHeight);
  };

  camera.update = () => {
    const minMapMeters = mapCamera.transformPixelsToMeters({ x: 0, y: 0 });
    const maxMapMeters = mapCamera.transformPixelsToMeters({ x: layout.map.width, y: layout.map.height });
    const centerMapMeters = {
      x: 0.5 * (minMapMeters.x + maxMapMeters.x),
      y: 0.5 * (minMapMeters.y + maxMapMeters.y)
    }; 
    const calculateDistanceToCenter = (segment) => Math.sqrt(
      (centerMapMeters.x - segment.x) ** 2 + 
      (centerMapMeters.y - segment.y) ** 2
    );
    const isVisible = (segment) => segment.x >= minMapMeters.x && segment.x < maxMapMeters.x && 
      segment.y >= minMapMeters.y && segment.y < maxMapMeters.y;

    const visibleParts = [];
    let currentPart = null;
    route.segments.forEach((segment, index) => {
      if (isVisible(segment)) {
        if (!currentPart) {
          currentPart = {
            minIndex: index,
            minFlatMeter: segment.flatMeter,
            minDistanceToCenter: calculateDistanceToCenter(segment)
          };
          visibleParts.push(currentPart);
        }
        currentPart.maxIndex = index;
        currentPart.maxFlatMeter = segment.flatMeter;
        currentPart.minDistanceToCenter = Math.min(currentPart.minDistanceToCenter, calculateDistanceToCenter(segment));
      } else {
        currentPart = null;
      }
    });
    visibleParts.sort((part1, part2) => part1.minDistanceToCenter - part2.minDistanceToCenter);

    const mainVisiblePart = visibleParts[0] || {
      minIndex: 0,
      minFlatMeter: route.segments[0].flatMeter,
      maxIndex: route.segments.length - 1,
      maxFlatMeter: route.segments[route.segments.length - 1].flatMeter
    };

    camera.minFlatMeter = mainVisiblePart.minFlatMeter;
    camera.maxFlatMeter = mainVisiblePart.maxFlatMeter;
    camera.minHeight = Number.MAX_VALUE;
    camera.maxHeight = 0;
    for (let segmentIndex = mainVisiblePart.minIndex; segmentIndex <= mainVisiblePart.maxIndex; segmentIndex++) {
      camera.minHeight = Math.min(camera.minHeight, route.segments[segmentIndex].z);
      camera.maxHeight = Math.max(camera.maxHeight, route.segments[segmentIndex].z);
    }
  };

  camera.isProfile = () => true;
  camera.isDisabled = () => false;

  return camera;
}