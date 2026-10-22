# Anuncio Meta — conseguir seguidores (octubre 2026)

Vertical 1080x1920, 34 s. Versión final aprobada: **v5** (estilo "yapping", pocos gráficos y sonidos).

- **Video original:** Drive, archivo `ad 1 editar.mp4` (id `1TLLbss9xgrkshJ-T5kmo8WTUrK67yxWi`), 1728x3072, 25 fps.
- **Referencia de estilo:** reel de Marcos Gil https://www.instagram.com/reel/Deq1W7dIFs5/
- `transcripcion.json` — palabras con su segundo (Whisper, corregido a mano en `index.html`).
- `sonidos.json` — efectos de sonido y su momento.

## Estructura del video

| Segundo | Contenido |
|---|---|
| 0–3 | Pantalla partida: gráfico de velas BTC, el cursor cierra la app |
| 3–16 | Pantalla completa con zooms de corte; primer plano en 10,3–12,6 |
| 13,6–16 | Rótulo "UNAI · En Bitcoin desde 2018" |
| 16–22,5 | Pantalla partida: red de personas + contador "+50.000" |
| 22,5–31 | Pantalla completa con zooms de corte |
| 31–34 | Pantalla partida: "SÍGUEME" + botón Seguir → Siguiendo |

## Rehacerlo

```bash
gdown 1TLLbss9xgrkshJ-T5kmo8WTUrK67yxWi -O original.mp4
ffmpeg -i original.mp4 -vf fps=30 -c:v libx264 -crf 17 -g 15 -pix_fmt yuv420p -an assets/cam.mp4
npx hyperframes render -f 30 -q high -o render/visual.mp4
python3 ../../herramientas/generar_sfx.py sfx/
python3 ../../herramientas/mezclar_audio.py --original original.mp4 --render render/visual.mp4 \
  --sonidos sonidos.json --sfx sfx/ --salida anuncio.mp4
```
