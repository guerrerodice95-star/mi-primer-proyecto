# Trial A — "compro estas 4"

Variante para Trial Reels del reel `../../` (reutiliza `../../assets/`), para que Instagram la vea distinta:
- **Sin el inicio** ("todo el mercado cripto está cayendo… estas cuatro" y el gráfico de BTC): empieza directamente con la tarjeta de Solana.
- **Otro orden:** SOL → XRP → ASTER → HYPE (`segs.json`: tramos del bruto 14,95–19,05 · 3,30–7,15 · 11,0–14,8 · 7,22–10,95 · 19,1–21,56;
  se quitó el "Y" de "Y Solana"). Duración 17,9 s.
- **Tarjeta de CoinMarketCap en modo día** (blanca), entra deslizando y lleva contador "1/4 … 4/4"; precio y % en fila flex.
- **Subtítulos** de 1–2 palabras en MAYÚSCULAS; **sonidos distintos** (swish al cambiar de moneda, ding en el segundo precio, pop en los clics).
- Encuadre un poco más cerrado (1,16) y fondo superior azul oscuro.

Montaje: vídeo y audio reordenados con `filter_complex` desde `segs.json`; `plantilla_base.html` + `escenas.js` → `plantilla.html`;
`python3 generar.py words.json index.html plantilla.html face.json`; mezclar con `--original voz.wav` (audio reordenado).
