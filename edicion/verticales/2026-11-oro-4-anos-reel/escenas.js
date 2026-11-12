      // ================= face on top + his TradingView gold chart below (never altered); full face at the end =================
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const sv = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); $("#mk").appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const SP = 0.83, FL = 1920 / 1184, END = 32.6;
      const fx = (s, x) => Math.min(0, Math.max(1080 - 1728 * s, 540 - s * x));
      tl.set("#fw", { scale: SP, x: fx(SP, FACE[0].x), y: -30, clipPath: `inset(0px 0px ${(1187 - 1020 / SP).toFixed(1)}px 0px)` }, 0);
      tl.set("#caps", { y: -560 }, 0);
      FACE.forEach((f, i) => {
        if (i === 0) return;
        const p = FACE[i - 1], s = f.t >= END ? FL : SP;
        if (f.t >= END && p.t < END) return;
        tl.to("#fw", { x: fx(s, f.x), duration: f.t - p.t, ease: "none" }, p.t);
      });
      tl.set("#card", { opacity: 1 }, 0);
      tl.set("#card", { opacity: 0 }, END);
      tl.set("#fw", { clipPath: "inset(0px 0px 0px 0px)", scale: FL, y: -2, x: fx(FL, 835) }, END);
      tl.to("#fw", { scale: FL * 1.03, duration: 3.5, ease: "none" }, END + 0.05);
      tl.set("#caps", { y: 0 }, END);

      // ---------- chips on the chart ----------
      const tag = (txt, cls, t0, t1, style) => { const e = mk(txt, "pill " + cls + " ov", style); pop(e, t0); fade(e, t1, 0.2); return e; };
      tag("🥇 ORO · GRÁFICO SEMANAL", "dark", 0.1, 9.3, "left:30px;top:1010px;font-size:26px;");
      tag("GRANDES OPORTUNIDADES DE COMPRA", "green", 1.74, 5.2, "left:30px;top:1070px;font-size:28px;");
      tag("⚽ CADA 4 AÑOS, COMO EL MUNDIAL", "gold", 5.36, 9.3, "left:30px;top:1070px;font-size:30px;");
      tag("2026 · AÑO BAJISTA", "red", 8.48, 9.3, "left:30px;top:1130px;font-size:30px;");
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
      const Y = [["2018", 18.64, 0], ["2022", 11.66, 0.5], ["2026", 8.48, 1]];
      Y.forEach(([y, t, k]) => {
        const n = mk(`<div style="width:38px;height:38px;border-radius:50%;margin:0 auto;background:#e5484d;box-shadow:0 0 24px rgba(229,72,77,.8)"></div><div style="margin-top:8px;font-size:30px;font-weight:900;color:#fff;text-align:center">${y}</div>`, "ov", `left:calc(60px + ${k} * (100% - 120px) - 60px);top:36px;width:120px;`, TLW);
        tl.fromTo(n, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, t);
      });
      [[0.25, 18.9], [0.75, 18.9]].forEach(([k, t]) => {
        const l = mk("+4 AÑOS", "ov", `left:calc(60px + ${k} * (100% - 120px) - 70px);top:0;width:140px;text-align:center;font-size:24px;font-weight:900;color:#f0d488;letter-spacing:.06em`, TLW);
        tl.to(l, { opacity: 1, duration: 0.3 }, t + (k > 0.5 ? 0.2 : 0));
      });
      tl.fromTo(line, { opacity: 0 }, { opacity: 1, duration: 0.3 }, 8.4);
      tl.to(TLW, { opacity: 0, duration: 0.3 }, 23.2);

      // ---------- end: full face + follow ----------
      const fol = mk(`<span style="font-size:60px">🥇</span><b>SIGUIENTES ZONAS DE COMPRA</b>`, "glass chip ov", "left:80px;top:300px;");
      pop(fol, 33.54);
      tl.to(fol, { opacity: 0, duration: 0.2 }, 36.0);
