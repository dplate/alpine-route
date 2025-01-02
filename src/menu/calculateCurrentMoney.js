export default (system, levels) => {
  return levels.reduce((money, level) => {
    const costs = system.persistence.loadCosts(level);
    return costs ? money + (level.budget - costs) : money;
  }, 0);
};
