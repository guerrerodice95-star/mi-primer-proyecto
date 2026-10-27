# Versiones para Trial Reels del reel del espejo

Dos variantes del reel original (v2) pensadas para que Instagram las trate como contenido distinto
(cambian el primer fotograma, los primeros segundos de audio, el layout y el estilo de subtítulos).
Ambas reutilizan `../assets/` y la plantilla del original.

## A — "Empieza por el final"
- Se reordena el bruto: abre con "¿Dónde está ahora ese nivel del 50 %? En los 72.000 dólares" (original 36,74–41,30 s;
  se quita el "Entonces,") y luego sigue la historia completa. Duración 53,3 s.
- Apertura: gráfico 2026 completo, "¿HASTA DÓNDE CAE?", línea del 50 % · $72.500 y punto dorado.
- La animación original se reubica con `MAP()` en la plantilla (tiempos originales → nueva edición).
- Bruto reordenado: `ffmpeg … trim=36.74:41.30 | trim=0:36.30 | trim=41.30` (ver historial).
  Regenerar: `python3 generar… gen.py words_raw.json index.html template.html face.json`.

## B — "Misma historia, otra cara"
- Layout invertido: gráfico arriba, Unai abajo.
- Gancho con 2023 dibujado encima de 2026 ("MISMO PATRÓN") en vez de lado a lado.
- Subtítulos de 1–2 palabras en mayúsculas, más grandes.
- Mismo bruto y transcripción que el original: `python3 gen.py ../../transcripcion.json index.html template.html ../../cara.json`.
