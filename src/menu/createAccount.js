const getWeightedRandom = () => {
  const randomValue = Math.random();
  const weightedRandom =  Math.sqrt(Math.sin(Math.PI * randomValue)) * 0.5;
  return randomValue < 0.5 ? weightedRandom : (1.0 - weightedRandom);
}

const shuffleCoins = (coins) => {
  const needNewPositionCoins = [ ...coins ];
  coins.forEach(() => { 
    const x = getWeightedRandom();
    const y = getWeightedRandom();
    const coin = needNewPositionCoins.sort((coin1, coin2) => {
      const oldPosition1 = { x: Number(coin1.dataset.x), y: Number(coin1.dataset.y) };
      const oldPosition2 = { x: Number(coin2.dataset.x), y: Number(coin2.dataset.y) };
      const distance1 = Math.sqrt((oldPosition1.x - x) ** 2 + (oldPosition1.y - y) ** 2);
      const distance2 = Math.sqrt((oldPosition2.x - x) ** 2 + (oldPosition2.y - y) ** 2);
      return distance1 - distance2;
    })[0];
    needNewPositionCoins.shift();
    coin.dataset.x = x;
    coin.dataset.y = y;
    coin.style.top = `calc(${x * 100}% - ${x * 75}px)`;
    coin.style.left =`calc(${y * 100}% - ${y * 75}px)`;
    coin.children[0].style.transform = `rotate(${Math.random()}turn)`;
  });
}

export default async (system, layout, levels) => {
  const money = levels.reduce((money, level) => {
    const costs = system.persistence.loadCosts(level);
    return costs ? money + (level.budget - costs) : money
  }, 0);
  const coinCount = Math.floor(money / 100000);
  const coins = [];
  for (let i = 0; i < coinCount; i++) {
    const coinContainer = document.createElement('div');
    coinContainer.dataset.x = 0;
    coinContainer.dataset.y = 0;
    coinContainer.classList.add('coinContainer');
    coinContainer.onclick = (event) => {
      if (layout.account.style.width !== '100%') {
        layout.account.style.width = '100%';
        shuffleCoins(coins);
        event.stopPropagation();
      }
    };

    const coin = document.createElement('div');
    coin.classList.add('coin');
    coinContainer.appendChild(coin);

    layout.account.appendChild(coinContainer);
    coins.push(coinContainer);
  }
  layout.account.onclick = () => {
    layout.account.style.width = '';
    shuffleCoins(coins);
  };
  shuffleCoins(coins);

  const accountBalance = document.createElement('div');
  accountBalance.id = 'accountBalance';
  accountBalance.classList.add('paper');

  const accountBalanceLabel = document.createElement('div');
  accountBalanceLabel.id = 'accountBalanceLabel';
  accountBalanceLabel.innerText = system.text.get('BALANCE_LABEL');
  accountBalance.appendChild(accountBalanceLabel);

  const accountBalanceValue = document.createElement('div');
  accountBalanceValue.id = 'accountBalanceValue';
  accountBalanceValue.innerText = system.text.formatCurrency(money);
  accountBalanceValue.style.color = money < 0 ? '#e66d3d' : '#5bb798';
  accountBalance.appendChild(accountBalanceValue);

  layout.account.appendChild(accountBalance);

};