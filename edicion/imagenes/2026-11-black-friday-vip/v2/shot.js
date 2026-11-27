const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
 for (const [name, w, h, vars] of [["historia", 1080, 1920, "--glowY:46%;--kTop:1330px;--kH:480px;--gTop:300px;--gS:620px;--topY:180px;--bY:560px;--smS:46px;--barG:46px"],
                                    ["post", 1080, 1350, "--glowY:52%;--kTop:780px;--kH:400px;--gTop:150px;--gS:760px;--topY:70px;--bY:400px;--smS:52px;--barG:44px"]]) {
   const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
   await p.goto('file://' + process.cwd() + '/pieza.html');
   await p.evaluate(([w, h, v, m]) => { document.body.style.cssText = `--w:${w}px;--h:${h}px;` + v; window.build(m); }, [w, h, vars, name]);
   await p.waitForTimeout(700); await p.screenshot({ path: `vip_${name}.png` }); await p.close(); }
 await b.close(); })();
