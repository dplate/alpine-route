import { ROUTE_TYPE_BRIDGE, ROUTE_TYPE_GROUND, ROUTE_TYPE_TUNNEL } from './route/routeTypes.js';

export default (system) => {
  const desk = document.createElement('desk');
  desk.id = 'desk';
  
  const magnifierContainer = document.createElement('div');
  magnifierContainer.id = 'magnifierContainer';

  const magnifier = document.createElement('canvas');
  magnifier.id = 'magnifier';
  magnifierContainer.appendChild(magnifier);

  const magnifierRoute = document.createElement('canvas');
  magnifierRoute.id = 'magnifierRoute';
  magnifierContainer.appendChild(magnifierRoute);

  desk.appendChild(magnifierContainer);

  const mapContainer = document.createElement('div');
  mapContainer.id = 'mapContainer';

  const map = document.createElement('canvas');
  map.id = 'map';
  mapContainer.appendChild(map);

  const mapRoute = document.createElement('canvas');
  mapRoute.id = 'mapRoute';
  mapContainer.appendChild(mapRoute);

  desk.appendChild(mapContainer);
  
  const notes = document.createElement('div');
  notes.id = 'notes';
  desk.appendChild(notes);

  const costsContainer = document.createElement('div');
  costsContainer.id = 'costsContainer';
  notes.appendChild(costsContainer);

  const createCostsElements = (type) => {
    const label = document.createElement('div');
    label.id = `${type}CostsLabel`;
    costsContainer.appendChild(label);
  
    const costs = document.createElement('div');
    costs.id = `${type}Costs`;
    costsContainer.appendChild(costs);
  
    const selector = document.createElement('div');
    selector.id = `${type}CostsSelector`;
    costsContainer.appendChild(selector);

    return {
      label,
      costs,
      selector
    };
  };

  const routeTypeCosts = [ROUTE_TYPE_TUNNEL, ROUTE_TYPE_BRIDGE, ROUTE_TYPE_GROUND].reduce(
    (routeTypeCosts, routeType) => ({ ...routeTypeCosts, [routeType]: createCostsElements(routeType) }),
    {}
  );
  const totalCosts = createCostsElements('total');  

  const profile = document.createElement('canvas');
  profile.id = 'profile';
  desk.appendChild(profile);

  system.window.document.body.appendChild(desk);

  return {
    desk,
    magnifierContainer,
    magnifier,
    magnifierRoute,
    mapContainer,
    map,
    mapRoute,
    routeTypeCosts,
    totalCosts,
    profile
  };
};