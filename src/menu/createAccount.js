const getWeightedRandom = () => {
  const randomValue = Math.random();
  const weightedRandom =  Math.sqrt(Math.sin(Math.PI * randomValue)) * 0.5;
  return randomValue < 0.5 ? weightedRandom : (1.0 - weightedRandom);
}

const shuffleCoins = (coins) => {
  coins.forEach(coin => {
    const xFactor = getWeightedRandom();
    const yFactor = getWeightedRandom();
    coin.style.top = `calc(${xFactor * 100}% - ${xFactor * 75}px)`;
    coin.style.left =`calc(${yFactor * 100}% - ${yFactor * 75}px)`;
  });
}

export default async (system, layout, levels) => {
  const money = levels.reduce((money, level) => {
    const costs = system.persistence.loadCosts(level);
    return costs ? money + (level.budget - costs) : money
  }, 0);
  const coinCount = Math.floor(money / 10000);
  const coins = [];
  for (let i = 0; i < coinCount; i++) {
    const coinContainer = document.createElement('div');
    coinContainer.classList.add('coinContainer');
    coinContainer.onclick = (event) => {
      if (layout.account.style.width != '100%') {
        layout.account.style.width = '100%';
        shuffleCoins(coins);
        event.stopPropagation();
      }
    };

    const coin = document.createElement('div');
    coin.classList.add('coin');
    coin.style.transform = `rotate(${Math.random()}turn)`;
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