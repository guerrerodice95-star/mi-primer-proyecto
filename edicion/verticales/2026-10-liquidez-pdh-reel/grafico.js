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
      const W1 = 30;
      const hline = (P, x1, x2, y, col, dash, w) => el("line", { x1, x2, y1: y, y2: y, stroke: col, "stroke-width": w || 4, "stroke-dasharray": dash || "none", opacity: 0 }, P);
      const tagL = (P, x, y, txt, bg, fg) => pill(P, x, y, txt, bg, fg, "start", 24);

      // ---------- S1+S2 (0 - 17.6): the breakout trap ----------
      const T = grp("trap");
      const XT = (i) => 80 + i * 50;
      const TD = [[470, 430, 420, 485], [430, 455, 425, 470], [455, 400, 390, 462], [400, 380, 365, 410], [380, 410, 372, 420], [410, 360, 350, 415],
        [360, 330, 315, 368], [330, 345, 322, 360], [345, 305, 295, 352], [305, 285, 272, 312], [285, 300, 278, 310], [300, 268, 258, 305],
        [268, 262, 255, 280], [262, 225, 215, 268], [225, 292, 150, 230], [292, 345, 285, 352], [345, 392, 335, 402], [392, 380, 372, 410]];
      const PDH1 = 250;
      const tc = TD.map((c, i) => candle(T, XT(i), c, W1));
      const tLine = hline(T, 40, 1000, PDH1, GOLD, "14 10");
      const tLbl = tagL(T, 50, PDH1 - 16, "MÁXIMO DE AYER", "#1d1910", GOLD);
      const tBuy = pill(T, XT(13), 225 + 70, "BUY", GREEN, "#fff", "middle", 26);
      const tBuyR = ring(T, XT(13), 225, 30, 26, GREEN);
      const tLiq = pill(T, 1000, 560, "TÚ ERES LA LIQUIDEZ", RED, "#fff", "end", 30);
      const tArr = arrow(T, XT(14) + 40, 170, XT(16) + 30, 380, RED, 50);
      // stops of the sellers above the high
      const stopZone = el("rect", { x: XT(6), y: 165, width: 1000 - XT(6), height: 60, rx: 10, fill: "rgba(229,72,77,0.14)", stroke: "rgba(229,72,77,0.6)", "stroke-width": 2, opacity: 0 }, T);
      const stopLbl = pill(T, 1000, 150, "STOP LOSS DE VENDEDORES", "#1d1910", "#ff8d90", "end", 24);
      const stops = [7, 8.5, 10, 11.5, 13, 14.5, 16].map((k) => { const g = el("g", { opacity: 0 }, T); el("circle", { cx: XT(k), cy: 195, r: 15, fill: RED }, g); el("text", { x: XT(k), y: 203, "text-anchor": "middle", "font-size": 18, "font-weight": 900, fill: "#fff", "font-family": "Inter" }, g, "S"); return g; });
      const wickR = ring(T, XT(14), 165, 36, 34, GOLD);
      const wickP = pill(T, XT(14), 110, "COMPRASTE EN LA MECHA", GOLD, "#1a1408", "middle", 24);

      tl.set("#chartWrap", { opacity: 1 }, 0);
      tl.set(T, { opacity: 1 }, 0);
      tc.slice(0, 13).forEach((c, i) => show(c, 0.05 + i * 0.07, 0.12));
      show(tLine, 1.0); show(tLbl, 1.98);
      show(tc[13], 1.24, 0.15); show(tBuy, 1.5); drawRing(tBuyR, 1.5, 0.4);
      show(tc[14], 2.6, 0.2); show(tArr, 3.0);
      show(tc[15], 3.2, 0.15); show(tc[16], 3.5, 0.15);
      show(tLiq, 3.78);
      // rewind: explain why
      hide([tc[13], tc[14], tc[15], tc[16], tBuy, tBuyR, tLiq, tArr], 7.3);
      show(stopZone, 8.8, 0.4);
      stops.forEach((s, i) => show(s, 9.3 + i * 0.12, 0.15));
      show(stopLbl, 10.4);
      show(tc[13], 11.9, 0.2);
      tl.set(tc[14], { opacity: 1 }, 12.36);
      stops.slice(3).forEach((s, i) => tl.to(s, { opacity: 0, scale: 1.8, svgOrigin: `${XT([11.5, 13, 14.5, 16][i])} 195`, duration: 0.25 }, 13.12 + i * 0.08));
      show(tc[15], 13.96, 0.15); show(tc[16], 14.3, 0.15); show(tc[17], 14.6, 0.15);
      show(tArr, 14.0);
      show(tBuy, 15.2); tl.set(tBuy, { attr: { transform: "translate(52 -125)" } }, 15.2);
      hide(stopLbl, 16.0); drawRing(wickR, 16.18, 0.45); show(wickP, 16.8);
      hide(T, 17.5);

      // ---------- S4-S8 (20.5 - 52.3): PDH/PDL, ruptura vs barrido, entry ----------
      const D = grp("day");
      const XD = (i) => 70 + i * 40;
      const W2 = 26;
      const YD = [[400, 320, 300, 410], [320, 250, 230, 330], [250, 200, 180, 260], [200, 240, 150, 250], [240, 330, 235, 340], [330, 420, 320, 430],
        [420, 500, 410, 520], [500, 470, 465, 560], [470, 430, 425, 480]];
      const TODAY = [[430, 450, 420, 470], [450, 390, 380, 458], [390, 360, 345, 400], [360, 380, 350, 392], [380, 300, 290, 385], [300, 260, 248, 310],
        [260, 275, 245, 285], [275, 205, 195, 280]];
      const PDH = 150, PDL = 560;
      const yc = YD.map((c, i) => candle(D, XD(i), c, W2));
      const sep = el("line", { x1: XD(8.5), x2: XD(8.5), y1: 40, y2: 640, stroke: "rgba(243,227,181,0.3)", "stroke-width": 2, "stroke-dasharray": "6 8", opacity: 0 }, D);
      const lblAyer = el("text", { x: XD(4), y: 640, "text-anchor": "middle", "font-size": 26, "font-weight": 900, fill: CREAM, opacity: 0, "font-family": "Inter", "letter-spacing": 3 }, D, "AYER");
      const lblHoy = el("text", { x: XD(13), y: 640, "text-anchor": "middle", "font-size": 26, "font-weight": 900, fill: CREAM, opacity: 0, "font-family": "Inter", "letter-spacing": 3 }, D, "HOY");
      const dc = TODAY.map((c, i) => candle(D, XD(9 + i), c, W2));
      const pdh = hline(D, XD(3), 1000, PDH, GOLD, "14 10");
      const pdhR = ring(D, XD(3), PDH, 26, 22, GOLD);
      const pdhL = pill(D, XD(8.8), PDH - 16, "PDH · MÁXIMO DE AYER", GOLD, "#1a1408", "start", 22);
      const pdl = hline(D, XD(7), 1000, PDL, "#7ff0b5", "14 10");
      const pdlR = ring(D, XD(7), PDL, 26, 22, GREEN);
      const pdlL = pill(D, 1000, PDL + 40, "PDL · MÍNIMO DE AYER", "#2fb57a", "#fff", "end", 22);
      // the candle that pierces the high
      const ruptura = candle(D, XD(17), [205, 115, 98, 212], W2);
      const barrido = candle(D, XD(17), [178, 205, 95, 212], W2);
      const pierceR = ring(D, XD(17), 160, 34, 74, GOLD);
      const rupP = pill(D, XD(17) - 40, 75, "RUPTURA ✓", "#2fb57a", "#fff", "end", 24);
      const barP = pill(D, XD(17) - 40, 75, "BARRIDO", RED, "#fff", "end", 24);
      const bodyArrow = arrow(D, XD(17) + 50, 120, XD(17) + 50, 195, RED);
      // don't sell the wick
      const sellWick = pill(D, XD(17) + 34, 100, "SELL", RED, "#fff", "start", 22);
      const noX = el("g", { opacity: 0 }, D);
      el("line", { x1: XD(17) + 30, y1: 70, x2: XD(17) + 120, y2: 116, stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round" }, noX);
      el("line", { x1: XD(17) + 120, y1: 70, x2: XD(17) + 30, y2: 116, stroke: "#fff", "stroke-width": 7, "stroke-linecap": "round" }, noX);
      const lowLine = hline(D, XD(17) - 20, 1000, 212, CREAM, "8 8", 3);
      const conf = candle(D, XD(18), [200, 252, 194, 258], W2);
      const confR = ring(D, XD(18), 252, 26, 20, RED);
      const confP = pill(D, XD(18) + 26, 300, "CIERRA DEBAJO", RED, "#fff", "start", 22);
      // trade plan
      const sellP = pill(D, XD(18) - 20, 252 + 10, "SELL", RED, "#fff", "end", 24);
      const slZone = el("rect", { x: XD(18), y: 82, width: 1000 - XD(18), height: 170, fill: "rgba(229,72,77,0.18)", stroke: "rgba(229,72,77,0.7)", "stroke-width": 2, opacity: 0 }, D);
      const slP = pill(D, 1000, 110, "STOP LOSS", RED, "#fff", "end", 22);
      const tpZone = el("rect", { x: XD(18), y: 252, width: 1000 - XD(18), height: PDL - 252, fill: "rgba(63,191,127,0.16)", stroke: "rgba(63,191,127,0.7)", "stroke-width": 2, opacity: 0 }, D);
      const tpP = pill(D, 1000, 520, "OBJETIVO = PDL", "#2fb57a", "#fff", "end", 22);
      const fall = [[252, 330, 245, 340], [330, 300, 290, 345], [300, 420, 295, 430], [420, 552, 410, 562]].map((c, i) => candle(D, XD(19 + i), c, W2));
      const liqP = pill(D, XD(16), 600, "LIQUIDEZ DEL OTRO LADO", "#1d1910", "#7ff0b5", "end", 22);
      const stamp = el("g", { opacity: 0 }, D);
      el("rect", { x: 420, y: 380, width: 420, height: 100, rx: 18, fill: "rgba(11,10,8,0.9)", stroke: RED, "stroke-width": 6, transform: "rotate(-6 630 430)" }, stamp);
      el("text", { x: 630, y: 448, "text-anchor": "middle", "font-size": 54, "font-weight": 900, fill: RED, "font-family": "Inter", transform: "rotate(-6 630 430)" }, stamp, "NO HAY TRADE");

      tl.set(D, { opacity: 1 }, 20.5);
      yc.forEach((c, i) => show(c, 20.6 + i * 0.08, 0.12));
      show(sep, 20.9); show(lblAyer, 21.0); show(lblHoy, 21.0);
      drawRing(pdhR, 21.84, 0.4); show(pdh, 21.9); show(pdhL, 22.1);
      drawRing(pdlR, 22.6, 0.4); show(pdl, 22.65); show(pdlL, 22.85);
      dc.forEach((c, i) => show(c, 23.5 + i * 0.12, 0.12));
      show(ruptura, 25.98, 0.2);
      drawRing(pierceR, 24.9, 0.45);
      show(rupP, 27.66);
      hide([ruptura, rupP], 29.3, 0.25);
      show(barrido, 29.5, 0.2);
      show(bodyArrow, 31.4);
      show(barP, 32.38);
      hide([pierceR, bodyArrow], 33.6);
      show(sellWick, 34.46); show(noX, 34.92, 0.2);
      hide([sellWick, noX], 36.1);
      show(lowLine, 37.5);
      show(conf, 37.7, 0.2); drawRing(confR, 37.96, 0.4); show(confP, 38.22);
      hide([confR, confP], 39.9);
      show(sellP, 40.18);
      tl.to(slZone, { opacity: 1, duration: 0.35 }, 41.5); show(slP, 41.74);
      tl.to(tpZone, { opacity: 1, duration: 0.35 }, 43.88); show(tpP, 44.3);
      drawRing(pdlR, 45.6, 0.01); tl.fromTo(pdlR, { attr: { "stroke-dashoffset": 1000 } }, { attr: { "stroke-dashoffset": 0 }, duration: 0.45 }, 45.68);
      show(liqP, 46.44);
      fall.forEach((c, i) => show(c, 46.7 + i * 0.3, 0.15));
      // if the body closes above: no trade
      hide([slZone, slP, tpZone, tpP, sellP, liqP, conf, lowLine, barrido, barP, ...fall], 48.3, 0.3);
      show(ruptura, 49.8, 0.2); drawRing(pierceR, 49.85, 0.01); tl.set(pierceR, { opacity: 1 }, 49.85);
      tl.fromTo(pierceR, { attr: { "stroke-dashoffset": 1000 } }, { attr: { "stroke-dashoffset": 0 }, duration: 0.45 }, 49.9);
      tl.fromTo(stamp, { opacity: 0, scale: 1.4, svgOrigin: "630 430" }, { opacity: 1, scale: 1, svgOrigin: "630 430", duration: 0.3, ease: "back.out(2)" }, 51.78);
