# Portafolio

Sitio estático, sin instalación, sin dependencias, sin cuotas. Dos partes:

- **Marca personal** (`marca.html`): tu canal. Videos de YouTube y tus reels.
- **Trabajo externo** (`galerias.html`): lo que haces para otros. GSA, Goshen College…

Todo el sitio está en **español e inglés**, con el interruptor ES/EN arriba a la derecha.
Elige solo el idioma del navegador la primera vez, y luego recuerda el que elijas.

```
portafolio/
├─ index.html        la puerta: nombre y las dos partes
├─ marca.html        marca personal
├─ galerias.html     trabajo externo (las tres pantallas: galerías, carpetas, fotos)
├─ contenido.js      ← tus datos y la lista de videos de YouTube
├─ css/estilo.css
├─ js/
│  ├─ idioma.js      ← los textos en español e inglés
│  ├─ galeria.js
│  └─ galerias-pagina.js
├─ bin/              los dos scripts (galerias.mjs, reels.mjs)
└─ media/
   ├─ puerta.mp4     el loop de la portada
   ├─ galerias/      las fotos, por cliente y carpeta
   └─ reels/         tus mp4 verticales
```

**Para cambiar un texto de la interfaz** (menús, títulos de sección, botones) se edita
`js/idioma.js`, que tiene las dos versiones una al lado de la otra. Los títulos de tus
videos y de tus galerías no se traducen: son tuyos y salen tal cual los escribes.

## Verlo mientras trabajas

Doble clic en `index.html` ya funciona. Para verlo como se verá publicado:

```bash
cd "/Users/jfelipemogollon/Desktop/Proyecto edicion autonoma /portafolio" && python3 -m http.server 4330
```

y abre `http://localhost:4330`.

## Cambiar el contenido

Todo está en `contenido.js`. Cada pieza es una línea:

| tipo | qué necesita |
|---|---|
| `youtube` | `id` — lo que va después de `?v=` en la URL del video. La miniatura la baja sola de YouTube. |
| `reel` | `video` — un mp4 vertical tuyo en `media/reels/`, y `enlace` al reel de Instagram. |
| `foto` | `imagen` en `media/foto/` y `proporcion` (ancho ÷ alto: 1.5 para horizontal, 0.75 para vertical). |

El orden de la lista es el orden en la pantalla. Borra, añade y reordena sin tocar nada más.

> Instagram no deja incrustar reels desde un sitio propio sin su API, así que lo que se ve
> es tu propio mp4 (así carga rápido y no depende de ellos) con un enlace al reel original.

## Las galerías de fotos

Aparte del trabajo suelto, el sitio tiene **galerías**: una galería contiene carpetas,
y cada carpeta contiene fotos. Ahora mismo hay dos: **GSA**, con la carpeta **Fall Academy**, y **Goshen College**,
todavía vacía (no sale en el sitio hasta que tenga fotos).

Una carpeta por sesión o por evento. Para añadir fotos:

1. Suelta las fotos tal cual salen de la cámara o del teléfono (valen `.heic`) en:

```
portafolio/media/galerias/gsa/fall-academy/
portafolio/media/galerias/goshen-college/<lo-que-sea>/
```

2. Ejecuta esto una vez:

```bash
cd "/Users/jfelipemogollon/Desktop/Proyecto edicion autonoma /portafolio" && node bin/galerias.mjs
```

Eso deja en `web/` una copia ligera de cada foto (lado largo 2000 px) y actualiza
`galerias.js` con sus medidas. **Los originales no se suben**: se quedan en tu disco,
el sitio publica solo las copias.

3. Publica:

```bash
cd "/Users/jfelipemogollon/Desktop/Proyecto edicion autonoma /portafolio" && git add -A && git commit -m "Fotos de Fall Academy" && git push
```

**Para una galería o carpeta nueva** basta con crear la carpeta y, si quieres que el
nombre salga bonito, un `nombre.txt` dentro con el nombre en una línea:

```
media/galerias/gsa/winter-camp/nombre.txt   →  Winter Camp
media/galerias/bodas/nombre.txt             →  Bodas
```

Sin `nombre.txt`, el nombre sale del nombre de la carpeta (`winter-camp` → "Winter Camp").
El orden de las fotos es alfabético, así que si quieres mandar tú el orden, numéralas
(`01-...jpg`, `02-...jpg`).

## Preparar los archivos

Los medios de `media/` ahora mismo son **de relleno**: degradados generados para que veas el
diseño. Cámbialos por los tuyos.

```bash
# el loop de la puerta: 1080p, sin audio, unos 8 segundos, ligero
ffmpeg -i entrada.mov -t 8 -an -vf "scale=1920:-2" -c:v libx264 -crf 26 -preset slow -movflags +faststart media/puerta.mp4
```

```bash
# su primer fotograma, para que no se vea negro mientras carga
ffmpeg -i media/puerta.mp4 -frames:v 1 -q:v 3 media/poster/puerta.jpg
```

```bash
# un reel vertical, recortado y comprimido
ffmpeg -i reel.mov -an -vf "scale=1080:-2" -c:v libx264 -crf 28 -preset slow -movflags +faststart media/reels/01.mp4
```

```bash
# las fotos: lado largo de 2000 px, calidad alta pero sin pasarse
ffmpeg -i foto.jpg -vf "scale='min(2000,iw)':-2" -q:v 4 media/foto/01.jpg
```

Apunta a que la página entera pese menos de 5 MB. El loop de la puerta es lo que más engorda:
si pasa de 3 MB, bájale la duración antes que la calidad.

## Actualizarlo

Ya está publicado en **https://jfelipemogollonm.github.io** (GitHub Pages, gratis).
El repositorio se llama `jfelipemogollonm.github.io`: ese nombre es lo que hace que la
dirección no lleve nada detrás.
Cada vez que cambies algo:

```bash
cd "/Users/jfelipemogollon/Desktop/Proyecto edicion autonoma /portafolio" && git add -A && git commit -m "Nuevas piezas" && git push
```

Tarda un minuto en verse. Si no se actualiza, es la caché del navegador: recarga con ⌘⇧R.

## Otras formas de publicarlo gratis

**Cloudflare Pages** o **Netlify**, las dos gratis para esto y sin tarjeta:

1. Entra a `app.netlify.com/drop` (o Cloudflare Pages → *Upload assets*).
2. Arrastra la carpeta `portafolio` entera.
3. Te da una dirección tipo `tunombre.netlify.app` al momento.

(Es lo que ya usa el sitio, así que esto solo te sirve si algún día quieres moverlo.)

Lo único que cuesta dinero es el dominio propio (`felipemogollon.com`, unos 12 €/año en
Namecheap o Cloudflare). El subdominio gratis funciona igual de bien para empezar.

## Detalles que igual quieres tocar

- **El color.** `acento` en `contenido.js`. Tiñe el título, las etiquetas y los enlaces.
- **El tamaño de las filas.** `--fila` en `css/estilo.css`: más alto = menos piezas por fila.
- **La tipografía.** Es Archivo, de Google Fonts, cargada en las dos páginas.
- **El orden de la galería.** Es el de la lista en `contenido.js`. Pon arriba lo mejor:
  casi nadie baja más de dos pantallas.
