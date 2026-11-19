#!/usr/bin/env node
/* Registra las fotos de media/galerias/ en galerias.js.
 *
 *   node bin/galerias.mjs
 *
 * Tú sueltas las fotos (del tamaño que sean, también .heic del iPhone) en
 *   media/galerias/<galeria>/<carpeta>/
 *
 * La portada de una galería o de una carpeta es su primera foto. Para elegir
 * otra, deja un portada.txt al lado del nombre.txt con el nombre del archivo:
 *   media/galerias/gsa/fall-academy/portada.txt   →   IMG_8237.jpg
 * y esto deja en web/ una copia ligera (lado largo 2000 px) que es la que
 * publica el sitio. Los originales se quedan donde están y no se suben.
 */
import { readdirSync, existsSync, statSync, readFileSync, writeFileSync, mkdirSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, parse } from 'node:path';
import { fileURLToPath } from 'node:url';

const RAIZ   = fileURLToPath(new URL('../', import.meta.url));
const BASE   = join(RAIZ, 'media/galerias');
const FOTOS  = /\.(jpe?g|png|heic|heif|webp|tiff?)$/i;
const LADO   = 2000;     // lado largo de la copia que se ve en el visor
const CALIDAD= 78;
const MINI   = 800;      // lado largo de la miniatura de la rejilla
const CAL_MINI = 68;

const carpetas = d => existsSync(d) ? readdirSync(d, { withFileTypes:true }).filter(e => e.isDirectory()).map(e => e.name) : [];
const titulo   = s => s.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');

function nombreDe(dir, slug) {
  const f = join(dir, 'nombre.txt');
  return existsSync(f) ? readFileSync(f, 'utf8').trim() : titulo(slug);
}

/* el archivo que manda como portada, si hay un portada.txt */
function portadaDe(dir) {
  const f = join(dir, 'portada.txt');
  if (!existsSync(f)) return null;
  const n = readFileSync(f, 'utf8').trim();
  return n ? parse(n).name + '.jpg' : null;
}

function medidas(archivo) {
  const txt = execFileSync('sips', ['-g', 'pixelWidth', '-g', 'pixelHeight', archivo], { encoding:'utf8' });
  const w = +(txt.match(/pixelWidth:\s*(\d+)/)  || [])[1];
  const h = +(txt.match(/pixelHeight:\s*(\d+)/) || [])[1];
  return (w && h) ? { w, h } : null;
}

function asegura(origen, destino, lado, calidad, permitirCopia) {
  // se rehace solo si falta o si el original es más nuevo
  if (existsSync(destino) && statSync(destino).mtimeMs >= statSync(origen).mtimeMs) return false;

  const m = medidas(origen);
  const grande = !m || Math.max(m.w, m.h) > lado;

  // Si ya viene lista (jpg, dentro de medida y ligera), se copia tal cual:
  // así una foto que ya editaste y exportaste no se vuelve a comprimir.
  if (permitirCopia && !grande && /\.jpe?g$/i.test(origen) && statSync(origen).size <= 1_500_000) {
    copyFileSync(origen, destino);
    return true;
  }

  const args = ['-s','format','jpeg','-s','formatOptions',String(calidad)];
  if (grande) args.push('-Z', String(lado));   // nunca se agranda una foto pequeña
  execFileSync('sips', [...args, origen, '--out', destino], { stdio:'ignore' });
  return true;
}

function copiaWeb(origen, dirW, nombre) {
  const hecho = asegura(origen, join(dirW, nombre), LADO, CALIDAD, true)
              | asegura(origen, join(dirW, 'mini', nombre), MINI, CAL_MINI, false);
  if (hecho) process.stdout.write(`  · ${nombre}\n`);
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
    mkdirSync(join(dirW, 'mini'), { recursive:true });
    for (const n of origenes) copiaWeb(join(dirC, n), dirW, parse(n).name + '.jpg');

    const fotos = readdirSync(dirW).filter(n => /\.jpe?g$/i.test(n)).sort().map(n => {
      const m = medidas(join(dirW, n));
      return m ? { archivo:n, r:+(m.w / m.h).toFixed(4) } : null;
    }).filter(Boolean);

    if (fotos.length) {
      const elegida = portadaDe(dirC);
      const portada = fotos.some(f => f.archivo === elegida) ? elegida : fotos[0].archivo;
      grupo.carpetas.push({ slug:c, nombre:nombreDe(dirC, c), portada, fotos });
      console.log(`  ${fotos.length} foto(s)`);
    }
  }
  if (grupo.carpetas.length) {
    const elegida = portadaDe(dirG);
    const dentro = grupo.carpetas.find(c => c.fotos.some(f => f.archivo === elegida));
    grupo.portada = dentro
      ? { carpeta: dentro.slug, archivo: elegida }
      : { carpeta: grupo.carpetas[0].slug, archivo: grupo.carpetas[0].portada };
    galerias.push(grupo);
  }
}

const salida = `/* Generado por bin/galerias.mjs — no lo edites a mano.
   Para cambiar el nombre de una galería o carpeta, edita su nombre.txt. */
window.GALERIAS = ${JSON.stringify(galerias, null, 2)};
`;
writeFileSync(join(RAIZ, 'galerias.js'), salida);
console.log(`\ngalerias.js: ${galerias.length} galería(s), ${galerias.reduce((n,g)=>n+g.carpetas.length,0)} carpeta(s).`);
