import startConstruct from './construct/startConstruct.js';
import startMenu from './menu/startMenu.js';
import setupSystem from './system/setupSystem.js';
import levels from './levels.js';

async function main() {
  const system = await setupSystem(window, 'de');
  if (!system) {
    return;
  }
  while(1) {
    const level = await startMenu(system, levels);
    await startConstruct(system, level);
  }
}
main();