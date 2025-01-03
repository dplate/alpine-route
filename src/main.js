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
    window.document.body.innerHTML = '<div style="padding: 10px">' + 
      (language === 'de' ?
        'Anscheinend unterstützt dein Browser oder dein System kein WebGPU. :(<br />Du kannst versuchen Alpine Route in einem anderem Browser zu starten.' : 
        'It seems your browser or system does not support WebGPU. :(<br />You can try to run Alpine Route in another browser.') + 
        '</div>';
    return;
  }

  var currentLevel = null;
  while (1) {
    currentLevel = await startMenu(system, levels, currentLevel);
    await startConstruct(system, currentLevel);
  }
}
main();
