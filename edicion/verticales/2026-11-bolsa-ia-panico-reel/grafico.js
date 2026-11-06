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

      // ================= scenes =================
      const hline = (P, x1, x2, y, col, dash, w) => el("line", { x1, x2, y1: y, y2: y, stroke: col, "stroke-width": w || 4, "stroke-dasharray": dash || "none", opacity: 0 }, P);
      const txt = (P, x, y, s, size, col, anchor, weight) => el("text", { x, y, "text-anchor": anchor || "middle", "font-size": size, "font-weight": weight || 900, fill: col, "font-family": "Inter", opacity: 0 }, P, s);
      const popIn = (e, t, o) => tl.fromTo(e, { opacity: 0, scale: 0.7, svgOrigin: o }, { opacity: 1, scale: 1, svgOrigin: o, duration: 0.3, ease: "back.out(2.4)" }, t);
      function path(n, y0, y1, noise, seed, curve) {
        const out = []; let prev = y0;
        for (let i = 0; i < n; i++) {
          const k = (i + 1) / n, base = y0 + (y1 - y0) * Math.pow(k, curve || 1);
          const c = i === n - 1 ? y1 : base + (rnd(seed + i) - 0.5) * noise;
          const o = prev, hi = Math.min(o, c) - 4 - rnd(seed + i + 50) * noise * 0.4, lo = Math.max(o, c) + 4 + rnd(seed + i + 90) * noise * 0.4;
          out.push([o, c, hi, lo]); prev = c;
        }
        return out;
      }
      tl.set("#chartWrap", { opacity: 1 }, 0);

      // ---------- S1 (0 - 9.3): yesterday's crash + 2,5 billones in seconds ----------
      const A = grp("crash");
      tl.set(A, { opacity: 1 }, 0);
      const aTag = pill(A, 40, 50, "AYER · WALL STREET", "#1d1910", CREAM, "start", 28);
      const aLive = el("g", { opacity: 0 }, A);
      el("circle", { cx: 958, cy: 38, r: 9, fill: RED }, aLive);
      el("text", { x: 940, y: 47, "text-anchor": "end", "font-size": 24, "font-weight": 900, fill: "#ff8d90", "font-family": "Inter" }, aLive, "EN DIRECTO");
      const AC = path(22, 130, 600, 40, 5, 1.25);
      const ac = AC.map((c, i) => candle(A, 66 + i * 42, c, 28));
      tl.set([aTag, aLive], { opacity: 1 }, 0);
      ac.forEach((c, i) => i < 9 ? tl.set(c, { opacity: 1 }, 0) : show(c, 0.08 + (i - 9) * 0.15, 0.1));
      tl.to(aLive, { opacity: 0.35, duration: 0.3, yoyo: true, repeat: 7, ease: "sine.inOut" }, 0.3);
      const aWorst = pill(A, 510, 660, "UNO DE LOS PEORES DÍAS DE SU HISTORIA", RED, "#fff", "middle", 32);
      popIn(aWorst, 2.38, "510 645");
      // 2,5 billones counter over the dimmed crash
      tl.to(ac, { opacity: 0.18, duration: 0.35 }, 4.5);
      hide(aWorst, 4.5, 0.25);
      const big = txt(A, 510, 330, "−0 $", 74, "#ff6b70");
      const bigSub = txt(A, 510, 400, "ESFUMADOS", 34, CREAM, "middle", 800);
      const bigTag = pill(A, 510, 480, "2,5 BILLONES DE DÓLARES", GOLD, "#1a1408", "middle", 34);
      show(big, 4.6, 0.2); show(bigSub, 4.7, 0.25);
      const cnt = { v: 0 };
      tl.to(cnt, { v: 2.5e12, duration: 2.4, ease: "power2.out", onUpdate: () => { big.textContent = "−" + fmt(cnt.v) + " $"; } }, 4.62);
      popIn(bigTag, 6.72, "510 465");
      // "en cuestión de segundos": stopwatch
      const sw = el("g", { opacity: 0 }, A);
      el("circle", { cx: 510, cy: 590, r: 46, fill: "none", stroke: "rgba(255,255,255,0.2)", "stroke-width": 8 }, sw);
      const swArc = el("circle", { cx: 510, cy: 590, r: 46, fill: "none", stroke: RED, "stroke-width": 8, "stroke-dasharray": 290, "stroke-dashoffset": 290, transform: "rotate(-90 510 590)" }, sw);
      el("rect", { x: 503, y: 530, width: 14, height: 12, rx: 3, fill: "rgba(255,255,255,0.6)" }, sw);
      const swT = txt(A, 600, 602, "EN SEGUNDOS", 36, "#fff", "start");
      show(sw, 8.2, 0.2); show(swT, 8.3, 0.25);
      tl.to(swArc, { attr: { "stroke-dashoffset": 0 }, duration: 0.8, ease: "power1.in" }, 8.25);
      tl.to(A, { opacity: 0, duration: 0.3 }, 9.25);

      // ---------- S2 (9.4 - 18.9): midterms -> regulate AI ----------
      const B = grp("ctx");
      tl.set(B, { opacity: 1 }, 9.4);
      const bHead = txt(B, 510, 70, "PARA PONEROS EN CONTEXTO", 28, "#8d826a", "middle", 800);
      show(bHead, 9.45, 0.3);
      const bEl = el("g", { opacity: 0 }, B);
      el("rect", { x: 60, y: 110, width: 900, height: 230, rx: 34, fill: "rgba(22,19,13,0.94)", stroke: "rgba(201,165,76,0.4)", "stroke-width": 2 }, bEl);
      el("text", { x: 510, y: 178, "text-anchor": "middle", "font-size": 34, "font-weight": 800, fill: GOLD, "font-family": "Inter", "letter-spacing": 4 }, bEl, "🇺🇸 ELECCIONES MIDTERM");
      const dem = el("g", { opacity: 0.0 }, B), rep = el("g", { opacity: 0.0 }, B);
      el("rect", { x: 110, y: 220, width: 380, height: 84, rx: 22, fill: "#1f4fbf" }, dem);
      el("text", { x: 300, y: 274, "text-anchor": "middle", "font-size": 36, "font-weight": 900, fill: "#fff", "font-family": "Inter" }, dem, "DEMÓCRATAS ✓");
      el("rect", { x: 530, y: 220, width: 380, height: 84, rx: 22, fill: "#7a1f24" }, rep);
      el("text", { x: 720, y: 274, "text-anchor": "middle", "font-size": 36, "font-weight": 900, fill: "#e8b4b6", "font-family": "Inter" }, rep, "REPUBLICANOS");
      tl.fromTo(bEl, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }, 11.0);
      show(rep, 11.6, 0.3); show(dem, 11.6, 0.3);
      tl.to(rep, { opacity: 0.35, duration: 0.3 }, 13.22);
      tl.fromTo(dem, { scale: 1 }, { scale: 1.08, svgOrigin: "300 262", duration: 0.2, yoyo: true, repeat: 1 }, 13.22);
      const ganan = pill(B, 300, 376, "GANAN", "#2b6cf0", "#fff", "middle", 28);
      popIn(ganan, 13.3, "300 362");
      // "todo lo relacionado con la IA hay que regularlo"
      const ia = el("g", { opacity: 0 }, B);
      el("rect", { x: 200, y: 420, width: 460, height: 160, rx: 34, fill: "rgba(240,212,136,0.12)", stroke: GOLD, "stroke-width": 3 }, ia);
      el("text", { x: 430, y: 525, "text-anchor": "middle", "font-size": 74, "font-weight": 900, fill: "#fff", "font-family": "Inter" }, ia, "🤖 IA");
      tl.fromTo(ia, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.6)" }, 15.1);
      const stamp = el("g", { opacity: 0 }, B);
      el("rect", { x: 500, y: 560, width: 440, height: 104, rx: 16, fill: "rgba(11,10,8,0.9)", stroke: RED, "stroke-width": 7, transform: "rotate(-7 720 612)" }, stamp);
      el("text", { x: 720, y: 634, "text-anchor": "middle", "font-size": 56, "font-weight": 900, fill: RED, "font-family": "Inter", transform: "rotate(-7 720 612)" }, stamp, "⚖️ REGULAR");
      tl.fromTo(stamp, { opacity: 0, scale: 1.5, svgOrigin: "720 612" }, { opacity: 1, scale: 1, svgOrigin: "720 612", duration: 0.25, ease: "power3.in" }, 17.46);
      tl.to(B, { opacity: 0, duration: 0.25 }, 18.75);

      // ---------- S3 (21.2 - 24.8): panic in the markets and in Bitcoin ----------
      const C = grp("mkts");
      tl.set(C, { opacity: 1 }, 21.2);
      const cHead = pill(C, 510, 70, "😱 PÁNICO", RED, "#fff", "middle", 40);
      popIn(cHead, 21.5, "510 55");
      const BARS = [["S&P 500", 0.62, 23.4], ["NASDAQ", 0.82, 23.55], ["BITCOIN", 0.72, 24.5]];
      BARS.forEach(([lab, w, t], i) => {
        const y = 170 + i * 150, g = el("g", { opacity: 0 }, C);
        el("text", { x: 60, y: y + 6, "font-size": 34, "font-weight": 900, fill: lab === "BITCOIN" ? "#f7b04a" : "#fff", "font-family": "Inter" }, g, lab);
        el("rect", { x: 60, y: y + 26, width: 900, height: 58, rx: 14, fill: "rgba(255,255,255,0.06)" }, g);
        const bar = el("rect", { x: 60, y: y + 26, width: 900 * w, height: 58, rx: 14, fill: RED }, g);
        const arr = el("text", { x: 60 + 900 * w + 14, y: y + 70, "font-size": 40, "font-weight": 900, fill: "#ff6b70", "font-family": "Inter", opacity: 0 }, g, "▼");
        tl.set(bar, { scaleX: 0, svgOrigin: `60 ${y + 55}` }, 0);
        show(g, t - 0.1, 0.2);
        tl.to(bar, { scaleX: 1, svgOrigin: `60 ${y + 55}`, duration: 0.9, ease: "power3.out" }, t);
        // jitter like a live feed
        tl.to(bar, { scaleX: 0.93, svgOrigin: `60 ${y + 55}`, duration: 0.25, yoyo: true, repeat: 3, ease: "sine.inOut" }, t + 0.9);
        show(arr, t + 0.6, 0.2);
      });
      tl.to(C, { opacity: 0, duration: 0.2 }, 24.75);

      // ---------- S4 (24.9 - 31.8): the tweet video (AI stocks drawdown) ----------
      const dTag = pill(svg, 510, 60, "🤖 PÁNICO CON LAS ACCIONES DE IA", "#1d1910", CREAM, "middle", 30);
      tl.fromTo("#twBox", { opacity: 0, y: 30, scale: 0.94 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "expo.out" }, 24.9);
      show(dTag, 25.3, 0.3);
      tl.to("#twSrc", { opacity: 1, duration: 0.3 }, 25.4);
      // zoom on "TOTAL VALUE WIPED OUT -$13.2T", then back to the table
      tl.to("#tweet", { scale: 2.05, transformOrigin: "97% 6%", duration: 0.9, ease: "power2.inOut" }, 27.9);
      tl.to("#tweet", { scale: 1, duration: 0.8, ease: "power2.inOut" }, 30.1);
      tl.to(["#twBox", "#twSrc"], { opacity: 0, duration: 0.25 }, 31.7);
      hide(dTag, 31.7, 0.25);

      // ---------- S5 (31.9 - 37.4): the biggest technological revolution ----------
      const E = grp("rev");
      tl.set(E, { opacity: 1 }, 31.9);
      const REV = [["Imprenta", 0.32], ["Electricidad", 0.5], ["Internet", 0.66], ["Smartphone", 0.6], ["IA", 1.0]];
      const base = 600, maxH = 430, bw = 150, gap = 36, x0 = (1020 - (REV.length * bw + (REV.length - 1) * gap)) / 2;
      REV.forEach(([lab, h], i) => {
        const x = x0 + i * (bw + gap), isIA = i === REV.length - 1;
        const r = el("rect", { x, y: base - maxH * h, width: bw, height: maxH * h, rx: 16, fill: isIA ? "url(#gGold)" : "rgba(255,255,255,0.14)" }, E);
        const l = txt(E, x + bw / 2, base + 46, lab, isIA ? 40 : 28, isIA ? GOLD : "#cfc3a6", "middle", isIA ? 900 : 800);
        tl.set(r, { scaleY: 0, svgOrigin: `${x + bw / 2} ${base}` }, 0);
        const t = isIA ? 34.48 : 32.2 + i * 0.45;
        tl.to(r, { scaleY: 1, svgOrigin: `${x + bw / 2} ${base}`, duration: isIA ? 0.9 : 0.5, ease: isIA ? "back.out(1.4)" : "power3.out" }, t);
        show(l, t, 0.25);
      });
      const defs = el("defs", {}, svg);
      const lg = el("linearGradient", { id: "gGold", x1: 0, y1: 0, x2: 0, y2: 1 }, defs);
      el("stop", { offset: 0, "stop-color": "#f0d488" }, lg); el("stop", { offset: 1, "stop-color": "#8a6d2a" }, lg);
      const revP = pill(E, 510, 128, "LA MAYOR REVOLUCIÓN TECNOLÓGICA", GOLD, "#1a1408", "middle", 36);
      popIn(revP, 35.16, "510 113");
      tl.to(E, { opacity: 0, duration: 0.25 }, 37.3);

      // ---------- S6 (37.4 - 39.7): "vamos a alejarnos" -> zoom out on the long term ----------
      const F = grp("zoomout");
      tl.set(F, { opacity: 1 }, 37.4);
      const fg = el("g", {}, F);
      const N = 90, pts = [];
      for (let i = 0; i < N; i++) {
        const k = i / (N - 1);
        let y = 600 - 470 * Math.pow(k, 1.7) + (rnd(i + 7) - 0.5) * 26;
        if (i >= N - 4) y += [0, 14, 32, 46][i - (N - 4)];           // today's dip
        pts.push([60 + k * 900, y]);
      }
      el("path", { d: "M" + pts.map((p) => p.join(" ")).join(" L"), fill: "none", stroke: GREEN, "stroke-width": 5, "stroke-linejoin": "round" }, fg);
      const last = pts[N - 1];
      el("circle", { cx: last[0], cy: last[1], r: 9, fill: RED }, fg);
      const hoy = txt(F, last[0] - 16, last[1] + 48, "HOY", 30, "#ff8d90", "end");
      // start zoomed into today's drop, then pull back
      tl.set(fg, { scale: 3, svgOrigin: `${last[0]} ${last[1]}`, x: 510 - last[0], y: 330 - last[1] }, 37.4);
      tl.to(fg, { scale: 1, x: 0, y: 0, duration: 1.3, ease: "power2.inOut" }, 38.06);
      show(hoy, 39.1, 0.25);
      const calm = pill(F, 510, 690, "ALÉJATE Y MANTÉN LA CALMA", GREEN, "#fff", "middle", 34);
      popIn(calm, 39.0, "510 675");
