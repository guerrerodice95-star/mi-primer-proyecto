# Reel "PEPE ni se inmuta tras el hackeo a Binance" (noviembre 2026)

Vertical 1080x1920, 35,8 s. Bruto en Drive: `pepe fuerza reel.mp4` (id `1oBgskPM0qIp8KDQc2hoWVe1c2qM61Aic`).
El bruto ya viene montado por Unai en 4 partes (cara · cara + noticia · cara + gráfico de TradingView · cara). **El gráfico no se toca.**

Clips (no se suben):
- `raw30.mp4`: bruto a 30 fps; partes de cara a pantalla completa (0–6,76 y 27,2–fin) encuadradas con `encuadre.json`:
  escala fija por tramo (0,9 / 0,86 / 1,0 tras su corte de 31,5 s), cabeza pegada arriba y centrada con seguimiento de cara.
- `face.mp4` y `content.mp4`: cara arriba y noticia/gráfico abajo en los tramos 6,76–14,68 y 14,68–27,2 (recortes del bruto).

**Encuadre:** la primera versión recortaba la cara a ~890 px de ancho de origen y se veía demasiado cerca. Unai lo marcó como
mal encuadrado; ahora se ve ~1.200 px de ancho (cabeza + hombros) y los rótulos van debajo de la imagen.

| Segundo | Contenido |
|---|---|
| 0–6,76 | 🚨 HACKEO (destello rojo) · "EL MÁS IMPORTANTE DEL MUNDO CRIPTO" · Binance |
| 6,76–14,68 | Noticia: subrayado amarillo "7,77 billones de tokens PEPE robados" y verde "14.049 ETH"; "7.770.000.000 PEPE · ROBADOS" → "PEPE → 14.049 ETH" |
| 14,68–27,2 | Gráfico semanal intacto; "✓ NINGUNA MODIFICACIÓN"; flecha "🚨 HACKEO · 30 OCT" a la vela; "NO HA PASADO ABSOLUTAMENTE NADA" |
| 27,2–35,8 | "NI SE HA INMUTADO" · 💪 FUERZA · 🐋 GRANDES COMPRADORES DETRÁS · pastilla de Instagram |

v2: gráfico con el eje de precios pegado al borde derecho (`crop=1662:1971:0:1100`) y el hueco relleno del gris del gráfico (#e6e6e6) en vez de negro;
logo de PEPE grande en "Pepe ni se ha inmutado" (27,3 s).

v3: el bruto trae un zoom a saltos (28,4–31,3 s) y un corte a 31,5 s que daba tirones. Ahora el encuadre se calcula fotograma a
fotograma con la altura de la imagen del bruto, compensando sus saltos: el tamaño aparente crece suave hasta llenar la pantalla
(escala 1920/1295) a 32,6 s y **termina con la cara a pantalla completa, sin margen abajo**.
