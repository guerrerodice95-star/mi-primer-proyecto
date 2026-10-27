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
      const V = (y) => 440 + (y - 470) * 1.3;
      // candle from [open, close, high, low] in svg y pixels (smaller = higher)
      function candle(P, x, c, w) {
        const [o, cl, h, l] = c.map(V), col = cl < o ? GREEN : RED;
        const g = el("g", { opacity: 0 }, P);
        el("line", { x1: x, x2: x, y1: h, y2: l, stroke: col, "stroke-width": Math.max(3, w / 9), "stroke-linecap": "round" }, g);
        el("rect", { x: x - w / 2, y: Math.min(o, cl), width: w, height: Math.max(4, Math.abs(cl - o)), rx: 4, fill: col }, g);
        return g;
      }
      function ring(P, cx, cy, rx, ry, col) { return el("ellipse", { cx, cy: V(cy), rx, ry: ry * 1.3, fill: "none", stroke: col || GOLD, "stroke-width": 5, "stroke-dasharray": 1000, "stroke-dashoffset": 1000 }, P); }
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
      const ZB = { fill: "rgba(63,191,127,0.18)", line: "rgba(63,191,127,0.75)", text: "#7ff0b5" };
      const show = (t, at, d = 0.3) => tl.to(t, { opacity: 1, duration: d }, at);
      const hide = (t, at, d = 0.3) => tl.to(t, { opacity: 0, duration: d }, at);

      // base pattern: candle 1, big impulse 2, and the two possible 3rd candles
      const C1 = [600, 540, 520, 630], C2 = [540, 360, 345, 555];
      const C3F = [400, 375, 350, 470];   // FVG: closes inside candle 2 (below its close at 360)
      const C3B = [380, 290, 278, 470];   // BAG: closes above candle 2
      const X0 = 330, ST = 110, W = 70;
      const X = (i) => X0 + i * ST;

      // ---------- HOOK: FVG | BAG side by side ----------
      const H = grp("hook");
      el("line", { x1: 510, x2: 510, y1: 40, y2: 700, stroke: "rgba(240,212,136,0.35)", "stroke-width": 2, "stroke-dasharray": "6 8" }, H);
      function mini(P, ox, c3, z, label, sub) {
        const g = el("g", { transform: `translate(${ox} 30) scale(0.78)` }, P);
        const cs = [candle(g, 150, C1, 52), candle(g, 230, C2, 52), candle(g, 310, c3, 52)];
        const zz = zone(g, 120, 560, 470, 520, label, z);
        el("text", { x: 320, y: 70, "text-anchor": "middle", "font-size": 44, "font-weight": 900, fill: z.text, "font-family": "Inter" }, g, label);
        el("text", { x: 320, y: 112, "text-anchor": "middle", "font-size": 30, "font-weight": 700, fill: CREAM, "font-family": "Inter" }, g, sub);
        return { cs, zz, g };
      }
      const hF = mini(H, 20, C3F, ZF, "FVG", "Fair Value Gap");
      const hB = mini(H, 530, C3B, ZB, "BAG", "Breakaway Gap");
      const hNe = pill(H, 510, 380, "≠", "#1d1910", GOLD, "middle", 44);
      const hRetF = arrow(H, 290, 260, 230, 400, RED, -60);
      const hUpB = arrow(H, 820, 300, 900, 120, GREEN, 40);

      tl.fromTo("#chartWrap", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }, 0.0);
      tl.set(H, { opacity: 1 }, 0.0);
      [...hF.cs, ...hB.cs].forEach((c, i) => show(c, 0.1 + (i % 3) * 0.18 + (i > 2 ? 0.1 : 0), 0.15));
      show(hF.zz, 1.82); show(hB.zz, 2.94);
      show(hNe, 2.38, 0.25);
      show(hRetF, 3.76); show(hUpB, 4.0);
      hide(H, 4.62);

      // ---------- MAIN pattern (4.8 - 20.4) ----------
      const M = grp("main");
      const m1 = candle(M, X(0), C1, W), m2 = candle(M, X(1), C2, W);
      const m3f = candle(M, X(2), C3F, W), m3b = candle(M, X(2), C3B, W);
      const nums = [0, 1, 2].map((i) => {
        const g = el("g", { opacity: 0 }, M);
        el("circle", { cx: X(i), cy: 694, r: 24, fill: i === 2 ? GOLD : "#2a251a", stroke: GOLD, "stroke-width": 2 }, g);
        el("text", { x: X(i), y: 705, "text-anchor": "middle", "font-size": 28, "font-weight": 900, fill: i === 2 ? "#1a1408" : GOLD, "font-family": "Inter" }, g, String(i + 1));
        return g;
      });
      const ring3 = ring(M, X(2), 400, 62, 90, GOLD);
      // candle 2 range guide (its close)
      const c2close = el("line", { x1: X(1) - 40, x2: 980, y1: V(360), y2: V(360), stroke: CREAM, "stroke-width": 3, "stroke-dasharray": "10 8", opacity: 0 }, M);
      const c2lbl = pill(M, 980, 336, "CIERRE VELA 2", "#1d1910", CREAM, "end", 24);
      const ringInF = ring(M, X(2), 375, 58, 30, GOLD);
      const zoneF = zone(M, X(0) - 50, 980, 470, 520, "FVG", ZF);
      const fvgName = pill(M, 980, 452, "FAIR VALUE GAP", GOLD, "#1a1408", "end", 28);
      const ringAbB = ring(M, X(2), 300, 58, 34, GREEN);
      const upB = arrow(M, X(2) + 80, 340, X(2) + 80, 270, GREEN);
      const zoneB = zone(M, X(0) - 50, 980, 470, 520, "BAG", ZB);
      const bagName = pill(M, 980, 452, "BREAKAWAY GAP", "#2fb57a", "#fff", "end", 28);

      tl.set(M, { opacity: 1 }, 4.75);
      show(m1, 4.85, 0.2); show(m2, 5.15, 0.2);
      nums.forEach((n, i) => show(n, 5.0 + i * 0.25, 0.2));
      show(m3f, 6.88, 0.2);
      drawRing(ring3, 6.95);
      tl.to(ring3, { opacity: 0, duration: 0.3 }, 8.4);
      show(c2close, 8.62); show(c2lbl, 8.7);
      drawRing(ringInF, 8.86);
      show(zoneF, 10.72, 0.4);
      show(fvgName, 11.26);
      // F, V, G letters pulse on the label
      [12.38, 12.82, 13.28].forEach((t) => tl.fromTo(fvgName, { scale: 1 }, { scale: 1.08, svgOrigin: "830 410", duration: 0.12, yoyo: true, repeat: 1 }, t));
      hide([ringInF, zoneF, fvgName], 13.8);
      tl.to(m3f, { opacity: 0, duration: 0.25 }, 14.6);
      show(m3b, 14.98, 0.25);
      tl.set(ringAbB, { attr: { "stroke-dashoffset": 1000 } }, 15.0);
      drawRing(ringAbB, 15.88);
      show(upB, 15.95);
      show(zoneB, 18.74, 0.4);
      show(bagName, 19.28);
      hide(M, 20.3);

      // ---------- FVG continuation: retrace + retest + continuation (20.5 - 30) ----------
      const F = grp("fvgc");
      const fc = [C1, C2, C3F, [375, 412, 368, 420], [412, 455, 405, 478], [455, 432, 425, 505], [432, 362, 355, 440], [362, 300, 290, 368], [300, 318, 292, 325], [318, 238, 230, 322], [238, 168, 150, 245]];
      const XF = (i) => 140 + i * 80;
      const fcs = fc.map((c, i) => candle(F, XF(i), c, 50));
      const zF2 = zone(F, XF(0) - 40, 980, 470, 520, "FVG", ZF);
      const retA = arrow(F, XF(3), 330, XF(5), 450, RED, 30);
      const retP = pill(F, XF(4), 560, "RETROCESO", RED, "#fff", "middle", 26);
      const retestR = ring(F, XF(5), 492, 46, 34, GOLD);
      const retestP = pill(F, XF(5), 600, "RETEST", GOLD, "#1a1408", "middle", 26);
      const contA = arrow(F, XF(6) + 30, 420, XF(10) + 40, 130, GREEN, -40);
      const contP = pill(F, 60, 168, "CONTINUACIÓN ALCISTA ↑", "#1d1910", "#7ff0b5", "start", 28);
      tl.set(F, { opacity: 1 }, 20.45);
      fcs.slice(0, 3).forEach((c, i) => show(c, 20.5 + i * 0.12, 0.15));
      show(zF2, 20.94, 0.3);
      [3, 4].forEach((i, k) => show(fcs[i], 23.4 + k * 0.5, 0.2));
      show(retA, 24.3); show(retP, 24.54);
      show(fcs[5], 25.4, 0.2);
      drawRing(retestR, 25.66); show(retestP, 25.8);
      [6, 7, 8, 9, 10].forEach((i, k) => show(fcs[i], 28.0 + k * 0.3, 0.15));
      show(contA, 29.0); show(contP, 29.46);
      hide(F, 30.05);

      // ---------- BAG continuation: strong trend, no retrace (30.2 - 38.6) ----------
      const B = grp("bagc");
      const bc = [C1, C2, C3B, [290, 240, 228, 298], [240, 255, 232, 262], [255, 190, 180, 262], [190, 130, 118, 198], [130, 145, 122, 152], [145, 82, 70, 150], [82, 40, 28, 90]];
      const XB = (i) => 150 + i * 88;
      const CMP = (y) => 470 - (470 - y) * 0.72;
      const bcs = bc.map((c, i) => candle(B, XB(i), c.map(CMP), 54));
      const zB2 = zone(B, XB(0) - 40, 980, 470, CMP(520), "BAG", ZB);
      const strong = pill(B, 60, 168, "TENDENCIA FUERTE", "#2fb57a", "#fff", "start", 28);
      const upB2 = arrow(B, XB(3) + 30, CMP(300), XB(9) + 20, CMP(60), GREEN, -40);
      const ghostRet = el("path", { d: `M${XB(3)} ${V(CMP(280))} Q ${XB(4) + 40} ${V(CMP(420))} ${XB(5) + 20} ${V(470)}`, fill: "none", stroke: "rgba(229,72,77,0.8)", "stroke-width": 6, "stroke-dasharray": "12 10", opacity: 0 }, B);
      const noRet = el("g", { opacity: 0 }, B);
      el("line", { x1: XB(4) - 10, y1: V(CMP(360)), x2: XB(4) + 70, y2: V(CMP(440)), stroke: RED, "stroke-width": 9, "stroke-linecap": "round" }, noRet);
      el("line", { x1: XB(4) + 70, y1: V(CMP(360)), x2: XB(4) - 10, y2: V(CMP(440)), stroke: RED, "stroke-width": 9, "stroke-linecap": "round" }, noRet);
      const noRetP = pill(B, XB(5) + 30, 575, "SIN RETROCESO", RED, "#fff", "middle", 26);
      tl.set(B, { opacity: 1 }, 30.15);
      bcs.slice(0, 3).forEach((c, i) => show(c, 30.2 + i * 0.12, 0.15));
      show(zB2, 31.08, 0.3);
      show(strong, 33.66);
      [3, 4, 5, 6, 7, 8, 9].forEach((i, k) => show(bcs[i], 34.6 + k * 0.3, 0.15));
      show(upB2, 35.06);
      tl.to(ghostRet, { opacity: 1, duration: 0.3 }, 37.0);
      show(noRet, 37.35, 0.2); show(noRetP, 37.54);
      tl.to("#chartWrap", { opacity: 0, y: 30, duration: 0.3, ease: "power2.in" }, 38.45);
