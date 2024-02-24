import calculateMapDistance from '../map/calculateMapDistance.js';
import calculateProfileDistance from './calculateProfileDistance.js';
import createSpline from './createSpline.js';

const segmentDistance = 5;
export const TYPE_BRIDGE = 'bridge';
export const TYPE_TUNNEL = 'tunnel';
export const TYPE_GROUND = 'ground';

const createControlPoint = (point, onGround, editable = true) => ({
  x: point.x,
  y: point.y,
  z: point.z,
  meter: null,
  flatMeter: null,
  mapHeight: null,
  editable,
  onGround
});

const sortPointsByMapDistance = (points, point) => {
  return [...points].sort((point1, point2) =>
    calculateMapDistance(point, point1) - calculateMapDistance(point, point2)
  );
};

const sortPointsByProfileDistance = (points, point) => {
  return [...points].sort((point1, point2) =>
    calculateProfileDistance(point, point1) - calculateProfileDistance(point, point2)
  );
};

const determineType = (trackHeight, mapHeight) => {
  const difference = trackHeight - mapHeight;
  if (difference > 5) {
    return TYPE_BRIDGE;
  }
  if (difference < -5) {
    return TYPE_TUNNEL;
  }
  return TYPE_GROUND;
};

export default (level, map) => {
  const route = {
    controlPoints: [
      createControlPoint(level.start, true, false),
      createControlPoint(level.end, true, false)
    ],
    segments: [],
    edit: null,
  };

  route.updateSegments = () => {
    route.segments = [];
    route.controlPoints.forEach((controlPoint) => {
      controlPoint.mapHeight = map.getHeightAtPoint(controlPoint);
      if (controlPoint.onGround) {
        controlPoint.z = controlPoint.mapHeight;
      }
    });
    const spline = createSpline(route.controlPoints);
    for (let meter = 0; meter < spline.length; meter += segmentDistance) {
      const point = spline.getAtMeter(meter);
      const mapHeight = map.getHeightAtPoint(point);
      const lastPoint = route.segments[route.segments.length - 1];
      const flatMeter = lastPoint ? lastPoint.flatMeter + Math.sqrt((point.x - lastPoint.x)**2 + (point.y - lastPoint.y)**2) : 0;
      
      route.segments.push({
        ...point,
        mapHeight,
        meter,
        flatMeter,
        type: determineType(point.z, mapHeight)
      });
    }
    route.controlPoints.forEach((controlPoint, index) => {
      controlPoint.meter = spline.getLengthAtPointIndex(index);
      controlPoint.flatMeter = spline.getFlatLengthAtPointIndex(index);
    });
  };
  route.updateSegments();

  route.findNearestEditableControlPointByMapMeters = (point) => {
    const editableControlPoints = route.controlPoints.filter(controlPoint => controlPoint.editable);
    const sortedControlPoints = sortPointsByMapDistance(editableControlPoints, point);
    return sortedControlPoints[0];
  };

  route.findNearestEditableControlPointByProfileMeters = (point) => {
    const editableControlPoints = route.controlPoints.filter(controlPoint => controlPoint.editable);
    const sortedControlPoints = sortPointsByProfileDistance(editableControlPoints, point);
    return sortedControlPoints[0];
  };

  route.findNearestSegmentByMapMeters = (point) => [...route.segments].sort((segment1, segment2) =>
    calculateMapDistance(point, segment1) - calculateMapDistance(point, segment2)
  )[0];

  route.findNearestSegmentByProfileMeters = (point) => [...route.segments].sort((segment1, segment2) =>
    calculateProfileDistance(point, segment1) - calculateProfileDistance(point, segment2)
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

  route.activateEdit = (createOnGround) => {
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
          if (calculateMapDistance(segment, route.controlPoints[controlPointIndex]) < segmentDistance) {
            controlPointIndex++;
          }
          if (segment === edit.segment) {
            break;
          }
        }
        const newControlPoint = createControlPoint(edit.segment, createOnGround);
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
    const nearestControlPoints = sortPointsByMapDistance(otherControlPoints, newPoint);
    return nearestControlPoints[0];
  };

  route.elevateEdit = (newPoint, snapHeight) => {
    if (route.edit?.status !== 'moveable') {
      return null;
    }
    if (Math.abs(newPoint.z - route.edit.controlPoint.mapHeight) < snapHeight) {
      route.edit.controlPoint.z = route.edit.controlPoint.mapHeight;
      route.edit.controlPoint.onGround = true;
    } else {
      route.edit.controlPoint.z = newPoint.z;
      route.edit.controlPoint.onGround = false;
    }
    route.updateSegments();
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