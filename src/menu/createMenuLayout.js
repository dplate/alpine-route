export default (system) => {
  const document = system.window.document;

  document.body.innerHTML = '';

  const desk = document.createElement('div');
  desk.id = 'desk';

  const levelSelector = document.createElement('div');
  levelSelector.id = 'levelSelector';
  desk.appendChild(levelSelector);

  const account = document.createElement('div');
  account.id = 'account';
  desk.appendChild(account);

  for (let i = 0; i <= 2; i++) {
    const stain = document.createElement('div');
    stain.className = 'stain';
    stain.style.right = `${30 + Math.random() * 15}px`;
    stain.style.top = `${30 + Math.random() * 15}px`;
    stain.style.opacity = 1 - Math.random() / 5 * (2 - i);
    stain.style.transform = `rotate(${Math.random()}turn) scale(${-1 + i%2 * 2})`;
    desk.appendChild(stain);
  }

  const train = document.createElement('div');
  train.id = 'train';
  train.style.left = `calc(600px + ${Math.random()} * (100vw - 700px))`;
  train.style.bottom = `${-10 + Math.random() * 50}vh`;
  train.style.transform = `rotate(${-0.05 + Math.random() * 0.1}turn)`;
  desk.appendChild(train);

  const mule = document.createElement('div');
  mule.id = 'mule';
  mule.style.left = `calc(600px + ${Math.random()} * (100vw - 700px))`;
  mule.style.bottom = `${-10 + Math.random() * 50}vh`;
  mule.style.transform = `rotate(${-0.05 + Math.random() * 0.1}turn)`;
  desk.appendChild(mule);

  const road = document.createElement('div');
  road.id = 'road';
  road.style.left = `calc(600px + ${Math.random()} * (100vw - 700px))`;
  road.style.bottom = `${-10 + Math.random() * 50}vh`;
  road.style.transform = `rotate(${-0.05 + Math.random() * 0.1}turn)`;
  desk.appendChild(road);

  const mapDrawing = document.createElement('mapDrawing');
  mapDrawing.id = 'mapDrawing';
  mapDrawing.style.left = `calc(600px + ${Math.random()} * (100vw - 700px))`;
  mapDrawing.style.bottom = `${-10 + Math.random() * 50}vh`;
  mapDrawing.style.transform = `rotate(${-0.05 + Math.random() * 0.1}turn)`;
  desk.appendChild(mapDrawing);

  const bridge = document.createElement('div');
  bridge.id = 'bridge';
  bridge.style.left = `calc(600px + ${Math.random()} * (100vw - 700px))`;
  bridge.style.bottom = `${-10 + Math.random() * 50}vh`;
  bridge.style.transform = `rotate(${-0.05 + Math.random() * 0.1}turn)`;
  desk.appendChild(bridge);

  const ruler = document.createElement('div');
  ruler.id = 'ruler';
  ruler.style.left = `calc(600px + ${Math.random()} * (100vw - 800px))`;
  ruler.style.bottom = `${-10 + Math.random() * 80}vh`;
  ruler.style.transform = `rotate(${Math.random()}turn)`;
  desk.appendChild(ruler);

  document.body.appendChild(desk);

  const shadow = document.createElement('div');
  shadow.id = 'shadow';
  document.body.appendChild(shadow);

  return {
    desk,
    levelSelector,
    account
  };
};