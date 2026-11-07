(() => {
  const cards = [...document.querySelectorAll('.game-card')];
  const dialog = document.querySelector('.card-switcher');
  const choices = dialog.querySelector('.switcher-choices');
  let current = 0;
  let opener;
  const show = (index) => {
    current = (index + cards.length) % cards.length;
    const card = cards[current];
    const name = card.querySelector('h3').textContent;
    dialog.querySelector('#switcher-name').textContent = name;
    dialog.querySelector('#switcher-description').textContent = card.querySelector('p').textContent;
    dialog.querySelector('#switcher-count').textContent = `${String(current + 1).padStart(2, '0')} / 07 · PUZZLE COLLECTION`;
    const image = dialog.querySelector('#switcher-image');
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
    card.addEventListener('click', () => {
      opener = card;
      show(index);
      dialog.showModal();
      document.body.classList.add('switcher-open');
    });
  });
  dialog.querySelector('.switcher-close').addEventListener('click', () => dialog.close());
  dialog.querySelector('.switcher-prev').addEventListener('click', () => show(current - 1));
  dialog.querySelector('.switcher-next').addEventListener('click', () => show(current + 1));
  dialog.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      show(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const box = dialog.getBoundingClientRect();
    if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => {
    document.body.classList.remove('switcher-open');
    opener?.focus();
  });
})();
