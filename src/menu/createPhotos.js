export default (system, layout, levels) => {
  const types = levels.reduce((types, level) => {
    if (system.persistence.loadCosts(level)) {
      types.add(level.type);
    }
    return types;
  }, new Set());

  [...types]
    .sort(() => 0.5 - Math.random())
    .forEach((type) => {
      const photo = document.createElement('img');
      photo.className = 'photo';
      photo.src = `assets/images/types/${type}.webp`;
      photo.style.left = `calc(600px + ${Math.random()} * (100vw - 800px))`;
      photo.style.bottom = `${-10 + Math.random() * 70}vh`;
      photo.style.transform = `rotate(${-0.05 + Math.random() * 0.1}turn)`;
      layout.desk.appendChild(photo);
    });
};
