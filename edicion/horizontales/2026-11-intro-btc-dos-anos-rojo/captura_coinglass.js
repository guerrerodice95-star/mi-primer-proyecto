const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1600, height: 1400 }, deviceScaleFactor: 2, locale: 'es-ES',
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' });
  await p.goto('https://www.coinglass.com/es/today', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(12000);
  // the table that contains the 2026 row
  const box = await p.evaluate(() => {
    const tds = [...document.querySelectorAll('table')].filter(t => t.innerText.includes('2026') && t.innerText.includes('Promedio'));
    if (!tds.length) return null;
    const t = tds[0]; t.scrollIntoView({ block: 'center' });
    let el = t; for (let i = 0; i < 3 && el.parentElement; i++) el = el.parentElement;
    const r = t.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height };
  });
  console.log(JSON.stringify(box));
  await p.waitForTimeout(1500);
  const b2 = await p.evaluate(() => { const t = [...document.querySelectorAll('table')].find(t => t.innerText.includes('2026') && t.innerText.includes('Promedio')); const r = t.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; });
  await p.screenshot({ path: 'cg/tabla.png', clip: { x: Math.max(0, b2.x - 16), y: Math.max(0, b2.y - 16), width: b2.width + 32, height: b2.height + 32 } });
  console.log('clip', JSON.stringify(b2));
  await b.close();
})();
