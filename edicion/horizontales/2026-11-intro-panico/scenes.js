      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const sv = (p, tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 24 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.4, ease: "back.out(1.9)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const kw = (html, t0, t1, top) => { const k = mk(html, "kw", top ? `top:${top}px` : ""); tl.fromTo(k, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, t0); fade(k, t1, 0.2); return k; };
      const fmt = (n) => Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

      // ---------- camera ----------
      const sideR = (t, s = 1.0) => { tl.to(cam, { x: 470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeL", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const sideL = (t, s = 1.0) => { tl.to(cam, { x: -470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeR", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const full = (t, s = 1.06) => { tl.to(cam, { x: 0, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to(["#fadeL", "#fadeR"], { opacity: 0, duration: 0.3 }, t + 0.05); };
      tl.set(cam, { x: 0, scale: 1.04 }, 0);
      sideR(2.9, 1.0);
      full(7.1, 1.05);                         // fear gauge in front, camera still
      sideL(10.5, 1.0);
      full(17.9, 1.06);
      tl.set(cam, { scale: 1.16 }, 20.66);     // dry cut on "una vez cada cuatro años"
      tl.set(cam, { scale: 1.05 }, 22.4);      // back wide
      tl.to(cam, { scale: 1.1, duration: 4.6, ease: "none" }, 22.42);

      // ---------- A 0 - 2.9: the market is falling (glass, camera still) ----------
      tl.to("#redTint", { opacity: 1, duration: 0.4 }, 1.16);
      const A = [["bitcoin", "Bitcoin", "−21,2 %", 0.64, "left:120px;top:150px"], ["ethereum", "Ethereum", "−26,2 %", 1.16, "left:1380px;top:170px"], ["ripple", "XRP", "−27,8 %", 1.86, "left:150px;top:520px"]];
      const aEls = A.map(([id, n, c, t, pos]) => {
        const e = mk(`<img src="assets/logos/${id}.png"><div><b>${n}</b><i>▼ ${c}<small>30 días</small></i></div>`, "glass chip ov", pos);
        pop(e, t); tl.to(e, { y: "+=16", duration: 1.2, ease: "sine.inOut", yoyo: true, repeat: 1 }, t + 0.4); return e; });
      tl.to(aEls, { opacity: 0, y: 40, duration: 0.3, stagger: 0.04 }, 2.75);
      tl.to("#redTint", { opacity: 0, duration: 0.4 }, 2.9);

      // ---------- B 2.9 - 7.1: Bitcoin "en picado" (real 60-day data) + altcoins −30 % ----------
      const cb = mk(`<div style="position:absolute;left:48px;top:44px;display:flex;align-items:center;gap:18px"><img src="assets/logos/bitcoin.png" style="width:72px;height:72px"><b style="font-size:42px;font-weight:900">Bitcoin</b><span style="font-size:28px;color:#8b93a1;font-weight:700">BTC · 60 días</span></div>
        <div id="bp" style="position:absolute;left:48px;top:140px;font-size:96px;font-weight:900;letter-spacing:-.02em;font-variant-numeric:tabular-nums">86.183 $</div>
        <div id="bc" style="position:absolute;left:52px;top:256px;padding:8px 18px;border-radius:12px;background:rgba(229,72,77,.16);color:#ff7a7e;font-size:32px;font-weight:900;opacity:0">▼ −21,2 % en 30 días</div>
        <div id="ath" style="position:absolute;right:44px;top:56px;padding:8px 18px;border-radius:12px;background:#e5484d;color:#fff;font-size:28px;font-weight:900;opacity:0">−49 % DESDE MÁXIMOS</div>
        <svg id="bs" width="720" height="470" viewBox="0 0 720 470" style="position:absolute;left:40px;top:330px"><defs><linearGradient id="gr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e5484d" stop-opacity=".35"/><stop offset="1" stop-color="#e5484d" stop-opacity="0"/></linearGradient></defs></svg>
        <div style="position:absolute;left:48px;bottom:22px;font-size:20px;font-weight:700;color:#6b7280">Datos reales: CoinGecko · 16 nov 2026 · máximo 126.080 $ (oct 2025)</div>`, "card", "left:80px;");
      const SVG = cb.querySelector("#bs");
      for (let i = 0; i < 5; i++) sv(SVG, "line", { x1: 0, x2: 720, y1: 20 + i * 105, y2: 20 + i * 105, stroke: "rgba(255,255,255,.06)", "stroke-width": 2 });
      const mn = Math.min(...BTC), mx = Math.max(...BTC), N = BTC.length;
      const PX = (i) => (i / (N - 1)) * 710, PY = (v) => 440 - ((v - mn) / (mx - mn)) * 410;
      const area = sv(SVG, "path", { d: "", fill: "url(#gr)" }), line = sv(SVG, "path", { d: "", fill: "none", stroke: "#e5484d", "stroke-width": 5, "stroke-linejoin": "round" });
      const dot = sv(SVG, "circle", { r: 10, fill: "#ff7a7e", opacity: 0 });
      tl.fromTo(cb, { opacity: 0, x: -60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 3.0);
      const pr = { k: 0 };
      tl.set(dot, { opacity: 1 }, 3.3);
      tl.to(pr, { k: 1, duration: 0.95, ease: "power1.in", onUpdate: () => {
        const m = Math.max(1, Math.round(pr.k * (N - 1)));
        let d = `M0 ${PY(BTC[0])}`; for (let i = 1; i <= m; i++) d += ` L${PX(i)} ${PY(BTC[i])}`;
        line.setAttribute("d", d); area.setAttribute("d", d + ` L${PX(m)} 460 L0 460 Z`);
        dot.setAttribute("cx", PX(m)); dot.setAttribute("cy", PY(BTC[m]));
        $("#bp").textContent = fmt(BTC[m]) + " $";
      } }, 3.3);
      tl.to("#bp", { color: "#ff7a7e", duration: 0.3 }, 3.82);
      tl.fromTo("#bc", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 3.82);
      tl.fromTo("#ath", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 4.2);
      tl.to(cb, { opacity: 0, x: -50, duration: 0.25, ease: "power2.in" }, 4.55);
      // altcoins
      const ca = mk(`<div style="position:absolute;left:48px;top:44px;font-size:28px;font-weight:800;letter-spacing:.16em;color:#c9a54c">ALTCOINS · 30 DÍAS</div>
        <div style="position:absolute;left:48px;top:92px;font-size:56px;font-weight:900">Más de un <span style="color:#ff7a7e">−30 %</span></div>
        <div id="alts" style="position:absolute;left:48px;right:48px;top:210px"></div>
        <div style="position:absolute;left:48px;bottom:22px;font-size:20px;font-weight:700;color:#6b7280">Datos reales: CoinGecko · 16 nov 2026</div>`, "card", "left:80px;");
      const ALT = [["near", "NEAR", 38.3], ["solana", "Solana", 32.6], ["cardano", "Cardano", 32.3], ["uniswap", "Uniswap", 30.1], ["avalanche-2", "Avalanche", 29.0]];
      const ar = ALT.map(([id, n, v], i) => {
        const r = mk(`<img src="assets/logos/${id}.png" style="width:56px;height:56px;border-radius:50%"><b style="width:200px;font-size:34px;font-weight:900">${n}</b><div class="bar" style="height:40px;border-radius:10px;background:linear-gradient(90deg,#c23a3f,#e5484d);width:${v / 38.3 * 250}px;transform-origin:0 50%"></div><i style="white-space:nowrap;font-style:normal;font-size:34px;font-weight:900;color:#ff7a7e;margin-left:14px">−${v.toFixed(1).replace(".", ",")} %</i>`, "", "display:flex;align-items:center;gap:16px;height:112px;opacity:0;", $("#alts"));
        return r;
      });
      tl.fromTo(ca, { opacity: 0, x: -60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "expo.out" }, 4.6);
      ar.forEach((r, i) => { tl.fromTo(r, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.25 }, 4.85 + i * 0.16); tl.fromTo(r.querySelector(".bar"), { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: "power3.out" }, 4.9 + i * 0.16); });
      tl.to(ca, { opacity: 0, x: -50, duration: 0.25, ease: "power2.in" }, 6.95);

      // ---------- C 7.1 - 10.4: real fear (glass gauge in front, camera still) ----------
      tl.to("#redTint", { opacity: 1, duration: 0.5 }, 8.1);
      const g = mk(`<svg width="560" height="330" viewBox="0 0 560 330">
          <defs><linearGradient id="fg" x1="0" x2="1"><stop offset="0" stop-color="#e5484d"/><stop offset=".45" stop-color="#f0a33a"/><stop offset=".7" stop-color="#f0d488"/><stop offset="1" stop-color="#16c784"/></linearGradient></defs>
          <path d="M60 290 A220 220 0 0 1 500 290" fill="none" stroke="rgba(255,255,255,.12)" stroke-width="40" stroke-linecap="round"/>
          <path id="arc" d="M60 290 A220 220 0 0 1 500 290" fill="none" stroke="url(#fg)" stroke-width="40" stroke-linecap="round" stroke-dasharray="692" stroke-dashoffset="0" opacity=".95"/>
          <g id="needle"><line x1="280" y1="290" x2="280" y2="110" stroke="#fff" stroke-width="10" stroke-linecap="round"/><circle cx="280" cy="290" r="20" fill="#fff"/></g>
        </svg>
        <div id="fgv" style="text-align:center;margin-top:-70px;font-size:120px;font-weight:900;color:#ff7a7e;font-variant-numeric:tabular-nums">50</div>
        <div style="text-align:center;font-size:42px;font-weight:900;letter-spacing:.06em">MIEDO EXTREMO</div>
        <div style="text-align:center;margin-top:6px;font-size:22px;font-weight:700;opacity:.7">Fear &amp; Greed · CoinMarketCap · 16 nov 2026</div>`, "glass ov", "left:1290px;top:150px;width:560px;padding:34px 0 30px;");
      gsap.set("#needle", { rotation: 0, svgOrigin: "280 290" });
      pop(g, 7.88, { x: 40 });
      const fv = { v: 50 };
      tl.to(fv, { v: 12, duration: 1.3, ease: "power2.inOut", onUpdate: () => { $("#fgv").textContent = Math.round(fv.v); } }, 8.1);
      tl.to("#needle", { rotation: -90 + (12 / 100) * 180, svgOrigin: "280 290", duration: 1.3, ease: "power2.inOut" }, 8.1);
      tl.to(g, { x: -8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 9.96);
      const pan = mk(`<span style="font-size:70px">😱</span><b style="font-size:54px;font-weight:900">PÁNICO</b>`, "glass chip ov", "left:120px;top:620px;");
      pop(pan, 9.96);
      tl.to([g, pan], { opacity: 0, duration: 0.25 }, 10.4);
      tl.to("#redTint", { opacity: 0, duration: 0.4 }, 10.4);

      // ---------- D 10.5 - 17.9: what you get today (card right) ----------
      const cd = mk(`<div style="position:absolute;left:52px;top:48px;font-size:28px;font-weight:800;letter-spacing:.16em;color:#c9a54c">HOY EN ESTE VÍDEO</div><div id="fn" style="position:absolute;left:52px;top:96px;font-size:56px;font-weight:900;opacity:0">Mi <span style="color:#f0d488">función</span>:</div><div id="todo" style="position:absolute;left:44px;right:44px;top:190px"></div>`, "card", "left:1040px;");
      const TODO = [["📊", "Todos los datos", 11.48], ["📍", "Dónde nos encontramos", 13.82], ["🧭", "Qué voy a hacer yo", 15.26], ["💡", "Cómo lo podemos aprovechar", 16.4]];
      const trs = TODO.map(([ic, t0, t]) => {
        const r = mk(`<div style="width:110px;height:110px;border-radius:26px;background:rgba(201,165,76,.14);border:2px solid rgba(201,165,76,.6);display:flex;align-items:center;justify-content:center;font-size:58px;flex:none">${ic}</div><b style="font-size:44px;font-weight:900;line-height:1.1">${t0}</b>`, "", "display:flex;align-items:center;gap:28px;height:160px;opacity:0;", $("#todo"));
        tl.fromTo(r, { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.4, ease: "expo.out" }, t); return r; });
      tl.fromTo(cd, { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 10.7);
      tl.fromTo("#fn", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, 10.84);
      tl.to(cd, { opacity: 0, x: 50, duration: 0.3, ease: "power2.in" }, 17.75);

      // ---------- E 18 - 22.3: once every four years ----------
      tl.to("#bottomShade", { opacity: 1, duration: 0.3 }, 18.6);
      kw(`<span class="serif">una de esas</span><b>OPORTUNIDADES</b>`, 19.44, 20.6);
      kw(`<span class="serif">una vez cada</span><b class="box">4 AÑOS</b>`, 20.72, 22.3);
      // ---------- F 22.4 - 27: stay until the end ----------
      kw(`<span class="serif">y yo lo voy a</span><b style="color:#7ff0b5">APROVECHAR</b>`, 23.74, 24.45);
      const stay = kw(`<b class="box">QUÉDATE HASTA EL FINAL</b>`, 24.5, 27.0);
      const pb = mk(`<div id="pbf" style="height:100%;width:100%;border-radius:8px;background:linear-gradient(90deg,#c9a54c,#f0d488);transform-origin:0 50%"></div>`, "ov", "left:560px;right:560px;top:990px;height:14px;border-radius:8px;background:rgba(255,255,255,.15);");
      tl.to(pb, { opacity: 1, duration: 0.3 }, 24.6);
      tl.fromTo("#pbf", { scaleX: 0 }, { scaleX: 1, duration: 2.3, ease: "power1.inOut" }, 24.7);
