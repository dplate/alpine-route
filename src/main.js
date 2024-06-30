import startConstruct from './construct/startConstruct.js';
import startMenu from './menu/startMenu.js';
import setupSystem from './system/setupSystem.js';
import levels from './levels.js';

async function main() {
  const language = 'de';
  window.document.documentElement.lang = language;
  const system = await setupSystem(window, language);
  if (!system) {
    return;
  }
  while(1) {
    const level = await startMenu(system, levels);
    await startConstruct(system, level);
  }
}
main();