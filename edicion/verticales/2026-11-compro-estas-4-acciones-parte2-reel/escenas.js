      // ================= layout like the old reel: CoinMarketCap header card on top, person full below =================
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const SC = 1.252, TOPY = 470, FY = 385;
      const FL = 1.59, TEND = 17.8;
      const fx = (x, s = SC) => Math.min(0, Math.max(1080 - 1728 * s, 540 - s * x));
      tl.set("#card", { opacity: 0 }, 0);
      tl.set("#fw", { scale: SC, x: fx(FACE[0].x), y: FY, clipPath: "inset(0px 0px 0px 0px)" }, 0);
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

      // ---------- hook: the 4 coins ----------
      const COINS = [["aapl", "AAPL"], ["msft", "MSFT"], ["googl", "GOOGL"], ["amzn", "AMZN"]];
      const row = mk("", "", "position:absolute;left:0;right:0;top:120px;display:flex;justify-content:center;gap:34px;");
      const hook = COINS.map(([id, n], i) => {
        const e = mk(`<img src="assets/logos/${id}.png" style="width:150px;height:150px;border-radius:50%;box-shadow:0 14px 34px rgba(0,0,0,.6)"><div style="margin-top:12px;text-align:center;font-size:34px;font-weight:900">${n}</div>`, "ov", "position:relative;", row);
        tl.fromTo(e, { opacity: 0, y: 40, scale: 0.6 }, { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: "back.out(2.2)" }, 2.26 + i * 0.12);
        return e;
      });
      // BTC crash chart (real 60-day CoinGecko data) in the top band
      const BTC = [25980.19, 26151.3, 26130.2, 26541.35, 26402.42, 26370.89, 26099.77, 26217.83, 26584.06, 26506.99, 26421.41, 26253.34, 26081.72, 26333.04, 26186.41, 25981.57, 25978.43, 26418.3, 26522.54, 27122.09, 27244.28, 26936.04, 26939.37, 27068.72, 26820.38, 26797.54, 26861.06, 26871.6, 27190.86, 27477.31, 27599.79, 27538.69, 27193.34, 27366.17, 27245.9, 27204.38, 26692.87, 26713.03, 26140.03, 26430.89, 26424.82, 26702.86, 26008.86, 25955.34, 26169.38, 26477.81, 26549.85, 26184.72, 25437.0, 25164.31, 25372.01, 25736.51, 24315.0, 24579.43, 25253.14, 25065.87, 25466.19, 25366.09, 25136.27, 24509.76, 24328.38, 24429.88, 23879.2, 22617.73, 24089.56];
      const bt = mk(`<div style="position:absolute;left:60px;top:34px;display:flex;align-items:center;gap:16px"><b style="font-size:40px;font-weight:900">NASDAQ</b><span style="font-size:26px;font-weight:800;color:#ff7a7e;letter-spacing:.08em">TODO EL MERCADO CAE</span></div>
        <div id="bpx" style="position:absolute;right:60px;top:26px;font-size:66px;font-weight:900;letter-spacing:-.02em;font-variant-numeric:tabular-nums">26.185 pts</div>
        <div id="bpc" style="position:absolute;right:60px;top:104px;padding:6px 16px;border-radius:12px;background:#e5484d;font-size:30px;font-weight:900;opacity:0">▼ −7,3 %</div>
        <svg id="bsv" width="960" height="270" viewBox="0 0 960 270" style="position:absolute;left:60px;top:160px"><defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5484d" stop-opacity=".45"/><stop offset="1" stop-color="#e5484d" stop-opacity="0"/></linearGradient></defs></svg>`, "ov", "left:0;top:0;width:1080px;height:460px;opacity:1;");
      const BS = bt.querySelector("#bsv"), NSV = "http://www.w3.org/2000/svg";
      const svl = (tag, a) => { const e = document.createElementNS(NSV, tag); for (const k in a) e.setAttribute(k, a[k]); BS.appendChild(e); return e; };
      for (let i = 0; i < 4; i++) svl("line", { x1: 0, x2: 960, y1: 20 + i * 80, y2: 20 + i * 80, stroke: "rgba(255,255,255,.06)", "stroke-width": 2 });
      const bmn = Math.min(...BTC), bmx = Math.max(...BTC), BN = BTC.length;
      const GX = (i) => (i / (BN - 1)) * 950, GY = (v) => 250 - ((v - bmn) / (bmx - bmn)) * 230;
      const bar = svl("path", { d: "", fill: "url(#rg)" }), bln = svl("path", { d: "", fill: "none", stroke: "#ff3b4e", "stroke-width": 6, "stroke-linejoin": "round", style: "filter:drop-shadow(0 0 8px rgba(255,59,78,.8))" });
      const bdot = svl("circle", { r: 11, fill: "#fff", opacity: 0 });
      const fmtN = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
      tl.set(bt, { opacity: 1 }, 0);
      tl.set(bdot, { opacity: 1 }, 0);
      const bpr = { k: 0.74 };
      const drawB = () => {
        const m = Math.max(1, Math.round(bpr.k * (BN - 1)));
        let d = `M0 ${GY(BTC[0])}`; for (let i = 1; i <= m; i++) d += ` L${GX(i)} ${GY(BTC[i])}`;
        bln.setAttribute("d", d); bar.setAttribute("d", d + ` L${GX(m)} 270 L0 270 Z`);
        bdot.setAttribute("cx", GX(m)); bdot.setAttribute("cy", GY(BTC[m]));
        $("#bpx").textContent = fmtN(BTC[m]) + " pts";
      };
      drawB();
      tl.to(bpr, { k: 1, duration: 1.3, ease: "none", onUpdate: drawB }, 0.0);
      tl.to("#bpx", { color: "#ff6b70", duration: 0.3 }, 0.3);
      tl.fromTo("#bpc", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 1.2);
      tl.to("#redTint", { opacity: 0 }, 0);
      tl.to(bt, { x: -8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 1.45);
      tl.to(bt, { opacity: 0, y: -20, duration: 0.25 }, 2.1);
      tl.to(hook, { opacity: 0, y: -20, duration: 0.2, stagger: 0.03 }, 3.0);

      // ---------- CMC cards (same as the old reel): price 1 = "compro", price 2 = "compro más" ----------
      const CARDS = [
        ["aapl", "Apple", "AAPL", "NASDAQ", "", "$325", "▼ 1.05% (1W)", "$310", "▼ 11.20%", 3.18, 5.04, 6.46],
        ["msft", "Microsoft", "MSFT", "NASDAQ", "", "$460", "▼ 4.92% (1W)", "$425", "▼ 13.71%", 6.6, 8.88, 10.36],
        ["googl", "Google", "GOOGL", "NASDAQ", "", "$250", "▼ 0.57% (1W)", "$210", "▼ 25.56%", 10.5, 12.66, 14.1],
        ["amzn", "Amazon", "AMZN", "NASDAQ", "", "$230", "▼ 0.92% (1W)", "$215", "▼ 15.82%", 14.24, 16.46, 17.8],
      ];
      const W = (txt, size) => { const c = document.createElement("canvas").getContext("2d"); c.font = `900 ${size}px Inter`; return c.measureText(txt).width; };
      CARDS.forEach(([id, name, sym, rank, watch, p1, c1, p2, c2, tin, t2, tout]) => {
        const card = mk(`<div class="hd"><img src="assets/logos/${id}.png"><b>${name}</b><span>${sym}</span><i>${rank}</i></div>
          <div class="btn st">☆</div><div class="btn sh"><svg viewBox="0 0 24 24" width="38" height="38"><circle cx="18" cy="5" r="2.6" fill="none" stroke="#a1a7bb" stroke-width="2"/><circle cx="6" cy="12" r="2.6" fill="none" stroke="#a1a7bb" stroke-width="2"/><circle cx="18" cy="19" r="2.6" fill="none" stroke="#a1a7bb" stroke-width="2"/><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4" stroke="#a1a7bb" stroke-width="2"/></svg></div>
          <div class="px">${p1}</div><div class="ch ${c1[0] === "▲" ? "up" : "dn"}">${c1}</div>`, "cmc", "");
        const px = card.querySelector(".px"), ch = card.querySelector(".ch");
        const place = (p) => { ch.style.left = (44 + W(p, 104) * 0.98 + 26) + "px"; };
        place(p1);
        tl.set(card, { opacity: 1 }, tin);
        const cls = (t) => "ch " + (t[0] === "▲" ? "up" : "dn");
        tl.call(() => { px.textContent = p1; ch.textContent = c1; ch.className = cls(c1); place(p1); }, null, tin);
        tl.call(() => { px.textContent = p2; ch.textContent = c2; ch.className = cls(c2); place(p2); }, null, t2);
        tl.call(() => { px.textContent = p1; ch.textContent = c1; ch.className = cls(c1); place(p1); }, null, t2 - 0.01);
        tl.set(card, { opacity: 0 }, tout);
      });
