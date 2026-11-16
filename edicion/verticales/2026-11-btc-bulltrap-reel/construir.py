import subprocess, json, os
S = "/tmp/claude-0/-home-user-mi-primer-proyecto/c3e6762d-b6dc-5c1b-bb9c-751bb86646e1/scratchpad"
os.chdir(os.path.dirname(os.path.abspath(__file__)))
t = open("plantilla_base.html").read()
t = t.replace("__CHART__", open("escenas.js").read()).replace("__FACE2__", open("cara2.json").read())
t = t.replace('tl.fromTo(g.el, { opacity: 0, y: 22, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.18, ease: "power2.out" }, g.s);',
              'tl.fromTo(g.el, { opacity: 0, y: 22, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: Math.max(0.04, Math.min(0.18, g.e - g.s - 0.02)), ease: "power2.out" }, g.s);')
open("template.html", "w").write(t)
subprocess.run(["python3", "generar.py", "transcripcion.json", "index.html", "template.html", "cara1.json"], check=True)
