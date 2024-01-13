export default async (window) => {
  const adapter = await window.navigator.gpu?.requestAdapter();
  const gpuDevice = await adapter?.requestDevice();
  if (!gpuDevice) {
    console.error('WebGPU not supported');
    return null;;
  }

  return {
    window,
    gpuDevice
  };
};