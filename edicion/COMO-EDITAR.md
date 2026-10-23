# Cómo edita Claude los videos (parte técnica)

Los videos se montan como una página HTML animada con GSAP y se convierten en MP4 con
[HyperFrames](https://hyperframes.heygen.com). No se usa CapCut.

## Antes de empezar (una sola vez por entorno)

**Dominios permitidos** en *Network access → Allowed domains* del entorno de Claude:

```
drive.google.com
drive.usercontent.google.com
docs.google.com
*.googleusercontent.com
huggingface.co
*.huggingface.co
*.hf.co
www.instagram.com
instagram.com
*.cdninstagram.com
```

(Deja marcada la casilla *Allow package managers*.)

**Instalación en la sesión:**

```bash
pip install faster-whisper soundfile gdown yt-dlp
cd edicion && npm i hyperframes@0.8.183
npx hyperframes browser ensure
```

## Flujo de trabajo

1. **Bajar el video** de Drive (compartido con "cualquier persona con el enlace"):
   `gdown ID_DEL_ARCHIVO -O carpeta/`. Los videos NO se suben a GitHub (pesan demasiado).
2. **Referencias de Instagram:** `yt-dlp -o ref.mp4 URL_DEL_REEL` y sacar fotogramas con ffmpeg.
3. **Transcribir:** `python3 herramientas/transcribir.py video.mp4 transcripcion.json`
4. **Crear el proyecto** copiando la plantilla más parecida (`verticales/…` u `horizontales/…`),
   y convertir el video a `assets/cam.mp4` a 30 fps con keyframes frecuentes:
   `ffmpeg -i original.mp4 -vf fps=30 -c:v libx264 -crf 17 -g 15 -pix_fmt yuv420p -an assets/cam.mp4`
   (sin escalar: la resolución extra sirve para los zooms).
5. **Editar `index.html`**: subtítulos (lista `G` con palabra, segundo y estilo), cámara (`// camera path`),
   gráficos. Revisar con `npx hyperframes lint` y capturas:
   `npx hyperframes snapshot --at 1,5,10 --no-end -o capturas/`
6. **Renderizar** (unos 5 minutos para 35 s): `npx hyperframes render -f 30 -q high -o render/visual.mp4`
7. **Sonido:** `python3 herramientas/generar_sfx.py sfx/` una vez, editar `sonidos.json` y
   `python3 herramientas/mezclar_audio.py --original original.mp4 --render render/visual.mp4 --sonidos sonidos.json --sfx sfx/ --salida final.mp4`
   Si solo cambian los sonidos, no hace falta volver a renderizar.

## Problemas conocidos

- Si el original ya trae cortes y se cambia el encuadre en cada corte, medir el fotograma exacto del corte en el
  `cam.mp4` a 30 fps (`ffmpeg -i assets/cam.mp4 -vf "select='gt(scene,0.15)',showinfo" -f null -`) y poner el
  `tl.set` de cámara ~1/2 fotograma ANTES del corte. Si va después, el plano nuevo sale 1–2 fotogramas con el
  encuadre del anterior y se nota un "salto raro".

- `cdn.jsdelivr.net` está bloqueado: GSAP y las fuentes van en local (`herramientas/vendor/`, `marca/fonts/`).
- `npx hyperframes init` intenta bajar "skills": usar `HYPERFRAMES_SKIP_SKILLS=1`.
- faster-whisper falla abriendo archivos con algunas versiones de PyAV: `transcribir.py` ya lo evita.
- El linter de HyperFrames da error si un elemento tiene `transform` en CSS y GSAP lo anima: poner la
  transformación inicial con `gsap.set`.
