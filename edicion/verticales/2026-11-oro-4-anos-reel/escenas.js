      // ================= face on top + his TradingView gold chart below (never altered); full face at the end =================
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const sv = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); $("#mk").appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const SP = 0.83, FL = 1920 / 1184, END = 32.6;
      const fx = (s, x) => Math.min(0, Math.max(1080 - 1728 * s, 540 - s * x));
      const SPLIT0 = 9.3;
      const sAt = (t) => (t < SPLIT0 || t >= END ? FL : SP);
      tl.set("#fw", { scale: FL, x: fx(FL, FACE[0].x), y: -2 }, 0);
      tl.set("#caps", { y: 0 }, 0);
      tl.set("#card", { opacity: 0 }, 0);
      FACE.forEach((f, i) => {
        if (i === 0) return;
        const p = FACE[i - 1];
        if ((p.t < SPLIT0 + 0.7 && f.t > SPLIT0 - 0.05) || (f.t >= END && p.t < END)) return;
        tl.to("#fw", { x: fx(sAt(f.t), f.x), duration: f.t - p.t, ease: "none" }, p.t);
      });
      // full face → split when he goes to the chart ("si yo retrocedo")
      const fxAt = (t) => { let best = FACE[0]; FACE.forEach((f) => { if (Math.abs(f.t - t) < Math.abs(best.t - t)) best = f; }); return best.x; };
      tl.to("#fw", { scale: SP, x: fx(SP, fxAt(SPLIT0 + 0.6)), y: -30, duration: 0.6, ease: "power3.inOut" }, SPLIT0);
      tl.fromTo("#card", { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out", immediateRender: false }, SPLIT0 + 0.15);
      tl.to("#caps", { y: -560, duration: 0.6, ease: "power3.inOut" }, SPLIT0);
      tl.set("#card", { opacity: 0 }, END);
      tl.set("#fw", { scale: FL, y: -2, x: fx(FL, 835) }, END);
      tl.to("#fw", { scale: FL * 1.03, duration: 3.5, ease: "none" }, END + 0.05);
      tl.set("#caps", { y: 0 }, END);

      // ---------- chips on the chart ----------
      const tag = (txt, cls, t0, t1, style) => { const e = mk(txt, "pill " + cls + " ov", style); pop(e, t0); fade(e, t1, 0.2); return e; };
      const glass = (html, t0, t1, style, from) => { const e = mk(html, "glass chip ov", style); pop(e, t0, from); if (t1) fade(e, t1, 0.25); return e; };
      const g1 = glass(`<span style="font-size:64px">🥇</span><b>ORO</b>`, 0.34, 9.2, "left:70px;top:230px;");
      const g2 = glass(`<span style="font-size:58px">📈</span><b style="font-size:40px">GRANDES OPORTUNIDADES<br>DE COMPRA</b>`, 1.74, 5.2, "right:70px;top:380px;", { x: 40 });
      const g3 = glass(`<span style="font-size:70px">⚽</span><div><b style="display:block">CADA 4 AÑOS</b><b style="display:block;font-size:34px;color:#f0d488">como el Mundial</b></div>`, 5.36, 9.2, "right:70px;top:380px;", { x: 40 });
      const g4 = mk(`<span style="font-size:22px;font-weight:800;letter-spacing:.14em;display:block;opacity:.85">ESTAMOS EN</span>2026 · AÑO BAJISTA`, "pill red ov", "left:70px;top:560px;font-size:46px;border-radius:24px;padding:12px 28px;line-height:1.05;");
      pop(g4, 8.48); fade(g4, 9.2, 0.2);
      tl.to(g1, { scale: 1.06, duration: 0.2, yoyo: true, repeat: 1 }, 2.64);
      tag("2022 · AÑO BAJISTA", "red", 12.0, 15.1, "left:30px;top:1010px;font-size:30px;");
      tag("2018 · MÁS DE LO MISMO", "red", 18.64, 20.7, "left:30px;top:1010px;font-size:30px;");
      tag("2026 · ESTAMOS DENTRO DEL AÑO BAJISTA", "red", 23.3, 27.4, "left:30px;top:1010px;font-size:28px;");
      tag("🟡 ESTOY ACUMULANDO ORO", "gold", 27.56, 32.5, "left:30px;top:1010px;font-size:30px;");
      // buy zone (his green zone ~3.915 $): ring + label on top of the chart (chart space 1080x624)
      const ring = sv("ellipse", { cx: 741, cy: 316, rx: 110, ry: 40, fill: "none", stroke: "#f0d488", "stroke-width": 7, "stroke-dasharray": 760, "stroke-dashoffset": 760 });
      tl.to(ring, { attr: { "stroke-dashoffset": 0 }, duration: 0.5, ease: "power2.out" }, 29.3);
      const buy = mk(`<span style="font-size:22px;font-weight:800;letter-spacing:.14em;display:block;color:#1a1408;opacity:.8">ZONA DE COMPRA</span>3.915 $`, "pill gold ov", "left:30px;top:1180px;font-size:56px;border-radius:24px;padding:12px 28px;line-height:1.05;");
      pop(buy, 30.64);
      tl.to([ring, buy], { opacity: 0, duration: 0.2 }, 32.5);

      // ---------- 4-year cycle timeline under the chart ----------
      const TLW = mk("", "", "position:absolute;left:60px;right:60px;top:1640px;height:110px;");
      const line = mk("", "", "position:absolute;left:60px;right:60px;top:52px;height:6px;border-radius:3px;background:rgba(240,212,136,0.25);", TLW);
      const Y = [["2018", 18.64, 0], ["2022", 11.66, 0.5], ["2026", 9.7, 1]];
      Y.forEach(([y, t, k]) => {
        const n = mk(`<div style="width:38px;height:38px;border-radius:50%;margin:0 auto;background:#e5484d;box-shadow:0 0 24px rgba(229,72,77,.8)"></div><div style="margin-top:8px;font-size:30px;font-weight:900;color:#fff;text-align:center">${y}</div>`, "ov", `left:calc(60px + ${k} * (100% - 120px) - 60px);top:36px;width:120px;`, TLW);
        tl.fromTo(n, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, t);
      });
      [[0.25, 18.9], [0.75, 18.9]].forEach(([k, t]) => {
        const l = mk("+4 AÑOS", "ov", `left:calc(60px + ${k} * (100% - 120px) - 70px);top:0;width:140px;text-align:center;font-size:24px;font-weight:900;color:#f0d488;letter-spacing:.06em`, TLW);
        tl.to(l, { opacity: 1, duration: 0.3 }, t + (k > 0.5 ? 0.2 : 0));
      });
      tl.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 9.6);
      tl.to(TLW, { opacity: 0, duration: 0.3 }, 32.4);

      // ---------- end: full face + follow ----------
      const fol = mk(`<span style="font-size:60px">🥇</span><b>SIGUIENTES ZONAS DE COMPRA</b>`, "glass chip ov", "left:80px;top:300px;");
      pop(fol, 33.54);
      tl.to(fol, { opacity: 0, duration: 0.2 }, 36.0);
