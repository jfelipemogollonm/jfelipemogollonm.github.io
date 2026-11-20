/* ───────────────────────────────────────────────────────────────
   EL ÚNICO ARCHIVO QUE TIENES QUE TOCAR.
   Cambia los textos, los enlaces y la lista de piezas. Nada más.
   ─────────────────────────────────────────────────────────────── */

window.CONTENIDO = {

  // ── Quién eres ────────────────────────────────────────────────
  nombre:   "FELIPE MOGOLLON",
  monograma:"FM",                       // las 2 letras del header
  oficio:   "creative mind",
  acento:   "#ff2a2a",                  // el color que lo tiñe todo

  // ── La puerta (la primera pantalla) ───────────────────────────
  // Puede ser un video en bucle o una foto tuya. Si pones las dos, manda el
  // video y la foto se usa mientras carga. Para dejar solo la foto, pon
  // video: null.
  puerta: {
    video:  null,                        // un loop tuyo, mudo, 5-10 s
    imagen: "media/puerta/felipe.jpg",   // o una foto tuya
    poster: null
  },

  // ── Enlaces ───────────────────────────────────────────────────
  enlaces: {
    youtube:   "https://www.youtube.com/@felipemogollonm",
    instagram: "https://www.instagram.com/felipemogollonm"
  },

  // ── El trabajo ────────────────────────────────────────────────
  // Esto es MARCA PERSONAL: tu canal. Solo videos de YouTube.
  //   id = lo que va después de ?v= en la URL del video.
  //
  // Los reels NO van aquí: suelta los videos en media/reels/originales/,
  // ejecuta `node bin/reels.mjs` y se reparten solos por la rejilla.
  // Las fotos tampoco: esas van en media/galerias/ (Trabajo externo).
  //
  // El orden de esta lista es el orden en pantalla. Arriba lo mejor.
  piezas: [

    { tipo:"youtube", id:"2wH9a4gUTrI", titulo:"Day in the life of a college soccer player: watching USL 1" },
    { tipo:"youtube", id:"lpdc5l0l8-0", titulo:"A 20 Yrs Old Colombian's Soccer Preseason in the U.S." },
    { tipo:"youtube", id:"uewRXUHOM04", titulo:"El libro que me cambió la vida" },
    { tipo:"youtube", id:"RYjcn6JMI5o", titulo:"My summer at University of Notre Dame" },
    { tipo:"youtube", id:"GKuKViUyxz0", titulo:"Así es ser estudiante internacional en Estados Unidos" },
    { tipo:"youtube", id:"jU0z0GzonwY", titulo:"Me dejé llevar de la rutina..." },
    { tipo:"youtube", id:"0RA98zzS6vk", titulo:"17 horas para salvar mi proyecto de electrónica" },
    { tipo:"youtube", id:"SHsSkN7Vh1M", titulo:"5 things to do instead of scrolling (real dopamine)" },
    { tipo:"youtube", id:"ffbKGgOhyOg", titulo:"Día de partido en la vida de un estudiante internacional" },
    { tipo:"youtube", id:"5x5FVa207WI", titulo:"Primer día de pretemporada de un universitario en USA" },
    { tipo:"youtube", id:"TtZfZpiCq00", titulo:"Así es mi cuarto de verano en la universidad" },
    { tipo:"youtube", id:"ddwX6TSdANA", titulo:"Un fin de semana en mi vida" }

  ]
};
