      // ================= layout like the old reel: CoinMarketCap header card on top, person full below =================
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const SC = 1.12, TOPY = 470;
      const FL = 1.42, TEND = 18.9;
      const fx = (x, s = SC) => Math.min(0, Math.max(1080 - 1728 * s, 540 - s * x));
      tl.set("#card", { opacity: 0 }, 0);
      tl.set("#fw", { scale: SC, x: fx(FACE[0].x), y: TOPY - 40 * SC, clipPath: "inset(0px 0px 0px 0px)" }, 0);
      FACE.forEach((f, i) => { if (!i) return; const p = FACE[i - 1]; if (p.t < TEND + 0.6 && f.t > TEND - 0.05) return; tl.to("#fw", { x: fx(f.x, f.t > TEND ? FL : SC), duration: f.t - p.t, ease: "none" }, p.t); });
      const fAt = (t) => FACE.reduce((b, f) => (Math.abs(f.t - t) < Math.abs(b.t - t) ? f : b), FACE[0]).x;
      // top background + soft edge into the video
      const topbg = mk("", "", "", null); topbg.id = "topbg";
      $("#root").insertBefore(topbg, $("#fw").nextSibling);
      $("#topbg").style.cssText += "height:" + (TOPY + 60) + "px;-webkit-mask-image:linear-gradient(180deg,#000 0," + "#000 " + (TOPY - 10) + "px,transparent " + (TOPY + 60) + "px);";
      tl.set("#caps", { y: 60 }, 0);
      // end: full screen (no top band), slow push
      tl.to("#fw", { y: -2, scale: FL, x: fx(fAt(TEND + 0.6), FL), duration: 0.6, ease: "power3.inOut" }, TEND);
      tl.to("#topbg", { opacity: 0, duration: 0.4 }, 18.95);
      tl.to("#caps", { y: 0, duration: 0.5 }, 18.9);

      // ---------- hook: the 4 coins ----------
      const COINS = [["xrp", "XRP"], ["hype", "HYPE"], ["aster", "ASTER"], ["sol", "SOL"]];
      const row = mk("", "", "position:absolute;left:0;right:0;top:120px;display:flex;justify-content:center;gap:34px;");
      const hook = COINS.map(([id, n], i) => {
        const e = mk(`<img src="assets/logos/${id}.png" style="width:150px;height:150px;border-radius:50%;box-shadow:0 14px 34px rgba(0,0,0,.6)"><div style="margin-top:12px;text-align:center;font-size:34px;font-weight:900">${n}</div>`, "ov", "position:relative;", row);
        tl.fromTo(e, { opacity: 0, y: 40, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2.2)" }, 2.48 + i * 0.12);
        return e;
      });
      const fall = mk("TODO EL MERCADO ▼", "ov", "left:0;right:0;top:150px;text-align:center;font-size:72px;font-weight:900;color:#ff6b70;letter-spacing:-.01em;");
      tl.fromTo(fall, { opacity: 0, scale: 1.2 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 0.1);
      tl.to(fall, { x: -8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 1.46);
      tl.to(fall, { opacity: 0, duration: 0.2 }, 2.3);
      tl.to(hook, { opacity: 0, y: -20, duration: 0.2, stagger: 0.03 }, 3.15);

      // ---------- CMC cards (same as the old reel): price 1 = "compro", price 2 = "compro más" ----------
      const CARDS = [
        ["xrp", "XRP", "XRP", 6, "2.7M", "$0.95", "▼ 14.47% (1W)", "$0.70", "▼ 26.47%", 3.32, 5.58, 7.1],
        ["hype", "Hyperliquid", "HYPE", 9, "262K", "$60", "▼ 12.56% (1W)", "$45", "▼ 32.55%", 7.24, 9.28, 10.9],
        ["aster", "Aster", "ASTER", 44, "132K", "$0.50", "▼ 13.39% (1W)", "$0.38", "▼ 31.81%", 11.02, 13.18, 14.75],
        ["sol", "Solana", "SOL", 7, "2.7M", "$65", "▼ 19.43% (1W)", "$50", "▼ 29.28%", 14.86, 17.32, 18.85],
      ];
      const W = (txt, size) => { const c = document.createElement("canvas").getContext("2d"); c.font = `900 ${size}px Inter`; return c.measureText(txt).width; };
      CARDS.forEach(([id, name, sym, rank, watch, p1, c1, p2, c2, tin, t2, tout]) => {
        const card = mk(`<div class="hd"><img src="assets/logos/${id}.png"><b>${name}</b><span>${sym}</span><i>#${rank}</i></div>
          <div class="btn st">☆ ${watch}</div><div class="btn sh"><svg viewBox="0 0 24 24" width="38" height="38"><circle cx="18" cy="5" r="2.6" fill="none" stroke="#a1a7bb" stroke-width="2"/><circle cx="6" cy="12" r="2.6" fill="none" stroke="#a1a7bb" stroke-width="2"/><circle cx="18" cy="19" r="2.6" fill="none" stroke="#a1a7bb" stroke-width="2"/><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" stroke="#a1a7bb" stroke-width="2"/></svg></div>
          <div class="px">${p1}</div><div class="ch dn">${c1}</div>`, "cmc", "");
        const px = card.querySelector(".px"), ch = card.querySelector(".ch");
        const place = (p) => { ch.style.left = (44 + W(p, 104) * 0.98 + 26) + "px"; };
        place(p1);
        tl.set(card, { opacity: 1 }, tin);
        tl.call(() => { px.textContent = p1; ch.textContent = c1; place(p1); }, null, tin);
        tl.call(() => { px.textContent = p2; ch.textContent = c2; place(p2); }, null, t2);
        tl.call(() => { px.textContent = p1; ch.textContent = c1; place(p1); }, null, t2 - 0.01);
        tl.set(card, { opacity: 0 }, tout);
      });
