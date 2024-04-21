import createText from './createText.js';

const loadFont = async (window, name, fileName) => {
  return new Promise((resolve) => {
    const labelFont = new FontFace(name, `url(assets/${fileName})`);
    labelFont.load().then((font) => {
      window.document.fonts.add(font);
      resolve();
    });
  });
}

const loadFonts = async (window) => {
  await loadFont(window, 'notesFont', 'CaveatBrush-Regular.ttf');
  await loadFont(window, 'mapFont', 'UnifrakturCook-Bold.ttf');
};

export default async (window, language) => {
  const adapter = await window.navigator.gpu?.requestAdapter();
  const gpuDevice = await adapter?.requestDevice();
  if (!gpuDevice) {
    console.error('WebGPU not supported');
    return null;;
  }
  await loadFonts(window);

  return {
    window,
    gpuDevice,
    handleCanvasResize: (canvases, onResize) => {
      const observer = new ResizeObserver(entries => {
        for (const entry of entries) {
          const canvas = entry.target;
          const width = entry.contentBoxSize[0].inlineSize;
          const height = entry.contentBoxSize[0].blockSize;
          canvas.width = Math.max(1, Math.min(width, gpuDevice.limits.maxTextureDimension2D));
          canvas.height = Math.max(1, Math.min(height, gpuDevice.limits.maxTextureDimension2D));
        }
        onResize();
      });
      canvases.forEach(canvas => observer.observe(canvas));
    },
    text: createText(language)
  };
};