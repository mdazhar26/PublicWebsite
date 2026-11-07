(() => {
  const cards = [...document.querySelectorAll('.game-card')];
  const switcher = document.querySelector('.card-switcher');
  const choices = switcher.querySelector('.switcher-choices');
  let current = 2;
  const show = (index) => {
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    const name = card.querySelector('h3').textContent;
    switcher.querySelector('#switcher-name').textContent = name;
    switcher.querySelector('#switcher-description').textContent = card.querySelector('p').textContent;
    switcher.querySelector('#switcher-count').textContent = `${String(current + 1).padStart(2, '0')} / 07 · PUZZLE COLLECTION`;
    const image = switcher.querySelector('#switcher-image');
    image.src = `assets/game-${current}.png`;
    image.alt = `${name} gameplay screenshot`;
    [...choices.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
  };
  cards.forEach((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = card.querySelector('h3').textContent;
    button.addEventListener('click', () => show(index));
    choices.append(button);
  });
  switcher.querySelector('.switcher-prev').addEventListener('click', () => show(current - 1));
  switcher.querySelector('.switcher-next').addEventListener('click', () => show(current + 1));
  switcher.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  show(current);
  document.querySelector('.game-grid').hidden = true;
})();
