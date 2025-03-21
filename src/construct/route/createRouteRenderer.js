import drawRadiusLimits from './drawRadiusLimits.js';
import drawRidge from './drawRidge.js';
import drawSegments from './drawSegments.js';

const pointVariants = {
  fixPoint: {
    fillStyle: 'rgba(150, 0, 0, 0.3)',
    strokeStyle: 'rgba(150, 0, 0, 0.6)',
  },
  editPoint: {
    fillStyle: 'rgba(200, 200, 50, 0.6)',
    strokeStyle: 'rgba(200, 200, 50, 1.0)',
  },
  deletablePoint: {
    fillStyle: 'rgba(200, 50, 200, 0.6)',
    strokeStyle: 'rgba(200, 50, 200, 1.0)',
  },
};

const drawPoint = (context, point, variant, fillFactor, renderTarget) => {
  const realRadius = 15;
  const minStrokeWidth = 2;
  const strokeWidth =
    minStrokeWidth + (realRadius - minStrokeWidth) * fillFactor;
  const radius = realRadius - strokeWidth / 2.0;
  const pixels = renderTarget.camera.transformMetersToPixels(point);
  context.beginPath();
  context.arc(pixels.x, pixels.y, radius, 0, 2 * Math.PI);
  context.fillStyle = variant.fillStyle;
  context.fill();
  context.lineWidth = strokeWidth;
  context.strokeStyle = variant.strokeStyle;
  context.stroke();
};

const drawControlPoints = (context, route, renderTarget) => {
  route.controlPoints.forEach((controlPoint) => {
    if (controlPoint.editable) {
      const isEdit = route.edit?.controlPoint === controlPoint;
      drawPoint(
        context,
        controlPoint,
        isEdit
          ? route.edit.deletable
            ? pointVariants.deletablePoint
            : pointVariants.editPoint
          : pointVariants.fixPoint,
        isEdit ? 1.0 : 0.0,
        renderTarget,
      );
    }
  });
};

const drawEditPoints = (context, route, renderTarget) => {
  route.segments.forEach((segment) => {
    if (route.edit?.segment === segment) {
      drawPoint(
        context,
        segment,
        pointVariants.editPoint,
        route.edit.activateFactor || 0.0,
        renderTarget,
      );
    }
  });
};

export default (system, level, layout, cameras, route, labelRenderer) => {
  const renderTargets = [
    {
      canvas: layout.mapRoute,
      camera: cameras.map,
    },
    {
      canvas: layout.profile,
      camera: cameras.profile,
    },
    {
      canvas: layout.magnifierRoute,
      camera: cameras.magnifier,
    },
  ];

  const render = () => {
    renderTargets.forEach((renderTarget) => {
      if (
        !renderTarget.canvas.width ||
        !renderTarget.canvas.height ||
        renderTarget.camera.isDisabled()
      ) {
        return;
      }
      const context = renderTarget.canvas.getContext('2d');
      context.clearRect(
        0,
        0,
        renderTarget.canvas.width,
        renderTarget.canvas.height,
      );

      if (renderTarget.camera.isProfile()) {
        drawRidge(context, route, renderTarget, cameras.profile);
      } else {
        labelRenderer.render(context, renderTarget);
      }

      drawControlPoints(context, route, renderTarget);
      drawEditPoints(context, route, renderTarget);

      if (!renderTarget.camera.isProfile()) {
        drawRadiusLimits(context, level, route, renderTarget);
      }

      drawSegments(context, level, route, renderTarget, cameras.highlights);
    });
  };

  system.handleCanvasResize(
    renderTargets.map((renderTarget) => renderTarget.canvas),
    render,
  );

  return {
    render,
  };
};
