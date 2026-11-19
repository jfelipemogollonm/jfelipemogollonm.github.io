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

  // ── Enlaces ───────────────────────────────────────────────────
  enlaces: {
    youtube:   "https://www.youtube.com/@felipemogollonm",
    instagram: "https://www.instagram.com/felipemogollonm"
  },

  // ── El trabajo ────────────────────────────────────────────────
  // tipo "youtube" → id: lo que va después de ?v= en la URL
  // tipo "foto"    → imagen: el jpg + proporción (ancho ÷ alto)
  //
  // Los reels NO van aquí: suelta los videos en media/reels/originales/,
  // ejecuta `node bin/reels.mjs` y se reparten solos por la rejilla.
  //
  // El orden de esta lista es el orden en pantalla. Arriba lo mejor.
  piezas: [

    { tipo:"youtube", id:"2wH9a4gUTrI", titulo:"Day in the life of a college soccer player: watching USL 1" },
    { tipo:"foto",    imagen:"media/foto/01.jpg", proporcion:1.5,  titulo:"Retrato" },
    { tipo:"youtube", id:"lpdc5l0l8-0", titulo:"A 20 Yrs Old Colombian's Soccer Preseason in the U.S." },
    { tipo:"youtube", id:"uewRXUHOM04", titulo:"El libro que me cambió la vida" },
    { tipo:"foto",    imagen:"media/foto/02.jpg", proporcion:0.75, titulo:"Vertical" },
    { tipo:"youtube", id:"RYjcn6JMI5o", titulo:"My summer at University of Notre Dame" },
    { tipo:"youtube", id:"GKuKViUyxz0", titulo:"Así es ser estudiante internacional en Estados Unidos" },
    { tipo:"foto",    imagen:"media/foto/03.jpg", proporcion:1.77, titulo:"Paisaje" },
    { tipo:"youtube", id:"jU0z0GzonwY", titulo:"Me dejé llevar de la rutina..." },
    { tipo:"youtube", id:"0RA98zzS6vk", titulo:"17 horas para salvar mi proyecto de electrónica" },
    { tipo:"foto",    imagen:"media/foto/04.jpg", proporcion:1.33, titulo:"Calle" },
    { tipo:"youtube", id:"SHsSkN7Vh1M", titulo:"5 things to do instead of scrolling (real dopamine)" },
    { tipo:"youtube", id:"ffbKGgOhyOg", titulo:"Día de partido en la vida de un estudiante internacional" },
    { tipo:"foto",    imagen:"media/foto/05.jpg", proporcion:1.5,  titulo:"Detalle" },
    { tipo:"youtube", id:"5x5FVa207WI", titulo:"Primer día de pretemporada de un universitario en USA" },
    { tipo:"youtube", id:"TtZfZpiCq00", titulo:"Así es mi cuarto de verano en la universidad" },
    { tipo:"foto",    imagen:"media/foto/06.jpg", proporcion:0.8,  titulo:"Contraluz" },
    { tipo:"youtube", id:"ddwX6TSdANA", titulo:"Un fin de semana en mi vida" }

  ]
};
