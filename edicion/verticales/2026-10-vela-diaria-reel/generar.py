"""Genera index.html del reel "vela diaria" a partir de transcripcion (words.json)."""
import json, re, sys

words = json.load(open(sys.argv[1]))
out = sys.argv[2]
DUR = 71.4

# ---- merge "50" + "%" and clean ----
W = []
for w in words:
    t = w["w"]
    if t in ("%", "%.", "%,") and W and W[-1]["w"].rstrip(".,").isdigit():
        W[-1]["w"] = W[-1]["w"] + t
        continue
    W.append(dict(w))
for w in W:
    w["w"] = w["w"].replace(" ", "")
    if w["w"] == "50%.": w["w"] = "50%."

def key(t): return re.sub(r"[^\wáéíóúñ%]", "", t.lower())
STY = {
    "vela": "g", "diaria": "g", "máximo": "g", "mínimo": "g", "liquidez": "g", "objetivo": "g", "minutos": "g", "15": "g",
    "setup": "b", "50%": "b", "rentable": "b", "sígueme": "b",
    "encima": "up", "long": "bup", "short": "bdn", "debajo": "dn",
    "entiendes": "u", "marcamos": "u", "barrer": "u", "dentro": "u", "planificar": "u", "guarda": "u", "observar": "u",
    "nadie": "s", "simple": "s", "anterior": "s", "casual": "s", "segundo": "s", "consistentemente": "s",
}
# context: "evitar operar" at 65.7 in red
def style(w):
    k = key(w["w"])
    if 65.6 <= w["s"] <= 66.5 and k in ("evitar", "operar"): return "bdn"
    return STY.get(k, "")

# ---- group words ----
groups = []
cur = []
for i, w in enumerate(W):
    cur.append(w)
    nxt = W[i + 1] if i + 1 < len(W) else None
    end_punct = w["w"][-1] in ".,?"
    gap = (nxt["s"] - w["e"]) if nxt else 9
    long_word = len(w["w"]) > 11
    if not nxt or end_punct or len(cur) >= 3 or gap > 0.45 or (long_word and len(cur) >= 2):
        groups.append(cur); cur = []
G = []
for gi, g in enumerate(groups):
    s = g[0]["s"]
    e = groups[gi + 1][0]["s"] if gi + 1 < len(groups) else DUR
    e = min(e, g[-1]["e"] + 0.7) if gi + 1 < len(groups) else DUR
    G.append({"e": round(e, 2), "hook": 1 if s < 1.0 else 0, "w": [[x["w"], round(x["s"], 2), style(x)] for x in g]})

html = open(sys.argv[3]).read().replace("__G__", json.dumps(G, ensure_ascii=False)).replace("__DUR__", str(DUR))
open(out, "w").write(html)
print(len(G), "grupos")
