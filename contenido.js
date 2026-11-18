/* ───────────────────────────────────────────────────────────────
   EL ÚNICO ARCHIVO QUE TIENES QUE TOCAR.
   Cambia los textos, los enlaces y la lista de piezas. Nada más.
   ─────────────────────────────────────────────────────────────── */

window.CONTENIDO = {

  // ── Quién eres ────────────────────────────────────────────────
  nombre:   "FELIPE MOGOLLÓN",
  monograma:"FM",                       // las 2 letras del header
  oficio:   "VIDEO · FOTOGRAFÍA",
  acento:   "#ff2a2a",                  // el color que lo tiñe todo

  // ── La puerta (la primera pantalla) ───────────────────────────
  puerta: {
    video:  "media/puerta.mp4",         // un loop tuyo, mudo, 5-10 s
    poster: "media/poster/puerta.jpg"   // el primer fotograma, por si el video tarda
  },

  // ── Sobre mí ──────────────────────────────────────────────────
  sobre: "Edito y grabo. Cuento historias en 16:9 y en 9:16, y las congelo en foto cuando no se dejan mover. Disponible para encargos.",

  // ── Enlaces ───────────────────────────────────────────────────
  enlaces: {
    youtube:   "https://youtube.com/@tucanal",
    instagram: "https://instagram.com/tuusuario",
    correo:    "hola@tudominio.com"
  },

  // ── El trabajo ────────────────────────────────────────────────
  // tipo "youtube" → id: lo que va después de ?v= en la URL
  // tipo "reel"    → video: un mp4 vertical tuyo + enlace al reel
  // tipo "foto"    → imagen: el jpg + proporción (ancho/alto)
  piezas: [

    { tipo:"youtube", id:"YE7VzlLtp-4", titulo:"Nombre del video",      nota:"Guion, cámara y edición" },
    { tipo:"foto",    imagen:"media/foto/01.jpg", proporcion:1.5,  titulo:"Retrato" },
    { tipo:"reel",    video:"media/reels/01.mp4", enlace:"https://instagram.com/reel/xxxx", titulo:"Reel de ejemplo" },
    { tipo:"foto",    imagen:"media/foto/02.jpg", proporcion:0.75, titulo:"Vertical" },
    { tipo:"youtube", id:"YE7VzlLtp-4", titulo:"Otro video",            nota:"Edición y color" },
    { tipo:"foto",    imagen:"media/foto/03.jpg", proporcion:1.77, titulo:"Paisaje" },
    { tipo:"reel",    video:"media/reels/02.mp4", enlace:"https://instagram.com/reel/xxxx", titulo:"Otro reel" },
    { tipo:"foto",    imagen:"media/foto/04.jpg", proporcion:1.33, titulo:"Calle" },
    { tipo:"youtube", id:"YE7VzlLtp-4", titulo:"Un tercero",            nota:"Dirección y montaje" },
    { tipo:"reel",    video:"media/reels/03.mp4", enlace:"https://instagram.com/reel/xxxx", titulo:"Reel vertical" },
    { tipo:"foto",    imagen:"media/foto/05.jpg", proporcion:1.5,  titulo:"Detalle" },
    { tipo:"foto",    imagen:"media/foto/06.jpg", proporcion:0.8,  titulo:"Contraluz" }

  ]
};
