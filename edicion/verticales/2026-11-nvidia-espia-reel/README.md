# Reel "El CEO de Nvidia y la presunta espía china" (noviembre 2026)

Vertical 1080x1920, 58,8 s. Bruto en Drive: `edit nvidia.mp4` (id `1q9tB_UwP55r8ixb12QLSOZkOqY9B6mQa`), imagen útil `crop=1728:1144:0:964`.
Referencia: https://www.instagram.com/reel/Dff1Cqkoezy/. Unai pidió **menos desplazamientos**, imágenes reales y subrayar las noticias.

Assets (los vídeos no se suben):
- `hook.mp4`: clip del móvil plegable que mandó Unai (`IMG_6795.MP4`), acelerado ×1,45 (`setpts=PTS/1.45`) para encajar en 0–7 s.
- `nyt.png`: captura real del New York Times ("Nvidia Opens Investigation Into Jensen Huang's Relationship With Chinese Spy"),
  recortada de la referencia (las webs de noticias bloquean el acceso automático).
- `jensen.jpg`: foto de Jensen Huang, Wikimedia Commons (`File:Jen-Hsun_Huang_2025_(2).jpg`).
- `sonidos-extra/inicio.wav` y `error.wav`: sonidos sintetizados al estilo "inicio de sesión" y "error" de Windows (no son los originales).
  Copiarlos a la carpeta de SFX antes de mezclar.

| Segundo | Contenido |
|---|---|
| 0–7 | Gancho: el móvil (sonido de inicio); flechas "JENSEN HUANG · CEO de NVIDIA" y "SU ESPOSA"; al desplegar, error del sistema "ALICE HUANG · presunta espía del gobierno chino (según la inteligencia de EE. UU., NYT)" con sonido de error. Rótulo "IMAGEN: MONTAJE" |
| 7–9,3 | Barras de cine "🎬 PARECE UNA PELÍCULA…" → "…PERO ES REAL" |
| 9,4–11,5 | Tarjeta NVDA con la línea cayendo y "▼ SE DESPLOMA" |
| 13–19 | "Lo que preocupa a los inversores: ¿se filtró información?" y sello CONFIDENCIAL |
| 19,1–28 | Pantalla partida: captura del NYT subrayada al leerla (Relationship / With Chinese Spy / U.S. officials had determined / working for Chinese intelligence) |
| 28,2–36,4 | 3D a pantalla completa (Unai oculto): chip NVIDIA girando, pistas que se iluminan, "IA", pulso 🇺🇸 ESTADOS UNIDOS vs 🇨🇳 CHINA |
| 37–44 | "El consejo de Nvidia: investigación independiente · por ahora sin motivos para creer que se filtrara información" |
| 44–49,6 | Pantalla partida: foto real de Jensen + "acción bajo presión · incertidumbre · seguridad · liderazgo" |
| 52–57 | "¿Hasta dónde llegó?" · "¿Información privilegiada en riesgo?" |
| 57–58,8 | Pastilla de Instagram |

Montaje: en `plantilla_base.html` sustituir `__CSS__` por `estilos.css` y `__CHART__` por `grafico.js` → `plantilla.html`;
`python3 generar.py transcripcion.json index.html plantilla.html cara.json`.
