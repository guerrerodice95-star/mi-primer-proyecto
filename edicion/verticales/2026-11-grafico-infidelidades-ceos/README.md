# Gráfico animado: "Infidelidades de CEOs y su acción después" (noviembre 2026)

Vertical 1080x1920, 26,2 s, sin audio (es un gráfico para meter en un reel). Idea: reel https://www.instagram.com/reel/Dfn7XAriE5D/
(infografía "The Affair Rally"). Estilo pedido por Unai (captura de https://www.instagram.com/p/Dd9ho7kxNuA/): fondo negro, línea verde
brillante que se dibuja, cifra en la punta y **fecha grande avanzando debajo**.

Datos reales de Yahoo Finance (cierres diarios, `datos/`): del cierre del día de la noticia al 25/11/2026.

| CEO | Empresa | Noticia (fecha) | Máximo después | Hoy |
|---|---|---|---|---|
| Jeff Bezos | Amazon | Se destapa su aventura con Lauren Sánchez (9 ene 2019) | +242 % (ago 2026) | +195 % |
| Bill Gates | Microsoft | Sale a la luz su relación con una empleada, WSJ (16 may 2021) | +124 % (nov 2026) | +97 % |
| Chey Tae-won (presidente de SK Group) | SK hynix | Admite una aventura y una hija fuera del matrimonio (29 dic 2015) | +9.256 % (jun 2026) | +3.275 % |
| Sergey Brin (cofundador) | Google | Se publica su relación con una empleada (28 ago 2013) | +1.796 % (may 2026) | +1.186 % |
| Jensen Huang | NVIDIA | Según el NYT, relación con una presunta espía china (11 nov 2026) | — | −14,1 % |

Cada escena dura 4,25 s: cabecera (foto, empresa, noticia), la línea se dibuja en 3,1 s con la foto del CEO en la punta y el % en directo,
marca dorada en el máximo. NVIDIA en rojo y "¿Y AHORA?". Al final, resumen con los máximos.
Fotos: Wikimedia Commons (`Jeff_Bezos_at_Amazon_Spheres_Grand_Opening_in_Seattle_-_2018_(39074799225)_(cropped).jpg`,
`Bill_Gates_at_the_European_Commission_-_2025_-_P067383-987995_(cropped).jpg`, `Chey_Tae-won_20241217.jpg`, `Sergey_Brin_cropped.jpg`,
`Jen-Hsun_Huang_2025_(2).jpg`). Logos de Commons (SK: `SK_logo.svg`).
Nota en pantalla: "Que suba después no significa que sea por eso".

Para regenerar: en `tpl.html` sustituir `__DUR__` (26.2), `__DATA__` (`datos/series.json`) y `__SCENES__` (`scenes.js`).
