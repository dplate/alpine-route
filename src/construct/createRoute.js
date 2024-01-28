import calculateDistance from './calculateDistance.js';
import createSpline from './createSpline.js';

const segmentDistance = 5;

const createControlPoint = (point, editable = true) => ({
  x: point.x,
  y: point.y,
  editable
});

const sortPointsByDistance = (points, point) => {
  return [...points].sort((point1, point2) =>
    calculateDistance(point, point1) - calculateDistance(point, point2)
  );
};

export default (level) => {
  const route = {
    controlPoints: [
      createControlPoint(level.start, false),
      createControlPoint(level.end, false)
    ],
    segments: [],
    edit: null,
  };

  route.updateSegments = () => {
    route.segments = [];
    const spline = createSpline(route.controlPoints);
    for (let meter = 0; meter < spline.length; meter += segmentDistance) {
      route.segments.push({
        ...spline.getAtMeter(meter)
      });
    }
  };
  route.updateSegments();

  route.findNearestEditableControlPoint = (position) => {
    const editableControlPoints = route.controlPoints.filter(controlPoint => controlPoint.editable);
    const sortedControlPoints = sortPointsByDistance(editableControlPoints, position);
    return sortedControlPoints[0];
  };

  route.findNearestSegment = (position) => [...route.segments].sort((segment1, segment2) =>
    calculateDistance(position, segment1) - calculateDistance(position, segment2)
  )[0];

  route.createEditByControlPoint = (controlPoint) => {
    if (route.edit?.status === 'moveable') {
      return;
    };
    route.edit = {
      controlPoint,
      status: 'marked'
    }
  };

  route.createEditBySegment = (segment) => {
    if (route.edit?.status === 'moveable') {
      return;
    };
    route.edit = {
      segment,
      status: 'marked'
    }
  };

  route.activateEdit = () => {
    const edit = route.edit;
    if (edit?.status !== 'marked') {
      return false;
    }
    if (edit.controlPoint) {
      edit.status = 'moveable';
    } else if (edit.activateStartTime) {
      edit.activateFactor = (Date.now() - edit.activateStartTime) / 1000;
      if (edit.activateFactor > 1.0) {
        let controlPointIndex = 1;
        for (const segment of route.segments) {
          if (calculateDistance(segment, route.controlPoints[controlPointIndex]) < segmentDistance) {
            controlPointIndex++;
          }
          if (segment === edit.segment) {
            break;
          }
        }
        const newControlPoint = createControlPoint(edit.segment);
        route.controlPoints.splice(controlPointIndex, 0, newControlPoint);
        edit.controlPoint = newControlPoint;
        edit.segment = null;
        edit.status = 'moveable';
        route.updateSegments();
      }
    } else {
      edit.activateStartTime = Date.now();
      edit.activateFactor = 0.0;
    }
    return true;
  };

  route.moveEdit = (newPoint) => {
    if (route.edit?.status !== 'moveable') {
      return null;
    }
    route.edit.controlPoint.x = newPoint.x;
    route.edit.controlPoint.y = newPoint.y;
    route.updateSegments();

    const otherControlPoints = route.controlPoints.filter(controlPoint => controlPoint !== route.edit.controlPoint);
    const nearestControlPoints = sortPointsByDistance(otherControlPoints, newPoint);
    return nearestControlPoints[0];
  };

  route.markEditAsDeletable = (deletable) => {
    route.edit.deletable = deletable
  };

  route.confirmEdit = () => {
    if (!route.edit) {
      return;
    }
    if (route.edit.deletable) {
      const controlPointIndex = route.controlPoints.indexOf(route.edit.controlPoint);
      route.controlPoints.splice(controlPointIndex, 1);
      route.updateSegments();
    }
    route.edit = null;
  };

  route.abortEdit = () => {
    route.edit = null;
  };

  return route;
};