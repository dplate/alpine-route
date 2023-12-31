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

      const northWestOffset = vec2i(-1, 1);
      const westOffset = vec2i(-1, 0);
      const southWestOffset = vec2i(-1, -1);
      const southOffset = vec2i(0, -1);
      const southEastOffset = vec2i(1, -1);
      const eastOffset = vec2i(1, 0);
      const northEastOffset = vec2i(1, 1);
      const northOffset = vec2i(0, 1);

      @group(0) @binding(1) var mapTexture: texture_2d<f32>;

      fn convertColorToHeight(color: vec4f) -> f32 {
        return dot( color, vec4f(256.0 * 256.0, 256.0, 1.0, 0) ) * 2.55;
      }

      fn getNeighbor(height: f32, offset: vec2i) -> vec3f {
        return vec3f(
          texelInMeters * f32(offset[0]),
          - texelInMeters * f32(offset[1]),
          height
        );
      }

      fn getInterpolatedHeight(textureCoordinate: vec2f) -> f32 {
        let textureSize = vec2f(textureDimensions(mapTexture));
        let fraction = fract(textureCoordinate * textureSize);
        let flooredTextureCoordinate = vec2i(textureCoordinate * textureSize);

        let height = convertColorToHeight(
          textureLoad(mapTexture, flooredTextureCoordinate, 0)
        );
        let eastHeight = convertColorToHeight(
          textureLoad(mapTexture, flooredTextureCoordinate + eastOffset, 0)
        );
        let northHeight = convertColorToHeight(
          textureLoad(mapTexture, flooredTextureCoordinate + northOffset, 0)
        );
        let northEastHeight = convertColorToHeight(
          textureLoad(mapTexture, flooredTextureCoordinate + northEastOffset, 0)
        );

        let interpolated1 = mix(height, eastHeight, fraction[0]);
        let interpolated2 = mix(northHeight, northEastHeight, fraction[0]);

        return mix(interpolated1, interpolated2, fraction[1]);
      }

      fn getNeighbors(textureCoordinate: vec2f) -> array<vec3f, 8> {
        let textureSize = vec2f(textureDimensions(mapTexture));
        return array(
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(northWestOffset) / textureSize ), 
            northWestOffset
          ),
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(westOffset) / textureSize), 
            westOffset
          ),
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(southWestOffset) / textureSize), 
            southWestOffset
          ),
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(southOffset) / textureSize), 
            southOffset
          ),
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(southEastOffset) / textureSize), 
            southEastOffset
          ),
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(eastOffset) / textureSize), 
            eastOffset
          ),
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(northEastOffset) / textureSize), 
            northEastOffset
          ),
          getNeighbor(
            getInterpolatedHeight(textureCoordinate + vec2f(northOffset) / textureSize), 
            northOffset
          ),
        );
      }

      fn calculateSmoothHeight(neighbors: array<vec3f, 8>) -> f32 {
        var height = 0.0;
        for (var i: i32 = 0; i < 8; i++) {
          height = height + neighbors[i][2];
        }
        return height / 8;
      }

      fn calculateShading(neighbors: array<vec3f, 8>) -> f32 {
        var normal = vec3f(0, 0, 0);
        for (var i: i32 = 0; i < 8; i++) {
          let pointA = neighbors[i];
          let pointB = neighbors[(i + 2) % 8];
          let pointC = neighbors[(i + 5) % 8];
          normal += normalize(cross(pointA - pointB, pointC - pointA));
        }
        normal = normalize(normal);

        let directLight = normalize(vec3f(1, 1, -1));
        let maxDirectLightShading = length(directLight + normalize(vec3f(1, 1, 0)));
        let directLightShading = length(directLight + normal) / maxDirectLightShading;

        let slopeLight = normalize(vec3f(0, 0, -1));
        let maxSlopeLightShading = length(slopeLight + normalize(vec3f(0, 1, 0)));
        let slopeLightShading = length(slopeLight + normal) / maxSlopeLightShading;
        
        let darkness = mix(directLightShading, slopeLightShading, 0.3) * 1.25 - 0.25;
        let brightness = 1.0 - darkness;

        return brightness;
      }

      fn addContour(baseColor: vec3f, height: f32, distance: f32, contourWidth: f32) -> vec3f {
        let heightFraction = abs(fract((height + distance / 2) / distance) - 0.5); 
        let detailFactor = fwidth(height / distance) / 2;
        let smoothWidth = 2.0;
        let contourMask = (1 - smoothstep(
          contourWidth * detailFactor, 
          (contourWidth + smoothWidth) * detailFactor, 
          heightFraction
          ));
        let contourColor = vec3f(126.0/255.0, 119.0/255.0, 51.0/255.0);
        return mix(baseColor, contourColor, contourMask * 0.7);
      }

      fn addContours(baseColor: vec3f, height: f32) -> vec3f {
        let subContourAmounts = array(1.0, 5.0, 10.0, 20.0, 50.0, 100.0);
        let subContourAmount = subContourAmounts[min(max(0, i32(round(sqrt(camera.scale[1] / 10)))), 5)];
        return addContour(
          addContour(baseColor, height, 100.0 / subContourAmount, 0.0), 
          height, 100.0, 0.7
        );
      }
       
      @fragment fn fs(fsInput: MapVertexShaderOutput) -> @location(0) vec4f {
        let neighbors = getNeighbors(fsInput.textureCoordinate);
        let smoothHeight = calculateSmoothHeight(neighbors);
        let shading = calculateShading(neighbors);
        let terrainColor = vec3(1.0, 1.0, 1.0);
        let baseColor = mix(terrainColor, terrainColor * shading, 0.7);
        return vec4f(
          addContours(baseColor, smoothHeight),
          1
        );
      }
    `,
  });

  const textureResponse = await fetch('/tools/saentis/map.png');
  //const textureResponse = await fetch('/tools/albula/map.png');
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
        texelInMeters: 2
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