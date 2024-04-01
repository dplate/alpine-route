import { COSTS_HIGHLIGHTS, LIMIT_HIGHLIGHTS } from './cameras/highlightTypes.js';
import calculateMapDistance from './map/calculateMapDistance.js';
import { LIMIT_TYPES, LIMIT_TYPES_TO_HIGHLIGHTS } from './route/limitTypes.js';
import { ROUTE_TYPES_TO_HIGHLIGHTS, ROUTE_TYPES } from './route/routeTypes.js';

const controlPointSnapDistance = 50;
const segmentSnapDistances = 20;
const heightSnapDistance = 10;

const proposeRouteEditPoint = (camera, route, pixels, findNearestEditableControlPoint, findNearestSegment) => {
  const point = camera.transformPixelsToMeters(pixels);
  const nearestControlPoint = findNearestEditableControlPoint(point);
  if (nearestControlPoint) {
    const nearestControlPixels = camera.transformMetersToPixels(nearestControlPoint);
    if (calculateMapDistance(pixels, nearestControlPixels) < controlPointSnapDistance) {
      route.createEditByControlPoint(nearestControlPoint);
      return;
    }
  }
  const nearestSegment = findNearestSegment(point);
  const nearestSegmentPixels = camera.transformMetersToPixels(nearestSegment);
  if (calculateMapDistance(pixels, nearestSegmentPixels) < segmentSnapDistances) {
    route.createEditBySegment(nearestSegment);
  } else {
    route.abortEdit();
  }
};

const handleRouteEditingOnMap = (cameras, route, pixels) => {
  const newPoint = cameras.map.transformPixelsToMeters(pixels);
  const nearestControlPoint = route.moveEdit(newPoint);
  if (!nearestControlPoint) {
    return false;
  }
  const nearestControlPixels = cameras.map.transformMetersToPixels(nearestControlPoint);
  route.markEditAsDeletable(calculateMapDistance(pixels, nearestControlPixels) < segmentSnapDistances);
  return true;
};

const handleRouteEditingOnProfile = (cameras, route, pixels) => {
  const snapHeight = cameras.profile.transformPixelDistanceToHeightDifference(heightSnapDistance);
  const newPoint = cameras.profile.transformPixelsToMeters(pixels);
  route.elevateEdit(newPoint, snapHeight);
};

const addHighlightSelectorHandling = (cameras, routeRenderer, notesRenderer, elements, highlightType) => {
  [ elements.label, elements.value, elements.selector ].forEach(element => {
    element.onclick = () => {
      if (cameras.highlights.has(highlightType)) {
        cameras.highlights.delete(highlightType);
      } else {
        if ((COSTS_HIGHLIGHTS.has(highlightType) && !COSTS_HIGHLIGHTS.has(cameras.highlights.values().next().value)) ||
            (LIMIT_HIGHLIGHTS.has(highlightType) && !LIMIT_HIGHLIGHTS.has(cameras.highlights.values().next().value))) {
          cameras.highlights.clear();
        }
        cameras.highlights.add(highlightType);
      }
      routeRenderer.render();
      notesRenderer.render();
    };
  })
};

const transformTouchToPixels = (touch, canvas) => {
  const boundingRect = canvas.getBoundingClientRect();
  return { x: touch.clientX - boundingRect.x, y: touch.clientY - boundingRect.y };
};

