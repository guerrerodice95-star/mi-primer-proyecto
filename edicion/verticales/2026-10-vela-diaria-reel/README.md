# Reel "vela diaria" — estrategia 50 % (octubre 2026)

Vertical 1080x1920, 71,4 s. Original 4K horizontal en Drive: `editar velas.mp4` (id `12rc7gWOw3GCWGo9pmHYC0xT4DcvxOe1H`).
Referencia de formato: reel de Toni Maura (https://www.instagram.com/reel/DcOoWZGxki6/), adaptado a nuestro estilo para no copiarlo.

## Diferencias con la referencia (nuestro estilo)
- Layout invertido: gráfico **arriba**, Unai **abajo** (cabeza donde empiezan los subtítulos), como en nuestros reels.
- Colores TheCryptons: vela diaria dorada, líneas crema/doradas, cuadrícula dorada; velas **verdes/rojas** según el escenario.
- Etiquetas en español (MÁXIMO, MÍNIMO, 50 %, OBJETIVO 1/2, DENTRO), pastillas SHORT/LONG, sello "EVITAR OPERAR".
- Cortes a pantalla completa en 0–1 s, 13–17 s, 42–43,6 s y 60–61,4 s; cierre con tarjeta @TheCryptons_ (Seguir + Guardar).

## Cómo se genera
`plantilla.html` tiene toda la animación; `generar.py` agrupa la transcripción en subtítulos con estilos y escribe `index.html`:
`python3 generar.py transcripcion.json index.html plantilla.html`
