const drawContourLines = (context, renderCamera, profileCamera) => {
  context.lineCap = 'round';
  context.strokeStyle = 'rgb(126, 119, 51, 0.5)';
  context.shadowBlur = 0; 
  
  const distances = [ 1, 2, 5, 10, 20, 100 ];
  const distanceHint = Math.floor(Math.sqrt(Math.sqrt((profileCamera.maxHeight - profileCamera.minHeight))));
  const distance = distances[Math.max(0, Math.min(distanceHint, distances.length - 1))];
 
  for (
    let height = profileCamera.minHeight - profileCamera.minHeight % distance; 
    height < profileCamera.maxHeight; 
    height += distance
  ) {
    if (height % 100 === 0) {
      context.lineWidth = 1.2;
    } else {
      context.lineWidth = 0.5;
    }
    context.beginPath();
    const startPixels = renderCamera.transformMetersToPixels({ 
      flatMeter: profileCamera.minFlatMeter, 
      z: height
    });
    context.moveTo(startPixels.x, startPixels.y);

    const endPixels = renderCamera.transformMetersToPixels({ 
      flatMeter: profileCamera.maxFlatMeter, 
      z: height
    });
    context.lineTo(endPixels.x, endPixels.y);

    context.stroke(); 
  }
};

export default (context, route, renderTarget, profileCamera) => {
  const transformToPixels = (segment) => renderTarget.camera.transformMetersToPixels({ 
    flatMeter: segment.flatMeter, 
    z: Math.abs(segment.mapHeight - segment.z) < 5 ? segment.z : segment.mapHeight
  });
  const startPixels = transformToPixels(route.segments[0]);
  
  context.save();
  context.moveTo(startPixels.x, renderTarget.canvas.height);
  context.beginPath();
  route.segments.forEach((segment, index) => {
    const pixels = transformToPixels(segment);
    context.lineTo(pixels.x, pixels.y);
    if (index === route.segments.length - 1) {
      context.lineTo(pixels.x, renderTarget.canvas.height);
      context.lineTo(startPixels.x, renderTarget.canvas.height);
    }
  });
  context.clip();

  context.moveTo(startPixels.x, startPixels.y);
  context.lineWidth = 5;
  context.lineCap = 'round';
  context.strokeStyle = 'rgb(150, 150, 150)';
  context.shadowColor = 'rgba(0, 0, 0)';
  context.shadowBlur = 30; 
  
  context.beginPath();
  route.segments.forEach((segment) => {
    const pixels = transformToPixels(segment);
    context.lineTo(pixels.x, pixels.y);
  });
  context.stroke(); 

  drawContourLines(context, renderTarget.camera, profileCamera);
  
  context.restore();
};