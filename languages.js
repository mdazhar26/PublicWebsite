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
  // Simplified continent silhouettes, projected onto the same rotating sphere.
  const continents = [
    [[-168,70],[-145,72],[-130,60],[-124,49],[-124,40],[-117,32],[-110,29],[-105,22],[-97,16],[-88,15],[-83,9],[-77,8],[-83,20],[-90,22],[-97,27],[-82,25],[-81,31],[-75,36],[-67,45],[-58,51],[-65,59],[-80,63],[-96,69],[-115,72],[-140,70]],
    [[-73,60],[-48,60],[-21,71],[-28,81],[-48,84],[-61,77]],
    [[-81,12],[-70,11],[-61,7],[-51,3],[-35,-6],[-39,-18],[-46,-24],[-52,-34],[-65,-55],[-72,-49],[-75,-34],[-80,-12]],
    [[-17,36],[-5,36],[10,37],[25,32],[34,30],[43,12],[51,11],[43,-3],[40,-15],[32,-26],[18,-35],[12,-28],[10,-12],[0,5],[-12,5],[-17,16]],
    [[-10,36],[-9,44],[-1,49],[8,54],[5,59],[18,71],[32,70],[40,60],[58,69],[90,76],[120,73],[150,61],[179,66],[170,53],[145,45],[133,35],[121,23],[110,20],[106,8],[100,3],[96,16],[88,22],[80,7],[72,20],[58,25],[47,30],[43,12],[35,30],[28,41],[18,40],[12,45],[3,43]],
    [[112,-22],[119,-17],[130,-12],[137,-16],[145,-14],[153,-26],[150,-37],[138,-39],[130,-33],[115,-35]],
    [[47,-13],[51,-16],[48,-25],[44,-24]],
    [[130,32],[141,46],[145,43],[140,35]],
    [[96,5],[106,-6],[116,-8],[113,-3],[104,1]],
    [[166,-34],[178,-38],[173,-46],[166,-46]]
  ];
  const land = stage.querySelector('.globe-land');
  const landPaths = continents.map(() => {
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    land.append(path);
    return path;
  });
  function drawMap() {
    continents.forEach((coast, index) => {
      const points = coast.map(([lon, lat]) => {
        const latitude = lat * Math.PI / 180;
        const longitude = lon * Math.PI / 180 + angle - 0.3;
        return { x: Math.cos(latitude) * Math.sin(longitude), y: -Math.sin(latitude), z: Math.cos(latitude) * Math.cos(longitude) };
      });
      const clipped = [];
      points.forEach((b, i) => {
        const a = points[(i + points.length - 1) % points.length];
        if ((a.z >= 0) !== (b.z >= 0)) {
          const t = a.z / (a.z - b.z);
          clipped.push({x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t});
        }
        if (b.z >= 0) clipped.push(b);
      });
      landPaths[index].setAttribute('d', clipped.length < 3 ? '' : clipped.map((point, i) => `${i ? 'L' : 'M'}${(300 + point.x * 268).toFixed(1)},${(300 + point.y * 268).toFixed(1)}`).join(' ') + 'Z');
    });
  }
  let angle = 0, last = 0, frame = 0, paused = false, visible = false;
  function draw() {
    drawMap();
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
