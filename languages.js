(() => {
  const stage = document.querySelector('.language-globe');
  const toggle = stage.querySelector('.language-toggle');
  const layer = stage.querySelector('.globe-labels');
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  const names = [...stage.querySelectorAll('.globe-language-list li')];
  const points = names.map((item, i) => {
    const label = document.createElement('span');
    label.className = 'globe-language';
    label.textContent = item.textContent;
    label.dir = 'auto';
    layer.append(label);
    const y = 1 - 2 * (i + 0.5) / names.length;
    const radius = Math.sqrt(1 - y * y);
    const angle = i * Math.PI * (3 - Math.sqrt(5));
    return { label, x: radius * Math.cos(angle), y, z: radius * Math.sin(angle) };
  });
  let angle = 0, last = 0, frame = 0, paused = false, visible = false;
  function draw() {
    const cos = Math.cos(angle), sin = Math.sin(angle);
    points.forEach(({ label, x, y, z }) => {
      const px = x * cos + z * sin;
      const depth = z * cos - x * sin;
      label.style.left = `${50 + px * 43}%`;
      label.style.top = `${50 + y * 43}%`;
      label.style.opacity = String(0.22 + (depth + 1) * 0.39);
      label.style.transform = `translate(-50%, -50%) scale(${0.72 + (depth + 1) * 0.2})`;
      label.style.zIndex = depth > 0 ? '3' : '1';
    });
  }
  function animate(time) {
    if (last) angle += Math.min(time - last, 50) * Math.PI * 2 / 150000;
    last = time;
    draw();
    frame = requestAnimationFrame(animate);
  }
  function sync() {
    cancelAnimationFrame(frame);
    last = 0;
    if (visible && !paused && !reduced.matches) frame = requestAnimationFrame(animate);
    toggle.hidden = reduced.matches;
  }
  toggle.addEventListener('click', () => {
    paused = !paused;
    toggle.setAttribute('aria-pressed', String(paused));
    toggle.textContent = paused ? 'Resume rotation' : 'Pause rotation';
    sync();
  });
  reduced.addEventListener('change', sync);
  new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }).observe(stage);
  draw();
})();
