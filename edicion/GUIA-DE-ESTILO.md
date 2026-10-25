# Guía de estilo — TheCryptons (@TheCryptons_)

Lo que le gusta a Unai, aprendido de sus correcciones. **Leer antes de editar cualquier video.**

## Marca

- **Colores:** dorado `#C9A54C` (brillo `#F0D488`, sombra `#8A6D2A`) sobre negro cálido `#0B0A08` / `#16130D`.
- **Logo:** `marca/logo-tc.jpg` (TC dorado sobre negro).
- **Tipografías** (en `marca/fonts/`): Inter 800/900 para lo fuerte; Instrument Serif *cursiva* para dar contraste ("*si te interesa…* **SÍGUEME**").
- **Tono:** Bitcoin explicado fácil, cercano, sin humo ("sin pelotazos ni Lamborghinis alquilados").

## Ritmo y cantidad de efectos

- **Estilo "yapping" orgánico.** La base es Unai hablando a cámara a pantalla completa. Pocos gráficos.
- **Gráficos solo si aportan información real** (una cifra, quién es, un concepto visual). Ejemplos que le gustaron: gráfico de velas al inicio, rótulo "UNAI · En Bitcoin desde 2018", red de personas + contador "+50.000", tarjeta final de seguir.
- **No le gustaron:** nubes de palabras, maquetas de perfil, cronómetros, tachados animados. Demasiado "motion".
- **Velas realistas:** aunque la tendencia sea alcista hay velas rojas (y verdes en las caídas). Si hay referencia, copiar su estructura vela a vela. Gráfico sin marco/tarjeta, flotando sobre el fondo.
- **Reels explicativos con gráfico:** "moderno pero CLARO". Animaciones a ritmo tranquilo (nada de movimientos muy rápidos), velas verdes = subida y rojas = bajada, círculos y flechas señalando lo que se nombra. Gancho: mostrar el resultado final al principio y luego explicar.
- **Ritmo:** zooms de **corte seco** (jump cuts) en frases fuertes, no zooms con rebote. Zoom lento continuo entre cortes.
- **No encadenar zooms de corte muy seguidos** (menos de ~2 s entre ellos, y menos aún acercar-alejar-acercar): se ven como "trompicones". Mejor un corte y luego acercamiento suave.
- **"Segundo ángulo":** se puede simular con un primer plano cerrado (corte seco) en una parte poco importante. No se inventan ángulos con IA.

## Encuadre (muy importante)

- **Poco aire arriba.** No quiere ver techo. Con la persona sola a pantalla completa, la cabeza cerca de la parte superior (respetando la barra de Instagram, ~200 px).
- **En pantalla partida** (gráfico arriba, persona abajo): la parte de arriba de la cabeza empieza justo donde está el subtítulo. Sin hueco entre gráfico y cabeza.
- **Primer plano:** cara centrada y cabeza completa (sin cortar el pelo).
- **La cabeza siempre en el centro horizontal.** Si se mueve en el plano, usar seguimiento de cara (`herramientas/seguir_cara.py`, 10 muestras/s, suavizado 0,5 s) en vez de un encuadre fijo.
- Comprobar el encuadre con capturas en varios segundos antes de renderizar: la cara se mueve.

## Subtítulos

- Palabra por palabra: la palabra que suena en blanco, las siguientes apagadas.
- Estilos mezclados según el significado: **dorado** (palabras clave), **subrayado animado**, *serif cursiva* (contraste/emoción), **caja dorada** (golpes fuertes: "NADA", "clic", "2018").
- Nunca encima de la cara. En pantalla completa van a la altura del pecho; en pantalla partida, entre el gráfico y la cabeza.
- Corregir errores de la transcripción automática (ej. "ve las" → "velas").

## Sonido

- **Pocos efectos y bajos.** La voz manda.
- **Nada de "pum" (sonido `impact`): le resulta agresivo**, también en los zooms. Para los zooms de corte usar `swish` (suave, con aire) a volumen bajo, o nada.
- Solo: whoosh muy bajo en cambios de plano, clics donde hay un clic en pantalla, contador y "ding" suave en momentos clave.
- Volumen final normalizado a -14 LUFS.
- Sin música por ahora (si la quiere, la aportará él).

## Formatos

- **Vertical (Reels/anuncio Meta):** 1080x1920, 30 fps. Objetivo habitual: seguidores. Cierre preferido: persona a pantalla completa y abajo una **pastilla blanca flotante estilo Instagram** (sin fondo) con su foto de perfil (`marca/foto-perfil-instagram.png`), @TheCryptons_, "Seguir" → "Siguiendo" y botón Guardar.
- **Horizontal (YouTube):** 1920x1080. Ver `horizontales/README.md`.

## Horizontal (YouTube)

- **Sin subtítulos.** Como mucho alguna palabra clave abajo ("NO LLEGAS *a fin de mes*").
- Que sea **atractivo**: gráficos con datos (tarjeta con contador, barras) en el lado izquierdo, con la persona desplazada a la derecha, y vuelta a pantalla completa.
- Mismos colores dorado/negro que los reels, para que el canal y los reels se vean iguales.
- Su grabación ya tiene la cabeza pegada arriba: los zooms crecen hacia abajo (origen arriba) para no cortar más pelo.
