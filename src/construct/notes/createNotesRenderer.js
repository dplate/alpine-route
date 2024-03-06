export default (system, layout, route) => {
  layout.tunnelCostsLabel.textContent = system.text.get('TUNNEL_COSTS_LABEL');
  layout.bridgeCostsLabel.textContent = system.text.get('BRIDGE_COSTS_LABEL');
  layout.groundCostsLabel.textContent = system.text.get('GROUND_COSTS_LABEL');
  layout.costsLabel.textContent = system.text.get('COSTS_LABEL');

  const render = () => {
    layout.tunnelCosts.textContent = Math.round(route.costs.tunnels);
    layout.bridgeCosts.textContent = Math.round(route.costs.bridges);
    layout.groundCosts.textContent = Math.round(route.costs.grounds);
    layout.costs.textContent = Math.round(route.costs.total);
  };

  return {
    render
  };
};