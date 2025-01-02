export default (camera, canvas) => {
  const pixelSize = canvas.height * camera.scale;
  camera.normalizedCenter.x = Math.max(
    (0.5 * canvas.width) / pixelSize,
    camera.normalizedCenter.x,
  );
  camera.normalizedCenter.x = Math.min(
    1.0 - (0.5 * canvas.width) / pixelSize,
    camera.normalizedCenter.x,
  );
  camera.normalizedCenter.y = Math.max(
    (0.5 * canvas.height) / pixelSize,
    camera.normalizedCenter.y,
  );
  camera.normalizedCenter.y = Math.min(
    1.0 - (0.5 * canvas.height) / pixelSize,
    camera.normalizedCenter.y,
  );
};
