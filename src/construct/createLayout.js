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
    notes,
    profile
  };
};