export default (system) => {
  const document = system.window.document;

  document.body.innerHTML = '';

  const desk = document.createElement('div');
  desk.id = 'desk';

  const levelSelector = document.createElement('div');
  levelSelector.id = 'levelSelector';
  desk.appendChild(levelSelector);

  const messageContainer = document.createElement('div');
  messageContainer.id = 'messageContainer';

  const message = document.createElement('div');
  message.id = 'message';
  message.className = 'paper';
  messageContainer.appendChild(message);

  desk.appendChild(messageContainer);

  const account = document.createElement('div');
  account.id = 'account';
  desk.appendChild(account);

  for (let i = 0; i <= 2; i++) {
    const stain = document.createElement('div');
    stain.className = 'stain';
    stain.style.right = `${30 + Math.random() * 15}px`;
    stain.style.top = `${30 + Math.random() * 15}px`;
    stain.style.opacity = 1 - (Math.random() / 5) * (2 - i);
    stain.style.transform = `rotate(${Math.random()}turn) scale(${-1 + (i % 2) * 2})`;
    desk.appendChild(stain);
  }

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
    messageContainer,
    message,
    account,
  };
};
