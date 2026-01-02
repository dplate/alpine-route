import calculateCurrentMoney from './calculateCurrentMoney.js';

const createLevelName = (system, level) => {
  const name = system.window.document.createElement('div');
  name.classList.add('levelName');
  name.innerText = system.text.translate(level.name);
  return name;
};

const createImage = (system, level) => {
  const image = system.window.document.createElement('img');
  image.classList.add('levelImage');
  image.src = `assets/levels/${level.id}.webp`;
  image.style.transform = `rotate(${-0.005 + Math.random() * 0.01}turn)`;
  return image;
};

const createDescriptionText = (system, level) => {
  const descriptionText = system.window.document.createElement('span');
  descriptionText.classList.add('levelDescriptionText');
  descriptionText.innerText = system.text.translate(level.description);
  return descriptionText;
};

const createInfo = (system, level) => {
  const info = system.window.document.createElement('div');
  info.classList.add('levelInfo');

  const infoTypeLabel = system.window.document.createElement('div');
  infoTypeLabel.innerText = system.text.get('TYPE');
  info.appendChild(infoTypeLabel);
  const infoTypeValue = system.window.document.createElement('div');
  infoTypeValue.innerText = system.text.get('TYPES')[level.type];
  info.appendChild(infoTypeValue);

  const infoDifficultyLabel = system.window.document.createElement('div');
  infoDifficultyLabel.innerText = system.text.get('DIFFICULTY');
  info.appendChild(infoDifficultyLabel);
  const infoDifficultyValue = system.window.document.createElement('div');
  infoDifficultyValue.innerText =
    system.text.get('DIFFICULTIES')[level.difficulty];
  info.appendChild(infoDifficultyValue);

  const infoBudgetLabel = system.window.document.createElement('div');
  infoBudgetLabel.innerText = system.text.get('BUDGET_LABEL');
  info.appendChild(infoBudgetLabel);
  const infoBudgetValue = system.window.document.createElement('div');
  infoBudgetValue.innerText = system.text.formatCurrency(level.budget);
  info.appendChild(infoBudgetValue);

  if (level.limits.minRadius !== null) {
    const infoRadiusLabel = system.window.document.createElement('div');
    infoRadiusLabel.innerText = system.text.get('MIN_RADIUS_LIMIT_LONG_LABEL');
    info.appendChild(infoRadiusLabel);
    const infoRadiusValue = system.window.document.createElement('div');
    infoRadiusValue.innerText =
      level.limits.minRadius + ' ' + system.text.get('METERS');
    info.appendChild(infoRadiusValue);
  }

  if (level.limits.minGap !== null) {
    const infoGapLabel = system.window.document.createElement('div');
    infoGapLabel.innerText = system.text.get('MIN_GAP_LIMIT_LONG_LABEL');
    info.appendChild(infoGapLabel);
    const infoGapValue = system.window.document.createElement('div');
    infoGapValue.innerText =
      level.limits.minGap + ' ' + system.text.get('METERS');
    info.appendChild(infoGapValue);
  }

  const infoGradientLabel = system.window.document.createElement('div');
  infoGradientLabel.innerText = system.text.get(
    'MAX_GRADIENT_LIMIT_LONG_LABEL',
  );
  info.appendChild(infoGradientLabel);
  const infoGradientValue = system.window.document.createElement('div');
  infoGradientValue.innerText =
    level.limits.maxGradient + ' ' + system.text.get('PERCENT');
  info.appendChild(infoGradientValue);

  if (level.limits.maxVariance !== null) {
    const infoVarianceLabel = system.window.document.createElement('div');
    infoVarianceLabel.innerText = system.text.get(
      'MAX_VARIANCE_LIMIT_LONG_LABEL',
    );
    info.appendChild(infoVarianceLabel);
    const infoVarianceValue = system.window.document.createElement('div');
    infoVarianceValue.innerText =
      level.limits.maxVariance + ' ' + system.text.get('PERCENT');
    info.appendChild(infoVarianceValue);
  }

  return info;
};

const createStartButton = (system, level, onStart) => {
  const startButton = document.createElement('button');
  startButton.classList.add('levelStartButton');
  startButton.onclick = (event) => {
    onStart(level);
    event.stopPropagation();
  };
  startButton.innerText =
    system.persistence.loadCosts(level) === null
      ? system.text.get('START_BUTTON_INITIAL')
      : system.text.get('START_BUTTON_IMPROVE');

  return startButton;
};

