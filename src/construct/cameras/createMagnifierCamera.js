import restrictCameraCenter from './restrictCameraCenter.js';

const scale = 2.0;
const scaleNormalized = (normalized) => ({
  flatMeter: (normalized.flatMeter - 0.5) * scale + 0.5,
  z: (normalized.z - 0.5) * scale + 0.5,
});

export default (layout, mapCamera, profileCamera) => {
  const canvas = layout.magnifier;
  const magnifierCamera = {
    map: {
      scale: 1.0,
      normalizedCenter: {
        x: 0.5,
        y: 0.5
      }
    },
    profile: {
      normalizedCenter: { 
        flatMeter: 0.5, 
        z: 0.5 
      },
    }
  };

  magnifierCamera.map.transformMetersToPixels = (point) => {
    const normalized = mapCamera.normalizeMeters(point);
    return ({
      x: (normalized.x - magnifierCamera.map.normalizedCenter.x) * (canvas.height * magnifierCamera.map.scale) + 0.5 * canvas.width,
      y: (normalized.y - magnifierCamera.map.normalizedCenter.y) * (canvas.height * magnifierCamera.map.scale) + 0.5 * canvas.height
    });
  };

  magnifierCamera.update = () => {
    magnifierCamera.map.scale = mapCamera.scale * 15;
    restrictCameraCenter(magnifierCamera.map, canvas);
  };

  magnifierCamera.map.isProfile = () => false;

  magnifierCamera.profile.transformMetersToPixels = (point) => {
    const normalized = scaleNormalized(profileCamera.normalizeMeters(point));
    const normalizedCenter = scaleNormalized(magnifierCamera.profile.normalizedCenter);
    const scaledPixels = profileCamera.transformNormalizedToPixels(normalized);
    const scaledPixelsCenter = profileCamera.transformNormalizedToPixels(normalizedCenter);
    return {
      x: scaledPixels.x - scaledPixelsCenter.x + 0.5 * canvas.width,
      y: scaledPixels.y - scaledPixelsCenter.y + 0.5 * canvas.height
    };
  };

  magnifierCamera.profile.isProfile = () => true;

  magnifierCamera.active = magnifierCamera.map;

  magnifierCamera.transformMetersToPixels = (point) => magnifierCamera.active.transformMetersToPixels(point);

  magnifierCamera.isProfile = () => magnifierCamera.active.isProfile();

  magnifierCamera.setByMapPixels = (pixels) => {
    const normalized = mapCamera.normalizePixels(pixels);
    magnifierCamera.map.normalizedCenter.x = normalized.x;
    magnifierCamera.map.normalizedCenter.y = normalized.y;
    magnifierCamera.active = magnifierCamera.map;
    layout.magnifier.style.opacity = 1;
    magnifierCamera.update();
  };

  magnifierCamera.setByProfilePixels = (pixels) => {
    const normalized = profileCamera.normalizePixels(pixels);
    magnifierCamera.profile.normalizedCenter.flatMeter = normalized.flatMeter;
    magnifierCamera.profile.normalizedCenter.z = normalized.z;
    magnifierCamera.active = magnifierCamera.profile;
    layout.magnifier.style.opacity = 0;
  };

  return magnifierCamera;
};