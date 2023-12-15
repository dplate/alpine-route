async function main() {
  const adapter = await navigator.gpu?.requestAdapter();
  const device = await adapter?.requestDevice();
  if (!device) {
    fail('need a browser that supports WebGPU');
    return;
  }

  const canvas = document.querySelector('canvas');
  const context = canvas.getContext('webgpu');
  const presentationFormat = navigator.gpu.getPreferredCanvasFormat();
  context.configure({
    device,
    format: presentationFormat,
  });

  const module = device.createShaderModule({
    label: 'map shaders',
    code: `
      struct Camera {
        scale: vec2f,
        offset: vec2f,
      };

      struct MapVertexShaderOutput {
        @builtin(position) position: vec4f,
        @location(0) textureCoordinate: vec2f,
      };

      @group(0) @binding(0) var<uniform> camera: Camera;

      @vertex fn vs(
        @builtin(vertex_index) vertexIndex : u32
      ) -> MapVertexShaderOutput {
        let pos = array(
          vec2f( -1.0,  -1.0),
          vec2f( 1.0,  -1.0),
          vec2f( -1.0,  1.0),
          vec2f( 1.0,  1.0)
        );
        var vsOutput: MapVertexShaderOutput;
        vsOutput.position = vec4f(pos[vertexIndex] * camera.scale + camera.offset, 0.0, 1.0);
        vsOutput.textureCoordinate = pos[vertexIndex] / 2 + 0.5;
        return vsOutput;
      }

      override texelInMeters: f32;
      override heightInMeters: f32;

      const northWestOffset = vec2i(-1, 1);
      const westOffset = vec2i(-1, 0);
      const southWestOffset = vec2i(-1, -1);
      const southOffset = vec2i(0, -1);
      const southEastOffset = vec2i(1, -1);
      const eastOffset = vec2i(1, 0);
      const northEastOffset = vec2i(1, 1);
      const northOffset = vec2i(0, 1);

      @group(0) @binding(1) var mapSampler: sampler;
      @group(0) @binding(2) var mapTexture: texture_2d<f32>;

      fn getHeight(textureCoordinate: vec2f) -> f32 {
        let sample = textureSample(mapTexture, mapSampler, textureCoordinate);
        return (sample[0] * 256 * 256 + sample[1] * 256 + sample[2]);
      }

      fn getNeighbor(sample: vec4f, offset: vec2i) -> vec3f {
        return vec3f(
          texelInMeters * f32(offset[0]),
          - texelInMeters * f32(offset[1]),
          (sample[0] * 256 * 256 + sample[1] * 256 + sample[2])
        );
      }

      fn calculateShading(textureCoordinate: vec2f) -> f32 {
        let neighbors: array<vec3f, 8> = array(
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, northWestOffset), 
            northWestOffset
          ),
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, westOffset), 
            westOffset
          ),
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, southWestOffset), 
            southWestOffset
          ),
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, southOffset), 
            southOffset
          ),
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, southEastOffset), 
            southEastOffset
          ),
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, eastOffset), 
            eastOffset
          ),
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, northEastOffset), 
            northEastOffset
          ),
          getNeighbor(
            textureSample(mapTexture, mapSampler, textureCoordinate, northOffset), 
            northOffset
          ),
        );
        
        var normal = vec3f(0, 0, 0);
        for (var i: i32 = 0; i <= 8; i++) {
          let pointA = neighbors[i];
          let pointB = neighbors[(i + 2) % 8];
          let pointC = neighbors[(i + 5) % 8];
          normal += normalize(cross(pointA - pointB, pointC - pointA));
        }
        normal = normalize(normal);
        let light = normalize(vec3f(0, -1, -1));
        let maxShading = length(light + vec3f(0, -1, 0));
        return 1 - length(light + normal) / maxShading;
      }

      fn addContour(baseColor: vec3f, height: f32) -> vec3f {
        let heightFraction = abs(fract(height / 100) - 0.5); 
        let detailFactor = fwidth(height / 100);
        let contourMask = (1 - smoothstep(0, 1.2, heightFraction / detailFactor));
        let contourColor = vec3f(126.0/255.0, 119.0/255.0, 51.0/255.0);
        return mix(baseColor, contourColor, contourMask);
      }
       
      @fragment fn fs(fsInput: MapVertexShaderOutput) -> @location(0) vec4f {
        let height = getHeight(fsInput.textureCoordinate);

        let shading = calculateShading(fsInput.textureCoordinate);
        let terrainColor = vec3(1.0, 1.0, 0.9);
        let baseColor = mix(terrainColor, terrainColor * shading, 0.9);

        return vec4f(
          addContour(baseColor, height),
          1
        );
      }
    `,
  });

  //const textureResponse = await fetch('/tools/saentis/map.png');
  const textureResponse = await fetch('/tools/albula/map.png');
  const textureSource = await createImageBitmap(await textureResponse.blob(), { colorSpaceConversion: 'none' });
  const texture = device.createTexture({
    label: 'Map texture',
    format: 'rgba8unorm',
    size: [textureSource.width, textureSource.height],
    usage: GPUTextureUsage.TEXTURE_BINDING |
           GPUTextureUsage.COPY_DST |
           GPUTextureUsage.RENDER_ATTACHMENT,
  });
  device.queue.copyExternalImageToTexture(
    { source: textureSource, flipY: true },
    { texture },
    { width: textureSource.width, height: textureSource.height },
  );
  const sampler = device.createSampler({
    minFilter: 'linear',
    magFilter: 'linear',
  });

  const pipeline = device.createRenderPipeline({
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
        texelInMeters: 2,
        /*heightInMeters: 1600*/
      },
    },
  });

  const renderPassDescriptor = {
    label: 'map renderPass',
    colorAttachments: [
      {
        clearValue: [0, 0, 0, 1],
        loadOp: 'clear',
        storeOp: 'store',
      },
    ],
  };

  const camera = {
    scale: 1,
    offset: {
      x: 0,
      y: 0
    }
  };
  const cameraBufferSize = 2 * 4 + 2 * 4;
  const cameraBuffer = device.createBuffer({
    size: cameraBufferSize,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  });
  const cameraValues = new Float32Array(cameraBufferSize / 4);
  const cameraScaleOffset = 0;
  const cameraOffsetOffset = 2;

  const bindGroup = device.createBindGroup({
    layout: pipeline.getBindGroupLayout(0),
    entries: [
      { binding: 0, resource: { buffer: cameraBuffer }},
      { 
        binding: 1, 
        resource: sampler
      },
      { 
        binding: 2, 
        resource: texture.createView()
      },
    ],
  });

  function render() {
    const aspect = canvas.width / canvas.height;
    cameraValues.set([camera.scale / aspect, camera.scale], cameraScaleOffset);
    cameraValues.set([camera.offset.x, camera.offset.y], cameraOffsetOffset); 
    device.queue.writeBuffer(cameraBuffer, 0, cameraValues);

    renderPassDescriptor.colorAttachments[0].view = context.getCurrentTexture().createView();
 
    const encoder = device.createCommandEncoder({ label: 'map command encoder' });
 
    const pass = encoder.beginRenderPass(renderPassDescriptor);
    pass.setPipeline(pipeline);
    pass.setBindGroup(0, bindGroup);
    pass.draw(4);
    pass.end();
 
    const commandBuffer = encoder.finish();
    device.queue.submit([commandBuffer]);
  }
 
  const observer = new ResizeObserver(entries => {
    for (const entry of entries) {
      const canvas = entry.target;
      const width = entry.contentBoxSize[0].inlineSize;
      const height = entry.contentBoxSize[0].blockSize;
      canvas.width = Math.max(1, Math.min(width, device.limits.maxTextureDimension2D));
      canvas.height = Math.max(1, Math.min(height, device.limits.maxTextureDimension2D));
      render();
    }
  });
  observer.observe(canvas);
  canvas.onwheel = (event) => {
    camera.scale *= event.deltaY < 0 ? (-90/event.deltaY) : (event.deltaY/90);
    render();
  };
  canvas. onmousemove = (event) => {
    if (event.buttons === 1) {
      camera.offset.x += event.movementX/(canvas.width/2);
      camera.offset.y -= event.movementY/(canvas.height/2);
      render();
    }
  };
}
main();