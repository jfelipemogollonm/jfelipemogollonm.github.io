# Portafolio

Sitio estático: dos páginas, sin instalación, sin dependencias, sin cuotas.
`index.html` es la puerta (video a pantalla completa) y `trabajo.html` la galería.

```
portafolio/
├─ index.html        la puerta
├─ trabajo.html      la galería
├─ contenido.js      ← LO ÚNICO QUE TOCAS
├─ css/estilo.css
├─ js/galeria.js
└─ media/
   ├─ puerta.mp4     el loop de la portada
   ├─ poster/        el primer fotograma de ese loop
   ├─ reels/         tus mp4 verticales
   └─ foto/          tus jpg
```

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

## Publicarlo gratis

**Cloudflare Pages** o **Netlify**, las dos gratis para esto y sin tarjeta:

1. Entra a `app.netlify.com/drop` (o Cloudflare Pages → *Upload assets*).
2. Arrastra la carpeta `portafolio` entera.
3. Te da una dirección tipo `tunombre.netlify.app` al momento.

Si prefieres **GitHub Pages**: sube la carpeta a un repo, Settings → Pages → Deploy from branch →
`main` / `root`. Queda en `tuusuario.github.io/portafolio`.

Lo único que cuesta dinero es el dominio propio (`felipemogollon.com`, unos 12 €/año en
Namecheap o Cloudflare). El subdominio gratis funciona igual de bien para empezar.

## Detalles que igual quieres tocar

- **El color.** `acento` en `contenido.js`. Tiñe el título, las etiquetas y los enlaces.
- **El tamaño de las filas.** `--fila` en `css/estilo.css`: más alto = menos piezas por fila.
- **La tipografía.** Es Archivo, de Google Fonts, cargada en las dos páginas.
- **El orden de la galería.** Es el de la lista en `contenido.js`. Pon arriba lo mejor:
  casi nadie baja más de dos pantallas.
