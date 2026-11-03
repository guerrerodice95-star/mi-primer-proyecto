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

      // ================= scenes: crash -> "X meses después" -> recovery =================
      const hline = (P, x1, x2, y, col, dash, w) => el("line", { x1, x2, y1: y, y2: y, stroke: col, "stroke-width": w || 4, "stroke-dasharray": dash || "none", opacity: 0 }, P);
      // deterministic OHLC path (svg y: smaller = higher), mixed colours
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
      const X0 = 70, X1 = 950, SPLITX = 0.4;          // crash phase compresses to the left 40 %
      function event(cfg) {
        const G = grp("ev" + cfg.id);
        const crash = el("g", {}, G), rec = el("g", {}, G);
        const C = path(cfg.nc, cfg.pre, cfg.low, cfg.noiseC, cfg.seed, 0.8);
        const nr = cfg.nr, Rr = path(nr, cfg.low, cfg.end, cfg.noiseR, cfg.seed + 300, 1.15);
        const stepC = (X1 - X0) / cfg.nc, wC = stepC * 0.56;
        const cc = C.map((c, i) => candle(crash, X0 + stepC * (i + 0.5), c, wC));
        const rx0 = X0 + (X1 - X0) * SPLITX + 18, stepR = (X1 - rx0) / nr, wR = Math.max(8, stepR * 0.6);
        const rc = Rr.map((c, i) => candle(rec, rx0 + stepR * (i + 0.5), c, wR));
        const preL = hline(G, 40, 990, cfg.pre, GOLD, "10 10", 3);
        const preT = el("text", { x: 990, y: cfg.pre - 12, "text-anchor": "end", "font-size": 22, "font-weight": 800, fill: GOLD, "font-family": "Inter", opacity: 0 }, G, "ANTES DE LA CAÍDA");
        const tag = pill(G, 40, 52, cfg.tag, "#1d1910", CREAM, "start", 28);
        const sp = el("text", { x: 990, y: 50, "text-anchor": "end", "font-size": 24, "font-weight": 800, fill: "#8d826a", "font-family": "Inter", "letter-spacing": 2, opacity: 0 }, G, "S&P 500");
        const lowI = C.length - 1, lowX = X0 + stepC * (lowI + 0.5);
        const dropP = pill(G, Math.min(lowX, 900), cfg.low + 70, cfg.drop, RED, "#fff", "middle", 32);
        const sepX = rx0 - 9;
        const sep = el("line", { x1: sepX, x2: sepX, y1: 100, y2: 640, stroke: "rgba(240,212,136,0.5)", "stroke-width": 3, "stroke-dasharray": "6 8", opacity: 0 }, G);
        const later = pill(G, (sepX + X1) / 2, 112, cfg.later, GOLD, "#1a1408", "middle", 28);
        const recP = pill(G, 950, Math.min(cfg.end, cfg.pre) - 34, "RECUPERADO ✓", GREEN, "#fff", "end", 28);
        const T = cfg.t;
        tl.set(G, { opacity: 1 }, T.in);
        if (cfg.first) tl.set([tag, sp, preL, preT], { opacity: 1 }, T.in);
        else { show(tag, T.in, 0.25); show(sp, T.in, 0.25); show(preL, T.in + 0.1); show(preT, T.in + 0.1); }
        const k0 = cfg.first || 0;   // candles already on screen at the first frame (hook)
        cc.forEach((c, i) => i < k0 ? tl.set(c, { opacity: 1 }, T.in) : show(c, T.in + 0.15 + (i - k0) * (T.crashDur / (cc.length - k0)), 0.12));
        show(dropP, T.in + 0.15 + T.crashDur + 0.05);
        // "X meses después": zoom out the crash to the left and draw the recovery
        tl.to(crash, { scaleX: SPLITX, svgOrigin: `${X0} 0`, duration: 0.45, ease: "power2.inOut" }, T.later);
        tl.to(dropP, { x: -(lowX - (X0 + (lowX - X0) * SPLITX)), duration: 0.45, ease: "power2.inOut" }, T.later);
        show(sep, T.later + 0.3); show(later, T.later + 0.3);
        rc.forEach((c, i) => show(c, T.later + 0.45 + i * (T.recDur / rc.length), 0.1));
        show(recP, T.later + 0.45 + T.recDur);
        return { G, crash, rec, rc, dropP, recP, preL, preT, later, sep, tag, lowX, cfg };
      }
      const E = [
        event({ id: 1, tag: "🦠 COVID · 2020", drop: "−34 %", later: "6 MESES DESPUÉS", pre: 230, low: 560, end: 200, nc: 12, nr: 26, noiseC: 40, noiseR: 34, seed: 11, first: 4,
          t: { in: 0.0, crashDur: 1.9, later: 2.56, recDur: 1.7 } }),
        event({ id: 2, tag: "🪖 RUSIA INVADE UCRANIA · 2022", drop: "−25 %", later: "14 MESES DESPUÉS", pre: 250, low: 500, end: 238, nc: 12, nr: 26, noiseC: 38, noiseR: 40, seed: 41,
          t: { in: 5.0, crashDur: 2.2, later: 7.74, recDur: 1.8 } }),
        event({ id: 3, tag: "🧾 ARANCELES DE TRUMP · 2025", drop: "−19 %", later: "5 MESES DESPUÉS", pre: 240, low: 450, end: 180, nc: 11, nr: 24, noiseC: 34, noiseR: 30, seed: 71,
          t: { in: 10.46, crashDur: 2.6, later: 13.72, recDur: 1.8 } }),
        event({ id: 4, tag: "🛢️ IRÁN Y PETRÓLEO · 2026", drop: "PÁNICO", later: "4 MESES DESPUÉS", pre: 250, low: 470, end: 205, nc: 12, nr: 24, noiseC: 36, noiseR: 32, seed: 97,
          t: { in: 15.92, crashDur: 3.2, later: 19.7, recDur: 1.9 } }),
      ];
      tl.set("#chartWrap", { opacity: 1 }, 0);
      [[0, 4.85], [1, 10.3], [2, 15.78]].forEach(([i, t]) => tl.to(E[i].G, { opacity: 0, duration: 0.2 }, t));

      // ---------- "¿Ves el patrón?": the four side by side ----------
      const Q = [[0, 0], [510, 0], [0, 360], [510, 360]];
      E.forEach((e, i) => {
        tl.set(e.G, { opacity: 0, scale: 0.5, x: Q[i][0], y: Q[i][1], transformOrigin: "0 0" }, 22.0);
        tl.to(e.G, { opacity: 1, duration: 0.3 }, 22.26 + i * 0.12);
      });
      // "el mercado cae" / "se recupera" / "por encima de donde cayó"
      E.forEach((e) => tl.fromTo(e.dropP, { scale: 1 }, { scale: 1.25, duration: 0.18, yoyo: true, repeat: 1, svgOrigin: `${e.lowX} ${e.cfg.low + 60}` }, 23.6));
      E.forEach((e) => tl.fromTo(e.recP, { scale: 1 }, { scale: 1.2, duration: 0.18, yoyo: true, repeat: 1, svgOrigin: `900 ${e.cfg.pre - 40}` }, 24.6));
      E.forEach((e) => tl.to(e.preL, { attr: { "stroke-width": 7 }, duration: 0.3 }, 26.4));
      const above = pill(svg, 510, 708, "TERMINA MÁS ARRIBA DE DONDE CAYÓ", GOLD, "#1a1408", "middle", 30);
      show(above, 26.4);

      // ---------- "los que vendieron en lo peor del COVID…" ----------
      E.slice(1).forEach((e) => tl.to(e.G, { opacity: 0, duration: 0.25 }, 29.3));
      hide(above, 29.3, 0.25);
      tl.to(E[0].G, { scale: 1, x: 0, y: 0, duration: 0.5, ease: "power2.inOut" }, 29.45);
      tl.to(E[0].preL, { attr: { "stroke-width": 3 }, duration: 0.2 }, 29.45);
      const e0 = E[0], soldX = X0 + (e0.lowX - X0) * SPLITX;
      const soldR = ring(e0.G, soldX, e0.cfg.low - 10, 30, 40, RED);
      const soldP = pill(e0.G, soldX + 10, e0.cfg.low + 70, "VENDISTE AQUÍ", RED, "#fff", "start", 28);
      drawRing(soldR, 30.4, 0.45);
      tl.to(e0.dropP, { opacity: 0, duration: 0.2 }, 30.3);
      show(soldP, 30.6);
      tl.to(e0.rec, { opacity: 0.22, duration: 0.5 }, 32.0);
      tl.to(e0.recP, { opacity: 0, duration: 0.2 }, 32.0);
      const missed = pill(e0.G, 690, 330, "TE PERDISTE LA RECUPERACIÓN", "#1d1910", "#ff8d90", "middle", 28);
      show(missed, 32.1);
      const fortune = pill(e0.G, 690, 400, "Y UNA GRAN FORTUNA", RED, "#fff", "middle", 30);
      show(fortune, 33.7);
