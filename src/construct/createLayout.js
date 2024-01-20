export default (system) => {
  const desk = document.createElement('desk');
  desk.id = 'desk';
  
  const magnifier = document.createElement('canvas');
  magnifier.id = 'magnifier';
  desk.appendChild(magnifier);

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
    magnifier,
    mapContainer,
    map,
    mapRoute,
    notes,
    profile
  };
};