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

    // Los 27 videos del canal, de más a menos visto (20 de noviembre de 2026).
    // Si quieres otro orden, mueve las líneas: manda esta lista, no YouTube.

    { tipo:"youtube", id:"c2DRJIudI-Y", titulo:"La rutina perfecta para universitarios | 24 horas en mi vida" },
    { tipo:"youtube", id:"zgMlgUgOf0A", titulo:"Día de partido en la vida de un estudiante-atleta en Estados Unidos" },
    { tipo:"youtube", id:"IduN2MsurD4", titulo:"2 partidos en 24 horas | Vida de un atleta en USA" },
    { tipo:"youtube", id:"3sLYWMo11D4", titulo:"24 horas en la vida de un estudiante extranjero en Estados Unidos" },
    { tipo:"youtube", id:"LTWMYI79l6E", titulo:"Semifinal universitaria de fútbol en Estados Unidos en 4 minutos" },
    { tipo:"youtube", id:"SHsSkN7Vh1M", titulo:"5 things to do instead of scrolling (real dopamine)" },
    { tipo:"youtube", id:"HewwYMXtFaE", titulo:"Un domingo en una universidad de Estados Unidos" },
    { tipo:"youtube", id:"_om0UAb2L5k", titulo:"Día de partido después de 4 meses sin jugar" },
    { tipo:"youtube", id:"UqfQK_i3OVA", titulo:"Un día en la vida de un estudiante-atleta en Estados Unidos" },
    { tipo:"youtube", id:"YnQttNT2V_M", titulo:"Un día realista estudiando en Estados Unidos | Ingeniería física" },
    { tipo:"youtube", id:"gu1k1RpecV0", titulo:"Estudiando ingeniería física en Estados Unidos" },
    { tipo:"youtube", id:"j6rdpPKQTsw", titulo:"Das un discurso frente a toda tu universidad en otro idioma" },
    { tipo:"youtube", id:"5x5FVa207WI", titulo:"Primer día de pretemporada de un universitario en USA" },
    { tipo:"youtube", id:"GKuKViUyxz0", titulo:"Así es ser estudiante internacional en Estados Unidos" },
    { tipo:"youtube", id:"vnD3rQoQ3m0", titulo:"Así es viajar solo para estudiar en otro país" },
    { tipo:"youtube", id:"2wH9a4gUTrI", titulo:"Day in the life of a college soccer player: watching USL 1" },
    { tipo:"youtube", id:"TtZfZpiCq00", titulo:"Así es mi cuarto de verano en la universidad" },
    { tipo:"youtube", id:"ddwX6TSdANA", titulo:"Un fin de semana en mi vida" },
    { tipo:"youtube", id:"ESUX3Cr8j74", titulo:"Viajas con el equipo en Estados Unidos" },
    { tipo:"youtube", id:"x8_hkfEh0Y8", titulo:"Mi primer partido de la NBA después de un día estudiando" },
    { tipo:"youtube", id:"lpdc5l0l8-0", titulo:"A 20 Yrs Old Colombian's Soccer Preseason in the U.S." },
    { tipo:"youtube", id:"ffbKGgOhyOg", titulo:"Día de partido en la vida de un estudiante internacional" },
    { tipo:"youtube", id:"hA61xnb3Kdg", titulo:"Crea tu camino, no el que te imponen" },
    { tipo:"youtube", id:"RYjcn6JMI5o", titulo:"My summer at University of Notre Dame" },
    { tipo:"youtube", id:"0RA98zzS6vk", titulo:"17 horas para salvar mi proyecto de electrónica" },
    { tipo:"youtube", id:"uewRXUHOM04", titulo:"El libro que me cambió la vida" },
    { tipo:"youtube", id:"jU0z0GzonwY", titulo:"Me dejé llevar de la rutina..." }

  ]
};
