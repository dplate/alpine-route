const profilePadding = 15;

const createMapCamera = () => ({
  scale: 1.0,
  center: {
    x: 0.5,
    y: 0.5
  }
});

const createProfileCamera = () => ({
  minMeter: 0,
  maxMeter: 100,
  minHeight: 0,
  maxHeight: 100
});

const restrictCenter = (camera, canvas) => {
  const pixelSize = canvas.height * camera.scale;
  camera.center.x = Math.max(0.5 * canvas.width / pixelSize, camera.center.x);
  camera.center.x = Math.min(1.0 - (0.5 * canvas.width / pixelSize), camera.center.x);
  camera.center.y = Math.max(0.5 * canvas.height / pixelSize, camera.center.y);
  camera.center.y = Math.min(1.0 - (0.5 * canvas.height / pixelSize), camera.center.y);
}

export default (layout, map, route) => {
  const mapCamera = createMapCamera();
  const magnifierCamera = createMapCamera();
  const profileCamera = createProfileCamera();

  const normalizePixels = (pixels) => ({
    x: mapCamera.center.x + (pixels.x - 0.5 * layout.map.width) / (layout.map.height * mapCamera.scale),
    y: mapCamera.center.y + (pixels.y - 0.5 * layout.map.height) / (layout.map.height * mapCamera.scale)
  });

  const transformNormalizedToPixels = (normalized) => ({
    x: (normalized.x - mapCamera.center.x) * (layout.map.height * mapCamera.scale) + 0.5 * layout.map.width,
    y: (normalized.y - mapCamera.center.y) * (layout.map.height * mapCamera.scale) + 0.5 * layout.map.height
  });

  const transformNormalizedToPixelsOnMagnifier = (normalized) => ({
    x: (normalized.x - magnifierCamera.center.x) * (layout.magnifier.height * magnifierCamera.scale) + 0.5 * layout.magnifier.width,
    y: (normalized.y - magnifierCamera.center.y) * (layout.magnifier.height * magnifierCamera.scale) + 0.5 * layout.magnifier.height
  });

  const transformPixelsToMeters = (pixels) => {
    const normalized = normalizePixels(pixels);
    return {
      x: normalized.x * map.getWidthInMeters(),
      y: normalized.y * map.getHeightInMeters()
    };
  };

  const transformMetersToPixels = (point) => {
    const normalized = {
      x: point.x / map.getWidthInMeters(),
      y: point.y / map.getHeightInMeters()
    };
    return transformNormalizedToPixels(normalized);
  };

  const updateProfileCamera = () => {
    const minMapMeters = transformPixelsToMeters({ x: 0, y: 0 });
    const maxMapMeters = transformPixelsToMeters({ x: layout.map.width, y: layout.map.height });
    const isVisible = (segment) => segment.x >= minMapMeters.x && segment.x < maxMapMeters.x && 
      segment.y >= minMapMeters.y && segment.y < maxMapMeters.y;

    const firstVisibleSegmentIndex = Math.max(0, route.segments.findIndex(isVisible));
    profileCamera.minMeter = route.segments[firstVisibleSegmentIndex].meter;

    let lastVisibleSegmentIndex = route.segments.findLastIndex(isVisible);
    if (lastVisibleSegmentIndex < 0) {
      lastVisibleSegmentIndex = route.segments.length - 1
    }
    profileCamera.maxMeter = route.segments[lastVisibleSegmentIndex].meter;

    profileCamera.minHeight = Number.MAX_VALUE;
    profileCamera.maxHeight = 0;
    for (let segmentIndex = firstVisibleSegmentIndex; segmentIndex <= lastVisibleSegmentIndex; segmentIndex++) {
      profileCamera.minHeight = Math.min(profileCamera.minHeight, route.segments[segmentIndex].mapHeight, route.segments[segmentIndex].z);
      profileCamera.maxHeight = Math.max(profileCamera.maxHeight, route.segments[segmentIndex].mapHeight, route.segments[segmentIndex].z);
    }
  };

  const restrictToLimits = () => {
    mapCamera.scale = Math.max(Math.max(layout.map.width / layout.map.height, 1.0), mapCamera.scale);
    mapCamera.scale = Math.min(100, mapCamera.scale);
    restrictCenter(mapCamera, layout.map);
    
    magnifierCamera.scale = mapCamera.scale * 15;
    restrictCenter(magnifierCamera, layout.magnifier);

    updateProfileCamera();
  };

  return {
    map: mapCamera,
    magnifier: magnifierCamera,
    profile: profileCamera,
    moveMapByPixels: (pixelMovement) => {
      mapCamera.center.x += pixelMovement.x / (layout.map.height * mapCamera.scale);
      mapCamera.center.y += pixelMovement.y / (layout.map.height * mapCamera.scale);
      restrictToLimits();
    },
    setMagnifierByPixels: (pixels) => {
      const normalized = normalizePixels(pixels);
      magnifierCamera.center.x = normalized.x;
      magnifierCamera.center.y = normalized.y;
      restrictToLimits();
    },
    zoomIn: (amount) => {
      mapCamera.scale *= amount;
      restrictToLimits();
    },
    zoomOut: (amount) => {
      mapCamera.scale /= amount;
      restrictToLimits();
    },
    transformPixelsToMeters,
    transformMetersToPixels,
    transformMetersToPixelsOnMagnifier: (point) => {
      const normalized = {
        x: point.x / map.getWidthInMeters(),
        y: point.y / map.getHeightInMeters()
      };
      return transformNormalizedToPixelsOnMagnifier(normalized);
    },
    transformMetersToPixelsOnProfile: (meter, height) => {
      const meterNormalized = (meter - profileCamera.minMeter) / (profileCamera.maxMeter - profileCamera.minMeter);
      const heightNormalized = (height - profileCamera.minHeight) / (profileCamera.maxHeight - profileCamera.minHeight);

      return {
        x: meterNormalized * layout.profile.width,
        y: profilePadding + (1.0 - heightNormalized) * (layout.profile.height - 2 * profilePadding)
      }
    },
    restrictToLimits
  };
};