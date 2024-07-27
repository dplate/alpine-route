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