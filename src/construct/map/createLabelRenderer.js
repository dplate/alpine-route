const drawPeakSymbol = (context, pixels) => {
  const crossRadius = 3;

  context.beginPath();
  context.moveTo(pixels.x - crossRadius, pixels.y - crossRadius);
  context.lineTo(pixels.x + crossRadius, pixels.y + crossRadius);
  context.moveTo(pixels.x + crossRadius, pixels.y - crossRadius);
  context.lineTo(pixels.x - crossRadius, pixels.y + crossRadius);
  context.stroke();
};

const drawPlaceSymbol = (context, pixels) => {
  context.beginPath();
  context.arc(pixels.x, pixels.y, 2, 0, 2 * Math.PI);
  context.fill();
};

export default (map) => {
  const render = (context, renderTarget) => {
    context.fillStyle = 'rgba(30, 30, 30, 1)';
    context.strokeStyle = 'rgba(30, 30, 30, 1)';
    context.lineWidth = '2';
    context.font = 'normal normal 700 25px mapFont';
    context.textAlign = 'center';
    map.labels.forEach(label => {
      const pixels = renderTarget.camera.transformMetersToPixels(label);
      switch(label.type) {
        case 'peak': 
          drawPeakSymbol(context, pixels);
          break;
        default:
          drawPlaceSymbol(context, pixels);
      }
      context.fillText(label.name, pixels.x, pixels.y - 8);
      context.fillText(Math.round(map.getHeightAtPoint(label)), pixels.x, pixels.y + 25);
      
    });
  };

  return {
    render
  };
};