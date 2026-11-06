# Reel "La bolsa ayer: 2,5 billones esfumados y pánico con la IA" (noviembre 2026)

Vertical 1080x1920, 41,6 s. Bruto en Drive: `dale.mp4` (id `18STP8x0obWAK3EoGht7147LP0ulyDY2h`), imagen útil `crop=1728:1360:0:856`.
Vídeo insertado: el del tweet de @BullTheoryio (https://x.com/BullTheoryio/status/2118427411511677350), `assets/tweet.mp4`
(descargado con `yt-dlp`; hizo falta permitir x.com, api.x.com, video.twimg.com… en el entorno).
Color de los reels de siempre. Cabeza arriba, gráficos abajo.

| Segundo | Contenido |
|---|---|
| 0–9,3 | "AYER · WALL STREET · EN DIRECTO": velas desplomándose (ya en el primer fotograma); "UNO DE LOS PEORES DÍAS DE SU HISTORIA"; contador −2.500.000.000.000 $ "ESFUMADOS" · "2,5 BILLONES DE DÓLARES"; cronómetro "EN SEGUNDOS" |
| 9,4–18,9 | "PARA PONEROS EN CONTEXTO": 🇺🇸 ELECCIONES MIDTERM, DEMÓCRATAS ✓ GANAN; 🤖 IA con sello rojo "⚖️ REGULAR" |
| 18,9–21 | Pantalla completa "eso ha hecho generar pánico", corte seco en "pánico" |
| 21,2–24,8 | 😱 PÁNICO: barras rojas S&P 500, NASDAQ y BITCOIN cayendo, con temblor de datos en vivo |
| 24,9–31,8 | Vídeo del tweet (AI STOCKS, −$13,2T) con zoom al total y vuelta; "Vídeo: @BullTheoryio en X" |
| 31,9–37,3 | Barras Imprenta · Electricidad · Internet · Smartphone · IA (dorada) → "LA MAYOR REVOLUCIÓN TECNOLÓGICA" |
| 37,4–39,7 | "Vamos a alejarnos": zoom out de la caída de HOY a la tendencia larga → "ALÉJATE Y MANTÉN LA CALMA" |
| 39,8–41,6 | Pantalla completa + pastilla de Instagram |

Montaje: `plantilla_base.html` + `grafico.js` (sustituye `__CHART__`) → `plantilla.html`;
`python3 generar.py transcripcion.json index.html plantilla.html cara.json`.

## v2 (correcciones de Unai)
- 18,9–23,2: más rato a pantalla completa ("eso ha hecho generar pánico… y ese pánico se ha visto traducido en los mercados"),
  con cortes secos en 20,4 y 21,2 (las barras S&P/NASDAQ/BITCOIN pasaban demasiado rápido y no se entendían).
- 23,4–26: ₿ BITCOIN de 81.000 $ a 75.500 $ (contador, velas y "−6,8 %").
- 26,1–31,8: vídeo de X más grande: `tweet.mp4` sin la columna vacía del medio
  (`crop` cabecera 0–545 + 880–1920, cuerpo 0–275 + 610–1920 → 1584x1080), a 1020x695 en pantalla; zoom al −$13,2T en "rodea a la IA".
