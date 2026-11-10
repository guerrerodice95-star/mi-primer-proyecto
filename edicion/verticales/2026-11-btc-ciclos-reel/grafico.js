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

      // ================= TradingView recording: zooms on what he talks about + data chips =================
      const VW = 1040, VH = 700, CWd = 1464, CHd = 884;
      const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
      const view = (cx, cy, s) => {
        const x = clamp(VW / 2 - cx * s, VW - CWd * s, 0);
        const y = CHd * s < VH ? (VH - CHd * s) / 2 : clamp(VH / 2 - cy * s, VH - CHd * s, 0);
        return { scale: s, x, y };
      };
      const BASE = view(732, 442, tbS);
      const zoomTo = (t, v, d = 0.8) => tl.to("#tbIn", Object.assign({ duration: d, ease: "power2.inOut" }, v), t);
      zoomTo(1.9, view(380, 495, 1.1));        // cycle 1 (2015 → 2017)
      zoomTo(8.9, BASE, 0.6);
      zoomTo(13.3, view(730, 310, 1.25));      // cycle 2 (2018 → 2021)
      zoomTo(20.3, BASE, 0.6);
      zoomTo(26.5, view(1108, 285, 1.45));     // cycle 3 (2022 → 2025)
      zoomTo(33.0, BASE, 0.6);
      zoomTo(37.6, view(820, 480, 1.5));       // the floor ~57.000
      zoomTo(41.4, BASE, 0.5);
      zoomTo(42.4, view(1036, 348, 1.37));     // forecast +300 %

      // data chips (top-left of the chart window)
      const chips = document.createElement("div");
      chips.style.cssText = "position:absolute;left:44px;top:1010px;";
      $("#root").insertBefore(chips, $("#pCta"));
      const chip = (txt, cls, size) => {
        const d = document.createElement("div");
        d.style.cssText = `position:absolute;left:0;top:0;white-space:nowrap;padding:${size > 40 ? "8px 22px" : "8px 18px"};border-radius:16px;font-family:Inter;font-weight:900;font-size:${size}px;opacity:0;box-shadow:0 12px 30px rgba(0,0,0,0.45);`;
        const C = { gold: "background:linear-gradient(180deg,#f0d488,#c9a54c);color:#1a1408;", green: "background:#2fb57a;color:#fff;", red: "background:#e5484d;color:#fff;",
          dark: "background:rgba(22,19,13,0.92);color:#f3e3b5;border:2px solid rgba(201,165,76,0.55);" };
        d.style.cssText += C[cls]; d.textContent = txt; chips.appendChild(d); return d;
      };
      const put = (e, y, t0, t1, x) => {
        tl.set(e, { y, x: x || 0 }, 0);
        tl.fromTo(e, { opacity: 0, scale: 0.7, transformOrigin: "0% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.4)" }, t0);
        tl.to(e, { opacity: 0, duration: 0.2 }, t1);
      };
      // cycle 1
      put(chip("CICLO 1 · 2015 → 2017", "dark", 28), 0, 0.22, 8.85);
      put(chip("+10.000 %", "green", 52), 58, 4.14, 8.85);
      put(chip("19.000 $", "gold", 40), 140, 5.88, 8.85);
      // cycle 2
      put(chip("CICLO 2 · 2018 → 2021", "dark", 28), 0, 9.3, 20.35);
      put(chip("69.000 $", "gold", 40), 58, 14.28, 20.35);
      put(chip("+2.070 %", "green", 52), 126, 18.38, 20.35);
      // the fall
      put(chip("69.000 $ → 15.000 $", "red", 44), 0, 21.26, 23.75);
      // cycle 3
      put(chip("CICLO 3 · 2022 → 2025", "dark", 28), 0, 23.9, 33.0);
      put(chip("126.000 $", "gold", 40), 58, 24.92, 33.0);
      put(chip("+720 %", "green", 52), 126, 29.84, 33.0);
      // the floor
      put(chip("¿QUÉ ESPERO AHORA?", "dark", 28), 0, 33.06, 41.4);
      put(chip("SUELO ≈ 57.000 $", "gold", 46), 58, 38.4, 41.4);
      // forecast
      put(chip("PREVISIÓN · 2027 – 2028", "dark", 28), 0, 42.0, 52.5);
      put(chip("+300 %", "green", 52), 58, 44.52, 52.5);
      put(chip("200.000 – 220.000 $", "gold", 44), 140, 48.02, 52.5);
      // diminishing returns, cycle by cycle (bottom of the chart window)
      const ladder = document.createElement("div");
      ladder.style.cssText = "position:absolute;left:40px;right:40px;top:1610px;display:flex;justify-content:center;gap:12px;opacity:0;";
      ladder.innerHTML = ["+10.000 %", "+2.070 %", "+720 %", "+300 % ?"].map((v, i) => `<div style="padding:8px 16px;border-radius:14px;font-family:Inter;font-weight:900;font-size:30px;white-space:nowrap;${i === 3 ? "background:linear-gradient(180deg,#f0d488,#c9a54c);color:#1a1408;" : "background:rgba(22,19,13,0.92);color:#7ff0b5;border:2px solid rgba(63,191,127,0.6);"}">${v}</div>`).join('<div style="align-self:center;font-family:Inter;font-weight:900;font-size:30px;color:#cfc3a6">→</div>');
      $("#root").insertBefore(ladder, $("#pCta"));
      tl.fromTo(ladder, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, 49.5);
      tl.to(ladder, { opacity: 0, duration: 0.2 }, 52.45);
