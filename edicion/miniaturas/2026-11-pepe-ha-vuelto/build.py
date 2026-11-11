import json, subprocess, sys
S = open("../pe/px/series.json").read()
base = open("thumb.html").read()
ARROW = '''<svg id="arrow" style="left:%dpx;top:%dpx" width="260" height="300" viewBox="0 0 260 300">
  <path d="M30 280 C 60 180, 120 120, 200 60" fill="none" stroke="#052a0f" stroke-width="44" stroke-linecap="round"/>
  <path d="M30 280 C 60 180, 120 120, 200 60" fill="none" stroke="#2bff7a" stroke-width="30" stroke-linecap="round" style="filter:drop-shadow(0 0 12px rgba(43,255,122,0.9))"/>
  <path d="M140 40 L232 30 L214 120 Z" fill="#2bff7a" stroke="#052a0f" stroke-width="10" stroke-linejoin="round"/></svg>'''
V = {
  "A": dict(cx0=640, cx1=1250, cy1=300, layout='''
    <img id="person" src="person2.png" style="left:-40px;right:auto;bottom:0;height:730px;">
    <div class="t pepe" style="left:650px;top:24px;font-size:200px;">PEPE</div>
    <div class="t back" style="left:600px;top:205px;font-size:104px;">HA VUELTO</div>
    ''' + ARROW % (930, 330) + '''
    <div class="badge" style="left:1010px;top:580px;">×2 🚀</div>
    <div id="coin" style="left:585px;top:395px;width:320px;height:320px;"><img src="pepe_orig.jpg"></div>'''),
  "B": dict(cx0=880, cx1=1250, cy1=330, layout='''
    <img id="person" src="person2.png" style="left:-40px;right:auto;bottom:0;height:730px;">
    <div class="t back" style="left:640px;top:36px;font-size:140px;">PEPE <span style="color:#ffe600">HA</span></div>
    <div class="t back" style="left:640px;top:168px;font-size:140px;color:#ffe600;">VUELTO</div>
    <div class="badge" style="left:1000px;top:600px;transform:rotate(-6deg)">+100%</div>
    <div id="coin" style="left:560px;top:345px;width:380px;height:380px;"><img src="pepe_orig.jpg"></div>'''),
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
