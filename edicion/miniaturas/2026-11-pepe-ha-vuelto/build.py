import json, subprocess, sys
S = open("../pe/px/series.json").read()
base = open("thumb.html").read()
ARROW = '''<svg id="arrow" style="left:%dpx;top:%dpx" width="260" height="300" viewBox="0 0 260 300">
  <path d="M30 280 C 60 180, 120 120, 200 60" fill="none" stroke="#052a0f" stroke-width="44" stroke-linecap="round"/>
  <path d="M30 280 C 60 180, 120 120, 200 60" fill="none" stroke="#2bff7a" stroke-width="30" stroke-linecap="round" style="filter:drop-shadow(0 0 12px rgba(43,255,122,0.9))"/>
  <path d="M140 40 L232 30 L214 120 Z" fill="#2bff7a" stroke="#052a0f" stroke-width="10" stroke-linejoin="round"/></svg>'''
V = {
  # A: text left, coin bottom-left, person right
  "A": dict(cx0=330, cx1=800, cy1=330, layout='''
    <div id="coin" style="left:40px;top:345px;"><img src="pepe_orig.jpg"></div>
    <div class="t pepe" style="left:36px;top:30px;">PEPE</div>
    <div class="t back" style="left:50px;top:212px;">HA VUELTO</div>
    <div class="badge" style="left:255px;top:330px;">×2 🚀</div>
    ''' + ARROW % (420, 320) + '''
    <img id="person" src="person_c.png">'''),
  # B: person left, coin right, text right
  "B": dict(cx0=470, cx1=900, cy1=360, layout='''
    <img id="person" src="person_c.png" style="right:auto;left:-120px;height:680px;">
    <div id="coin" style="left:880px;top:330px;width:320px;height:320px;"><img src="pepe_orig.jpg"></div>
    <div class="t pepe" style="left:590px;top:24px;">PEPE</div>
    <div class="t back" style="left:500px;top:205px;">HA VUELTO</div>
    <div class="badge" style="left:780px;top:600px;transform:rotate(-4deg)">+100%</div>
    ''' + ARROW % (640, 330)),
}
for k, v in V.items():
    h = base.replace("__SERIES__", S).replace("__LAYOUT__", v["layout"]).replace("__CX0__", str(v["cx0"])).replace("__CX1__", str(v["cx1"])).replace("__CY1__", str(v["cy1"]))
    open(f"t_{k}.html", "w").write(h)
js = '''const { chromium } = require('playwright');
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1280, height: 720 } });
for (const k of %s) { await p.goto('file://' + process.cwd() + '/t_' + k + '.html'); await p.waitForTimeout(600); await p.screenshot({ path: 'out/miniatura_' + k + '.png' }); }
await b.close(); })();''' % json.dumps(list(V))
open("shot.js", "w").write(js)
subprocess.run(["node", "shot.js"], check=True)
print("ok")
