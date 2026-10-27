"""Genera index.html del reel "vela diaria" a partir de transcripcion (words.json)."""
import json, re, sys

words = json.load(open(sys.argv[1]))
out = sys.argv[2]
DUR = 42.36

# ---- merge split numbers ("15" ".500", "22" "%") ----
W = []
for w in words:
    t = w["w"]
    if W and (t.startswith(".") and t[1:2].isdigit() or t.startswith("%")) and W[-1]["w"].rstrip(".,").isdigit():
        W[-1]["w"] = W[-1]["w"] + t; W[-1]["e"] = w["e"]; continue
    W.append(dict(w))
for w in W:
    w["w"] = w["w"].replace(" ", "")

def key(t): return re.sub(r"[^\wáéíóúñ%.]", "", t.lower()).strip(".")
# join FAIR VALUE GAP / BREAK AWAY GAP / F, V, G into single caption tokens
J = []
k = 0
while k < len(W):
    t = [x["w"].rstrip(".,").upper() for x in W[k:k + 3]]
    if t == ["FAIR", "VALUE", "GAP"] or t == ["BREAK", "AWAY", "GAP"] or t == ["F", "V", "G"]:
        name = {"FAIR": "Fair Value Gap", "BREAK": "Breakaway Gap", "F": "F·V·G"}[t[0]]
        tail = W[k + 2]["w"][-1] if W[k + 2]["w"][-1] in ".," else ""
        J.append({"w": name + tail, "s": W[k]["s"], "e": W[k + 2]["e"], "tag": t[0]}); k += 3
    else:
        J.append(W[k]); k += 1
W = J
for w in W:
    if w["w"] == "guarde": w["w"] = "guarda"
STY = {
    "tercera": "u", "segunda": "u", "dentro": "g", "encima": "up", "retroceso": "dn", "retest": "g", "continuación": "up",
    "alcista": "up", "fuerte": "b", "retroceder": "dn", "sígueme": "b", "diferencia": "s", "error": "s", "simple": "s", "común": "s", "verlo": "s",
}
def style(w):
    if w.get("tag") in ("FAIR", "F"): return "fvg"
    if w.get("tag") == "BREAK": return "bag"
    return STY.get(key(w["w"]), "")

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

face = open(sys.argv[4]).read() if len(sys.argv) > 4 else "[]"
html = open(sys.argv[3]).read().replace("__G__", json.dumps(G, ensure_ascii=False)).replace("__DUR__", str(DUR)).replace("__FACE__", face)
open(out, "w").write(html)
print(len(G), "grupos")
