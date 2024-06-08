import { LIMIT_TYPES } from './route/limitTypes.js';
import { ROUTE_TYPES } from './route/routeTypes.js';


export default (system) => {
  const desk = document.createElement('desk');
  desk.id = 'desk';

  const mapAndProfileContainer = document.createElement('div');
  mapAndProfileContainer.id = 'mapAndProfileContainer';

  const mapContainer = document.createElement('div');
  mapContainer.id = 'mapContainer';

  const map = document.createElement('canvas');
  map.id = 'map';
  mapContainer.appendChild(map);

  const mapRoute = document.createElement('canvas');
  mapRoute.id = 'mapRoute';
  mapContainer.appendChild(mapRoute);

  const mapBorder = document.createElement('div');
  mapBorder.id = 'mapBorder';
  mapContainer.appendChild(mapBorder);

  mapAndProfileContainer.appendChild(mapContainer);

  const notesContainer = document.createElement('div');
  notesContainer.id = 'notesContainer';
  desk.appendChild(notesContainer);
  
  const notes = document.createElement('div');
  notes.id = 'notes';
  notesContainer.appendChild(notes);

  const createNoteElements = (container, type, withSelector = true) => {
    const label = document.createElement('div');
    label.id = `${type}Label`;
    container.appendChild(label);
  
    const value = document.createElement('div');
    value.id = `${type}Value`;
    value.className = 'value';
    container.appendChild(value);
  
    const selector = document.createElement('div');
    if (withSelector) {
      selector.id = `${type}Selector`;
      selector.className = 'selector';
      
    }
    container.appendChild(selector);

    return {
      label,
      value,
      selector
    };
  };

  const costsContainer = document.createElement('div');
  costsContainer.id = 'costsContainer';
  notes.appendChild(costsContainer);

  const budget = createNoteElements(costsContainer, 'budget', false);

  const routeTypeCosts = ROUTE_TYPES.reduce(
    (routeTypeCosts, routeType) => ({ ...routeTypeCosts, [routeType]: createNoteElements(costsContainer, `${routeType}Costs`) }),
    {}
  );
  const balance = createNoteElements(costsContainer, 'balance', false);

  const limitsContainer = document.createElement('div');
  limitsContainer.id = 'limitsContainer';
  notes.appendChild(limitsContainer);

  const limits = LIMIT_TYPES.reduce(
    (limits, limitType) => ({ ...limits, [limitType]: createNoteElements(limitsContainer, `${limitType}Limit`) }),
    {}
  );

  const endButton = document.createElement('button');
  endButton.id = 'endButton';
  notes.appendChild(endButton);
 
  const profile = document.createElement('canvas');
  profile.id = 'profile';
  mapAndProfileContainer.appendChild(profile);

  desk.appendChild(mapAndProfileContainer);

  system.window.document.body.appendChild(desk);

  const magnifierContainer = document.createElement('div');
  magnifierContainer.id = 'magnifierContainer';

  const magnifier = document.createElement('canvas');
  magnifier.id = 'magnifier';
  magnifierContainer.appendChild(magnifier);

  const magnifierRoute = document.createElement('canvas');
  magnifierRoute.id = 'magnifierRoute';
  magnifierContainer.appendChild(magnifierRoute);

  const magnifierBorder = document.createElement('div');
  magnifierBorder.id = 'magnifierBorder';
  magnifierContainer.appendChild(magnifierBorder);

  system.window.document.body.appendChild(magnifierContainer);

  const profileToggle = document.createElement('div'); 
  profileToggle.id = 'profileToggle';
  system.window.document.body.appendChild(profileToggle);

  const notesToggle = document.createElement('div'); 
  notesToggle.id = 'notesToggle';
  system.window.document.body.appendChild(notesToggle);

  return {
    desk,
    magnifierContainer,
    magnifier,
    magnifierRoute,
    mapContainer,
    map,
    mapRoute,
    budget,
    routeTypeCosts,
    balance,
    limits,
    endButton,
    profile,
    profileToggle,
    notesContainer,
    notesToggle
  };
};