      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const sv = (p, tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 24 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.4, ease: "back.out(1.9)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const kw = (html, t0, t1, top) => { const k = mk(html, "kw", top ? `top:${top}px` : ""); tl.fromTo(k, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, t0); if (t1) fade(k, t1, 0.2); return k; };

      FACE.forEach((f, i) => {
        const v = Math.max(-50, Math.min(50, (1280 - f.x) * 0.75));
        if (!i) tl.set("#track", { x: v }, 0); else tl.to("#track", { x: v, duration: f.t - FACE[i - 1].t, ease: "none" }, FACE[i - 1].t);
      });

      // ---------- camera ----------
      const sideR = (t, s = 1.0) => { tl.to(cam, { x: 470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeL", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const sideL = (t, s = 1.0) => { tl.to(cam, { x: -470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeR", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const full = (t, s = 1.06) => { tl.to(cam, { x: 0, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to(["#fadeL", "#fadeR"], { opacity: 0, duration: 0.3 }, t + 0.05); };
      tl.set(cam, { x: 0, scale: 1.06 }, 0);
      tl.to(cam, { scale: 1.1, duration: 4.1, ease: "none" }, 0.05);
      sideR(4.25, 1.0);
      full(9.6, 1.06);
      tl.set(cam, { scale: 1.17 }, 12.12);           // dry cut: "no soy adivino"
      tl.to(cam, { scale: 1.2, duration: 2.8, ease: "none" }, 12.14);
      sideL(15.05, 1.0);

      // ---------- 0–4.25: "el método aburrido se llama DCA" (glass in front, camera still) ----------
      const k0 = mk(`<span class="serif">el método</span><b class="box">ABURRIDO 😴</b>`, "kw", ""); tl.set(k0, { opacity: 1 }, 0); tl.fromTo(k0.querySelector(".box"), { scale: 1 }, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1, ease: "power2.out", immediateRender: false }, 1.08); fade(k0, 2.1, 0.2);
      const dca = mk(`<div style="font-size:26px;font-weight:800;letter-spacing:.18em;color:#c9a54c">SE LLAMA</div>
          <div style="font-size:170px;font-weight:900;line-height:.95;letter-spacing:-.02em;background:linear-gradient(180deg,#f0d488,#c9a54c 60%,#8a6d2a);-webkit-background-clip:text;background-clip:text;color:transparent">DCA</div>
          <div style="font-size:30px;font-weight:800;opacity:.9">Dollar Cost Averaging</div>
          <div class="serif" style="font-size:40px;color:#f6e6b8;margin-top:6px">comprar poco a poco</div>`, "glass ov", "left:120px;top:250px;padding:34px 46px;");
      pop(dca, 2.2, { x: -40 });
      tl.to(dca, { scale: 1.04, duration: 0.9, yoyo: true, repeat: 1, ease: "sine.inOut" }, 2.7);
      tl.to(dca, { opacity: 0, x: -40, duration: 0.25 }, 4.15);

      // ---------- BTC chart with his zones (real CoinGecko data, 1 year) ----------
      const V = BTC, N = V.length, W = 690, H = 560, LO = 30000, HI = 100000;
      const X = (i) => 10 + (i / (N - 1)) * (W - 20), Y = (p) => 20 + (1 - (p - LO) / (HI - LO)) * (H - 40);
      const ZONES = [[57000, 65000, "57–65K · SOPORTE"], [42500, 46000, "0,5 · 44.300"], [33000, 36200, "0,618 · 34.600"]];
      const chart = (card, animate) => {
        const S = card.querySelector("svg");
        [40000, 60000, 80000, 100000].forEach((p) => { sv(S, "line", { x1: 0, x2: W, y1: Y(p), y2: Y(p), stroke: "rgba(255,255,255,.07)", "stroke-width": 2 });
          const t = sv(S, "text", { x: W - 4, y: Y(p) - 8, "text-anchor": "end", fill: "#6b7280", "font-size": 20, "font-weight": 700 }); t.textContent = p / 1000 + "K"; });
        const zs = ZONES.map(([a, b, lab], k) => { const g = sv(S, "g", { opacity: animate ? 0 : 1 });
          sv(g, "rect", { x: 0, y: Y(b), width: W, height: Y(a) - Y(b), fill: k ? "rgba(240,212,136,.10)" : "rgba(240,212,136,.20)", stroke: "#c9a54c", "stroke-width": 2, "stroke-dasharray": "10 8" });
          const t = sv(g, "text", { x: 14, y: Y(a) - 10, fill: "#f0d488", "font-size": 24, "font-weight": 900 }); t.textContent = lab; return g; });
        const d = V.map((p, i) => (i ? "L" : "M") + X(i).toFixed(1) + " " + Y(p).toFixed(1)).join(" ");
        const ln = sv(S, "path", { d, fill: "none", stroke: "#f2f2f2", "stroke-width": 4, "stroke-linejoin": "round", "stroke-dasharray": animate ? 3000 : 0, "stroke-dashoffset": animate ? 3000 : 0 });
        return { S, zs, ln };
      };
      const CARD = (side, title) => mk(`<div style="position:absolute;left:56px;top:50px;display:flex;align-items:center;gap:16px"><img src="assets/logos/btc.png" style="width:56px;height:56px"><b style="font-size:38px;font-weight:900">Bitcoin</b><span style="font-size:24px;color:#8b93a1;font-weight:700">1 año</span></div>
          <div style="position:absolute;right:56px;top:62px;font-size:26px;font-weight:800;letter-spacing:.12em;color:#c9a54c">${title}</div>
          <svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" style="position:absolute;left:55px;top:140px;overflow:visible"></svg>
          <div style="position:absolute;left:56px;bottom:22px;font-size:20px;font-weight:700;color:#6b7280">Datos reales: CoinGecko · 23 nov 2026 · zonas de su gráfico semanal</div>`, "card", side);

      // ---------- 4.25–9.6: invest in zones where price may bounce (lateral, card left) ----------
      const c1 = CARD("left:80px;", "MIS ZONAS");
      const g1 = chart(c1, true);
      tl.fromTo(c1, { opacity: 0, x: -60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 4.35);
      tl.to(g1.ln, { attr: { "stroke-dashoffset": 0 }, duration: 1.3, ease: "power1.inOut" }, 4.6);
      g1.zs.forEach((z, k) => tl.fromTo(z, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 6.08 + k * 0.22));
      // real bounce from the zone: 1 jul 2026 58.566 $ → 22 sep 2026 86.597 $
      const iL = 219, iH = 302;
      const lowDot = sv(g1.S, "circle", { cx: X(iL), cy: Y(V[iL]), r: 12, fill: "#4ade80", opacity: 0 });
      const arr = sv(g1.S, "path", { d: `M${X(iL)} ${Y(V[iL]) - 18} Q${X(iL) + 20} ${Y(V[iH]) + 40} ${X(iH) - 6} ${Y(V[iH]) + 14}`, fill: "none", stroke: "#4ade80", "stroke-width": 6, "stroke-linecap": "round", "stroke-dasharray": 400, "stroke-dashoffset": 400 });
      tl.fromTo(lowDot, { opacity: 0, scale: 0.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 8.0);
      tl.to(arr, { attr: { "stroke-dashoffset": 0 }, duration: 0.6, ease: "power2.out" }, 8.62);
      const rb = mk(`REBOTE REAL <span style="opacity:.85">+47,9 %</span>`, "pill ov", `left:${55 + 80 + X(iL) - 40}px;top:${140 + 120 + Y(V[iH]) - 80}px;background:#2fb57a;color:#fff;font-size:30px;`);
      pop(rb, 8.9);
      tl.to([c1, rb], { opacity: 0, x: -50, duration: 0.25, ease: "power2.in" }, 9.5);

      // ---------- 10–15: "no sé si va a rebotar… no soy adivino" ----------
      kw(`<span class="serif">¿va a rebotar?</span><b class="box">NO LO SÉ 🤷</b>`, 10.1, 11.12);
      kw(`<b class="box">TAMPOCO ME IMPORTA</b>`, 11.22, 12.05);
      const ball = mk(`<span style="font-size:110px;line-height:1">🔮</span><div><b style="display:block;font-size:30px;font-weight:800;letter-spacing:.1em;opacity:.85">NO SOY</b><b style="display:block;font-size:64px">ADIVINO</b></div>`, "glass chip ov", "left:1290px;top:300px;padding:22px 40px 22px 26px;");
      pop(ball, 12.24, { x: 40 });
      const nb = mk(`✕ sin bola de cristal`, "pill ov", "left:1330px;top:520px;background:#e5484d;color:#fff;font-size:34px;");
      pop(nb, 13.86);
      tl.to(ball, { rotation: -4, duration: 0.08, yoyo: true, repeat: 5, ease: "none" }, 13.9);
      tl.to([ball, nb], { opacity: 0, x: 40, duration: 0.25 }, 14.95);

      // ---------- 15.05–19.04: accumulating in the zones (lateral, card right) ----------
      const c2 = CARD("left:1040px;", "ACUMULANDO");
      const g2 = chart(c2, false);
      tl.fromTo(c2, { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 15.15);
      const BUY = [74, 195, 219, 244, 263, 356, 363];
      BUY.forEach((i, k) => { const c = sv(g2.S, "circle", { cx: X(i), cy: Y(V[i]), r: 12, fill: "#f0d488", stroke: "#1a1408", "stroke-width": 3, opacity: 0 });
        tl.fromTo(c, { opacity: 0, scale: 0.2, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(3)" }, 15.82 + k * 0.14); });
      const lab = mk(`🟡 COMPRAS EN LA ZONA`, "pill gold ov", `left:${1040 + 55 + X(170)}px;top:${140 + 120 + Y(97000) - 30}px;font-size:28px;`);
      pop(lab, 16.1);
      // lower zones: next orders waiting
      [[44300, 16.72], [34600, 16.95]].forEach(([p, t]) => {
        const o = mk(`⏳ ORDEN`, "pill ov", `left:${1040 + 55 + X(300)}px;top:${140 + 120 + Y(p) - 26}px;font-size:24px;background:rgba(22,19,13,.94);color:#f3e3b5;border:2px dashed #c9a54c;`);
        pop(o, t);
      });
      tl.to(g2.zs.slice(1), { opacity: 0.4, duration: 0.25, yoyo: true, repeat: 3 }, 16.72);
      const ej = mk(`👇 Y AHORA, EL EJEMPLO`, "pill gold ov", "left:1290px;top:815px;font-size:32px;");
      pop(ej, 18.32);
