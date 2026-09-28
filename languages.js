const languageSection = document.querySelector('.language-section');
const languageToggle = document.querySelector('.language-toggle');
languageToggle.addEventListener('click', () => {
  const paused = languageSection.classList.toggle('is-paused');
  languageToggle.setAttribute('aria-pressed', String(paused));
  languageToggle.textContent = paused ? 'Resume scrolling' : 'Pause scrolling';
});
