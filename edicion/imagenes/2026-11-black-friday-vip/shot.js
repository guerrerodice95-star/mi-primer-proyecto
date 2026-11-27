const { chromium } = require('playwright');
(async () => { const b = await chromium.launch();
 for (const [name, w, h, vars] of [["post", 1080, 1350, "--pad:60px;--g1:26px;--bfs:160px;--promoTop:190px;--g2:34px;--g3:36px;--gg:12px;--ip:14px;--ctab:50px"],
                                    ["historia", 1080, 1920, "--pad:210px;--g1:40px;--bfs:180px;--promoTop:350px;--g2:50px;--g3:60px;--gg:16px;--ip:22px;--ctab:300px"]]) {
   const p = await b.newPage({ viewport: { width: w, height: h }, deviceScaleFactor: 1 });
   await p.goto('file://' + process.cwd() + '/vip.html');
   await p.evaluate(([w, h, v]) => { document.body.style.cssText = `--w:${w}px;--h:${h}px;` + v; }, [w, h, vars]);
   await p.waitForTimeout(600); await p.screenshot({ path: `black_friday_vip_${name}.png` }); await p.close(); }
 await b.close(); })();
