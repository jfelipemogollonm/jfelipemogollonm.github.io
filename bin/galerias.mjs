#!/usr/bin/env node
/* Registra las fotos de media/galerias/ en galerias.js.
 *
 *   node bin/galerias.mjs
 *
 * Tú sueltas las fotos (del tamaño que sean, también .heic del iPhone) en
 *   media/galerias/<galeria>/<carpeta>/
 * y esto deja en web/ una copia ligera (lado largo 2000 px) que es la que
 * publica el sitio. Los originales se quedan donde están y no se suben.
 */
import { readdirSync, existsSync, statSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ   = fileURLToPath(new URL('../', import.meta.url));
const BASE   = join(RAIZ, 'media/galerias');
const FOTOS  = /\.(jpe?g|png|heic|heif|webp|tiff?)$/i;
const LADO   = 2000;     // lado largo de las copias web
const CALIDAD= 80;

const carpetas = d => existsSync(d) ? readdirSync(d, { withFileTypes:true }).filter(e => e.isDirectory()).map(e => e.name) : [];
const titulo   = s => s.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

function nombreDe(dir, slug) {
  const f = join(dir, 'nombre.txt');
  return existsSync(f) ? readFileSync(f, 'utf8').trim() : titulo(slug);
}

function medidas(archivo) {
  const txt = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', archivo], { encoding:'utf8' });
  const w = +(txt.match(/pixelWidth:\s*(\d+)/)  || [])[1];
  const h = +(txt.match(/pixelHeight:\s*(\d+)/) || [])[1];
  return (w && h) ? { w, h } : null;
}

function copiaWeb(origen, destino) {
  // se rehace solo si falta o si el original es más nuevo
  if (existsSync(destino) && statSync(destino).mtimeMs >= statSync(origen).mtimeMs) return;
  execFileSync('sips', ['-s','format','jpeg','-s','formatOptions',String(CALIDAD),
                        '-Z',String(LADO), origen, '--out', destino], { stdio:'ignore' });
  process.stdout.write(`  · ${parse(destino).base}\n`);
}

const galerias = [];
for (const g of carpetas(BASE).sort()) {
  const dirG = join(BASE, g);
  const grupo = { slug:g, nombre:nombreDe(dirG, g), carpetas:[] };

  for (const c of carpetas(dirG).sort()) {
    const dirC = join(dirG, c);
    const dirW = join(dirC, 'web');
    const origenes = readdirSync(dirC).filter(n => FOTOS.test(n)).sort();
    if (!origenes.length && !existsSync(dirW)) continue;

    console.log(`${grupo.nombre} / ${nombreDe(dirC, c)}`);
    mkdirSync(dirW, { recursive:true });
    for (const n of origenes) copiaWeb(join(dirC, n), join(dirW, parse(n).name + '.jpg'));

    const fotos = readdirSync(dirW).filter(n => /\.jpe?g$/i.test(n)).sort().map(n => {
      const m = medidas(join(dirW, n));
      return m ? { archivo:n, r:+(m.w / m.h).toFixed(4) } : null;
    }).filter(Boolean);

    if (fotos.length) {
      grupo.carpetas.push({ slug:c, nombre:nombreDe(dirC, c), fotos });
      console.log(`  ${fotos.length} foto(s)`);
    }
  }
  if (grupo.carpetas.length) galerias.push(grupo);
}

const salida = `/* Generado por bin/galerias.mjs — no lo edites a mano.
   Para cambiar el nombre de una galería o carpeta, edita su nombre.txt. */
window.GALERIAS = ${JSON.stringify(galerias, null, 2)};
`;
writeFileSync(join(RAIZ, 'galerias.js'), salida);
console.log(`\ngalerias.js: ${galerias.length} galería(s), ${galerias.reduce((n,g)=>n+g.carpetas.length,0)} carpeta(s).`);
