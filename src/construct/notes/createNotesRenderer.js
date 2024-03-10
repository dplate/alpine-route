export default (system, layout, route) => {
  layout.tunnelCostsLabel.textContent = system.text.get('TUNNEL_COSTS_LABEL');
  layout.bridgeCostsLabel.textContent = system.text.get('BRIDGE_COSTS_LABEL');
  layout.groundCostsLabel.textContent = system.text.get('GROUND_COSTS_LABEL');
  layout.costsLabel.textContent = system.text.get('COSTS_LABEL');

  const render = () => {
    layout.tunnelCosts.textContent = system.text.formatCurrency(route.costs.tunnels);
    layout.bridgeCosts.textContent = system.text.formatCurrency(route.costs.bridges);
    layout.groundCosts.textContent = system.text.formatCurrency(route.costs.grounds);
    layout.costs.textContent = system.text.formatCurrency(route.costs.total);
  };

  return {
    render
  };
};