import createMenuLayout from './createMenuLayout.js';
import createLevelSelector from './createLevelSelector.js';
import createAccount from './createAccount.js';

export default async (system, levels) => {
  const layout = createMenuLayout(system);
  const levelPromise = createLevelSelector(system, layout, levels);
  createAccount(system, layout, levels);
  return await levelPromise;
};