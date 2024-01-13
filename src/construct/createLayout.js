export default (system) => {
  const desk = document.createElement('desk');
  desk.id = 'desk';
  
  const magnifier = document.createElement('canvas');
  magnifier.id = 'magnifier';
  desk.appendChild(magnifier);

  const map = document.createElement('canvas');
  map.id = 'map';
  desk.appendChild(map);

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
    map,
    notes,
    profile
  };
};