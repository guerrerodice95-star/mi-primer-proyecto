      // ================= FVG vs BAG chart =================
      const svg = $("#chart");
      const GREEN = "#3fbf7f", RED = "#e5484d", GOLD = "#f0d488", CREAM = "#f3e3b5";
      function el(tag, attrs, parent, text) {
        const e = document.createElementNS(NS, tag);
        for (const k in attrs) e.setAttribute(k, attrs[k]);
        if (text !== undefined) e.textContent = text;
        (parent || svg).appendChild(e); return e;
      }
      const grp = (id, parent) => el("g", { id, opacity: 0 }, parent);
      const V = (y) => y;
      // candle from [open, close, high, low] in svg y pixels (smaller = higher)
      function candle(P, x, c, w) {
        const [o, cl, h, l] = c.map(V), col = cl < o ? GREEN : RED;
        const g = el("g", { opacity: 0 }, P);
        el("line", { x1: x, x2: x, y1: h, y2: l, stroke: col, "stroke-width": Math.max(3, w / 9), "stroke-linecap": "round" }, g);
        el("rect", { x: x - w / 2, y: Math.min(o, cl), width: w, height: Math.max(4, Math.abs(cl - o)), rx: 4, fill: col }, g);
        return g;
      }
      function ring(P, cx, cy, rx, ry, col) { return el("ellipse", { cx, cy: V(cy), rx, ry, fill: "none", stroke: col || GOLD, "stroke-width": 5, "stroke-dasharray": 1000, "stroke-dashoffset": 1000 }, P); }
      const drawRing = (r, t, d = 0.5) => tl.to(r, { attr: { "stroke-dashoffset": 0 }, duration: d, ease: "power2.out" }, t);
      function arrow(P, x1, y1, x2, y2, col, curve) {
        y1 = V(y1); y2 = V(y2);
        const g = el("g", { opacity: 0 }, P);
        const mx = curve ? (x1 + x2) / 2 + curve : (x1 + x2) / 2, my = curve ? (y1 + y2) / 2 : (y1 + y2) / 2;
        el("path", { d: `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, fill: "none", stroke: col, "stroke-width": 7, "stroke-linecap": "round" }, g);
        const a = Math.atan2(y2 - my, x2 - mx), L = 24;
        el("path", { d: `M${x2 - L * Math.cos(a - 0.5)} ${y2 - L * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - L * Math.cos(a + 0.5)} ${y2 - L * Math.sin(a + 0.5)}`, fill: "none", stroke: col, "stroke-width": 7, "stroke-linecap": "round", "stroke-linejoin": "round" }, g);
        return g;
      }
      function pill(P, x, y, txt, bg, fg, anchor, size) {
        const fs = size || 30, g = el("g", { opacity: 0 }, P), w = txt.length * fs * 0.62 + 40; y = V(y);
        const xx = anchor === "end" ? x - w : anchor === "middle" ? x - w / 2 : x;
        el("rect", { x: xx, y: y - fs - 6, width: w, height: fs + 22, rx: (fs + 22) / 2, fill: bg }, g);
        el("text", { x: xx + w / 2, y: y + 2, "text-anchor": "middle", "font-size": fs, "font-weight": 900, fill: fg, "font-family": "Inter" }, g, txt);
        return g;
      }
      function zone(P, x1, x2, y1, y2, label, col) {
        y1 = V(y1); y2 = V(y2);
        const g = el("g", { opacity: 0 }, P);
        el("rect", { x: x1, y: y1, width: x2 - x1, height: y2 - y1, rx: 8, fill: col.fill, stroke: col.line, "stroke-width": 3 }, g);
        el("text", { x: x2 - 24, y: (y1 + y2) / 2 + 13, "text-anchor": "end", "font-size": 38, "font-weight": 900, fill: col.text, "font-family": "Inter" }, g, label);
        return g;
      }
      const ZF = { fill: "rgba(240,212,136,0.20)", line: "rgba(240,212,136,0.75)", text: GOLD };
      const ZR = { fill: "rgba(229,72,77,0.20)", line: "rgba(229,72,77,0.8)", text: "#ff8d90" };
      const ZB = { fill: "rgba(63,191,127,0.18)", line: "rgba(63,191,127,0.75)", text: "#7ff0b5" };
      const show = (t, at, d = 0.3) => tl.to(t, { opacity: 1, duration: d }, at);
      const hide = (t, at, d = 0.3) => tl.to(t, { opacity: 0, duration: d }, at);

      // ================= overlays =================
      const mk = (parent, html, cls, style) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; $(parent).appendChild(d); return d; };
      const inOut = (e, tIn, tOut, from) => {
        tl.fromTo(e, Object.assign({ opacity: 0, y: 20, scale: 0.92 }, from || {}), { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, tIn);
        if (tOut != null) tl.to(e, { opacity: 0, duration: 0.25 }, tOut);
      };
      const SVGNS = "http://www.w3.org/2000/svg";
      const svgLayer = (parent) => { const s = document.createElementNS(SVGNS, "svg"); s.setAttribute("viewBox", "0 0 1080 1920"); s.setAttribute("width", 1080); s.setAttribute("height", 1920); s.style.cssText = "position:absolute;inset:0;overflow:visible"; $(parent).appendChild(s); return s; };
      const curveArrow = (S, x1, y1, x2, y2, col, bend) => {
        const g = el("g", { opacity: 0 }, S);
        const mx = (x1 + x2) / 2 + (bend || 0), my = (y1 + y2) / 2;
        const p = el("path", { d: `M${x1} ${y1} Q${mx} ${my} ${x2} ${y2}`, fill: "none", stroke: col, "stroke-width": 10, "stroke-linecap": "round", "stroke-dasharray": 900, "stroke-dashoffset": 900 }, g);
        const a = Math.atan2(y2 - my, x2 - mx), L = 34;
        const h = el("path", { d: `M${x2 - L * Math.cos(a - 0.5)} ${y2 - L * Math.sin(a - 0.5)} L${x2} ${y2} L${x2 - L * Math.cos(a + 0.5)} ${y2 - L * Math.sin(a + 0.5)}`, fill: "none", stroke: col, "stroke-width": 10, "stroke-linecap": "round", "stroke-linejoin": "round", opacity: 0 }, g);
        g.draw = (t) => { tl.set(g, { opacity: 1 }, t); tl.to(p, { attr: { "stroke-dashoffset": 0 }, duration: 0.35, ease: "power2.out" }, t); tl.to(h, { opacity: 1, duration: 0.1 }, t + 0.3); };
        return g;
      };

      // ---------- HOOK (0 - 7.05): the phone, arrows, the "error" on Alice ----------
      const HS = svgLayer("#hookfx");
      const mont = mk("#hookfx", "IMAGEN: MONTAJE", "ov", ""); mont.id = "montaje";
      tl.to(mont, { opacity: 1, duration: 0.3 }, 0.2);
      // phase 1: CEO and his wife
      const lCEO = mk("#hookfx", "JENSEN HUANG <small>CEO de NVIDIA</small>", "ov lbl gold", "left:60px;top:700px;");
      const aCEO = curveArrow(HS, 230, 790, 270, 875, "#f0d488", -60);
      inOut(lCEO, 0.32); aCEO.draw(0.45);
      const lWife = mk("#hookfx", "SU ESPOSA", "ov lbl dark", "left:660px;top:800px;");
      const aWife = curveArrow(HS, 780, 880, 600, 1000, "#f0d488", 60);
      inOut(lWife, 1.82); aWife.draw(1.95);
      tl.to([lCEO, lWife, aCEO, aWife], { opacity: 0, duration: 0.2 }, 2.55);
      // phase 2: unfolded -> Alice
      const tCEO = mk("#hookfx", "CEO", "ov lbl gold", "left:585px;top:745px;font-size:30px;padding:8px 16px;");
      const tWife = mk("#hookfx", "ESPOSA", "ov lbl dark", "left:760px;top:1210px;font-size:30px;padding:8px 16px;");
      inOut(tCEO, 4.35); inOut(tWife, 4.45);
      const aAl = curveArrow(HS, 300, 650, 370, 850, "#e5484d", -50);
      const err = mk("#hookfx", `<div class="tb">Error del sistema<span>✕</span></div>
        <div class="bd"><div class="ic">✕</div><div class="tx"><b>ALICE HUANG</b><br>Presunta espía del gobierno chino<em>según la inteligencia de EE. UU. (NYT)</em></div></div>
        <div class="bt"><div>Aceptar</div></div>`, "ov", "");
      err.id = "err";
      tl.fromTo(err, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.18, ease: "back.out(2.4)" }, 5.26);
      tl.to(err, { x: -14, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 5.45);
      aAl.draw(5.4);
      tl.to("#hook", { scale: 0.92, opacity: 0, duration: 0.3, ease: "power2.in" }, 6.8);
      tl.to("#hookfx", { opacity: 0, duration: 0.25 }, 6.8);

      // ---------- 7 - 9.3: "parece una película de Netflix… pero está pasando" ----------
      const bT = mk("#fx", "", "bar", "top:-170px"), bB = mk("#fx", "", "bar", "bottom:-170px");
      tl.to(bT, { y: 170, duration: 0.4, ease: "power2.out" }, 7.05); tl.to(bB, { y: -170, duration: 0.4, ease: "power2.out" }, 7.05);
      const film = mk("#fx", "🎬 PARECE UNA PELÍCULA…", "ov lbl dark", "top:1610px;");
      gsap.set(film, { xPercent: -50, left: 540 });
      tl.fromTo(film, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 7.3);
      tl.to([bT], { y: 0, duration: 0.35, ease: "power2.in" }, 8.6); tl.to([bB], { y: 0, duration: 0.35, ease: "power2.in" }, 8.6);
      tl.to(film, { opacity: 0, duration: 0.15 }, 8.55);
      const real = mk("#fx", "…PERO ES REAL", "ov lbl red", "top:1610px;");
      gsap.set(real, { xPercent: -50, left: 540 });
      tl.fromTo(real, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, 8.7);
      tl.to(real, { opacity: 0, duration: 0.2 }, 9.3);

      // ---------- 9.4 - 11.5: Nvidia stock falling ----------
      const nv = mk("#fx", `<svg viewBox="0 0 940 220" width="940" height="220" style="position:absolute;inset:0">
          <text x="40" y="78" font-size="52" font-weight="900" fill="#fff" font-family="Inter">NVDA</text>
          <text x="40" y="122" font-size="26" font-weight="700" fill="#8d826a" font-family="Inter">NVIDIA · acción</text>
          <path id="nvLine" d="M330 60 L380 70 L420 62 L470 92 L510 84 L560 120 L600 112 L650 150 L700 140 L760 176 L820 168 L880 196" fill="none" stroke="#e5484d" stroke-width="8" stroke-linejoin="round" stroke-linecap="round" stroke-dasharray="800" stroke-dashoffset="800"/>
          </svg>`, "ov card", "");
      inOut(nv, 9.4, 11.5);
      tl.to("#nvLine", { attr: { "stroke-dashoffset": 0 }, duration: 1.1, ease: "power1.in" }, 9.86);
      const dsp = mk("#fx", "▼ SE DESPLOMA", "ov lbl red", "left:660px;top:1700px;font-size:34px;");
      inOut(dsp, 10.76, 11.5);

      // ---------- 11.6 - 19: confidential information ----------
      const conf = mk("#fx", `<div style="position:absolute;left:40px;top:40px;font-size:110px;line-height:1">📁</div>
          <div style="position:absolute;left:190px;top:52px;font-size:34px;font-weight:800;color:#cfc3a6">Lo que preocupa a los inversores:</div>
          <div style="position:absolute;left:190px;top:104px;font-size:40px;font-weight:900;color:#fff">¿Se filtró información?</div>`, "ov card", "");
      inOut(conf, 13.2, 18.95);
      const stamp = mk("#fx", "CONFIDENCIAL", "ov", "left:735px;top:1672px;padding:4px 16px;border:6px solid #e5484d;border-radius:12px;color:#e5484d;font-size:34px;font-weight:900;letter-spacing:0.08em;background:rgba(11,10,8,0.85);");
      tl.fromTo(stamp, { opacity: 0, scale: 1.6, rotation: -14 }, { opacity: 1, scale: 1, rotation: -8, duration: 0.25, ease: "power3.in" }, 17.16);
      tl.to(stamp, { opacity: 0, duration: 0.2 }, 18.95);

      // ---------- 19.1 - 28.1: the New York Times, underlined while he reads it ----------
      toSplit(19.1);
      const nyt = mk("#fx", `<img src="assets/nyt.png"><svg viewBox="0 0 892 802" width="847" height="762"></svg>`, "ov", "");
      nyt.id = "nyt";
      const NS2 = nyt.querySelector("svg");
      const hl = (x1, x2, y1, y2, t, col) => {
        const r = el("rect", { x: x1 - 6, y: y1, width: x2 - x1 + 12, height: y2 - y1, rx: 6, fill: col || "#ffe14d", style: "mix-blend-mode:multiply" }, NS2);
        tl.set(r, { scaleX: 0, transformOrigin: "0% 50%" }, 0);
        tl.to(r, { scaleX: 1, duration: 0.45, ease: "power2.inOut" }, t);
      };
      inOut(nyt, 19.45, 28.0, { y: 40 });
      hl(431, 740, 440, 505, 20.64);            // "Relationship"
      hl(41, 475, 512, 576, 20.98);             // "With Chinese Spy"
      hl(534, 808, 700, 746, 22.84, "#ffb3b5"); // "U.S. officials had"
      hl(41, 178, 750, 796, 24.3, "#ffb3b5");   // "determined"
      hl(306, 836, 750, 796, 26.32);            // "working for Chinese intelligence"
      toFull(28.0);

      // ---------- 28.15 - 36.35: 3D chip (person hidden) ----------
      const s3 = mk("#fx", `<div id="floor"></div><div id="iaGlow">IA</div>
          <div id="stage"><div id="chip"><div class="face pcb"></div><div class="die"><b>NVIDIA</b><i>GPU · IA</i></div></div></div>
          <div class="flag" id="fUS"><span>🇺🇸</span><b>ESTADOS UNIDOS</b></div><div class="flag" id="fCN"><span>🇨🇳</span><b>CHINA</b></div><div id="vs">VS</div>
          <svg id="trace" viewBox="0 0 1080 1920" width="1080" height="1920" style="position:absolute;inset:0"></svg>`, "", "");
      s3.id = "s3d";
      // pins around the chip
      const chipEl = $("#chip");
      for (let i = 0; i < 9; i++) for (const side of ["t", "b", "l", "r"]) {
        const p = document.createElement("div"); p.className = "pin";
        const o = 48 + i * 38;
        if (side === "t") p.style.cssText = `left:${o}px;top:-18px;width:14px;height:22px`;
        if (side === "b") p.style.cssText = `left:${o}px;bottom:-18px;width:14px;height:22px`;
        if (side === "l") p.style.cssText = `top:${o}px;left:-18px;width:22px;height:14px`;
        if (side === "r") p.style.cssText = `top:${o}px;right:-18px;width:22px;height:14px`;
        chipEl.appendChild(p);
      }
      gsap.set("#floor", { rotationX: 72 });
      tl.to("#s3d", { opacity: 1, duration: 0.35 }, 28.15);
      tl.fromTo("#chip", { rotationX: 70, rotationZ: -40, z: -900, opacity: 0 }, { rotationX: 52, rotationZ: 18, z: 0, opacity: 1, duration: 1.3, ease: "power3.out" }, 29.4);
      tl.to("#chip", { rotationZ: 48, duration: 4.6, ease: "none" }, 30.7);
      tl.fromTo("#floor", { backgroundPositionY: "0px" }, { backgroundPositionY: "540px", duration: 8.2, ease: "none" }, 28.15);
      // circuit traces light up on "impulsan la inteligencia artificial"
      const TR = $("#trace");
      [[540, 900, 140, 1300], [540, 900, 940, 1300], [540, 900, 320, 1500], [540, 900, 760, 1500], [540, 900, 540, 1560]].forEach(([x1, y1, x2, y2], i) => {
        const p = el("path", { d: `M${x1} ${y1} L${x1} ${y1 + 120} L${x2} ${y2 - 120} L${x2} ${y2}`, fill: "none", stroke: "#76b900", "stroke-width": 6, "stroke-dasharray": 1200, "stroke-dashoffset": 1200, opacity: 0.9 }, TR);
        const d = el("circle", { cx: x2, cy: y2, r: 12, fill: "#b8ff4a", opacity: 0 }, TR);
        tl.to(p, { attr: { "stroke-dashoffset": 0 }, duration: 0.7, ease: "power2.out" }, 31.38 + i * 0.08);
        tl.to(d, { opacity: 1, duration: 0.2 }, 31.95 + i * 0.08);
      });
      tl.fromTo("#iaGlow", { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(2)" }, 32.14);
      tl.to("#iaGlow", { opacity: 0, duration: 0.25 }, 33.4);
      // "un pulso de tú a tú entre Estados Unidos y China": tug of war
      tl.to(TR, { opacity: 0.25, duration: 0.3 }, 33.4);
      tl.fromTo("#fUS", { opacity: 0, x: -200 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 34.98);
      tl.fromTo("#fCN", { opacity: 0, x: 200 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out" }, 35.66);
      tl.fromTo("#vs", { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 33.7);
      tl.to("#chip", { x: -60, duration: 0.35, ease: "sine.inOut", yoyo: true, repeat: 1 }, 35.0);
      tl.to("#chip", { x: 60, duration: 0.3, ease: "sine.inOut", yoyo: true, repeat: 1 }, 35.68);
      tl.to("#s3d", { opacity: 0, duration: 0.3 }, 36.35);

      // ---------- 36.6 - 43.9: the board's investigation ----------
      const inv = mk("#fx", `<div style="position:absolute;left:40px;top:34px;font-size:30px;font-weight:800;color:#c9a54c;letter-spacing:0.12em">🔍 EL CONSEJO DE NVIDIA</div>
          <div style="position:absolute;left:40px;top:84px;font-size:46px;font-weight:900;color:#fff">INVESTIGACIÓN INDEPENDIENTE</div>
          <div id="invOk" style="position:absolute;left:40px;top:150px;font-size:30px;font-weight:700;color:#7ff0b5;opacity:0">✓ Por ahora: sin motivos para creer que se filtrara información</div>`, "ov card", "");
      inOut(inv, 38.0, 43.95);
      tl.to("#invOk", { opacity: 1, duration: 0.3 }, 40.48);

      // ---------- 44 - 49.6: stock under pressure, security and leadership (real photo) ----------
      toSplit(43.95);
      const jh = mk("#fx", `<img src="assets/jensen.jpg">`, "ov", ""); jh.id = "jh";
      const jc = mk("#fx", "Jensen Huang · Foto: Wikimedia Commons", "ov", ""); jc.id = "jhCap";
      inOut(jh, 44.2, 49.55, { x: -40 }); tl.to(jc, { opacity: 1, duration: 0.3 }, 44.5); tl.to(jc, { opacity: 0, duration: 0.2 }, 49.55);
      const T4 = [["📉 ACCIÓN BAJO PRESIÓN", "red", 44.46, 1000], ["⚠️ INCERTIDUMBRE", "dark", 46.2, 1130], ["🔒 SEGURIDAD", "dark", 47.74, 1260], ["👔 LIDERAZGO", "dark", 48.36, 1390]];
      T4.forEach(([t, c, at, y]) => { const e = mk("#fx", t, "ov lbl " + c + " tagR", `top:${y}px;font-size:36px;`); inOut(e, at, 49.55, { x: 40 }); });
      toFull(49.7);

      // ---------- 50 - 56.9: how far did it go? ----------
      const q1 = mk("#fx", "¿HASTA DÓNDE LLEGÓ?", "ov lbl dark", "top:1610px;font-size:44px;");
      gsap.set(q1, { xPercent: -50, left: 540 });
      inOut(q1, 52.0, 54.3);
      const q2 = mk("#fx", "⚠️ ¿INFORMACIÓN PRIVILEGIADA EN RIESGO?", "ov lbl red", "top:1610px;font-size:38px;");
      gsap.set(q2, { xPercent: -50, left: 540 });
      inOut(q2, 54.46, 56.85);
