# Mejorar la calidad de una grabación de pantalla (Telegram VIP, noviembre 2026)

Entrada (Drive id `1fVVvczdIBUGh8dAj0vL4baaJYwRs9i34`): grabación de Telegram de escritorio, 944x1020, ~3 Mbps, 43,5 s. Se veía borrosa en el móvil
por la baja resolución y el poco bitrate (bloques al hacer scroll).

Salida: 1888x2040 (×2), ~8 Mbps, mismo audio:

    ffmpeg -i entrada.mp4 -vf "hqdn3d=1.2:1.2:3:3,scale=1888:2040:flags=lanczos+accurate_rnd+full_chroma_int,unsharp=5:5:0.9:5:5:0.0,format=yuv420p" \
      -c:v libx264 -preset slow -crf 13 -tune animation -profile:v high -movflags +faststart -c:a copy salida.mp4

- `hqdn3d` suave quita los bloques de compresión; `lanczos` ×2 y `unsharp` solo en luminancia hacen el texto más nítido.
- No se usa escalado con IA: en capturas con texto puede inventarse letras.
