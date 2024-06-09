import restrictCameraCenter from './restrictCameraCenter.js';

export default (layout, route, map) => {
  const canvas = layout.map;
  const camera = {
    scale: 1.0,
    normalizedCenter: {
      x: 0.5,
      y: 0.5
    },
    updateCameras: null,
    initialZoomDone: false
  };

  camera.normalizePixels = (pixels) => ({
    x: camera.normalizedCenter.x + (pixels.x - 0.5 * canvas.width) / (canvas.height * camera.scale),
    y: camera.normalizedCenter.y + (pixels.y - 0.5 * canvas.height) / (canvas.height * camera.scale)
  });

  camera.normalizeMeters = (point) => ({
    x: point.x / map.widthInMeters,
    y: point.y / map.heightInMeters
  });

  const transformNormalizedToPixels = (normalized) => ({
    x: (normalized.x - camera.normalizedCenter.x) * (canvas.height * camera.scale) + 0.5 * canvas.width,
    y: (normalized.y - camera.normalizedCenter.y) * (canvas.height * camera.scale) + 0.5 * canvas.height
  });

  camera.transformPixelsToMeters = (pixels) => {
    const normalized = camera.normalizePixels(pixels);
    return {
      x: normalized.x * map.widthInMeters,
      y: normalized.y * map.heightInMeters
    };
  };

  camera.transformMetersToPixels = (point) => {
    const normalized = camera.normalizeMeters(point);
    return transformNormalizedToPixels(normalized);
  };

  camera.moveByPixels = (pixelMovement) => {
    camera.normalizedCenter.x += pixelMovement.x / (canvas.height * camera.scale);
    camera.normalizedCenter.y += pixelMovement.y / (canvas.height * camera.scale);
    camera.updateCameras();
  };

  camera.zoomIn = (amount, pixelsStatic) => {
    const normalizedStatic = camera.normalizePixels(pixelsStatic);
    camera.scale *= amount;
    camera.updateCameras();
    const newNormalizedStatic = camera.normalizePixels(pixelsStatic);
    camera.normalizedCenter.x += normalizedStatic.x - newNormalizedStatic.x;
    camera.normalizedCenter.y += normalizedStatic.y - newNormalizedStatic.y;
    camera.updateCameras();
  };

  camera.zoomOut = (amount, pixelsStatic) => {
    camera.zoomIn(1 / amount, pixelsStatic);
  };

  camera.isProfile = () => false;
  camera.isDisabled = () => false;

  camera.zoomToRoute = () => {
    const boundingBox = route.segments.reduce((boundingBox, segment) => {
      boundingBox.minMeters.x = Math.min(boundingBox.minMeters.x, segment.x);
      boundingBox.minMeters.y = Math.min(boundingBox.minMeters.y, segment.y);
      boundingBox.maxMeters.x = Math.max(boundingBox.maxMeters.x, segment.x);
      boundingBox.maxMeters.y = Math.max(boundingBox.maxMeters.y, segment.y);
      return boundingBox;
    }, {
      minMeters: {
        x: Number.MAX_SAFE_INTEGER,
        y: Number.MAX_SAFE_INTEGER
      },
      maxMeters: {
        x: 0,
        y: 0
      }
    });
    const sizeMeters = {
      x: boundingBox.maxMeters.x - boundingBox.minMeters.x + 300,
      y: boundingBox.maxMeters.y - boundingBox.minMeters.y + 300
    };
    const sizeNormalized = camera.normalizeMeters(sizeMeters);
    camera.scale = Math.min((canvas.width / canvas.height) / sizeNormalized.x, 1.0 / sizeNormalized.y);

    const centerMeters = {
      x: (boundingBox.minMeters.x + boundingBox.maxMeters.x) / 2.0,
      y: (boundingBox.minMeters.y + boundingBox.maxMeters.y) / 2.0,
    };
    const normalizedCenter = camera.normalizeMeters(centerMeters);
    camera.normalizedCenter.x = normalizedCenter.x;
    camera.normalizedCenter.y = normalizedCenter.y;
  };

  camera.update = () => {
    if (!camera.initialZoomDone) {
      camera.zoomToRoute();
      camera.initialZoomDone = true;
    }
    camera.scale = Math.max(Math.max(canvas.width / canvas.height, 1.0), camera.scale);
    camera.scale = Math.min(100, camera.scale);
    restrictCameraCenter(camera, canvas);
  };

  return camera;
};