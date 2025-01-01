import helps from './helps.js';

export default (system, level, layout) => {
  const helper = {
    help: null,
  };

  const setNextHelp = () => {
    const help = helps.find(help => {
      if (system.persistence.hasHelpSeen(help)) {
        return false;
      }
      if (help.id === 'radius' && level.limits.minRadius === null) {
        return false;
      }
      if (help.id === 'variance' && level.limits.maxVariance === null) {
        return false;
      }
      return true;
    });
    if (help === helper.help) {
      return;
    }

    layout.helpToggle.style.removeProperty('display');
    layout.helpToggle.style.removeProperty('animation');
    if (help) {
      layout.helpText.innerText = system.text.translate(help.text);
      layout.helpToggle.offsetWidth; // needed to restart the animation!
      layout.helpToggle.style.display = 'block';
      layout.helpToggle.style.animation = '0.6s linear 6s 5 normal forwards running shake';
      helper.help = help;
    }  
  };

  layout.helpToggle.onclick = () => {
    layout.messageContainer.style.display = 'block';
  };
  layout.helpCloseButton.onclick = () => {
    layout.messageContainer.style.removeProperty('display');
    system.persistence.markHelpAsSeen(helper.help);
    setNextHelp();
  };
  layout.helpCloseButton.innerText = system.text.get('HELP_CLOSE_BUTTON');

  helper.markHelpAsUnnecessary = (helpId) => {
    const help = helps.find(help => help.id === helpId);
    if (help && !system.persistence.hasHelpSeen(help)) {
      system.persistence.markHelpAsSeen(help);
      setNextHelp();
    }
  };

  setNextHelp();

  return helper;
};