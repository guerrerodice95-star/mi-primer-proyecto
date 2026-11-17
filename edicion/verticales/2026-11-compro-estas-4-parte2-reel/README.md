# Reel "Todo cae y yo compro estas 4" · parte 2 (noviembre 2026)

Vertical 1080x1920, 19,6 s. Bruto en Drive: id `17jwUaI2NnjBUNjUAb7peRv813VTc9xcV`. Imagen útil `crop=1728:1188:0:942` (`cam.mp4`, no se sube).
Mismo formato que la parte 1 (`../2026-11-compro-estas-4-reel/`): tarjeta de CoinMarketCap arriba y la persona debajo; el precio cambia por corte.
La cabeza viene más pequeña en este bruto (alto de cara 579 px frente a 676), así que la escala es 1,31 arriba y 1,66 al final para que se vea igual que en la parte 1.

Monedas: Ethereum, Pump.fun (en la transcripción sale "PAMP"), Dogecoin y BNB.
Datos reales de CoinMarketCap (17/11/2026, `datos/`): ETH #2 4M · PUMP #50 93K · DOGE #12 2,3M · BNB #4 2,3M.
Precio actual: ETH 1.804 · PUMP 0,00275 · DOGE 0,0588 · BNB 590.
**Niveles propuestos (Unai no los dio; se cambian en `CARDS` de `escenas.js`):** ETH 1.600 / 1.300 · PUMP 0,0025 / 0,0019 · DOGE 0,053 / 0,042 · BNB 530 / 420.
El primer precio lleva el % real de 1 semana y el segundo la distancia desde el precio actual.

| Segundo | Contenido |
|---|---|
| 0–2,1 | Gráfico real de BTC (60 días, CoinGecko) cayendo arriba, "▼ −20,4 %" |
| 2,3–3,0 | Los 4 logos en "estas cuatro" |
| 3,2–17,2 | Tarjeta CMC de cada moneda: primer precio en "Si … cae", segundo en "a este precio compro más" |
| 17,2–19,6 | Cara a pantalla completa y pastilla de Instagram ("para la tercera parte") |

Para regenerar: rellenar `__CHART__` de `plantilla_base.html` con `escenas.js` y ejecutar
`python3 generar.py transcripcion.json index.html plantilla_rellena.html cara.json`.
