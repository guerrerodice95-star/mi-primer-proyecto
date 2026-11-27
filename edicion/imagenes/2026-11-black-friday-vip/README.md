# Imagen Black Friday · Grupo VIP (noviembre 2026)

Post 1080x1350 (`black_friday_vip_post.png`) e historia 1080x1920 (`black_friday_vip_historia.png`). Negro y dorado de marca, logo TC
(`logo.png` = `../../marca/logo-tc.jpg` con el fondo quitado).

Promo (sin precios, como pidió Unai):
- Trimestral (249 €) + 1 mes gratis = 4 meses al precio de 3 → **−25 %** (249/4 = 62,25 €/mes frente a 83 €/mes).
- Anual (699 €) + 2 meses gratis = 14 meses al precio de 12 → −14,3 % sobre el anual (49,93 €/mes frente a 58,25 €/mes).
- Titular: "HASTA −25 %" (el mayor de los dos, calculado sobre cada plan).
  Si se compara el anual con pagar al precio del trimestral (83 €/mes × 14 = 1.162 €), saldría −40 %.

Servicios: los 12 canales del grupo (captura de Telegram de Unai), resumidos en una línea cada uno.
Para regenerar: `node shot.js` en esta carpeta (necesita `../../marca/fonts` copiado como `fonts/`).

## v2 (lo que se usa)

Unai pidió **menos info en la historia** (la oferta se ve en Telegram), **un estilo menos "IA"** (referencia: portfolio de posts de gimnasio con
tipografía condensada en cursiva, amarillo y negro, y barra de "Confira na legenda") y **sin su cara**.
- `v2/vip_historia.png` (1080x1920): "En el Grupo VIP llega el / BLACK FRIDAY / Hasta −25 % DTO." y barra "Mira la oferta en Telegram | The Cryptons VIP »»".
  Abajo queda hueco libre para el sticker de enlace de Instagram.
- `v2/vip_post.png` (1080x1350): "Somos / 300 ALUMNOS / ACTIVOS" y barra "en el Grupo VIP de Telegram | The Cryptons »»".
- Fuente Anton (condensada, `@fontsource/anton` de npm) inclinada −8°, amarillo #f2b632 plano (sin degradados ni cristal), grano de papel,
  letras gigantes en contorno detrás y velas reales de BTC del último año (CoinGecko, OHLC de 4 días) como textura.
- Regenerar: `node shot.js` dentro de `v2/` (fuentes Inter de `../../marca/fonts` en `v2/fonts/`).
