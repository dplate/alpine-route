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
        console.log(COSTS_HIGHLIGHTS.has(highlightType), cameras.highlights.values()[0], !COSTS_HIGHLIGHTS.has(cameras.highlights.values[0]) );
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

export default (layout, cameras, route, mapRenderer, routeRenderer, notesRenderer) => {
  const state = {
    touchInterval: null,
    previousTouchOfDrag: null,
    startPinchDistance: null
  };

  const startEditing = (createOnGround) => {
    clearInterval(state.touchInterval);
    state.touchInterval = setInterval(() => {
      if (route.activateEdit(createOnGround)) {
        routeRenderer.render();
      }
    }, 20);
  };

  const stopEditing = () => {
    clearInterval(state.touchInterval);
    route.confirmEdit();
  };

  const handleMapDrag = (pixels, movementPixels, touched) => {
    cameras.magnifier.setByMapPixels(pixels);
    if (touched && !handleRouteEditingOnMap(cameras, route, pixels)) {
      cameras.map.moveByPixels(movementPixels);
    } else {
      proposeRouteEditPoint(
        cameras.map, 
        route,
        pixels,
        (point) => route.findNearestEditableControlPointByMapMeters(point),
        (point) => route.findNearestSegmentByMapMeters(point)
      );
    }

    cameras.update();
    mapRenderer.render();
    routeRenderer.render();
    notesRenderer.render();
  }

  layout.mapContainer.onwheel = (event) => {
    const amount = event.deltaY / 90.0;
    amount < 0 ? cameras.map.zoomIn(-amount) : cameras.map.zoomOut(amount);
    mapRenderer.render();
    routeRenderer.render();
  };

  layout.mapContainer.ontouchmove = (event) => {
    if (event.targetTouches.length === 2) {
      const pinchDistance = Math.sqrt(
        (event.targetTouches[0].clientX - event.targetTouches[1].clientX) ** 2 +
        (event.targetTouches[0].clientY - event.targetTouches[1].clientY) ** 2
      );
      if (!state.startPinchDistance) {
        state.startPinchDistance = pinchDistance;
      }
      cameras.map.setScale(pinchDistance / state.startPinchDistance);
      event.preventDefault();
      return;
    }

    const touch = event.targetTouches[0];
    const boundingRect = layout.mapContainer.getBoundingClientRect();

    const pixels = { x: touch.clientX - boundingRect.x, y: touch.clientY - boundingRect.y };
    const movementPixels = state.previousTouchOfDrag ? 
      { x: -(touch.clientX - state.previousTouchOfDrag.clientX), y: -(touch.clientY - state.previousTouchOfDrag.clientY) } :
      { x: 0, y: 0 };
    handleMapDrag(pixels, movementPixels, true)

    state.previousTouchOfDrag = touch;
  };

  layout.mapContainer.ontouchcancel = () => state.previousTouchOfDrag = null;

  layout.mapContainer.ontouchend = () => state.previousTouchOfDrag = null;

  layout.mapContainer.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    const movementPixels = { x: -event.movementX, y: -event.movementY };
    handleMapDrag(pixels, movementPixels, event.buttons === 1);
  };

  layout.mapContainer.onmousedown = () => startEditing(true);

  layout.mapContainer.onmouseup = stopEditing;

  layout.mapContainer.onclick = (event) => {
    console.log(cameras.map.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
  }

  layout.profile.onmousemove = (event) => {
    const pixels = { x: event.offsetX, y: event.offsetY };
    if (event.buttons === 1) {
      handleRouteEditingOnProfile(cameras, route, pixels);
    }
    
    cameras.magnifier.setByProfilePixels(pixels);

    proposeRouteEditPoint(
      cameras.profile, 
      route,
      pixels,
      (point) => route.findNearestEditableControlPointByProfileMeters(point),
      (point) => route.findNearestSegmentByProfileMeters(point)
    );

    routeRenderer.render();
    notesRenderer.render();
  };

  layout.profile.onmousedown = () => startEditing(false);

  layout.profile.onmouseup = stopEditing;

  layout.profile.onclick = (event) => {
    console.log(cameras.profile.transformPixelsToMeters({ x: event.offsetX, y: event.offsetY }));
  }

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