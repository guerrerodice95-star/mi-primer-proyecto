# Trial A del reel de liquidez — "Empieza por la pregunta"

Variante para Trial Reels del reel `../../` (misma voz mejorada `audio ok.mp4`), pensada para que Instagram la vea distinta:

- **Orden:** abre con "¿Cómo sabes si es ruptura o es trampa?" (bruto 17,8–20,2 s) y luego sigue desde el principio
  (bruto 0–17,8 s → 2,4–20,2 s); desde 20,2 s todo va igual que el original. Duración 56,5 s.
- **Primer fotograma / gancho:** dos velas grandes sobre el máximo de ayer, "RUPTURA" (cuerpo arriba) vs "TRAMPA" (solo mecha) y "?".
- **Layout invertido:** gráfico arriba y cabeza abajo; sin la pausa a pantalla completa del medio (solo el cierre de Instagram).
- **Saltos distintos:** cortes secos alternando primer plano (0,95) y plano abierto (0,82–0,84) en 0; 2,4; 14,3; 20,2; 34,1; 40,2; 48,5.
- **Subtítulos:** 1–2 palabras, en MAYÚSCULAS, cada palabra aparece al decirla (en vez de verse apagada antes).
- Las animaciones del gráfico original se recolocan con `MAP()` (tiempos del bruto → nueva edición).

Montaje (en una carpeta de trabajo con `assets/` del original):
1. `cam.mp4` reordenado: `ffmpeg -i cam.mp4 -filter_complex "[0:v]trim=start_frame=534:end_frame=606,…[a];…trim=0:534…[b];…trim=start_frame=606…[c];[a][b][c]concat=n=3"`
   y lo mismo con el audio (`atrim=17.8:20.2`, `0:17.8`, `20.2:`).
2. `plantilla_base.html` + `grafico.js` (sustituye `__CHART__`) → `plantilla.html`;
   `python3 generar.py transcripcion.json index.html plantilla.html cara.json`.
3. Mezclar con `mezclar_audio.py --original <audio reordenado>`.
