import restrictCameraCenter from './restrictCameraCenter.js';

export default (layout, map) => {
  const canvas = layout.map;
  const camera = {
    scale: 1.0,
    normalizedCenter: {
      x: 0.5,
      y: 0.5
    },
    updateCameras: null
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

  camera.update = () => {
    camera.scale = Math.max(Math.max(canvas.width / canvas.height, 1.0), camera.scale);
    camera.scale = Math.min(100, camera.scale);
    restrictCameraCenter(camera, canvas);
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

  return camera;
};