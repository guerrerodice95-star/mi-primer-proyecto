      // ================= layout like the old reel: CoinMarketCap header card on top, person full below =================
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const SC = 1.16, TOPY = 480;
      const FL = 1.42, TEND = 15.40;
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
      tl.to("#topbg", { opacity: 0, duration: 0.4 }, TEND + 0.05);
      tl.to("#caps", { y: 0, duration: 0.5 }, TEND);

      // ---------- CMC cards (same as the old reel): price 1 = "compro", price 2 = "compro más" ----------
      const CARDS = [
        ["sol", "Solana", "SOL", 7, "2.7M", "$65", "▼ 19.43% (1W)", "$50", "▼ 29.28%", 0, 2.61, 4.07],
        ["xrp", "XRP", "XRP", 6, "2.7M", "$0.95", "▼ 14.47% (1W)", "$0.70", "▼ 26.47%", 4.09, 6.55, 8.05],
        ["aster", "Aster", "ASTER", 44, "132K", "$0.50", "▼ 13.39% (1W)", "$0.38", "▼ 31.81%", 8.07, 10.35, 11.85],
        ["hype", "Hyperliquid", "HYPE", 9, "262K", "$60", "▼ 12.56% (1W)", "$45", "▼ 32.55%", 11.87, 14.0, 15.58],
      ];
      const W = (txt, size) => { const c = document.createElement("canvas").getContext("2d"); c.font = `900 ${size}px Inter`; return c.measureText(txt).width; };
      CARDS.forEach(([id, name, sym, rank, watch, p1, c1, p2, c2, tin, t2, tout]) => {
        const card = mk(`<div class="hd"><img src="assets/logos/${id}.png"><b>${name}</b><span>${sym}</span><i>#${rank}</i></div>
          <div class="btn st">☆ ${watch}</div><div class="btn sh"><svg viewBox="0 0 24 24" width="38" height="38"><circle cx="18" cy="5" r="2.6" fill="none" stroke="#58667e" stroke-width="2"/><circle cx="6" cy="12" r="2.6" fill="none" stroke="#58667e" stroke-width="2"/><circle cx="18" cy="19" r="2.6" fill="none" stroke="#58667e" stroke-width="2"/><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" stroke="#58667e" stroke-width="2"/></svg></div>
          <div class="pr"><div class="px">${p1}</div><div class="ch dn">${c1}</div></div>`, "cmc", "");
        const px = card.querySelector(".px"), ch = card.querySelector(".ch");
        const place = () => {};
        place(p1);
        if (tin === 0) tl.set(card, { opacity: 1, x: 0 }, 0);
        else tl.fromTo(card, { opacity: 0, x: -80 }, { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }, tin - 0.05);
        tl.call(() => { px.textContent = p1; ch.textContent = c1; place(p1); }, null, tin);
        tl.call(() => { px.textContent = p2; ch.textContent = c2; place(p2); }, null, t2);
        tl.call(() => { px.textContent = p1; ch.textContent = c1; place(p1); }, null, t2 - 0.01);
        tl.to(card, { opacity: 0, x: 80, duration: 0.2, ease: "power2.in" }, tout - 0.2);
      });

      CARDS.forEach((c, i) => {
        const tag = mk(`${i + 1}/4`, "ov", "left:78px;top:494px;padding:6px 16px;border-radius:999px;background:#3861fb;font-size:28px;font-weight:900;color:#fff;");
        if (c[9] === 0) tl.set(tag, { opacity: 1 }, 0); else tl.fromTo(tag, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.5)" }, c[9] + 0.05);
        tl.to(tag, { opacity: 0, duration: 0.15 }, c[11] - 0.2);
      });

      const pbar = mk(`<div id="pbf" style="position:absolute;left:0;top:0;bottom:0;width:100%;border-radius:6px;background:linear-gradient(90deg,#3861fb,#7aa2ff);transform-origin:0 50%"></div>`, "ov", "left:170px;top:506px;width:832px;height:12px;border-radius:6px;background:rgba(255,255,255,0.18);");
      tl.set(pbar, { opacity: 1 }, 0);
      tl.set("#pbf", { scaleX: 0.25 }, 0);
      CARDS.forEach((c, i) => { if (i) tl.to("#pbf", { scaleX: (i + 1) / 4, duration: 0.45, ease: "power2.out" }, c[9] + 0.05); });
      tl.to(pbar, { opacity: 0, duration: 0.2 }, CARDS[3][11] - 0.2);
