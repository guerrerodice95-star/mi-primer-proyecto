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

      // ================= real S&P 500 charts (cropped from the reference reel, untouched) =================
      // each card: narrow (crash only) -> "X meses después" -> opens to the full chart, like the reference
      const wrap = $("#chartWrap"), CW = 960;
      const CARDS = [
        { src: "assets/card1.png", w: 830, h: 482, n0: 0.16, n1: 0.33, tin: 0.0, draw: 2.2, open: 2.56, out: 4.85 },
        { src: "assets/card2.png", w: 870, h: 441, n0: 0.12, n1: 0.26, tin: 5.0, draw: 2.4, open: 7.74, out: 10.3 },
        { src: "assets/card3.png", w: 732, h: 485, n0: 0.14, n1: 0.38, tin: 10.46, draw: 2.8, open: 13.72, out: 15.78 },
        { src: "assets/card4.png", w: 752, h: 502, n0: 0.14, n1: 0.33, tin: 15.92, draw: 3.4, open: 19.7, out: null },
      ];
      const clip = (f) => `inset(0% ${((1 - f) * 100).toFixed(2)}% 0% 0% round 16px)`;
      const cardEls = CARDS.map((c, i) => {
        const H = (CW * c.h) / c.w;
        const d = document.createElement("div");
        d.className = "rc";
        d.style.cssText = `position:absolute;left:30px;top:${30 + (590 - H) / 2}px;width:${CW}px;height:${H}px;opacity:0;`;
        d.innerHTML = `<img src="${c.src}" style="position:absolute;inset:0;width:100%;height:100%;border-radius:16px;box-shadow:0 24px 60px rgba(0,0,0,0.6)">`;
        wrap.insertBefore(d, svg);
        c.H = H; c.top = 30 + (590 - H) / 2;
        return d;
      });
      tl.set("#chartWrap", { opacity: 1 }, 0);
      CARDS.forEach((c, i) => {
        const d = cardEls[i];
        const P = { f: c.n0 }, upd = () => { d.style.clipPath = clip(P.f); };
        d.style.clipPath = clip(c.n0);
        if (i === 0) tl.set(d, { opacity: 1 }, 0);             // first frame: chart already on screen (hook)
        else tl.fromTo(d, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }, c.tin);
        tl.to(P, { f: c.n1, duration: c.draw, ease: "power1.inOut", onUpdate: upd }, c.tin + 0.05);   // the crash draws
        tl.to(P, { f: 1, duration: 1.2, ease: "power2.inOut", onUpdate: upd }, c.open);              // "X meses después"
        if (c.out) tl.to(d, { opacity: 0, duration: 0.2 }, c.out);
      });

      // ---------- "¿Ves el patrón?": the four together ----------
      const GQ = [[30, 30], [520, 30], [30, 340], [520, 340]], GS = 470 / CW;
      CARDS.forEach((c, i) => {
        const d = cardEls[i];
        tl.set(d, { opacity: 0, x: GQ[i][0] - 30, y: GQ[i][1] - c.top, scale: GS, transformOrigin: "0 0" }, 22.05);
        tl.to(d, { opacity: 1, duration: 0.3 }, 22.26 + i * 0.12);
      });
      const above = pill(svg, 510, 700, "TERMINA MÁS ARRIBA DE DONDE CAYÓ", GOLD, "#1a1408", "middle", 30);
      show(above, 26.4);

      // ---------- "los que vendieron en lo peor del COVID…" ----------
      cardEls.slice(1).forEach((d) => tl.to(d, { opacity: 0, duration: 0.25 }, 29.3));
      hide(above, 29.3, 0.25);
      const c0 = CARDS[0], k0 = CW / c0.w;
      tl.to(cardEls[0], { x: 0, y: 0, scale: 1, duration: 0.5, ease: "power2.inOut" }, 29.45);
      const LX = 30 + 227 * k0, LY = c0.top + 413 * k0;                      // the COVID low on the card
      const dim = document.createElement("div");
      dim.style.cssText = `position:absolute;top:0;bottom:0;left:${229 * k0}px;right:0;background:rgba(8,8,10,0.62);border-radius:0 16px 16px 0;opacity:0;`;
      cardEls[0].appendChild(dim);
      const soldR = ring(svg, LX, LY - 6, 30, 30, RED);
      const soldP = pill(svg, LX + 14, LY + 62, "VENDISTE AQUÍ", RED, "#fff", "start", 28);
      drawRing(soldR, 30.4, 0.45);
      show(soldP, 30.6);
      tl.to(dim, { opacity: 1, duration: 0.5 }, 32.0);
      const missed = pill(svg, 640, c0.top + 150, "TE PERDISTE LA RECUPERACIÓN", "#1d1910", "#ff8d90", "middle", 28);
      show(missed, 32.1);
      const fortune = pill(svg, 640, c0.top + 220, "Y UNA GRAN FORTUNA", RED, "#fff", "middle", 30);
      show(fortune, 33.7);
