(() => {
  const cards = [
  {
    "name": "Arrow Quest",
    "description": "Read the arrow directions and clear a path through interlocking puzzles."
  },
  {
    "name": "Block Boom",
    "description": "Place block pieces and complete lines to keep the board open."
  },
  {
    "name": "Word Puzzle",
    "description": "Find hidden words with progressive search difficulty across languages."
  },
  {
    "name": "Sudoku",
    "description": "Use logic to fill number grids, with local or Western digit options."
  },
  {
    "name": "Color Sort",
    "description": "Pour matching colors into tubes and plan the order of each move."
  },
  {
    "name": "Block Shift",
    "description": "Slide blocks horizontally and clear complete rows as new rows rise."
  },
  {
    "name": "Tic Tac Toe",
    "description": "Play against the computer, track round scores and try another strategy."
  }
];
  const switcher = document.querySelector('.card-switcher');
  const choices = switcher.querySelector('.switcher-choices');
  let current = 2;
  const show = (index) => {
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    const name = card.name;
    switcher.querySelector('#switcher-name').textContent = name;
    switcher.querySelector('#switcher-description').textContent = card.description;
    switcher.querySelector('#switcher-count').textContent = `${String(current + 1).padStart(2, '0')} / 07 · PUZZLE COLLECTION`;
    const image = switcher.querySelector('#switcher-image');
    image.src = `assets/game-${current}.png`;
    image.alt = `${name} gameplay screenshot`;
    [...choices.children].forEach((button, i) => button.setAttribute('aria-pressed', String(i === current)));
  };
  cards.forEach((card, index) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.textContent = card.name;
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
})();
