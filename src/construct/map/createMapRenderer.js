import mapShader from './mapShader.js';

const loadMapTexture = (system, map) => {
  const textureSource = map.bitmap;
  const texture = system.gpuDevice.createTexture({
    label: 'Map texture',
    format: 'rgba8unorm',
    size: [textureSource.width, textureSource.height],
    usage: GPUTextureUsage.TEXTURE_BINDING |
           GPUTextureUsage.COPY_DST |
           GPUTextureUsage.RENDER_ATTACHMENT,
  });
  
  system.gpuDevice.queue.copyExternalImageToTexture(
    { source: textureSource, flipY: true },
    { texture },
    { width: textureSource.width, height: textureSource.height },
  );

  return texture;
};

const createPipeline = (system, presentationFormat, map) => {
  const module = system.gpuDevice.createShaderModule({
    label: 'map shaders',
    code: mapShader,
  });
  
  return system.gpuDevice.createRenderPipeline({
    label: 'map pipeline',
    layout: 'auto',
    primitive: { 
      topology: `triangle-strip` 
    },
    vertex: {
      module,
      entryPoint: 'vs',
    },
    fragment: {
      module,
      entryPoint: 'fs',
      targets: [{ format: presentationFormat }],
      constants: {
        resolutionInMeters: map.resolutionInMeters
      },
    },
  });
};

const createBindGroup = (system, pipeline, buffer, texture) => system.gpuDevice.createBindGroup({
  layout: pipeline.getBindGroupLayout(0),
  entries: [
    { 
      binding: 0, 
      resource: { 
        buffer
      }
    },
    { 
      binding: 1, 
      resource: texture.createView()
    },
  ],
});

const createRenderTarget = (system, presentationFormat, pipeline, texture, camera, canvas) => {
  const context = canvas.getContext('webgpu');
  context.configure({
    device: system.gpuDevice,
    format: presentationFormat,
  });
  const values = new Float32Array(4);
  const buffer = system.gpuDevice.createBuffer({
    size: values.byteLength,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  const bindGroup = createBindGroup(system, pipeline, buffer, texture);

  return {
    canvas,
    context,
    camera,
    values,
    buffer,
    bindGroup
  };
};

const copyCameraToGpu = (system, renderTarget) => {
  const aspect = renderTarget.canvas.width / renderTarget.canvas.height;
  renderTarget.values.set([aspect], 0);
  renderTarget.values.set([renderTarget.camera.scale], 1); 
  renderTarget.values.set([renderTarget.camera.normalizedCenter.x, renderTarget.camera.normalizedCenter.y], 2); 
  system.gpuDevice.queue.writeBuffer(renderTarget.buffer, 0, renderTarget.values);
};

const executeRenderPass = (encoder, renderTarget, pipeline) => {
  const pass = encoder.beginRenderPass({
    label: 'map renderPass',
    colorAttachments: [
      {
        clearValue: [0, 0, 0, 1],
        loadOp: 'clear',
        storeOp: 'store',
        view: renderTarget.context.getCurrentTexture().createView()
      },
    ],
  });
  pass.setPipeline(pipeline);
  pass.setBindGroup(0, renderTarget.bindGroup);
  pass.draw(4);
  pass.end();
};

export default (system, layout, cameras, map) => {
  const presentationFormat = system.window.navigator.gpu.getPreferredCanvasFormat();
  const pipeline = createPipeline(system, presentationFormat, map);
  const texture = loadMapTexture(system, map);

  const renderTargets = [
    createRenderTarget(system, presentationFormat, pipeline, texture, cameras.map, layout.map),
    createRenderTarget(system, presentationFormat, pipeline, texture, cameras.magnifier.map, layout.magnifier)
  ];

  const render = () => {
    const encoder = system.gpuDevice.createCommandEncoder({ label: 'map command encoder' });

    renderTargets.forEach(renderTarget => {
      if (renderTarget.camera === cameras.magnifier.map && 
          (cameras.magnifier.isDisabled() || cameras.magnifier.isProfile())) {
        return;
      }
      copyCameraToGpu(system, renderTarget);
      executeRenderPass(encoder, renderTarget, pipeline);
    });

    const commandBuffer = encoder.finish();
    system.gpuDevice.queue.submit([commandBuffer]);
  };

  system.handleCanvasResize(
    renderTargets.map(renderTarget => renderTarget.canvas), 
    () => {
      cameras.update();
      render();
    }
  );

  return {
    render
  };
};