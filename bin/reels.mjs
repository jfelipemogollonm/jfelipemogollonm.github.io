#!/usr/bin/env node
/* Prepara los reels y escribe reels.js.
 *
 *   node bin/reels.mjs
 *
 * Sueltas los videos verticales tal cual los exportaste en
 *   media/reels/originales/
 * y esto deja una copia ligera para la web, saca el fotograma de portada y
 * los registra. Los originales no se suben.
 *
 * El nombre del archivo es el título: «Partido en Goshen.mov» → «Partido en Goshen».
 * Si quieres enlazar al reel de Instagram, deja al lado un archivo con el mismo
 * nombre y extensión .url que contenga el enlace:
 *   media/reels/originales/Partido en Goshen.url
 *
 * Y si de un reel solo tienes el enlace, ponlo en media/reels/enlaces.txt,
 * uno por línea, con el título detrás de una barra:
 *   https://www.instagram.com/reel/XXXXXXXXXXX/ | Partido en Goshen
 * Si además dejas una portada en media/reels/poster/<mismo-título>.jpg, se usa.
 */
import { readdirSync, existsSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ   = fileURLToPath(new URL('../', import.meta.url));
const BASE   = join(RAIZ, 'media/reels');
const FUENTE = join(BASE, 'originales');
const VIDEOS = /\.(mp4|mov|m4v|webm)$/i;
const ANCHO  = 1080;   // ancho máximo de la copia web
const CRF    = 30;

const babosa = s => s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g,'')
                     .replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');

function medidas(archivo) {
  const txt = execFileSync('ffprobe', ['-v','error','-select_streams','v:0',
    '-show_entries','stream=width,height','-of','csv=p=0:s=x', archivo], { encoding:'utf8' }).trim();
  const [w, h] = txt.split('x').map(Number);
  return (w && h) ? { w, h } : null;
}

mkdirSync(FUENTE, { recursive:true });
mkdirSync(join(BASE, 'poster'), { recursive:true });

const reels = [];
for (const n of readdirSync(FUENTE).filter(x => VIDEOS.test(x)).sort()) {
  const origen = join(FUENTE, n);
  const base   = parse(n).name;
  const slug   = babosa(base);
  const video  = join(BASE, slug + '.mp4');
  const poster = join(BASE, 'poster', slug + '.jpg');

  if (!existsSync(video) || statSync(video).mtimeMs < statSync(origen).mtimeMs) {
    process.stdout.write(`· ${base} … `);
    execFileSync('ffmpeg', ['-y','-hide_banner','-loglevel','error','-i', origen,
      '-vf', `scale='min(${ANCHO},iw)':-2`,
      '-c:v','libx264','-preset','slow','-crf',String(CRF),'-pix_fmt','yuv420p',
      '-c:a','aac','-b:a','96k','-movflags','+faststart', video]);
    execFileSync('ffmpeg', ['-y','-hide_banner','-loglevel','error','-ss','1','-i', video,
      '-frames:v','1','-vf',"scale='min(720,iw)':-2",'-q:v','4', poster]);
    process.stdout.write('listo\n');
  }

  const m = medidas(video);
  const url = join(FUENTE, base + '.url');
  reels.push({
    archivo: slug + '.mp4',
    poster:  'poster/' + slug + '.jpg',
    titulo:  base,
    enlace:  existsSync(url) ? readFileSync(url, 'utf8').trim() : null,
    r: m ? +(m.w / m.h).toFixed(4) : 0.5625
  });
}

/* ── los que solo tienen enlace ─────────────────────────────── */
const lista = join(BASE, 'enlaces.txt');
if (existsSync(lista)) {
  for (const linea of readFileSync(lista, 'utf8').split('\n')) {
    const limpia = linea.trim();
    if (!limpia || limpia.startsWith('#')) continue;
    const [enlace, titulo] = limpia.split('|').map(x => x.trim());
    if (!/^https?:\/\//.test(enlace)) continue;
    const slug = babosa(titulo || enlace.split('/').filter(Boolean).pop());
    if (reels.some(r => r.enlace === enlace)) continue;      // ya está como archivo
    const portada = join(BASE, 'poster', slug + '.jpg');
    reels.push({
      archivo: null,
      poster:  existsSync(portada) ? 'poster/' + slug + '.jpg' : null,
      titulo:  titulo || 'Reel',
      enlace,
      r: 0.5625
    });
    console.log(`· ${titulo || enlace} (solo enlace)`);
  }
}

writeFileSync(join(RAIZ, 'reels.js'),
`/* Generado por bin/reels.mjs — no lo edites a mano.
   Suelta los videos en media/reels/originales/ y vuelve a ejecutarlo. */
window.REELS = ${JSON.stringify(reels, null, 2)};
`);
console.log(`\nreels.js: ${reels.length} reel(s).`);
