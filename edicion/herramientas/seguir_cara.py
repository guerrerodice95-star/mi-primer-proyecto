"""Detecta la cara a lo largo de un video y genera una trayectoria suavizada (para centrar el encuadre).

Uso: python3 seguir_cara.py VIDEO SALIDA.json [--fps 5] [--ancho 1920]
Salida: [{"t": segundos, "x": centro_x, "y": centro_y, "h": alto_cara}] en coordenadas de un lienzo de --ancho px.
Necesita: pip install opencv-python-headless numpy
"""
import argparse, json
import cv2, numpy as np

ap = argparse.ArgumentParser()
ap.add_argument("video"); ap.add_argument("salida")
ap.add_argument("--fps", type=float, default=5); ap.add_argument("--ancho", type=int, default=1920)
ap.add_argument("--suavizado", type=float, default=1.2, help="ventana de suavizado en segundos")
a = ap.parse_args()

cap = cv2.VideoCapture(a.video)
vfps = cap.get(cv2.CAP_PROP_FPS); n = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
W = cap.get(cv2.CAP_PROP_FRAME_WIDTH); k = a.ancho / W
casc = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
step = max(1, int(round(vfps / a.fps)))
pts = []
for i in range(0, n, step):
    cap.set(cv2.CAP_PROP_POS_FRAMES, i); ok, fr = cap.read()
    if not ok: break
    small = cv2.resize(fr, None, fx=480 / fr.shape[1], fy=480 / fr.shape[1])
    g = cv2.cvtColor(small, cv2.COLOR_BGR2GRAY)
    f = casc.detectMultiScale(g, 1.1, 5, minSize=(40, 40))
    if len(f):
        x, y, w, h = max(f, key=lambda r: r[2] * r[3]); s = fr.shape[1] / 480 * k
        pts.append([i / vfps, (x + w / 2) * s, (y + h / 2) * s, h * s])
    else:
        pts.append([i / vfps, None, None, None])
# fill gaps and smooth
arr = np.array([[p[0]] + [np.nan if v is None else v for v in p[1:]] for p in pts], float)
for c in (1, 2, 3):
    col = arr[:, c]; ok = ~np.isnan(col)
    col[~ok] = np.interp(arr[~ok, 0], arr[ok, 0], col[ok]); arr[:, c] = col
win = max(1, int(a.suavizado * a.fps)); ker = np.ones(win) / win
for c in (1, 2, 3):
    pad = np.pad(arr[:, c], (win // 2, win - 1 - win // 2), mode="edge"); arr[:, c] = np.convolve(pad, ker, mode="valid")
json.dump([{"t": round(t, 2), "x": round(x, 1), "y": round(y, 1), "h": round(h, 1)} for t, x, y, h in arr], open(a.salida, "w"))
print(len(arr), "muestras; x min/max", round(arr[:, 1].min()), round(arr[:, 1].max()), "| detectadas", int(sum(p[1] is not None for p in pts)))