const createAvailableLevels = (system, layout, availableLevels, onStart) => {
  const document = system.window.document;

  let selectedElement = null;
  const deselectLevel = () => {
    if (selectedElement !== null) {
      selectedElement.classList.remove('levelSelected');
      selectedElement = null;
    }
  };
  const selectLevel = (level, element) => {
    deselectLevel();
    element.classList.add('levelSelected');
    selectedElement = element;
  };

  availableLevels.forEach((level, index) => {
    const element = document.createElement('div');
    element.classList.add('paper');
    element.style.zIndex = index;
    element.style.top = `${40 * index}px`;
    element.style.left = `${Math.round(Math.random() * 10.0)}px`;

    const type = document.createElement('div');
    type.classList.add('levelType');
    type.style.backgroundImage = `url("assets/images/types/${level.type}.svg")`;
    element.appendChild(type);

    element.appendChild(createLevelName(system, level));

    const status = document.createElement('div');
    status.classList.add('levelStatus');
    const costsValue = system.persistence.loadCosts(level);
    if (costsValue !== null) {
      const balance = level.budget - costsValue;
      status.innerText = system.text.formatCurrency(balance);
      status.style.color = balance < 0 ? '#e66d3d' : '#5bb798';
    } else {
      status.innerText = system.text.get('DIFFICULTIES')[level.difficulty];
      status.style.color = 'rgba(150, 150, 150, 1.0)';
    }
    element.appendChild(status);

    const closeButton = document.createElement('div');
    closeButton.classList.add('levelCloseButton');
    closeButton.onclick = (event) => {
      deselectLevel();
      event.stopPropagation();
    };
    element.appendChild(closeButton);

    const description = document.createElement('div');
    description.classList.add('levelDescription');
    description.appendChild(createImage(system, level));
    description.appendChild(createDescriptionText(system, level));
    element.appendChild(description);

    element.appendChild(createInfo(system, level));

    element.appendChild(createStartButton(system, level, onStart));

    element.onclick = () => selectLevel(level, element);

    layout.levelSelector.appendChild(element);
  });
};

const showFinish = (system, layout, levels) => {
  const image = system.window.document.createElement('img');
  image.classList.add('levelImage');
  image.src = `assets/images/success.webp`;
  layout.message.appendChild(image);

  const text = system.window.document.createElement('span');
  text.classList.add('levelDescriptionText');
  text.innerText = system.text
    .get('SUCCESS')
    .replace(
      '{{MONEY}}',
      system.text.formatCurrency(calculateCurrentMoney(system, levels)),
    );
  layout.message.appendChild(text);

  layout.messageContainer.style = 'display: block; animation: fadeIn 0.5s;';
  layout.message.onclick = () => {
    layout.messageContainer.style = 'display: none;';
  };
};

const handleFinish = (system, layout, availableLevels, levels) => {
  const money = calculateCurrentMoney(system, availableLevels);
  const allValid = availableLevels.every(system.persistence.loadCosts);
  if (money >= 0 && allValid) {
    const unavailableLevel = levels.find(
      (level) => !availableLevels.includes(level),
    );
    if (!unavailableLevel && !system.persistence.hasFinished()) {
      showFinish(system, layout, levels);
      system.persistence.markAsFinished();
    }
  }
};

const updateAvailableLevels = (system, levels) => {
  const shouldBeAvailableLevels = levels.filter((level) => {
    if (system.persistence.isAvailable(level)) {
      return false;
    }
    if (!level.dependsOn) {
      return true;
    }
    const dependsOnLevel = levels.find(
      (checkLevel) => checkLevel.id === level.dependsOn,
    );
    if (!dependsOnLevel) {
      console.error('DependsOnLevel not found!', level.dependsOn);
      return true;
    }
    const dependsOnLevelCosts = system.persistence.loadCosts(dependsOnLevel);
    return (
      dependsOnLevelCosts !== null &&
      dependsOnLevelCosts <= dependsOnLevel.budget
    );
  });
  shouldBeAvailableLevels.forEach((level) => {
    system.persistence.markAsAvailable(level);
  });
};

export default async (system, layout, levels) => {
  return new Promise((resolve) => {
    updateAvailableLevels(system, levels);
    const availableLevels = levels.filter(system.persistence.isAvailable);
    handleFinish(system, layout, availableLevels, levels);

    createAvailableLevels(system, layout, availableLevels, resolve);
  });
};
