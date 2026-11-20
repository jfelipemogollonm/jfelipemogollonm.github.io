/* Español e inglés. Todo el texto de la interfaz vive aquí.
   Los títulos de tus videos y galerías no se traducen: son tuyos. */
(() => {
  const TEXTOS = {
    es: {
      inicio:        'Inicio',
      marca:         'Marca personal',
      externo:       'Clientes',
      marcaTitulo:   'Marca personal',
      externoTitulo: 'Clientes',
      todo:          'Todo',
      youtube:       'YouTube',
      reels:         'Reels',
      fotografia:    'Fotografía',
      foto:          'foto',       fotos:    'fotos',
      carpeta:       'carpeta',    carpetas: 'carpetas',
      galeria:       'galería',    galerias: 'galerías',
      verEnInstagram:'Ver en Instagram ↗',
      arriba:        'Arriba ↑',
      sinFotos:      'Todavía no hay fotos publicadas.',
      abrir:         'abrir',
      verReel:       'ver en Instagram'
    },
    en: {
      inicio:        'Home',
      marca:         'Personal brand',
      externo:       'Clients',
      marcaTitulo:   'Personal brand',
      externoTitulo: 'Clients',
      todo:          'All',
      youtube:       'YouTube',
      reels:         'Reels',
      fotografia:    'Photography',
      foto:          'photo',     fotos:    'photos',
      carpeta:       'set',       carpetas: 'sets',
      galeria:       'gallery',   galerias: 'galleries',
      verEnInstagram:'View on Instagram ↗',
      arriba:        'Top ↑',
      sinFotos:      'No photos published yet.',
      abrir:         'open',
      verReel:       'view on Instagram'
    }
  };

  const guardado = (() => { try { return localStorage.getItem('idioma'); } catch { return null; } })();
  const IDIOMA = (guardado === 'es' || guardado === 'en')
    ? guardado
    : (navigator.language || 'es').toLowerCase().startsWith('es') ? 'es' : 'en';

  window.IDIOMA = IDIOMA;
  window.T = clave => (TEXTOS[IDIOMA] && TEXTOS[IDIOMA][clave]) || clave;
  window.bonito = s => String(s).toLocaleLowerCase()
    .replace(/(^|[\s·-])(\p{L})/gu, (_, a, b) => a + b.toLocaleUpperCase());
  window.plural = (n, clave) => `${n} ${window.T(n === 1 ? clave : clave + 's')}`;

  /* pinta los textos fijos (los que llevan data-t en el html) */
  window.aplicarIdioma = () => {
    document.documentElement.lang = IDIOMA;
    document.querySelectorAll('[data-t]').forEach(el => { el.textContent = window.T(el.dataset.t); });
    const sel = document.getElementById('idioma');
    if (!sel) return;
    sel.innerHTML = ['es','en'].map(l =>
      `<button data-l="${l}" aria-pressed="${l === IDIOMA}">${l.toUpperCase()}</button>`).join('<i>·</i>');
    sel.addEventListener('click', e => {
      const b = e.target.closest('button'); if (!b) return;
      try { localStorage.setItem('idioma', b.dataset.l); } catch {}
      location.reload();
    });
  };
})();
