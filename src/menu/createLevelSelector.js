const createAvailableLevels = (system, layout, availableLevels, onSelect) => {
  const document = system.window.document;
  availableLevels.forEach((level, index) => {
    const element = document.createElement('div');
    element.classList.add('paper');
    element.style.zIndex = index;
    element.style.top = `${40 * index}px`;

    const name = document.createElement('div');
    name.classList.add('levelName');
    name.innerText = system.text.translate(level.name);
    element.appendChild(name);

    element.onclick = () => onSelect(level, element);
    layout.levelSelector.appendChild(element);
  });
}

const fillLevelElement = (system, level, element, onClose, onStart) => {
  const document = system.window.document;
  const closeButton = document.createElement('div');
  closeButton.classList.add('levelCloseButton');
  closeButton.onclick = (event) => {
    onClose();
    event.stopPropagation();
  }
  element.appendChild(closeButton);

  const startButton = document.createElement('button');
  startButton.classList.add('levelStartButton');
  startButton.onclick = (event) => {
    onStart();
    event.stopPropagation();
  };
  startButton.innerText = system.text.get('START_BUTTON');
  element.appendChild(startButton);

  element.dataset.filled = true;
};

export default async (system, layout, levels) => {
  return new Promise((resolve) => {
    const availableLevels = levels;
    var selectedLevel = null;
    var selectedElement = null;

    const selectLastLevel = () => {
      const level = availableLevels[availableLevels.length - 1];
      const element = layout.levelSelector.children[layout.levelSelector.children.length - 1];
      selectLevel(level, element)
    }

    const selectLevel = (level, element) => {
      if (selectedElement !== null) {
        selectedElement.classList.remove('levelSelected');
      }
      element.classList.add('levelSelected');
      selectedLevel = level;
      selectedElement = element;
      if (!selectedElement.dataset.filled) {
        fillLevelElement(system, level, element, selectLastLevel, () => resolve(level));
      }
    };
    
    createAvailableLevels(system, layout, availableLevels, selectLevel);
    selectLastLevel();

  });
};