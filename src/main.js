import startConstruct from './construct/startConstruct.js';
import levels from './levels.js';
import setupSystem from './system/setupSystem.js';

async function main() {
  const system = await setupSystem(window, 'en');
  if (!system) {
    return;
  }
  await startConstruct(system, levels[0]);
}
main();