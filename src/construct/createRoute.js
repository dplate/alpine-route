import calculateDistance from './calculateDistance.js';
import createSpline from './createSpline.js';

const segmentDistance = 5;

export default (level) => {
  const route = {
    controlPoints: [
      {
        x: level.start.x,
        y: level.start.y
      },
      {
        x: level.start.x,
        y: level.end.y
      },
      {
        x: level.end.x,
        y: level.end.y
      }
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

  route.findNearestControlPoint = (position) => [...route.controlPoints].sort((controlPoint1, controlPoint2) =>
    calculateDistance(position, controlPoint1) - calculateDistance(position, controlPoint2)
  )[0];

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
        const newControlPoint = {
          x: edit.segment.x,
          y: edit.segment.y
        };
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
      return false;
    }
    route.edit.controlPoint.x = newPoint.x;
    route.edit.controlPoint.y = newPoint.y;
    route.updateSegments();
    return true;
  };

  route.removeEdit = () => {
    route.edit = null;
  };

  return route;
};