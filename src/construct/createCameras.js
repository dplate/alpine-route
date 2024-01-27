const createCamera = () => ({
  scale: 1.0,
  center: {
    x: 0.5,
    y: 0.5
  }
});

const restrictCenter = (camera, canvas) => {
  const pixelSize = canvas.height * camera.scale;
  camera.center.x = Math.max(0.5 * canvas.width / pixelSize, camera.center.x);
  camera.center.x = Math.min(1.0 - (0.5 * canvas.width / pixelSize), camera.center.x);
  camera.center.y = Math.max(0.5 * canvas.height / pixelSize, camera.center.y);
  camera.center.y = Math.min(1.0 - (0.5 * canvas.height / pixelSize), camera.center.y);
}

export default (layout, map) => {
  const mapCamera = createCamera();
  const magnifierCamera = createCamera();

  const restrictToLimits = () => {
    mapCamera.scale = Math.max(Math.max(layout.map.width / layout.map.height, 1.0), mapCamera.scale);
    mapCamera.scale = Math.min(100, mapCamera.scale);
    restrictCenter(mapCamera, layout.map);
    
    magnifierCamera.scale = mapCamera.scale * 15;
    restrictCenter(magnifierCamera, layout.magnifier);
  };

  const normalizePixels = (pixelX, pixelY) => ({
    x: mapCamera.center.x + (pixelX - 0.5 * layout.map.width) / (layout.map.height * mapCamera.scale),
    y: mapCamera.center.y + (pixelY - 0.5 * layout.map.height) / (layout.map.height * mapCamera.scale)
  });

  const transformNormalizedToPixels = (normalized) => ({
    x: (normalized.x - mapCamera.center.x) * (layout.map.height * mapCamera.scale) + 0.5 * layout.map.width,
    y: (normalized.y - mapCamera.center.y) * (layout.map.height * mapCamera.scale) + 0.5 * layout.map.height
  });

  const transformNormalizedToPixelsOnMagnifier = (normalized) => ({
    x: (normalized.x - magnifierCamera.center.x) * (layout.magnifier.height * magnifierCamera.scale) + 0.5 * layout.magnifier.width,
    y: (normalized.y - magnifierCamera.center.y) * (layout.magnifier.height * magnifierCamera.scale) + 0.5 * layout.magnifier.height
  });

  return {
    map: mapCamera,
    magnifier: magnifierCamera,
    moveMapByPixels: (pixelMovementX, pixelMovementY) => {
      mapCamera.center.x += pixelMovementX / (layout.map.height * mapCamera.scale);
      mapCamera.center.y += pixelMovementY / (layout.map.height * mapCamera.scale);
      restrictToLimits();
    },
    setMagnifierByPixels: (pixelX, pixelY) => {
      const normalized = normalizePixels(pixelX, pixelY);
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
    transformPixelsToMeters: (pixelX, pixelY) => {
      const normalized = normalizePixels(pixelX, pixelY);
      return {
        x: normalized.x * map.getWidthInMeters(),
        y: normalized.y * map.getHeightInMeters()
      };
    },
    transformMetersToPixels: (point) => {
      const normalized = {
        x: point.x / map.getWidthInMeters(),
        y: point.y / map.getHeightInMeters()
      };
      return transformNormalizedToPixels(normalized);
    },
    transformMetersToPixelsOnMagnifier: (point) => {
      const normalized = {
        x: point.x / map.getWidthInMeters(),
        y: point.y / map.getHeightInMeters()
      };
      return transformNormalizedToPixelsOnMagnifier(normalized);
    },
    restrictToLimits
  };
};