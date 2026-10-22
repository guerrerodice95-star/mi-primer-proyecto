"""Mezcla la voz del video original con los efectos de sonido y lo une al render.

Uso:
    python3 mezclar_audio.py --original VIDEO_ORIGINAL.mp4 --render RENDER_SIN_AUDIO.mp4 \
        --sonidos sonidos.json --sfx CARPETA_SFX --salida FINAL.mp4

sonidos.json es una lista de {"sonido": "whoosh", "segundo": 0.72, "volumen": 0.25}.
Los .wav de CARPETA_SFX se generan con generar_sfx.py.
El resultado queda normalizado a -14 LUFS (el nivel de Instagram/YouTube).
"""
import argparse
import json
import os
import subprocess
import tempfile

import numpy as np
import soundfile as sf

SR = 48000


def run(*args):
    subprocess.run(["ffmpeg", "-v", "error", "-y", *args], check=True)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--original", required=True)
    ap.add_argument("--render", required=True)
    ap.add_argument("--sonidos", required=True)
    ap.add_argument("--sfx", required=True)
    ap.add_argument("--salida", required=True)
    ap.add_argument("--volumen-sfx", type=float, default=0.55)
    a = ap.parse_args()

    dur = float(subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", a.render],
                               capture_output=True, text=True, check=True).stdout)
    n = int(SR * dur)
    with tempfile.TemporaryDirectory() as tmp:
        run("-i", a.original, "-vn", "-ac", "2", "-ar", str(SR), f"{tmp}/voz.wav")
        voz, _ = sf.read(f"{tmp}/voz.wav", dtype="float32")
        voz = np.pad(voz, ((0, max(0, n - len(voz))), (0, 0)))[:n]

        fx = np.zeros((n, 2), np.float32)
        cache = {}
        for c in json.load(open(a.sonidos)):
            if c["sonido"] not in cache:
                cache[c["sonido"]], _ = sf.read(os.path.join(a.sfx, c["sonido"] + ".wav"), dtype="float32")
            x = cache[c["sonido"]] * c["volumen"]
            i = int(c["segundo"] * SR)
            j = min(n, i + len(x))
            fx[i:j] += x[: j - i, None]

        sf.write(f"{tmp}/voz_pad.wav", voz, SR)
        sf.write(f"{tmp}/fx.wav", fx, SR)
        run("-i", f"{tmp}/voz_pad.wav", "-i", f"{tmp}/fx.wav", "-filter_complex",
            "[0]highpass=f=80,acompressor=threshold=-18dB:ratio=3:attack=5:release=80[v];"
            f"[1]volume={a.volumen_sfx}[f];[v][f]amix=inputs=2:normalize=0,loudnorm=I=-14:TP=-1.5:LRA=9[a]",
            "-map", "[a]", "-ar", str(SR), f"{tmp}/mezcla.wav")
        run("-i", a.render, "-i", f"{tmp}/mezcla.wav", "-map", "0:v", "-map", "1:a", "-c:v", "copy",
            "-c:a", "aac", "-b:a", "192k", "-shortest", "-movflags", "+faststart", a.salida)
    print("Listo:", a.salida)


if __name__ == "__main__":
    main()
