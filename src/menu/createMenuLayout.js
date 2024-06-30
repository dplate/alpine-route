export default (system) => {
  const document = system.window.document;

  document.body.innerHTML = '';

  const desk = document.createElement('desk');
  desk.id = 'desk';

  const levelSelector = document.createElement('levelSelector');
  levelSelector.id = 'levelSelector';
  desk.appendChild(levelSelector);

  const account = document.createElement('account');
  account.id = 'account';
  desk.appendChild(account);

  document.body.appendChild(desk);

  return {
    desk,
    levelSelector,
    account
  };
};