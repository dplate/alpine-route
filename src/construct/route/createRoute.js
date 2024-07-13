import calculateMapDistance from '../map/calculateMapDistance.js';
import calculateCosts from './calculateCosts.js';
import calculateProfileDistance from './calculateProfileDistance.js';
import calculateAttributes from './calculateAttributes.js';
import checkLimits from './checkLimits.js';
import createSpline from './createSpline.js';
import determineTypes from './determineTypes.js';

const segmentDistance = 5;

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

const loadRoute = (system, level) => {
  const rawControlPoints = system.persistence.loadRoute(level) || [];
  const editableControlPoints = rawControlPoints.map(([x, y, z]) => createControlPoint({x, y, z}, z === null));
  return {
    controlPoints: [
      createControlPoint(level.start, true, false),
      ...editableControlPoints,
      createControlPoint(level.end, true, false)
    ],
    segments: [],
    edit: null,
  };
};

const saveRoute = (system, level, route) => {
  const editableControlPoints = route.controlPoints.filter(controlPoint => controlPoint.editable);
  const rawControlPoints = editableControlPoints.map(({ x, y, z, onGround }) => [x, y, onGround ? null : z]);
  system.persistence.saveRoute(level, rawControlPoints);
  const valid = Object.values(route.limits).every(limit => limit.valid);
  system.persistence.saveCosts(level, valid ? Math.round(route.costs.total.sum) : null);
};

const smoothControlPointHeights = (controlPoints) => {
  for (let run = 0; run < 5; run++) {
    controlPoints.forEach((point, index) => {
      if (point.onGround && index >= 1 && index <= controlPoints.length - 2) {
        const previousPoint = controlPoints[index - 1];
        const nextPoint = controlPoints[index + 1];
        const flatMeterFactor = (point.flatMeter - previousPoint.flatMeter) / (nextPoint.flatMeter - previousPoint.flatMeter) 
        const optimalHeight = previousPoint.z * (1.0 - flatMeterFactor) + nextPoint.z * flatMeterFactor;
        const newHeight = Math.max(point.mapHeight - 2.0, Math.min(optimalHeight, point.mapHeight + 2.0));
        point.z = newHeight;
      }
    });
  }
};

const updateSegments = (map, route) => {
  route.segments = [];
  const spline = createSpline(route.controlPoints);
  for (let meter = 0; meter <= spline.length; meter += Math.max(0.1, Math.min(segmentDistance, spline.length - meter))) {
    const point = spline.getAtMeter(meter);
    const mapHeight = map.getHeightAtPoint(point);
    const lastPoint = route.segments[route.segments.length - 1];
    const flatMeter = lastPoint ? lastPoint.flatMeter + Math.sqrt((point.x - lastPoint.x)**2 + (point.y - lastPoint.y)**2) : 0;
    
    route.segments.push({
      ...point,
      mapHeight,
      meter,
      flatMeter,
      type: null,
      costs: null
    });
  }
  route.controlPoints.forEach((controlPoint, index) => {
    controlPoint.meter = spline.getLengthAtPointIndex(index);
    controlPoint.flatMeter = spline.getFlatLengthAtPointIndex(index);
  });
};

export default (system, level, map) => {
  const route = loadRoute(system, level);

  route.calculateRoute = () => {
    route.controlPoints.forEach((controlPoint) => {
      controlPoint.mapHeight = map.getHeightAtPoint(controlPoint);
      if (controlPoint.onGround) {
        controlPoint.z = controlPoint.mapHeight;
      } else {
        controlPoint.z = Math.round(controlPoint.z * 10) / 10;
      }
      controlPoint.x = Math.round(controlPoint.x * 10) / 10;
      controlPoint.y = Math.round(controlPoint.y * 10) / 10;
    });
    updateSegments(map, route);
    smoothControlPointHeights(route.controlPoints);
    updateSegments(map, route);
    
    determineTypes(route);
    calculateAttributes(route);
    calculateCosts(route, level, map);
    checkLimits(route, level);
  };
  route.calculateRoute();

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
        route.calculateRoute();
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
    route.calculateRoute();

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
    route.calculateRoute();
    return route.edit.controlPoint;
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
      route.calculateRoute();
    }
    route.edit = null;
    saveRoute(system, level, route);
  };

  route.abortEdit = () => {
    route.edit = null;
  };

  return route;
};