# Reel "¿Qué es Bitcoin?" para principiantes (noviembre 2026)

Vertical 1080x1920, 52,8 s. Bruto en Drive: `editar que es btc.mp4` (id `14dq3Hdn7G6yzJHP4KGYhUmtLLgxY_Ry7`), imagen útil `crop=1728:1468:0:802`.
Inspiración: https://www.instagram.com/p/DfNSdMTAjGE/ (escenas explicativas con la cara en un círculo arriba a la derecha),
a nuestro estilo (negro cálido + dorado, ₿ naranja).

Nuevo recurso: **modo círculo** — `toCircle(t)` / `toFull(t)` animan un `clip-path: circle()` sobre la cámara (proxy GSAP) y la
reducen a un círculo dorado arriba a la derecha (centro 850,258, r 180) mientras aparece una escena a pantalla completa (`#scene`).

| Segundo | Modo | Contenido |
|---|---|---|
| 0–6 | Completa | Billetes "$ DÓLAR" y "€ EURO" en cristal que caen y se desvanecen; moneda ₿ 3D girando en "¿podría Bitcoin ocupar su lugar?" |
| 6–12,8 | Completa | Corte seco en "hoy te voy a enseñar"; "¿QUÉ ES BITCOIN?" con glitch; "LA MONEDA DEL FUTURO" |
| 12,8–18,6 | Círculo | "Dinero digital · de persona a persona": la ₿ viaja entre dos personas; banco tachado → "SIN BANCOS QUE AUTORICEN" |
| 18,6–25,4 | Círculo | "Solo 21 millones": contador 0 → 21.000.000 con barra y "🔒 MÁXIMO"; el gobierno pulsa IMPRIMIR → "✕ IMPOSIBLE" |
| 25,5–27,3 | Completa | "¿DÓNDE SE LLEVAN LAS CUENTAS?" |
| 27,3–35,4 | Círculo | "Miles de ordenadores" (red que se ilumina) → "La blockchain" (bloques #1021…); doble gasto rechazado; "✓ TODO QUEDA REGISTRADO" |
| 35,4–41 | Círculo | "El oro digital": lingote = ₿, "ESCASO · 21 M", la ₿ cruzando el mundo 🇪🇸 → 🇯🇵 |
| 41–48 | Completa | "1 BITCOIN ENTERO" tachado → se divide en trocitos → "1 BTC = 100.000.000 SATOSHIS" |
| 48,3–52,8 | Completa | Pastilla de Instagram con Seguir → Siguiendo y botón de **enviar** (pide compartirlo) |

Montaje: en `plantilla_base.html` sustituir `__CSS__` por `estilos.css` y `__CHART__` por `escenas.js` → `plantilla.html`;
`python3 generar.py transcripcion.json index.html plantilla.html cara.json`.
