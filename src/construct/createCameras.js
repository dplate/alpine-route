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

export default (layout) => {
  const mapCamera = createCamera();
  const magnifierCamera = createCamera();

  const restrictToLimits = () => {
    mapCamera.scale = Math.max(Math.max(layout.map.width / layout.map.height, 1.0), mapCamera.scale);
    mapCamera.scale = Math.min(100, mapCamera.scale);
    restrictCenter(mapCamera, layout.map);
    
    magnifierCamera.scale = mapCamera.scale * 15;
    restrictCenter(magnifierCamera, layout.magnifier);
  };

  return {
    map: mapCamera,
    magnifier: magnifierCamera,
    moveMapByPixels: (pixelMovementX, pixelMovementY) => {
      mapCamera.center.x += pixelMovementX / (layout.map.height * mapCamera.scale);
      mapCamera.center.y += pixelMovementY / (layout.map.height * mapCamera.scale);
      restrictToLimits();
    },
    setMagnifierByPixels: (pixelX, pixelY) => {
      magnifierCamera.center.x = mapCamera.center.x + (pixelX - 0.5 * layout.map.width) / (layout.map.height * mapCamera.scale);
      magnifierCamera.center.y = mapCamera.center.y + (pixelY - 0.5 * layout.map.height) / (layout.map.height * mapCamera.scale);
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
    restrictToLimits
  };
};