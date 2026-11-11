# Miniatura "PEPE HA VUELTO" (noviembre 2026)

1280x720 PNG, dos versiones: `miniatura_A.png` (texto izquierda, Unai derecha) y `miniatura_B.png` (Unai izquierda, texto derecha).

- **Cara:** fotograma 41,7 s del bruto de la intro de PEPE (`edit intro pepito.mp4`, gesto de sorpresa), recortada sin fondo con
  BiRefNet-lite (ONNX, licencia MIT, `huggingface.co/onnx-community/BiRefNet_lite-ONNX`) + onnxruntime.
- **Gráfico:** velas generadas con el precio real de PEPE de 3 meses (CoinGecko, `../../horizontales/2026-11-intro-pepe/datos/series.json`).
- **Moneda:** logo de PEPE de CoinGecko (400x400).
- **Inspiración:** miniaturas virales de PEPE/memecoins (verde neón, moneda grande con brillo, flecha verde, texto gigante con contorno).

Regenerar: recortar la cara a `person_c.png`, copiar `inter-latin-900-normal.woff2` y `python3 build.py` (Playwright hace la captura).

v2: cara cambiada por la foto que mandó Unai (sorpresa con la mano en la cabeza), recortada con BiRefNet-lite, ampliada ×2 y con
el borde izquierdo (hombro cortado en la foto) difuminado con `mask-image`. B: "PEPE" blanco + "HA VUELTO" amarillo, moneda grande.
