      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const sv = (p, tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 24 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.4, ease: "back.out(1.9)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const kw = (html, t0, t1, top) => { const k = mk(html, "kw", top ? `top:${top}px` : ""); tl.fromTo(k, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, t0); if (t1) fade(k, t1, 0.2); return k; };

      // ---------- keep the head centred (face tracking, small range so no edge shows) ----------
      FACE.forEach((f, i) => {
        const v = Math.max(-50, Math.min(50, (1280 - f.x) * 0.75));
        if (!i) tl.set("#track", { x: v }, 0); else tl.to("#track", { x: v, duration: f.t - FACE[i - 1].t, ease: "none" }, FACE[i - 1].t);
      });

      // ---------- camera: glass (still) / lateral / glass + dry cuts / lateral / glass ----------
      const sideR = (t, s = 1.0) => { tl.to(cam, { x: 470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeL", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const sideL = (t, s = 1.0) => { tl.to(cam, { x: -470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeR", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const full = (t, s = 1.06) => { tl.to(cam, { x: 0, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to(["#fadeL", "#fadeR"], { opacity: 0, duration: 0.3 }, t + 0.05); };
      tl.set(cam, { x: 0, scale: 1.06 }, 0);
      tl.to(cam, { scale: 1.1, duration: 4.5, ease: "none" }, 0.05);
      sideR(4.7, 1.0);
      full(7.45, 1.06);
      tl.set(cam, { scale: 1.18 }, 9.46);            // dry cut: "lo perdí todo"
      tl.to(cam, { scale: 1.22, duration: 2.7, ease: "none" }, 9.48);
      tl.set(cam, { scale: 1.06 }, 12.3);            // back wide
      tl.to(cam, { scale: 1.1, duration: 3.4, ease: "none" }, 12.32);
      sideL(15.9, 1.0);
      full(22.95, 1.06);
      tl.to(cam, { scale: 1.09, duration: 3.4, ease: "none" }, 23.56);
      tl.set(cam, { scale: 1.18 }, 27.0);            // dry cut: "nadie lo hace"
      tl.to(cam, { scale: 1.2, duration: 1.6, ease: "none" }, 27.02);

      // ---------- A 0–4.7: everybody wants the ×100 coin (glass in front, camera still) ----------
      const COINS = { doge: ["Dogecoin", "×8.419", "−92 %"], shib: ["Shiba Inu", "×1,5 MILLONES", "−96 %"], pepe: ["PEPE", "×508", "−88 %"], wif: ["dogwifhat", "×3.107", "−97 %"], bonk: ["BONK", "×676", "−96 %"] };
      const chip = (id, pos) => mk(`<img src="assets/logos/${id}.png"><div><b>${COINS[id][0]}</b><i class="up">▲ ${COINS[id][1]}</i><em>DE MÍNIMO A MÁXIMO</em></div>`, "glass chip ov", pos);
      const A = [["doge", 1.04, "left:110px;top:150px"], ["shib", 1.86, "left:1330px;top:170px"], ["pepe", 2.54, "left:140px;top:470px"], ["wif", 3.3, "left:1390px;top:490px"]];
      const aEls = A.map(([id, t, pos]) => { const e = chip(id, pos); pop(e, t); tl.to(e, { y: "+=14", duration: 1.1, ease: "sine.inOut", yoyo: true, repeat: 1 }, t + 0.4); return e; });
      // search bar typing what everybody searches
      const bar = mk(`<div style="display:flex;align-items:center;gap:22px;padding:22px 34px"><span style="font-size:46px">🔍</span>
          <span id="q" style="font-size:44px;font-weight:800;white-space:nowrap"></span><span id="cur" style="width:4px;height:52px;background:#fff;display:inline-block"></span>
          <span id="go" style="margin-left:18px;padding:10px 26px;border-radius:16px;background:linear-gradient(180deg,#f0d488,#c9a54c);color:#1a1408;font-size:34px;font-weight:900">Buscar</span></div>`,
        "glass ov", "left:0;right:0;margin:0 auto;width:max-content;top:820px;border-radius:999px;");
      const Q = "la criptomoneda que multiplica ×100";
      tl.set(bar, { opacity: 1 }, 0);
      for (let i = 1; i <= Q.length; i++) tl.call(() => { $("#q").textContent = Q.slice(0, i); }, null, 0.2 + (i / Q.length) * 3.0);
      tl.call(() => { $("#q").textContent = ""; }, null, 0.19);
      tl.to("#cur", { opacity: 0, duration: 0.01, repeat: 7, yoyo: true, repeatDelay: 0.22 }, 3.32);
      // his own click: "y yo también la busqué"
      const ptr = mk(`<svg viewBox="0 0 24 24" width="64" height="64"><path d="M3 2l17 9.5-7.4 1.6L9.4 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>`, "ov", "left:0;top:0;filter:drop-shadow(0 6px 10px rgba(0,0,0,.6))");
      const GX = 1370, GY = 880;
      tl.fromTo(ptr, { opacity: 0, x: GX + 160, y: GY + 120 }, { opacity: 1, x: GX, y: GY, duration: 0.45, ease: "power2.inOut" }, 3.82);
      tl.to(ptr, { scale: 0.8, duration: 0.07, yoyo: true, repeat: 1 }, 4.4);
      tl.to("#go", { scale: 0.9, duration: 0.07, yoyo: true, repeat: 1 }, 4.4);
      const yo = mk(`<span class="serif" style="font-size:54px;color:#f6e6b8">yo también</span> <b style="font-size:54px">la busqué</b>`, "ov", "left:0;right:0;text-align:center;top:735px;text-shadow:0 6px 24px rgba(0,0,0,.85)");
      pop(yo, 3.82, { scale: 0.85 });
      tl.to([...aEls, bar, ptr, yo], { opacity: 0, y: 30, duration: 0.3, stagger: 0.03 }, 4.55);

      // ---------- B 4.7–7.45: lost time and money (lateral, card on the left) ----------
      const cB = mk(`<div style="position:absolute;left:56px;top:56px;font-size:28px;font-weight:800;letter-spacing:.16em;color:#c9a54c">BUSCANDO EL ×100</div>
          <div style="position:absolute;left:56px;top:104px;font-size:64px;font-weight:900;line-height:1.05">Lo que <span style="color:#ff7a7e">perdí</span></div>
          <div id="rT" style="position:absolute;left:56px;right:56px;top:300px;opacity:0"><div style="display:flex;align-items:center;gap:20px"><span style="font-size:84px">⏳</span><b style="font-size:66px;font-weight:900">TIEMPO</b></div>
            <div style="margin-top:22px;height:34px;border-radius:12px;background:rgba(255,255,255,.08);overflow:hidden"><div class="bf" style="height:100%;background:linear-gradient(90deg,#c23a3f,#ff6b70);transform-origin:0 50%"></div></div></div>
          <div id="rD" style="position:absolute;left:56px;right:56px;top:540px;opacity:0"><div style="display:flex;align-items:center;gap:20px"><span style="font-size:84px">💸</span><b style="font-size:66px;font-weight:900">DINERO</b></div>
            <div style="margin-top:22px;height:34px;border-radius:12px;background:rgba(255,255,255,.08);overflow:hidden"><div class="bf" style="height:100%;background:linear-gradient(90deg,#c23a3f,#ff6b70);transform-origin:0 50%"></div></div></div>`, "card", "left:80px;");
      tl.fromTo(cB, { opacity: 0, x: -60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 4.85);
      [["#rT", 5.52], ["#rD", 6.38]].forEach(([s, t]) => {
        tl.fromTo(s, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, t);
        tl.fromTo(s + " .bf", { scaleX: 1 }, { scaleX: 0.12, duration: 0.9, ease: "power2.inOut" }, t + 0.15);
      });
      tl.to(cB, { opacity: 0, x: -50, duration: 0.25, ease: "power2.in" }, 7.3);

      // ---------- C 7.45–12.3: found some… lost it all (glass in front, dry cut, real drawdowns) ----------
      const fnd = mk(`<span class="serif" style="font-size:58px;color:#f6e6b8">encontré</span> <b style="font-size:58px">ALGUNA</b>`, "ov", "left:0;right:0;text-align:center;top:840px;text-shadow:0 6px 24px rgba(0,0,0,.85)");
      pop(fnd, 7.66, { scale: 0.85 }); fade(fnd, 9.4, 0.12);
      const C = [["pepe", 7.7, "left:120px;top:190px"], ["bonk", 7.9, "left:1380px;top:210px"], ["wif", 8.1, "left:150px;top:510px"]];
      const cEls = C.map(([id, t, pos]) => { const e = chip(id, pos); pop(e, t); return e; });
      // "lo perdí todo": same coins, real fall from their all-time high
      cEls.forEach((e, i) => {
        const id = C[i][0];
        tl.call(() => { const it = e.querySelector("i"); it.className = "dn"; it.textContent = "▼ " + COINS[id][2]; e.querySelector("em").textContent = "DESDE SU MÁXIMO"; }, null, 9.46);
        tl.call(() => { const it = e.querySelector("i"); it.className = "up"; it.textContent = "▲ " + COINS[id][1]; e.querySelector("em").textContent = "DE MÍNIMO A MÁXIMO"; }, null, 9.45);
        tl.fromTo(e, { rotationX: 0 }, { rotationX: 360, duration: 0.45, ease: "power2.out", immediateRender: false }, 9.46 + i * 0.05);
        tl.to(e, { x: -8, duration: 0.05, yoyo: true, repeat: 3, ease: "none" }, 9.95);
      });
      tl.to("#redTint", { opacity: 1, duration: 0.3 }, 9.46);
      const todo = kw(`<span class="serif">lo perdí</span><b class="box red">TODO</b>`, 9.6, 10.25);
      tl.to(cEls, { opacity: 0, y: 30, duration: 0.3, stagger: 0.04 }, 10.2);
      kw(`<span class="serif">por la</span><b class="box red">AVARICIA</b>`, 10.38, 10.95);
      const mas = kw(`<span class="serif">de querer</span><b id="m1" style="display:inline-block">MÁS</b> <span class="serif" style="font-size:70px;color:#f6e6b8;margin:0 22px 0 4px">y</span><b id="m2" style="display:inline-block;color:#ff7a7e;transform-origin:0 70%">MÁS</b>`, 10.98, 12.2);
      tl.set(["#m1", "#m2"], { opacity: 0 }, 0);
      tl.fromTo("#m1", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 11.08);
      tl.fromTo("#m2", { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1.15, duration: 0.35, ease: "back.out(3)" }, 11.8);
      tl.to("#redTint", { opacity: 0, duration: 0.4 }, 12.2);

      // ---------- D 12.3–15.9: be profitable and change my life (full, keywords) ----------
      kw(`<span class="serif">cómo conseguir</span><b class="box">SER RENTABLE</b>`, 13.6, 14.8);
      kw(`<span class="serif">y</span><b class="box">CAMBIAR MI VIDA</b>`, 14.86, 15.85);

      // ---------- E 15.9–22.95: lateral, card on the right ----------
      const cE = mk(`<div style="position:absolute;left:56px;top:56px;font-size:28px;font-weight:800;letter-spacing:.16em;color:#c9a54c">A DÍA DE HOY</div>
          <div style="position:absolute;left:56px;top:104px;font-size:58px;font-weight:900;line-height:1.08">Mis inversiones me han<br>asegurado <span style="color:#f0d488">el resto<br>de mi vida</span></div>
          <svg id="ue" width="690" height="330" viewBox="0 0 690 330" style="position:absolute;left:56px;top:400px"></svg>
          <div id="ok" style="position:absolute;left:56px;bottom:56px;padding:12px 26px;border-radius:16px;background:rgba(63,191,127,.16);color:#6fe0a6;font-size:34px;font-weight:900;opacity:0">✅ RESTO DE MI VIDA ASEGURADO</div>`, "card", "left:1040px;");
      const UE = cE.querySelector("#ue");
      for (let i = 0; i < 4; i++) sv(UE, "line", { x1: 0, x2: 690, y1: 30 + i * 90, y2: 30 + i * 90, stroke: "rgba(255,255,255,.06)", "stroke-width": 2 });
      const smooth = (n, seed, amp) => { const p = []; for (let i = 0; i <= n; i++) { const k = i / n; p.push([k, 0.08 + 0.84 * Math.pow(k, 1.35) + amp * Math.sin(i * seed) * (0.3 + 0.7 * k)]); } return p; };
      const toD = (pts, W, H) => pts.map(([k, v], i) => (i ? "L" : "M") + (k * W).toFixed(1) + " " + (H - v * H).toFixed(1)).join(" ");
      const up = sv(UE, "path", { d: toD(smooth(40, 1.7, 0.012), 680, 310), fill: "none", stroke: "#f0d488", "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round", style: "filter:drop-shadow(0 0 10px rgba(240,212,136,.6))", "stroke-dasharray": 1200, "stroke-dashoffset": 1200 });
      tl.fromTo(cE, { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 16.05);
      tl.to(up, { attr: { "stroke-dashoffset": 0 }, duration: 2.2, ease: "power1.inOut" }, 16.5);
      tl.fromTo("#ok", { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, 18.54);
      tl.to(cE, { opacity: 0, x: 50, duration: 0.25, ease: "power2.in" }, 19.2);
      // the two roads: chasing ×100 vs the boring way
      const cF = mk(`<div style="position:absolute;left:56px;top:56px;font-size:28px;font-weight:800;letter-spacing:.16em;color:#c9a54c">PARA CONSEGUIRLO</div>
          <div id="pA" style="position:absolute;left:40px;right:40px;top:120px;height:300px;border-radius:26px;background:rgba(255,255,255,.04);border:2px solid rgba(255,255,255,.08);opacity:0">
            <div style="position:absolute;left:26px;top:20px;font-size:38px;font-weight:900">🎢 Buscar el ×100</div><svg id="sa" width="640" height="190" viewBox="0 0 640 190" style="position:absolute;left:40px;top:92px"></svg></div>
          <div id="pB" style="position:absolute;left:40px;right:40px;top:450px;height:300px;border-radius:26px;background:rgba(255,255,255,.04);border:2px solid rgba(255,255,255,.08);opacity:0">
            <div style="position:absolute;left:26px;top:20px;font-size:38px;font-weight:900">😴 La manera aburrida</div><svg id="sb" width="640" height="190" viewBox="0 0 640 190" style="position:absolute;left:40px;top:92px"></svg>
            <div id="wk" style="position:absolute;right:24px;top:22px;padding:6px 18px;border-radius:12px;background:#2fb57a;color:#fff;font-size:28px;font-weight:900;opacity:0">✅ FUNCIONA</div></div>`, "card", "left:1040px;");
      const spiky = [0.3, 0.34, 0.28, 0.55, 0.42, 0.9, 0.62, 0.95, 0.5, 0.7, 0.35, 0.48, 0.2, 0.3, 0.1, 0.16, 0.05];
      const sA = sv(cF.querySelector("#sa"), "path", { d: spiky.map((v, i) => (i ? "L" : "M") + (i / (spiky.length - 1) * 630).toFixed(1) + " " + (180 - v * 170).toFixed(1)).join(" "), fill: "none", stroke: "#ff6b70", "stroke-width": 6, "stroke-linejoin": "round", "stroke-dasharray": 2600, "stroke-dashoffset": 2600 });
      const sB = sv(cF.querySelector("#sb"), "path", { d: toD(smooth(40, 2.3, 0.01), 630, 180), fill: "none", stroke: "#6fe0a6", "stroke-width": 6, "stroke-linejoin": "round", "stroke-dasharray": 1200, "stroke-dashoffset": 1200 });
      tl.fromTo(cF, { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.45, ease: "expo.out" }, 19.32);
      tl.fromTo("#pA", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 19.5);
      tl.to(sA, { attr: { "stroke-dashoffset": 0 }, duration: 1.1, ease: "none" }, 19.6);
      tl.fromTo("#pB", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.3 }, 20.6);
      tl.to(sB, { attr: { "stroke-dashoffset": 0 }, duration: 1.4, ease: "power1.inOut" }, 20.7);
      tl.to("#pA", { opacity: 0.35, duration: 0.3 }, 22.1);
      tl.to("#pB", { borderColor: "#f0d488", boxShadow: "0 0 40px rgba(240,212,136,.35)", duration: 0.3 }, 22.14);
      tl.fromTo("#wk", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, 22.2);
      tl.to(cF, { opacity: 0, x: 50, duration: 0.25, ease: "power2.in" }, 22.8);

      // ---------- F 22.95–28.68: what's in this video (glass in front) + "nobody does it" ----------
      const L = mk(`<div style="font-size:26px;font-weight:800;letter-spacing:.16em;color:#c9a54c">EN ESTE VÍDEO</div>
          <div id="l1" style="display:flex;align-items:center;gap:18px;margin-top:22px;opacity:0"><span style="width:58px;height:58px;border-radius:50%;background:linear-gradient(180deg,#f0d488,#c9a54c);color:#1a1408;font-size:34px;font-weight:900;display:flex;align-items:center;justify-content:center">1</span><b style="font-size:46px;font-weight:900">Cuál es el método</b></div>
          <div id="l2" style="display:flex;align-items:center;gap:18px;margin-top:18px;opacity:0"><span style="width:58px;height:58px;border-radius:50%;background:linear-gradient(180deg,#f0d488,#c9a54c);color:#1a1408;font-size:34px;font-weight:900;display:flex;align-items:center;justify-content:center">2</span><b style="font-size:46px;font-weight:900">Cómo conseguirlo</b></div>`,
        "glass ov", "left:100px;top:300px;padding:34px 42px;");
      pop(L, 23.3, { x: -40 });
      tl.fromTo("#l1", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 24.6);
      tl.fromTo("#l2", { opacity: 0, x: -24 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 25.45);
      tl.to(L, { opacity: 0, x: -40, duration: 0.3 }, 26.5);
      kw(`<span class="serif">por eso</span><b class="box">NADIE LO HACE</b>`, 27.0, 27.62);
      kw(`<span class="serif">porque es</span><b class="box">ABURRIDO 😴</b>`, 27.66, null);
      tl.set("#redTint", { opacity: 0 }, 0);
