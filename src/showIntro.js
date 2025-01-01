export default async (window) => {
  return new Promise((resolve) => {
    const document = window.document;
    document.body.innerHTML = '';
  
    const introContainer = document.createElement('div');
    introContainer.id = 'introContainer';

    const introImage = document.createElement('img');
    introImage.id = 'introImage';
    introImage.src = 'assets/images/intro.webp';
    introContainer.appendChild(introImage);

    const languageSelection = document.createElement('div');
    languageSelection.id = 'languageSelection';
    
    const germanButton = document.createElement('button');
    germanButton.innerText = 'Dein Büro betreten';
    germanButton.onclick = () => {
      document.body.requestFullscreen();
      resolve('de');
    }
    languageSelection.appendChild(germanButton);

    const englishButton = document.createElement('button');
    englishButton.innerText = 'Enter your office';
    englishButton.onclick = () => {
      document.body.requestFullscreen();
      resolve('en');
    };
    languageSelection.appendChild(englishButton);
    
    introContainer.appendChild(languageSelection);

    document.body.appendChild(introContainer)
  });
};