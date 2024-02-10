export default async (window) => {
  const adapter = await window.navigator.gpu?.requestAdapter();
  const gpuDevice = await adapter?.requestDevice();
  if (!gpuDevice) {
    console.error('WebGPU not supported');
    return null;;
  }

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
    }
  };
};