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

  const tunnelCostsLabel = document.createElement('div');
  tunnelCostsLabel.id = 'tunnelCostsLabel';
  costsContainer.appendChild(tunnelCostsLabel);

  const tunnelCosts = document.createElement('div');
  tunnelCosts.id = 'tunnelCosts';
  costsContainer.appendChild(tunnelCosts);

  const tunnelCostsSelector = document.createElement('div');
  tunnelCostsSelector.id = 'tunnelCostsSelector';
  costsContainer.appendChild(tunnelCostsSelector);

  const bridgeCostsLabel = document.createElement('div');
  bridgeCostsLabel.id = 'bridgeCostsLabel';
  costsContainer.appendChild(bridgeCostsLabel);

  const bridgeCosts = document.createElement('div');
  bridgeCosts.id = 'bridgeCosts';
  costsContainer.appendChild(bridgeCosts);

  const bridgeCostsSelector = document.createElement('div');
  bridgeCostsSelector.id = 'bridgeCostsSelector';
  costsContainer.appendChild(bridgeCostsSelector);

  const groundCostsLabel = document.createElement('div');
  groundCostsLabel.id = 'groundCostsLabel';
  costsContainer.appendChild(groundCostsLabel);

  const groundCosts = document.createElement('div');
  groundCosts.id = 'groundCosts';
  costsContainer.appendChild(groundCosts);

  const groundCostsSelector = document.createElement('div');
  groundCostsSelector.id = 'groundCostsSelector';
  costsContainer.appendChild(groundCostsSelector);

  const costsLabel = document.createElement('div');
  costsLabel.id = 'costsLabel';
  costsContainer.appendChild(costsLabel);

  const costs = document.createElement('div');
  costs.id = 'costs';
  costsContainer.appendChild(costs);

  const costsSelector = document.createElement('div');
  costsSelector.id = 'costsSelector';
  costsContainer.appendChild(costsSelector);

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
    tunnelCostsLabel,
    tunnelCosts,
    tunnelCostsSelector,
    bridgeCostsLabel,
    bridgeCosts,
    bridgeCostsSelector,
    groundCostsLabel,
    groundCosts,
    groundCostsSelector,
    costsLabel,
    costs,
    costsSelector,
    profile
  };
};