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

      // ================= marks on the CoinGlass table (svg in the recording's own pixels) =================
      const MK = $("#mk");
      const X = (c) => 159.9 + 100.71 * c, Y = (r) => 74.3 + 46.92 * r;   // c: 0=ene … 9=oct 10=nov 11=dic 12=año · r: 0=2026 … 16=2010 17=promedio
      const OCT = 9, NOV = 10, DIC = 11, PROM = 17;
      const box = (c, r, col, w, dash) => {
        const e = el("rect", { x: X(c) - 54, y: Y(r) - 27, width: 108, height: 54, rx: 12, fill: "none", stroke: col, "stroke-width": w || 6, opacity: 0 }, MK);
        if (dash) e.setAttribute("stroke-dasharray", dash);
        return e;
      };
      const colFrame = (c) => {
        const e = el("rect", { x: X(c) - 58, y: Y(0) - 32, width: 116, height: Y(PROM) - Y(0) + 64, rx: 14, fill: "rgba(240,212,136,0.06)", stroke: GOLD, "stroke-width": 5, "stroke-dasharray": 2600, "stroke-dashoffset": 2600 }, MK);
        return e;
      };
      const drawIn = (e, t, d = 0.6) => tl.to(e, { attr: { "stroke-dashoffset": 0 }, duration: d, ease: "power2.inOut" }, t);
      const popB = (e, t) => tl.fromTo(e, { opacity: 0, scale: 1.35, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.28, ease: "back.out(2)" }, t);
      const tag = (x, y, s, bg, fg, anchor, size) => pill(MK, x, y, s, bg, fg, anchor, size || 40);
      const fadeAll = (arr, t) => tl.to(arr, { opacity: 0, duration: 0.3 }, t);

      // ---------- "el peor octubre de los últimos 12 años, 7,32 % abajo" ----------
      // gentle zooms so the cells he names can be read
      const base = { scale: tbS, x: 0, y: 0 };
      tl.to("#tbIn", { scale: 0.88, x: -211, y: -44, duration: 0.7, ease: "power2.inOut" }, 1.6);
      tl.to("#tbIn", { ...base, duration: 0.6, ease: "power2.inOut" }, 7.0);
      tl.to("#tbIn", { scale: 1.3, x: -806, y: 0, duration: 0.6, ease: "power2.inOut" }, 19.4);
      tl.set("#tbIn", base, 22.6);
      const octF = colFrame(OCT);
      drawIn(octF, 1.72, 0.7);
      const REDS = [0, 1, 8, 12, 14, 15];
      const redB = REDS.map((r) => box(OCT, r, RED));
      redB.forEach((b, i) => popB(b, 2.04 + i * 0.13));
      // 12 years: bracket from 2014 up to 2026
      const brX = X(OCT) - 68;
      const br = el("path", { d: `M${brX + 14} ${Y(0)} L${brX} ${Y(0)} L${brX} ${Y(12)} L${brX + 14} ${Y(12)}`, fill: "none", stroke: GOLD, "stroke-width": 6, "stroke-linejoin": "round", "stroke-dasharray": 700, "stroke-dashoffset": 700 }, MK);
      drawIn(br, 3.44, 0.5);
      const yrs = tag(brX - 12, Y(6) + 14, "12 AÑOS", GOLD, "#1a1408", "end", 44);
      show(yrs, 3.6, 0.25);
      tl.to(redB[3], { attr: { stroke: GOLD, "stroke-width": 9 }, duration: 0.2 }, 3.44);
      const worst = tag(X(OCT) - 64, Y(0) + 14, "PEOR OCTUBRE DESDE 2014", RED, "#fff", "end", 38);
      tl.to(redB[0], { attr: { "stroke-width": 10 }, duration: 0.15, yoyo: true, repeat: 3 }, 4.48);
      show(worst, 4.5, 0.25);
      fadeAll([br, yrs, worst, ...redB.slice(1)], 7.0);

      // ---------- "históricamente siempre ha sido un mes positivo … media +24 %" ----------
      const GREENS = [2, 3, 4, 5, 6, 7, 9, 10, 11, 13, 16];
      const grB = GREENS.map((r) => box(OCT, r, "#7ff0b5", 5));
      grB.forEach((b, i) => popB(b, 8.56 + i * 0.09));
      const avgO = box(OCT, PROM, GOLD, 9);
      popB(avgO, 11.0);
      const avgT = tag(X(OCT) - 64, Y(PROM) - 4, "MEDIA +24 %", GOLD, "#1a1408", "end", 46);
      show(avgT, 11.9, 0.25);
      fadeAll([octF, redB[0], ...grB, avgO, avgT], 13.7);

      // ---------- "viene noviembre, el mejor mes del año" ----------
      const novF = colFrame(NOV);
      drawIn(novF, 14.86, 0.7);
      const avgN = box(NOV, PROM, GOLD, 9);
      popB(avgN, 15.78);
      const bestT = tag(X(NOV) - 64, Y(PROM) - 4, "EL MEJOR MES · +34,95 % DE MEDIA", GREEN, "#fff", "end", 42);
      show(bestT, 16.0, 0.25);
      fadeAll([avgN, bestT], 18.2);

      // ---------- "¿qué está ocurriendo? ¿estamos cayendo?" ----------
      const nowB = box(NOV, 0, RED, 9);
      popB(nowB, 19.8);
      const nowT = tag(X(NOV), Y(2) + 14, "AHORA: −1,55 % ▼", RED, "#fff", "middle", 40);
      show(nowT, 20.14, 0.25);
      fadeAll([novF, nowB, nowT], 21.7);

      // ---------- "de aquí a final de año… noviembre y diciembre alcistas… > 85.000 $" ----------
      // zoom into the top right of the table (jul … año, 2026 …)
      tl.to("#tbIn", { scale: 1.15, x: -593, y: 0, duration: 0.9, ease: "power2.inOut" }, 28.9);
      const endB = [box(NOV, 0, GOLD, 6, "14 10"), box(DIC, 0, GOLD, 6, "14 10")];
      endB.forEach((b, i) => popB(b, 29.68 + i * 0.15));
      const up = arrow(MK, X(10.5), Y(6), X(10.5), Y(1) + 6, GREEN);
      up.querySelectorAll("path").forEach((p) => p.setAttribute("stroke-width", 12));
      show(up, 32.72, 0.3);
      const ghost = (c, t) => {
        const g = el("g", { opacity: 0 }, MK);
        el("rect", { x: X(c) - 48, y: Y(0) - 21, width: 96, height: 42, rx: 8, fill: "#3fbf7f" }, g);
        el("text", { x: X(c), y: Y(0) + 11, "text-anchor": "middle", "font-size": 30, "font-weight": 900, fill: "#fff", "font-family": "Inter" }, g, "▲ ?");
        tl.fromTo(g, { opacity: 0, scale: 0.6, svgOrigin: `${X(c)} ${Y(0)}` }, { opacity: 1, scale: 1, svgOrigin: `${X(c)} ${Y(0)}`, duration: 0.3, ease: "back.out(2.5)" }, t);
        return g;
      };
      const gN = ghost(NOV, 34.84), gD = ghost(DIC, 35.72);
      tl.to([gN, gD], { scale: 1.12, svgOrigin: `${X(10.5)} ${Y(0)}`, duration: 0.18, yoyo: true, repeat: 1 }, 36.82);
      const alc = tag(968, Y(8.3), "DOS MESES ALCISTAS", GREEN, "#fff", "middle", 44);
      show(alc, 36.9, 0.25);
      const target = tag(968, Y(10.2), "OBJETIVO: > 85.000 $", GOLD, "#1a1408", "middle", 50);
      tl.fromTo(target, { opacity: 0, scale: 0.7, svgOrigin: `968 ${Y(10.2) - 20}` }, { opacity: 1, scale: 1, svgOrigin: `968 ${Y(10.2) - 20}`, duration: 0.3, ease: "back.out(2.4)" }, 40.14);
