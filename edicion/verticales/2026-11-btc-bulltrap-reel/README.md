# Reel "Tres bull traps en Bitcoin: ¿y ahora?" (noviembre 2026)

Vertical 1080x1920, 39,08 s. Bruto en Drive: `edit btc bulltrap.mp4` (id `1axCqsELjwBcw3SKScQtfGqbxX5NSt9pr`), 1728x3072 a 25 fps,
ya montado en tres tramos:
- 0–7,12 s: cara (filas 266–1303) + TradingView ampliado (velas con sus tres líneas azules de bull trap).
- 7,12–23,28 s: cara (filas 266–1303) + gráfico semanal con Fibonacci (0,382 / 0,5 / 0,618), su elipse y su garabato hacia 38–45K.
- 23,28 s–final: solo cara (filas 976–2099).

Clips (no se suben, a 30 fps y `setsar=1`):
- `face1.mp4` = `crop=1728:1038:0:266` · `face2.mp4` = `crop=1728:1124:0:976`.
- `chartA.mp4` = `crop=1728:1568:0:1504` (sin barras; escala 0,625).
- `chartB.mp4` = `crop=1728:1274:0:1684` hasta 23,24 s y congelado después (`tpad`); escala 0,7535 y desplazado −222 px
  para que el eje de precios quede pegado al borde derecho. El fondo del gráfico es #e6e6e6, igual que el resto de la tarjeta.

Encuadre: cara arriba a 0,925 (≈1170 px de ancho de fuente) y gráfico abajo (960–1920). Desde 25,8 s cara completa (1920/1124), sin margen abajo.

| Segundo | Contenido |
|---|---|
| 1,58–3,94 | Insignias 1 · 2 · 3 sobre sus líneas azules y contador "BULL TRAPS ×1/×2/×3" (tiembla en el tercero) |
| 5,3–7,1 | Anillo en la última vela + "¿Y AHORA?" |
| 7,12 | Corte al gráfico semanal con zoom suave |
| 9,44–12,6 | Relleno verde en su elipse + "ZONA A AGUANTAR · 57K–65K"; "⚠️ CUIDADO" con zona roja bajo el 0,382 |
| 12,8–16,9 | "salvo…" + cristales: 💥 CATÁSTROFE · 🦠 COVID 2.0 · 💣 GUERRA MUNDIAL · 🌋 ALGO GORDO |
| 19,1–23,5 | Banda 0,5–0,618 (34.600–44.300 $), "LO MARCA EL ANÁLISIS TÉCNICO" y sello "NO LO VEO ✋" |
| 23,7–25,8 | Línea discontinua en 50.000 $ con ✕ y "NI ZONAS INFERIORES" |
| 26,5–36,4 | Cara completa: ✅ ESCENARIO PREPARADO · 💰 LIQUIDEZ GUARDADA · 🔁 SIEMPRE ●●● · tarjeta "DECISIÓN TOMADA ANTES DE LA SIGUIENTE VELA" con velas y la siguiente en "?" |
| 36,4–39,08 | 😰 EMOCIONES (tinte rojo) y pastilla de Instagram |

Archivos: `plantilla_base.html` (con `__CHART__`, `__FACE__`, `__FACE2__`), `escenas.js`, `generar.py`, `construir.py`,
`cara1.json` / `cara2.json` (seguimiento), `transcripcion.json`, `sonidos.json`.
