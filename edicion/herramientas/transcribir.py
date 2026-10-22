"""Transcribe un video o audio con marcas de tiempo por palabra.

Uso:
    python3 transcribir.py VIDEO_O_AUDIO SALIDA.json [--modelo medium] [--idioma es]

Necesita: pip install faster-whisper soundfile, ffmpeg en el PATH y acceso a
huggingface.co (para descargar el modelo la primera vez).
"""
import argparse
import json
import os
import subprocess
import tempfile

import soundfile as sf
from faster_whisper import WhisperModel


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("entrada")
    ap.add_argument("salida")
    ap.add_argument("--modelo", default="medium")
    ap.add_argument("--idioma", default="es")
    a = ap.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        wav = os.path.join(tmp, "audio.wav")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-i", a.entrada, "-ac", "1", "-ar", "16000", wav], check=True)
        # faster-whisper falla con algunas versiones de PyAV al abrir archivos:
        # le pasamos el audio ya decodificado.
        audio, _ = sf.read(wav, dtype="float32")

    model = WhisperModel(a.modelo, device="cpu", compute_type="int8")
    segs, _ = model.transcribe(audio, language=a.idioma, word_timestamps=True, vad_filter=True)
    words = []
    for s in segs:
        print(f"[{s.start:.2f}-{s.end:.2f}] {s.text}")
        for w in s.words:
            words.append({"w": w.word.strip(), "s": round(w.start, 2), "e": round(w.end, 2)})
    with open(a.salida, "w") as f:
        json.dump(words, f, ensure_ascii=False, indent=1)


if __name__ == "__main__":
    main()
