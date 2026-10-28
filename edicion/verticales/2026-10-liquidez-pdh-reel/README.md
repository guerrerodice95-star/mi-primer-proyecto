# Reel "Tú eres la liquidez: ruptura o barrido del máximo de ayer" (octubre 2026)

Vertical 1080x1920, 56,5 s. Bruto en Drive: `editar liquidez.mp4` (id `11BmJ-ic13U6Hnpt60dUuTwjDeXVnXEyE`), imagen útil
`crop=1728:1208:0:932`. Referencia: reel de Asim Trading (https://www.instagram.com/p/DeQG_lEIlVO/), adaptado a nuestro estilo.
Audio final: Unai mejoró la voz y la mandó aparte (`audio ok.mp4`, id `1kqdyhsY4sGoSrXE-SvW6N11XX5FQa5Wy`, misma duración y
sincronía); se mezcla con `--original "audio ok.mp4"` sin volver a renderizar.
Layout pedido por Unai: **cabeza arriba y gráfico abajo**.

| Segundo | Contenido |
|---|---|
| 0–4,3 | Gancho: BUY al romper el máximo de ayer → mecha y caída → "TÚ ERES LA LIQUIDEZ" |
| 7,3–17,5 | Rebobinado: stops de vendedores encima del máximo; el precio los toma y gira; "COMPRASTE EN LA MECHA" |
| 17,6–20,4 | Pantalla completa: "¿ruptura o trampa?" |
| 20,5–33 | PDH/PDL de ayer; vela que perfora: cuerpo arriba = RUPTURA ✓, solo mecha = BARRIDO |
| 34–39,5 | No vender en la mecha: esperar vela bajista que cierre debajo |
| 40–48 | Plan: SELL al cierre, stop encima de la mecha, objetivo = PDL (liquidez del otro lado) |
| 48,5–52,1 | Cuerpo cierra arriba → "NO HAY TRADE" |
| 52,5–56,5 | Pantalla completa + pastilla de Instagram (Seguir → Siguiendo, Guardar) |

Montaje: `plantilla_base.html` + `grafico.js` (sustituye `__CHART__`) → `plantilla.html`; luego
`python3 generar.py transcripcion.json index.html plantilla.html cara.json`.
