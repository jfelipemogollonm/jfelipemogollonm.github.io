/* Galerías: tres niveles sobre la misma página.
     galerias.html                      → las galerías (GSA…)
     galerias.html?g=gsa                → las carpetas de esa galería
     galerias.html?g=gsa&c=fall-academy → las fotos de esa carpeta
   Los datos salen de galerias.js, que genera bin/galerias.mjs. */
(() => {
  const C = window.CONTENIDO;
  const G = window.GALERIAS || [];
  const $ = id => document.getElementById(id);
  const BASE = 'media/galerias';

  /* ── textos y enlaces ──────────────────────────────────────── */
  document.documentElement.style.setProperty('--acento', C.acento);
  $('monograma').textContent = C.monograma;
  $('pieNombre').textContent = C.nombre + ' · ' + new Date().getFullYear();
  for (const [el, url] of [['aYoutube',C.enlaces.youtube],['pYoutube',C.enlaces.youtube],
                           ['aInstagram',C.enlaces.instagram],['pInstagram',C.enlaces.instagram]]) $(el).href = url;
  $('arriba').addEventListener('click', e => { e.preventDefault(); scrollTo({top:0,behavior:'smooth'}); });

  /* ── dónde estamos ─────────────────────────────────────────── */
  const q = new URLSearchParams(location.search);
  const galeria = G.find(x => x.slug === q.get('g'));
  const carpeta = galeria && galeria.carpetas.find(x => x.slug === q.get('c'));

  const rejilla = $('rejilla');
  aplicarIdioma();
  const totalFotos = g => g.carpetas.reduce((n, c) => n + c.fotos.length, 0);

  function vacio(texto) {
    rejilla.insertAdjacentHTML('beforeend',
      `<p style="color:var(--tenue);text-align:center;width:100%;padding:3rem 1.5rem 6rem">${texto}</p>`);
  }

  /* ── tarjeta de galería o de carpeta ───────────────────────── */
  function tarjeta({ href, portada, nombre, pie }) {
    rejilla.classList.add('tarjetas');
    const a = document.createElement('a');
    a.className = 'pieza tarjeta';
    a.href = href;
    a.style.setProperty('--r', '1.5');
    a.innerHTML = `<img src="${portada}" alt="${nombre}" loading="lazy" decoding="async">
      <span class="rotuloTarjeta"><strong>${nombre}</strong><span>${pie}</span></span>`;
    return a;
  }

  /* ── nivel 3: las fotos ────────────────────────────────────── */
  if (carpeta) {
    $('miga').innerHTML = `<a href="galerias.html">${T('externo')}</a> / <a href="galerias.html?g=${galeria.slug}">${galeria.nombre}</a>`;
    $('encabezado').textContent = carpeta.nombre;
    $('cuenta').textContent = plural(carpeta.fotos.length, 'foto');
    document.title = `${carpeta.nombre} — ${bonito(C.nombre)}`;

    const ruta = f => `${BASE}/${galeria.slug}/${carpeta.slug}/web/${f.archivo}`;
    const mini = f => `${BASE}/${galeria.slug}/${carpeta.slug}/web/mini/${f.archivo}`;
    carpeta.fotos.forEach((f, i) => {
      const b = document.createElement('button');
      b.className = 'pieza';
      b.style.setProperty('--r', f.r);
      b.setAttribute('aria-label', `${T('foto')} ${i + 1} — ${T('abrir')}`);
      b.innerHTML = `<img src="${mini(f)}" alt="" loading="lazy" decoding="async">`;
      b.addEventListener('click', () => abrir(i));
      rejilla.append(b);
    });

    /* visor */
    const visor = $('visor'), lienzo = $('lienzo');
    let actual = 0;
    const abrir = i => {
      actual = i;
      lienzo.innerHTML = `<img src="${ruta(carpeta.fotos[i])}" alt="">
        <div class="pieDeVisor"><strong>${carpeta.nombre}</strong><span>${i + 1} / ${carpeta.fotos.length}</span></div>`;
      visor.setAttribute('open','');
      document.body.style.overflow = 'hidden';
      $('cerrar').focus();
    };
    const cerrar = () => {
      visor.removeAttribute('open'); lienzo.innerHTML = '';
      document.body.style.overflow = '';
      rejilla.children[actual]?.focus();
    };
    const mover = p => abrir((actual + p + carpeta.fotos.length) % carpeta.fotos.length);

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

  /* ── nivel 2: las carpetas de una galería ──────────────────── */
  } else if (galeria) {
    $('miga').innerHTML = `<a href="galerias.html">${T('externo')}</a>`;
    $('encabezado').textContent = galeria.nombre;
    $('cuenta').textContent = plural(galeria.carpetas.length, 'carpeta');
    document.title = `${galeria.nombre} — ${bonito(C.nombre)}`;

    galeria.carpetas.forEach(c => rejilla.append(tarjeta({
      href: `galerias.html?g=${galeria.slug}&c=${c.slug}`,
      portada: `${BASE}/${galeria.slug}/${c.slug}/web/mini/${c.fotos[0].archivo}`,
      nombre: c.nombre,
      pie: plural(c.fotos.length, 'foto')
    })));

  /* ── nivel 1: todas las galerías ───────────────────────────── */
  } else {
    $('encabezado').textContent = T('externoTitulo');
    document.title = `${T('externoTitulo')} — ${bonito(C.nombre)}`;
    $('cuenta').textContent = G.length ? T('externoPie') : '';
    G.forEach(g => rejilla.append(tarjeta({
      href: `galerias.html?g=${g.slug}`,
      portada: `${BASE}/${g.slug}/${g.carpetas[0].slug}/web/mini/${g.carpetas[0].fotos[0].archivo}`,
      nombre: g.nombre,
      pie: `${plural(g.carpetas.length, 'carpeta')} · ${plural(totalFotos(g), 'foto')}`
    })));
    if (!G.length) vacio(T('sinFotos'));
  }
})();
