import json, subprocess, sys
S = open("../pe/px/series.json").read()
base = open("thumb.html").read()
ARROW = '''<svg id="arrow" style="left:%dpx;top:%dpx" width="260" height="300" viewBox="0 0 260 300">
  <path d="M30 280 C 60 180, 120 120, 200 60" fill="none" stroke="#052a0f" stroke-width="44" stroke-linecap="round"/>
  <path d="M30 280 C 60 180, 120 120, 200 60" fill="none" stroke="#2bff7a" stroke-width="30" stroke-linecap="round" style="filter:drop-shadow(0 0 12px rgba(43,255,122,0.9))"/>
  <path d="M140 40 L232 30 L214 120 Z" fill="#2bff7a" stroke="#052a0f" stroke-width="10" stroke-linejoin="round"/></svg>'''
V = {
  # A: same as before with the new face (person right)
  "A": dict(cx0=330, cx1=800, cy1=330, layout='''
    <div id="coin" style="left:40px;top:345px;"><img src="pepe_orig.jpg"></div>
    <div class="t pepe" style="left:36px;top:30px;">PEPE</div>
    <div class="t back" style="left:50px;top:212px;font-size:118px;">HA VUELTO</div>
    <div class="badge" style="left:255px;top:330px;">×2 🚀</div>
    ''' + ARROW % (420, 320) + '''
    <img id="person" src="person2.png" style="right:-90px;bottom:0;height:730px;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 22%);">'''),
  # B: big coin centre-left, "HA VUELTO" in yellow, person right
  "B": dict(cx0=40, cx1=760, cy1=300, layout='''
    <div id="coin" style="left:250px;top:300px;width:390px;height:390px;"><img src="pepe_orig.jpg"></div>
    <div class="t back" style="left:40px;top:40px;font-size:150px;">PEPE <span style="color:#ffe600">HA</span></div>
    <div class="t back" style="left:40px;top:180px;font-size:150px;color:#ffe600;">VUELTO</div>
    <div class="badge" style="left:40px;top:560px;transform:rotate(-6deg)">+100%</div>
    <img id="person" src="person2.png" style="right:-90px;bottom:0;height:730px;-webkit-mask-image:linear-gradient(90deg,transparent 0%,#000 22%);">'''),
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
