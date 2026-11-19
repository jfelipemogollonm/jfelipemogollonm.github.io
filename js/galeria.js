/* La galería: pinta la rejilla a partir de contenido.js, filtra y abre el visor.
   No hace falta tocar nada de aquí para cambiar el portafolio. */
(() => {
  const C = window.CONTENIDO;
  const $ = id => document.getElementById(id);

  /* Los reels vienen de reels.js (los genera bin/reels.mjs) y se reparten
     por la rejilla cada pocas piezas, para que no queden todos seguidos. */
  const REELS = (window.REELS || []).map(r => ({ ...r, tipo:'reel' }));
  const PIEZAS = (() => {
    const base = C.piezas.slice();
    if (!REELS.length) return base;
    const cada = Math.max(2, Math.round(base.length / (REELS.length + 1)));
    REELS.forEach((r, i) => base.splice(Math.min((i + 1) * cada + i, base.length), 0, r));
    return base;
  })();


  /* ── textos y enlaces ──────────────────────────────────────── */
  document.documentElement.style.setProperty('--acento', C.acento);
  aplicarIdioma();
  document.title = `${T('marcaTitulo')} — ${bonito(C.nombre)}`;
  $('monograma').textContent = C.monograma;
  $('pieNombre').textContent = C.nombre + ' · ' + new Date().getFullYear();
  for (const [el, url] of [['aYoutube',C.enlaces.youtube],['pYoutube',C.enlaces.youtube],
                           ['aInstagram',C.enlaces.instagram],['pInstagram',C.enlaces.instagram]]) $(el).href = url;
  $('arriba').addEventListener('click', e => { e.preventDefault(); scrollTo({top:0,behavior:'smooth'}); });

  /* ── formato de cada pieza ─────────────────────────────────── */
  const razon = p => p.tipo === 'youtube' ? 16/9
                   : p.tipo === 'reel'    ? (p.r || 9/16)
                   : (p.proporcion || 1.5);

  const miniatura = p => p.tipo === 'youtube'
    ? `https://i.ytimg.com/vi/${p.id}/maxresdefault.jpg`
    : (p.mini || p.imagen);

  const PLAY = '<span class="play"><svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg></span>';

  /* ── pintar la rejilla ─────────────────────────────────────── */
  const rejilla = $('rejilla');
  const nodos = PIEZAS.map((p, i) => {
    const soloEnlace = p.tipo === 'reel' && !p.archivo;
    const b = document.createElement(soloEnlace ? 'a' : 'button');
    b.className = 'pieza';
    if (soloEnlace) { b.href = p.enlace; b.target = '_blank'; b.rel = 'noopener'; }
    b.style.setProperty('--r', razon(p).toFixed(4));
    b.dataset.tipo = p.tipo;
    b.dataset.i = i;
    b.setAttribute('aria-label', (p.titulo || '') + ' — ' + (soloEnlace ? T('verReel') : T('abrir')));

    if (p.tipo === 'reel' && p.archivo) {
      b.innerHTML = `<video src="media/reels/${p.archivo}" muted loop playsinline preload="metadata"
                            poster="${p.poster ? 'media/reels/' + p.poster : ''}"></video>`;
      const v = b.querySelector('video');
      b.addEventListener('mouseenter', () => v.play().catch(() => {}));
      b.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
    } else if (p.tipo === 'reel') {
      // solo tenemos el enlace: tarjeta sobria con el título
      b.classList.add('sinPortada');
      b.innerHTML = p.poster ? `<img src="media/reels/${p.poster}" alt="${p.titulo || ''}" loading="lazy">` : '';
    } else {
      b.innerHTML = `<img src="${miniatura(p)}" alt="${p.titulo || ''}" loading="lazy" decoding="async">`;
      if (p.tipo === 'youtube') {
        const img = b.querySelector('img');
        let intento = 0;
        img.addEventListener('error', () => {               // maxres → hq → poster local
          intento++;
          if (intento === 1) img.src = `https://i.ytimg.com/vi/${p.id}/hqdefault.jpg`;
          else if (intento === 2 && p.poster) img.src = p.poster;
        });
      }
    }

    const etiqueta = {youtube:'YouTube', reel:'Reel', foto:T('foto')}[p.tipo];
    b.insertAdjacentHTML('beforeend',
      `<span class="marca">${etiqueta}</span>` +
      (p.tipo === 'foto' ? '' : PLAY) +
      `<span class="velo"><h3>${p.titulo || ''}</h3>${p.nota ? `<span>${p.nota}</span>` : ''}</span>`);

    if (!soloEnlace) b.addEventListener('click', () => abrir(i));
    return b;
  });
  rejilla.append(...nodos);

  /* ── filtros ───────────────────────────────────────────────── */
  const FILTROS = [['todo', T('todo')], ['youtube', T('youtube')], ['reel', T('reels')], ['foto', T('fotografia')]];
  let activo = 'todo';
  $('filtros').innerHTML = FILTROS
    .filter(([k]) => k === 'todo' || PIEZAS.some(p => p.tipo === k))
    .map(([k,t]) => `<button data-f="${k}" aria-pressed="${k==='todo'}">${t}</button>`).join('');

  $('filtros').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    activo = b.dataset.f;
    $('filtros').querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b));
    nodos.forEach((n, i) => n.classList.toggle('oculta', activo !== 'todo' && PIEZAS[i].tipo !== activo));
  });

  const visibles = () => PIEZAS.map((p,i) => i).filter(i => !nodos[i].classList.contains('oculta'));

  /* ── visor ─────────────────────────────────────────────────── */
  const visor = $('visor'), lienzo = $('lienzo');
  let actual = 0;

  function abrir(i) {
    actual = i;
    const p = PIEZAS[i];
    lienzo.innerHTML = '';

    if (p.tipo === 'youtube') {
      lienzo.innerHTML = `<iframe src="https://www.youtube-nocookie.com/embed/${p.id}?autoplay=1&rel=0"
        title="${p.titulo || ''}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`;
    } else if (p.tipo === 'reel' && p.archivo) {
      lienzo.innerHTML = `<video src="media/reels/${p.archivo}" controls autoplay loop playsinline></video>`;
    } else {
      lienzo.innerHTML = `<img src="${p.imagen}" alt="${p.titulo || ''}">`;
    }

    const extra = p.enlace
      ? `<a href="${p.enlace}" target="_blank" rel="noopener">${T('verEnInstagram')}</a>` : '';
    lienzo.insertAdjacentHTML('beforeend',
      `<div class="pieDeVisor"><strong>${p.titulo || ''}</strong>${p.nota ? '<span>'+p.nota+'</span>' : ''}${extra}</div>`);

    visor.setAttribute('open','');
    document.body.style.overflow = 'hidden';
    $('cerrar').focus();
  }

  function cerrar() {
    visor.removeAttribute('open');
    lienzo.innerHTML = '';                 // corta el audio del iframe / video
    document.body.style.overflow = '';
    nodos[actual].focus();
  }

  function mover(paso) {
    const v = visibles();
    const pos = v.indexOf(actual);
    abrir(v[(pos + paso + v.length) % v.length]);
  }

  $('cerrar').addEventListener('click', cerrar);
  $('anterior').addEventListener('click', () => mover(-1));
  $('siguiente').addEventListener('click', () => mover(1));
  visor.addEventListener('click', e => { if (e.target === visor) cerrar(); });
  addEventListener('keydown', e => {
    if (!visor.hasAttribute('open')) return;
    if (e.key === 'Escape')     cerrar();
    if (e.key === 'ArrowLeft')  mover(-1);
    if (e.key === 'ArrowRight') mover(1);
  });
})();
