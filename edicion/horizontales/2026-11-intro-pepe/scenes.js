      const NS = "http://www.w3.org/2000/svg";
      const mk = (html, cls, style, parent) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (parent || $("#fx")).appendChild(d); return d; };
      const sv = (tag, a, p) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.7 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, rotation: 0, duration: 0.4, ease: "back.out(1.9)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const kw = (html, t0, t1, top) => { const k = mk(html, "kw", top ? `top:${top}px` : ""); tl.fromTo(k, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, t0); fade(k, t1, 0.2); return k; };
      const fmtP = (v) => "0,00000" + String(Math.round(v / 10)).padStart(3, "0") + " $";

      // ---------- camera ----------
      const sideR = (t, s = 1.0) => { tl.to(cam, { x: 470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeL", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const sideL = (t, s = 1.0) => { tl.to(cam, { x: -470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeR", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const full = (t, s = 1.06) => { tl.to(cam, { x: 0, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to(["#fadeL", "#fadeR"], { opacity: 0, duration: 0.3 }, t + 0.05); };
      tl.set(cam, { x: 0, scale: 1.04 }, 0);
      // 0 - 7.3 camera still under the glass chips
      tl.set(cam, { scale: 1.14 }, 8.1);                 // dry cut "Es la memecoin que más dinero…"
      tl.to(cam, { scale: 1.17, duration: 3.1, ease: "none" }, 8.12);
      sideR(11.3, 1.0);                                 // PEPE chart left
      full(15.0, 1.06);
      tl.set(cam, { scale: 1.16 }, 18.3);               // cut "hay muchas cosas que tienes que conocer"
      sideL(20.7, 1.0);                                 // three facts right
      full(31.5, 1.06);
      // 31.8 - 36.7: YouTube screen hides him
      tl.set(cam, { scale: 1.06 }, 36.7);
      tl.to(cam, { scale: 1.1, duration: 7.5, ease: "none" }, 36.75);
      tl.set(cam, { scale: 1.04 }, 44.38);               // wide for the subscribe card
      tl.set(cam, { scale: 1.16 }, 49.1);               // cut "aquí encontraremos la próxima memecoin"
      tl.to(cam, { scale: 1.22, duration: 4.5, ease: "none" }, 49.12);

      // ---------- 0 - 7.3: coins as floating glass, camera still ----------
      const COINS = [["bitcoin", "Bitcoin", "−11,4 %", 0.0, "left:1270px;top:150px"], ["ethereum", "Ethereum", "−19,3 %", 1.5, "left:150px;top:150px"],
        ["dogecoin", "Dogecoin", "−21,8 %", 2.6, "left:110px;top:520px"], ["shiba-inu", "Shiba Inu", "−18,1 %", 3.22, "left:1330px;top:520px"]];
      const chips = COINS.map(([id, n, c, t, pos]) => {
        const e = mk(`<img src="assets/logos/${id}.png"><div><b>${n}</b><i>▼ ${c} <small style="font-size:20px;opacity:.8">30 d</small></i></div>`, "glass coinchip ov", pos);
        tl.fromTo(e, { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, Math.max(0.05, t));
        tl.to(e, { y: "-=14", duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: 1 }, Math.max(0.05, t) + 0.4);
        return e;
      });
      tl.to(chips, { opacity: 0.35, scale: 0.92, filter: "grayscale(1)", duration: 0.4 }, 4.6);
      const pepeChip = mk(`<img src="assets/logos/pepe.png"><div><b>PEPE</b><i class="up">▲ +18,7 % <small style="font-size:20px;opacity:.8">30 d</small></i></div>`, "glass coinchip ov", "left:740px;top:820px;border-color:rgba(127,240,181,0.7);box-shadow:0 0 50px rgba(76,175,80,0.45)");
      tl.fromTo(pepeChip, { opacity: 0, scale: 0.5, y: 40 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: "back.out(2.2)" }, 4.94);
      tl.to(pepeChip, { scale: 1.08, duration: 0.2, yoyo: true, repeat: 1 }, 6.82);
      tl.to([...chips, pepeChip], { opacity: 0, duration: 0.3 }, 7.6);

      // ---------- 8.1 - 11: "la que más dinero nos ha dado en este canal" ----------
      tl.to("#bottomShade", { opacity: 1, duration: 0.3 }, 8.3);
      kw(`<span class="serif">la memecoin que más</span><br><b class="box">💰 DINERO NOS HA DADO</b>`, 9.0, 11.2, 780);
      tl.to("#bottomShade", { opacity: 0, duration: 0.3 }, 11.2);

      // ---------- 11.3 - 15: PEPE doubled in 3 months (real data, CoinGecko) ----------
      const ch = mk(`<div class="hd"><img src="assets/logos/pepe.png"><b>Pepe<span>PEPE</span></b></div>
        <div class="tabs"><i>1D</i><i>7D</i><i>1M</i><i class="on">3M</i><i>1A</i></div>
        <div id="price">0,00000257 $</div><div id="chg">▲ ×2 desde el mínimo de agosto</div><div id="x2">×2</div>
        <svg width="780" height="480" viewBox="0 0 780 480"><defs><linearGradient id="ga" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#16c784" stop-opacity="0.35"/><stop offset="1" stop-color="#16c784" stop-opacity="0"/></linearGradient></defs></svg>
        <div id="src">Datos reales: CoinGecko · 13 ago – 11 nov 2026</div>`, "card", "", null);
      ch.id = "chart";
      const CS = ch.querySelector("svg");
      for (let i = 0; i < 5; i++) sv("line", { x1: 0, x2: 780, y1: 40 + i * 100, y2: 40 + i * 100, stroke: "rgba(255,255,255,0.06)", "stroke-width": 2 }, CS);
      ["13 ago", "13 sep", "13 oct", "11 nov"].forEach((l, i) => { const t = sv("text", { x: 10 + i * 248, y: 474, fill: "#6b7280", "font-size": 20, "font-weight": 700, "font-family": "Inter" }, CS); t.textContent = l; });
      const mn = Math.min(...SERIES), mx = Math.max(...SERIES), N = SERIES.length;
      const PX = (i) => (i / (N - 1)) * 770, PY = (v) => 420 - ((v - mn) / (mx - mn)) * 370;
      const area = sv("path", { d: "", fill: "url(#ga)" }, CS), line = sv("path", { d: "", fill: "none", stroke: "#16c784", "stroke-width": 5, "stroke-linejoin": "round" }, CS);
      const dot = sv("circle", { r: 10, fill: "#16c784", opacity: 0 }, CS);
      const iMin = SERIES.indexOf(mn), iMax = SERIES.indexOf(mx);
      const lowM = sv("g", { opacity: 0 }, CS);
      sv("circle", { cx: PX(iMin), cy: PY(mn), r: 16, fill: "none", stroke: "#e5484d", "stroke-width": 4 }, lowM);
      const lt = sv("text", { x: PX(iMin) + 24, y: PY(mn) + 8, fill: "#ff8d90", "font-size": 22, "font-weight": 900, "font-family": "Inter" }, lowM); lt.textContent = "MÍNIMO 0,00000257 $";
      tl.fromTo(ch, { opacity: 0, x: -60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 11.5);
      const pr = { k: 0 };
      tl.set(dot, { opacity: 1 }, 11.9);
      tl.to(pr, { k: 1, duration: 2.4, ease: "power1.inOut", onUpdate: () => {
        const m = Math.max(1, Math.round(pr.k * (N - 1)));
        let d = `M0 ${PY(SERIES[0])}`; for (let i = 1; i <= m; i++) d += ` L${PX(i)} ${PY(SERIES[i])}`;
        line.setAttribute("d", d); area.setAttribute("d", d + ` L${PX(m)} 440 L0 440 Z`);
        dot.setAttribute("cx", PX(m)); dot.setAttribute("cy", PY(SERIES[m]));
        const v = SERIES[Math.min(m, iMax)] < mn ? mn : Math.max(mn, SERIES[m]);
        $("#price").textContent = fmtP(m <= iMin ? mn : v);
      } }, 11.9);
      tl.to(lowM, { opacity: 1, duration: 0.2 }, 12.2);
      tl.fromTo("#x2", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, 12.66);
      tl.to("#chg", { opacity: 1, duration: 0.3 }, 13.3);
      tl.to(ch, { opacity: 0, x: -50, duration: 0.3, ease: "power2.in" }, 14.85);

      // ---------- 15 - 20.5: everyone only looks at the falls ----------
      tl.to("#bottomShade", { opacity: 1, duration: 0.3 }, 16.2);
      kw(`<span class="serif">muchos solo miran</span><b style="color:#ff7a7e">LAS CAÍDAS ▼</b>`, 16.34, 18.2);
      kw(`<b class="box">LO QUE TIENES QUE SABER</b>`, 18.52, 20.5);
      tl.to("#bottomShade", { opacity: 0, duration: 0.3 }, 20.5);

      // ---------- 20.9 - 31.4: three things (cards right) ----------
      const F = [["🐋", "Grandes carteras", "retirando PEPE de los exchanges", 20.86], ["🔁", "Un viejo conocido", "ha vuelto a comprar PEPE", 23.96], ["📄", "Un ETF de PEPE", "una gestora sigue trabajando en él", 27.26]];
      const facts = F.map(([ic, b, s, t], i) => { const e = mk(`<div class="ic">${ic}</div><div><b>${b}</b><span>${s}</span></div><div class="n">0${i + 1}</div>`, "card fact", ""); e.id = "f" + (i + 1);
        tl.fromTo(e, { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 0.45, ease: "expo.out" }, t); return e; });
      // whale: coins leaving the exchange
      for (let k = 0; k < 4; k++) {
        const c = mk(`<img src="assets/logos/pepe.png" style="width:44px;height:44px;border-radius:50%">`, "ov", `left:${1240}px;top:${200}px;`);
        tl.fromTo(c, { opacity: 0, x: 0 }, { opacity: 1, x: 520, duration: 1.0, ease: "power1.inOut" }, 21.8 + k * 0.3);
        tl.to(c, { opacity: 0, duration: 0.2 }, 22.6 + k * 0.3);
      }
      tl.to(facts[0], { borderColor: "rgba(201,165,76,0.8)", duration: 0.2, yoyo: true, repeat: 1 }, 22.3);
      tl.to(facts[2], { boxShadow: "0 0 60px rgba(201,165,76,0.45)", duration: 0.3 }, 30.22);
      tl.to(facts, { opacity: 0, x: 60, duration: 0.3, stagger: 0.05 }, 31.3);

      // ---------- 31.8 - 36.7: our YouTube channel (real videos, real dates) ----------
      const yt = mk(`<div id="ytStage"><div id="ytScreen">
          <div class="ytbar"><div class="logo"><i></i>YouTube</div><div class="search">pepe</div></div>
          <div class="ych"><img src="assets/perfil.png"><div><b>Unai Ortega · TheCryptons</b><span>@TheCryptons · búsqueda "pepe" · solo vídeos completos</span></div><div class="sub">Suscribirse</div></div>
          <div id="ytGrid"></div></div></div>
        <div id="ytTag"><span>🐸 AQUÍ YA HABLÁBAMOS DE PEPE HACE 3 AÑOS</span></div>`, "", "", null);
      yt.id = "yt";
      const G = $("#ytGrid");
      const cells = VIDS.map(([id, title, dur, views, ago]) => {
        const v = document.createElement("div"); v.className = "vid";
        v.innerHTML = `<div class="th"><img src="assets/yt/${id}.jpg"><em>${dur}</em></div><h4>${title}</h4><p>${views} visualizaciones · <span>${ago}</span></p>`;
        G.appendChild(v); return v;
      });
      tl.to(yt, { opacity: 1, duration: 0.35 }, 31.8);
      tl.fromTo("#ytScreen", { rotationX: 28, y: 140, scale: 0.86 }, { rotationX: 14, y: 0, scale: 0.9, duration: 1.0, ease: "power3.out" }, 31.8);
      cells.forEach((c, i) => tl.fromTo(c, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, 32.0 + i * 0.06));
      // highlight the dates, oldest first
      cells.forEach((c, i) => {
        const sp = c.querySelector("p span");
        tl.to(sp, { backgroundColor: "#f0d488", color: "#1a1408", duration: 0.15 }, 32.6 + i * 0.1);
      });
      tl.to("#ytScreen", { rotationX: 0, scale: 1.25, y: -70, x: 240, duration: 1.0, ease: "power2.inOut" }, 33.9);
      tl.to(cells[0], { boxShadow: "0 0 0 6px #f0d488, 0 0 60px rgba(240,212,136,0.7)", borderRadius: "16px", duration: 0.3 }, 34.14);
      tl.fromTo("#ytTag", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, 34.3);
      tl.to(yt, { opacity: 0, duration: 0.35 }, 36.65);

      // ---------- 36.8 - 44: houses, cars, trips (glass, camera still) + congrats ----------
      const LIFE = [["🏠", "CASAS", 36.86, "left:150px;top:220px"], ["🚗", "COCHES", 37.48, "left:1400px;top:240px"], ["✈️", "VIAJES", 38.48, "left:200px;top:560px"]];
      const life = LIFE.map(([ic, n, t, pos]) => { const e = mk(`<span style="font-size:80px">${ic}</span><b style="font-size:44px;font-weight:900">${n}</b>`, "glass coinchip ov", pos + ";gap:18px;padding:18px 34px;");
        tl.fromTo(e, { opacity: 0, scale: 0.6, y: 30 }, { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "back.out(2)" }, t); return e; });
      const frog = mk(`<img src="assets/logos/pepe.png" style="width:120px;height:120px;border-radius:50%"><b style="font-size:40px;font-weight:900">gracias a la ranita</b>`, "glass coinchip ov", "left:1290px;top:600px;gap:20px;");
      pop(frog, 39.4);
      tl.to([...life, frog], { opacity: 0, duration: 0.3 }, 40.6);
      tl.to("#bottomShade", { opacity: 1, duration: 0.3 }, 40.7);
      kw(`<b class="box">🎉 ENHORABUENA</b>`, 41.64, 42.6);
      kw(`<span class="serif">y gracias por</span><br><b>CONFIAR EN NOSOTROS</b>`, 42.6, 44.3, 780);
      tl.to("#bottomShade", { opacity: 0, duration: 0.3 }, 44.3);

      // ---------- 44.4 - 49: subscribe + bell ----------
      const sb = mk(`<img src="assets/perfil.png"><div class="nm"><b>TheCryptons</b><span>Unai Ortega · YouTube</span></div>
        <div id="subBtn">SUSCRIBIRSE<div class="on">✓ Suscrito</div></div><div id="bell">🔔</div>`, "glass", "", null);
      sb.id = "subBox";
      const tap = mk(`<svg viewBox="0 0 24 24" width="70" height="70"><path d="M3 2l17 9.5-7.4 1.6L9.4 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>`, "", "", null); tap.id = "tap";
      tl.fromTo(sb, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "back.out(1.8)" }, 44.6);
      const SBX = 1160, SBY = 852, BLX = 1372;
      tl.fromTo(tap, { opacity: 0, x: SBX + 200, y: SBY + 200 }, { opacity: 1, x: SBX, y: SBY, duration: 0.5, ease: "power2.inOut" }, 45.4);
      tl.to(tap, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 }, 46.24);
      tl.to("#subBtn", { scale: 0.92, duration: 0.08, yoyo: true, repeat: 1 }, 46.24);
      tl.to("#subBtn .on", { opacity: 1, duration: 0.1 }, 46.32);
      tl.to("#subBtn", { backgroundColor: "rgba(255,255,255,0.12)", duration: 0.1 }, 46.32);
      tl.to(tap, { x: BLX, duration: 0.35, ease: "power2.inOut" }, 47.3);
      tl.to(tap, { scale: 0.82, duration: 0.08, yoyo: true, repeat: 1 }, 47.94);
      tl.to("#bell", { rotation: 18, duration: 0.08, yoyo: true, repeat: 5, ease: "sine.inOut" }, 48.0);
      tl.to("#bell", { backgroundColor: "#f0d488", duration: 0.15 }, 48.0);
      tl.to([sb, tap], { opacity: 0, duration: 0.3 }, 48.9);

      // ---------- 49 - 53.6: the next memecoin ----------
      tl.to("#bottomShade", { opacity: 1, duration: 0.3 }, 49.2);
      kw(`<span class="serif">la próxima</span><b>MEMECOIN</b>`, 50.14, 51.3);
      kw(`<span class="serif">la próxima</span><b class="box">🐸 PEPE</b><b style="font-size:96px;color:#f0d488"> ?</b>`, 51.62, 53.6);
