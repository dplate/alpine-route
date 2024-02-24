const profilePadding = 15;

export default (layout, route, mapCamera) => {
  const canvas = layout.profile;
  const camera = {
    minFlatMeter: 0,
    maxFlatMeter: 100,
    minHeight: 0,
    maxHeight: 100
  };

  camera.normalizePixels = (pixels) => ({
    flatMeter: pixels.x / canvas.width,
    z: 1.0 - (pixels.y  - profilePadding) / (canvas.height - 2 * profilePadding)
  });

  camera.normalizeMeters = (point) => ({
    flatMeter: (point.flatMeter - camera.minFlatMeter) / (camera.maxFlatMeter - camera.minFlatMeter),
    z: (point.z - camera.minHeight) / (camera.maxHeight - camera.minHeight)
  });

  camera.transformNormalizedToPixels = (normalized) => ({
    x: normalized.flatMeter * canvas.width,
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
    const isVisible = (segment) => segment.x >= minMapMeters.x && segment.x < maxMapMeters.x && 
      segment.y >= minMapMeters.y && segment.y < maxMapMeters.y;

    const firstVisibleSegmentIndex = Math.max(0, route.segments.findIndex(isVisible));
    camera.minFlatMeter = route.segments[firstVisibleSegmentIndex].flatMeter;

    let lastVisibleSegmentIndex = route.segments.findLastIndex(isVisible);
    if (lastVisibleSegmentIndex < 0) {
      lastVisibleSegmentIndex = route.segments.length - 1
    }
    camera.maxFlatMeter = route.segments[lastVisibleSegmentIndex].flatMeter;

    camera.minHeight = Number.MAX_VALUE;
    camera.maxHeight = 0;
    for (let segmentIndex = firstVisibleSegmentIndex; segmentIndex <= lastVisibleSegmentIndex; segmentIndex++) {
      camera.minHeight = Math.min(camera.minHeight, route.segments[segmentIndex].mapHeight, route.segments[segmentIndex].z);
      camera.maxHeight = Math.max(camera.maxHeight, route.segments[segmentIndex].mapHeight, route.segments[segmentIndex].z);
    }
  };

  camera.isProfile = () => true;

  return camera;
}