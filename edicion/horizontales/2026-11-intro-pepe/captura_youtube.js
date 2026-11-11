const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const ctx = await b.newContext({ viewport: { width: 1400, height: 1600 }, locale: 'es-ES', deviceScaleFactor: 1,
    userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36' });
  await ctx.addCookies([{ name: 'SOCS', value: 'CAESEwgDEgk0ODE3Nzk3MjQaAmVzIAEaBgiA_LyaBg', domain: '.youtube.com', path: '/' }, { name: 'CONSENT', value: 'YES+cb', domain: '.youtube.com', path: '/' }]);
  const p = await ctx.newPage();
  await p.goto('https://www.youtube.com/@TheCryptons/search?query=pepe&hl=es&gl=ES', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await p.waitForTimeout(6000);
  for (let i = 0; i < 6; i++) { await p.mouse.wheel(0, 3000); await p.waitForTimeout(1500); }
  console.log(await p.title());
  const items = await p.evaluate(() => [...document.querySelectorAll('ytd-video-renderer, ytd-item-section-renderer ytd-video-renderer')].map(v => ({
    id: (v.querySelector('a#thumbnail') || {}).href || '',
    title: (v.querySelector('#video-title') || {}).textContent?.trim() || '',
    meta: [...v.querySelectorAll('#metadata-line span')].map(s => s.textContent.trim()).join(' | '),
    dur: (v.querySelector('ytd-thumbnail-overlay-time-status-renderer') || {}).textContent?.trim() || '',
  })));
  console.log(JSON.stringify(items, null, 0));
  await p.screenshot({ path: 'yt/page.png' });
  await b.close();
})();
