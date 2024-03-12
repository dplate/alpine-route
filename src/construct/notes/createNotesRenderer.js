import { HIGHLIGHT_BRIDGE_COSTS, HIGHLIGHT_COSTS, HIGHLIGHT_GROUND_COSTS, HIGHLIGHT_TUNNEL_COSTS } from '../cameras/highlightTypes.js';

export default (system, layout, cameras, route) => {
  layout.tunnelCostsLabel.textContent = system.text.get('TUNNEL_COSTS_LABEL');
  layout.bridgeCostsLabel.textContent = system.text.get('BRIDGE_COSTS_LABEL');
  layout.groundCostsLabel.textContent = system.text.get('GROUND_COSTS_LABEL');
  layout.costsLabel.textContent = system.text.get('COSTS_LABEL');

  const render = () => {
    layout.tunnelCosts.textContent = system.text.formatCurrency(route.costs.tunnel.sum);
    layout.bridgeCosts.textContent = system.text.formatCurrency(route.costs.bridge.sum);
    layout.groundCosts.textContent = system.text.formatCurrency(route.costs.ground.sum);
    layout.costs.textContent = system.text.formatCurrency(route.costs.total.sum);

    layout.tunnelCostsSelector.style.opacity = cameras.highlight === HIGHLIGHT_TUNNEL_COSTS ? 1.0 : 0.5;
    layout.bridgeCostsSelector.style.opacity = cameras.highlight === HIGHLIGHT_BRIDGE_COSTS ? 1.0 : 0.5;
    layout.groundCostsSelector.style.opacity = cameras.highlight === HIGHLIGHT_GROUND_COSTS ? 1.0 : 0.5;
    layout.costsSelector.style.opacity = cameras.highlight === HIGHLIGHT_COSTS ? 1.0 : 0.5;
  };

  return {
    render
  };
};