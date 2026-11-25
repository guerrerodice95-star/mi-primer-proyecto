# Trozo de reel: titulares de miedo (noviembre 2026)

Vertical 1080x1920, 4,68 s. Bruto en Drive: id `15DhYhzOuqMzkUVlye3cA-UqLxP9BOQO7` (1728x3072, sin bandas).  Es un trozo de un reel "natural" (solo fotos): **sin mover la cámara ni subtítulos**, solo los titulares debajo.

Titulares que pidió Unai, con estilo genérico de periódico digital (tarjeta blanca, "ÚLTIMA HORA", titular en serif Caladea Bold y palabra clave en rojo; sin imitar ningún medio real):
1. 0,1 s "Bitcoin cae de 60.000 $ y *se va a cero*" (en "Bitcoin")
2. 1,0 s "*La estafa* de las criptomonedas" (en "se hunde")
3. 1,84 s "La bolsa cae y *atrapa* a los inversores" (en "tradicionales")
4. 3,2 s "Se acerca un nuevo *crash mundial*" (en "desaparecer")

Cada titular sube suave (0,45 s) y se apila encima del anterior, ligeramente girado; los de debajo se oscurecen un poco. Sonido: un `swish` muy bajo por titular.

v2 (pedido de Unai: **sin tocar el color de su imagen**): `index.html` ya no lleva el vídeo; solo los titulares sobre fondo transparente.
Se renderiza con `hyperframes render -f 30 --format mov -o overlay.mov` (ProRes 4444 con alfa) y se monta encima del bruto original con ffmpeg:

    ffmpeg -i bruto.mp4 -i overlay.mov -filter_complex "[1:v]scale=1728:3072:flags=lanczos,fps=25[o];[0:v][o]overlay=0:0:format=auto:shortest=1,format=yuv420p[v]" -map "[v]" -an -c:v libx264 -crf 14 -preset slow visual.mp4

Así la imagen sale idéntica al bruto (mismo tamaño 1728x3072, 25 fps y sin etiquetas de color nuevas); comprobado: media RGB de la pared 140,6/75,9/74,7 en ambos.
Después `mezclar_audio.py` como siempre.
