const createAvailableLevels = (system, layout, availableLevels, onSelect) => {
  const document = system.window.document;
  availableLevels.forEach((level, index) => {
    const element = document.createElement('div');
    element.classList.add('paper');
    element.style.zIndex = index;
    element.style.top = `${40 * index}px`;
    element.style.left = `${Math.round(Math.random() * 10.0)}px`;

    const type = document.createElement('div');
    type.classList.add('levelType');
    type.style.backgroundImage = `url("../assets/images/types/${level.type}.svg")`;
    element.appendChild(type);

    const name = document.createElement('div');
    name.classList.add('levelName');
    name.innerText = system.text.translate(level.name);
    element.appendChild(name);

    const status = document.createElement('div');
    status.classList.add('levelStatus');
    const costsValue = system.persistence.loadCosts(level);
    if (costsValue !== null) {
      const balance = level.budget - costsValue;
      status.innerText = system.text.formatCurrency(balance);
      status.style.color = balance < 0 ? '#e66d3d' : '#5bb798';
    } else {
      status.innerText = system.text.get('STATUS_INVALID');
      status.style.color = 'rgba(150, 150, 150, 1.0)';
    }
    
    element.appendChild(status);

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

  const description = document.createElement('div');
  description.classList.add('levelDescription');

  const image = document.createElement('img');
  image.classList.add('levelImage');
  image.src = `assets/levels/${level.id}.webp`;
  image.style.transform = `rotate(${-0.005 + Math.random() * 0.01}turn)`;
  description.appendChild(image);

  const text = document.createElement('span');
  text.innerText = system.text.translate(level.description);

  description.appendChild(text);
  element.appendChild(description);

  const info = document.createElement('div');
  info.classList.add('levelInfo');

  const infoTypeLabel = document.createElement('div');
  infoTypeLabel.innerText = system.text.get('TYPE');
  info.appendChild(infoTypeLabel);
  const infoTypeValue = document.createElement('div');
  infoTypeValue.innerText = system.text.get('TYPES')[level.type];
  info.appendChild(infoTypeValue);

  const infoBudgetLabel = document.createElement('div');
  infoBudgetLabel.innerText = system.text.get('BUDGET_LABEL');
  info.appendChild(infoBudgetLabel);
  const infoBudgetValue = document.createElement('div');
  infoBudgetValue.innerText = system.text.formatCurrency(level.budget);
  info.appendChild(infoBudgetValue);

  const infoRadiusLabel = document.createElement('div');
  infoRadiusLabel.innerText = system.text.get('MIN_RADIUS_LIMIT_LONG_LABEL');
  info.appendChild(infoRadiusLabel);
  const infoRadiusValue = document.createElement('div');
  infoRadiusValue.innerText = level.limits.minRadius + ' ' + system.text.get('METERS');
  info.appendChild(infoRadiusValue);

  const infoGapLabel = document.createElement('div');
  infoGapLabel.innerText = system.text.get('MIN_GAP_LIMIT_LONG_LABEL');
  info.appendChild(infoGapLabel);
  const infoGapValue = document.createElement('div');
  infoGapValue.innerText = level.limits.minGap + ' ' + system.text.get('METERS');
  info.appendChild(infoGapValue);

  const infoGradientLabel = document.createElement('div');
  infoGradientLabel.innerText = system.text.get('MAX_GRADIENT_LIMIT_LONG_LABEL');
  info.appendChild(infoGradientLabel);
  const infoGradientValue = document.createElement('div');
  infoGradientValue.innerText = level.limits.maxGradient + ' ' + system.text.get('PERCENT');
  info.appendChild(infoGradientValue);

  const infoVarianceLabel = document.createElement('div');
  infoVarianceLabel.innerText = system.text.get('MAX_VARIANCE_LIMIT_LONG_LABEL');
  info.appendChild(infoVarianceLabel);
  const infoVarianceValue = document.createElement('div');
  infoVarianceValue.innerText = level.limits.maxVariance + ' ' + system.text.get('PERCENT');
  info.appendChild(infoVarianceValue);

  element.appendChild(info);

  const startButton = document.createElement('button');
  startButton.classList.add('levelStartButton');
  startButton.onclick = (event) => {
    onStart();
    event.stopPropagation();
  };
  startButton.innerText = system.persistence.loadCosts(level) === null ? 
    system.text.get('START_BUTTON_INITIAL') : 
    system.text.get('START_BUTTON_IMPROVE');
  element.appendChild(startButton);

  element.dataset.filled = true;
};

export default async (system, layout, levels) => {
  return new Promise((resolve) => {
    const availableLevels = levels;
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
      selectedElement = element;
      if (!selectedElement.dataset.filled) {
        fillLevelElement(system, level, element, selectLastLevel, () => resolve(level));
      }
    };
    
    createAvailableLevels(system, layout, availableLevels, selectLevel);
    selectLastLevel();

  });
};