export default (layout, cameras, route, mapRenderer, routeRenderer, notesRenderer) => {
  const state = {
    touchInterval: null,
    previousTouchOfDrag: null,
    previousPinchDistance: null
  };

  const startEditing = (createOnGround) => {
    clearInterval(state.touchInterval);
    state.touchInterval = setInterval(() => {
      if (route.activateEdit(createOnGround)) {
        routeRenderer.render();
      }
    }, 20);
  };

  const stopEditing = (event) => {
    state.previousTouchOfDrag = null;
    state.previousPinchDistance = null;
    clearInterval(state.touchInterval);
    route.confirmEdit();
    mapRenderer.render();
    routeRenderer.render();
    event.preventDefault();
  };

  const handleMapDrag = (pixels, movementPixels, touched) => {
    cameras.magnifier.setByMapPixels(pixels);
    if (touched && !handleRouteEditingOnMap(cameras, route, pixels)) {
      cameras.map.moveByPixels(movementPixels);
      cameras.update();
    } else {
      proposeRouteEditPoint(
        cameras.map, 
        route,
        pixels,
        (point) => route.findNearestEditableControlPointByMapMeters(point),
        (point) => route.findNearestSegmentByMapMeters(point)
      );
    }

    mapRenderer.render();
    routeRenderer.render();
    notesRenderer.render();
  };

  const handleProfileDrag = (pixels, touched) => {
    cameras.magnifier.setByProfilePixels(pixels);
    if (touched) {
      handleRouteEditingOnProfile(cameras, route, pixels);
    } else {
      proposeRouteEditPoint(
        cameras.profile, 
        route,
        pixels,
        (point) => route.findNearestEditableControlPointByProfileMeters(point),
        (point) => route.findNearestSegmentByProfileMeters(point)
      );
    }

    routeRenderer.render();
    notesRenderer.render();
  };

  layout.mapContainer.onwheel = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.map.zoomIn(-amount, pixels) : cameras.map.zoomOut(amount, pixels);
    mapRenderer.render();
    routeRenderer.render();
  };

  layout.mapContainer.ontouchstart = (event) => {
    startEditing(true);
    proposeRouteEditPoint(
      cameras.map, 
      route,
      transformTouchToPixels(event.targetTouches[0], layout.mapContainer),
      (point) => route.findNearestEditableControlPointByMapMeters(point),
      (point) => route.findNearestSegmentByMapMeters(point)
    );
  };

  layout.mapContainer.ontouchmove = (event) => {
    const touch = event.targetTouches[0];
    const pixels = transformTouchToPixels(touch, layout.mapContainer);

    if (event.targetTouches[1]) {
      const pixels2 = transformTouchToPixels(event.targetTouches[1], layout.mapContainer);
      const pinchDistance = Math.sqrt(
        (pixels.x - pixels2.x) ** 2 +
        (pixels.y - pixels2.y) ** 2
      );
      const centerPixels = {
        x: (pixels.x + pixels2.x) / 2.0,
        y: (pixels.y + pixels2.y) / 2.0
      };
      if (!state.previousPinchDistance) {
        state.previousPinchDistance = pinchDistance;
      }
      cameras.map.zoomIn(pinchDistance / state.previousPinchDistance, centerPixels);

      state.previousPinchDistance = pinchDistance;
      mapRenderer.render();
      routeRenderer.render();
      event.preventDefault();
      return;
    }
        
    const movementPixels = state.previousTouchOfDrag ? 
      { x: -(touch.clientX - state.previousTouchOfDrag.clientX), y: -(touch.clientY - state.previousTouchOfDrag.clientY) } :
      { x: 0, y: 0 };
    handleMapDrag(pixels, movementPixels, true)

    state.previousTouchOfDrag = touch;
  };

  layout.mapContainer.ontouchend = stopEditing;
  layout.mapContainer.ontouchcancel = stopEditing;

  layout.mapContainer.onmousedown = () => startEditing(true);

  layout.mapContainer.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    const movementPixels = { x: -event.movementX, y: -event.movementY };
    handleMapDrag(pixels, movementPixels, event.buttons === 1);
  };

  layout.mapContainer.onmouseup = stopEditing;

  layout.profile.ontouchstart = (event) => {
    startEditing(false);
    proposeRouteEditPoint(
      cameras.profile, 
      route,
      transformTouchToPixels(event.targetTouches[0], layout.profile),
      (point) => route.findNearestEditableControlPointByProfileMeters(point),
      (point) => route.findNearestSegmentByProfileMeters(point)
    );
  }

  layout.profile.ontouchmove = (event) => {
    const pixels = transformTouchToPixels(event.targetTouches[0], layout.profile);
    handleProfileDrag(pixels, true);
  };

  layout.profile.ontouchend = stopEditing;
  
  layout.profile.ontouchcancel = stopEditing;

  layout.profile.onmousedown = () => startEditing(false);

  layout.profile.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    handleProfileDrag(pixels, event.buttons === 1);
  };

  layout.profile.onmouseup = stopEditing;

  ROUTE_TYPES.forEach(routeType => {
    addHighlightSelectorHandling(
      cameras, 
      routeRenderer, 
      notesRenderer,
      layout.routeTypeCosts[routeType], 
      ROUTE_TYPES_TO_HIGHLIGHTS[routeType]
    );
  });
  LIMIT_TYPES.forEach(limitType => {
    addHighlightSelectorHandling(
      cameras, 
      routeRenderer, 
      notesRenderer,
      layout.limits[limitType], 
      LIMIT_TYPES_TO_HIGHLIGHTS[limitType]
    );
  });
};