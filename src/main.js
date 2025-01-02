import startConstruct from './construct/startConstruct.js';
import startMenu from './menu/startMenu.js';
import setupSystem from './system/setupSystem.js';
import levels from './levels.js';
import showIntro from './showIntro.js';

async function main() {
  const language = await showIntro(window);
  window.document.documentElement.lang = language;
  const system = await setupSystem(window, language);
  if (!system) {
    return;
  }

  var currentLevel = null;
  while (1) {
    currentLevel = await startMenu(system, levels, currentLevel);
    await startConstruct(system, currentLevel);
  }
}
main();
