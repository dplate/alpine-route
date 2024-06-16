import createMenuLayout from './createMenuLayout.js';
import createLevelSelector from './createLevelSelector.js';

export default async (system, levels) => {
  const layout = createMenuLayout(system);
  const level = await createLevelSelector(system, layout, levels);
  return level;
};