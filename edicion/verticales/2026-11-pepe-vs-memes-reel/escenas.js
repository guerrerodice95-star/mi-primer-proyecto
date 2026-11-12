      // ================= layout: face on top + his CoinGlass recordings below; full face at the end =================
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const sv = (svgSel, tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); $(svgSel).appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      // face: split = 1300 px of source across 1080 (scale .83), clipped at y 1000; full = scale 1.507 (fills 1920)
      const SP = 0.83, FL = 1.66;
      const fx = (s, x) => Math.min(0, Math.max(1080 - 1728 * s, 540 - s * x));
      tl.set("#fw", { scale: SP, x: fx(SP, FACE[0].x), y: -40 }, 0);
      tl.set("#caps", { y: -560 }, 0);
      FACE.forEach((f, i) => {
        if (i === 0) return;
        const p = FACE[i - 1], s = f.t >= 52.9 ? FL : SP;
        if (f.t >= 52.9 && p.t < 52.9) return;
        tl.to("#fw", { x: fx(s, f.x), duration: f.t - p.t, ease: "none" }, p.t);
      });
      // clip the face just above the card (screen y 1000) while split
      tl.set("#fw", { clipPath: `inset(0px 0px ${(1274 - 1040 / SP).toFixed(1)}px 0px)` }, 0);
      tl.set("#card", { opacity: 1 }, 0);
      // end: full face (no bottom margin)
      tl.set(["#card", "#tcard"], { opacity: 0 }, 52.9);
      tl.set("#fw", { clipPath: "inset(0px 0px 0px 0px)", scale: FL, y: -26, x: fx(FL, 800) }, 52.9);
      tl.to("#fw", { scale: FL * 1.03, duration: 3.8, ease: "none" }, 52.95);
      tl.set("#caps", { y: 0 }, 52.9);

      // ---------- chart marks (chart.mp4 space 1080x442) ----------
      const box = (x1, x2, y, t, t2, col) => {
        const r = sv("#mk", "rect", { x: x1 - 8, y: y - 24, width: x2 - x1 + 16, height: 44, rx: 10, fill: "none", stroke: col, "stroke-width": 5, opacity: 0 });
        tl.fromTo(r, { opacity: 0, scale: 1.3, transformOrigin: "50% 50%" }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2)" }, t); fade(r, t2, 0.2); return r;
      };
      box(156, 300, 76, 4.0, 13.3, "#16c784");
      box(118, 244, 98, 16.02, 16.55, "#16c784");
      box(116, 232, 74, 22.8, 24.35, "#e5484d");
      box(118, 224, 42, 31.28, 41.3, "#e5484d");
      const tag = (txt, cls, t0, t1, style) => { const e = mk(txt, "pill " + cls + " ov", style); pop(e, t0); fade(e, t1, 0.2); return e; };
      // header of the card: which coin
      tag("🐸 PEPE · 3 MESES", "dark", 0.1, 13.3, "right:40px;top:1462px;font-size:26px;");
      tag("+109 % DE MÍNIMO A MÁXIMO", "green", 8.14, 13.3, "left:50px;top:1600px;font-size:30px;");
      const x2 = mk("×2", "pill gold ov", "left:560px;top:1584px;font-size:60px;padding:4px 24px;"); pop(x2, 11.52); fade(x2, 13.3, 0.2);
      tag("₿ BITCOIN · 3 MESES", "dark", 13.4, 16.55, "right:40px;top:1462px;font-size:26px;");
      tag("🐕 DOGE · Nº 1 DE LAS MEMES", "dark", 17.0, 24.35, "right:40px;top:1462px;font-size:26px;");
      tag("SHIBA INU · 3 MESES", "dark", 25.24, 41.3, "right:40px;top:1462px;font-size:26px;");

      // ---------- leaderboard (real 3-month changes shown in his recordings) ----------
      const LB = mk("", "", "", null); LB.id = "lb";
      const ROWS = [["pepe", "PEPE", 84.27, 3.98], ["bitcoin", "BTC", 16.67, 16.02], ["dogecoin", "DOGE", -2.95, 22.8], ["shiba-inu", "SHIB", -0.31, 31.28]];
      ROWS.forEach(([id, n, v, t], i) => {
        const r = mk(`<img src="assets/logos/${id}.png"><b>${n}</b><div class="bar"></div><i></i>`, "lr", "", LB);
        const up = v >= 0, w = Math.max(14, Math.abs(v) / 84.27 * 560);
        const bar = r.querySelector(".bar"), lab = r.querySelector("i");
        bar.style.cssText += `width:${w}px;background:${up ? "linear-gradient(90deg,#16c784,#7ff0b5)" : "#e5484d"};`;
        lab.style.cssText = `left:${190 + w + 14}px;color:${up ? "#7ff0b5" : "#ff7a7e"}`;
        lab.textContent = (up ? "+" : "−") + Math.abs(v).toFixed(2).replace(".", ",") + " %";
        tl.set(bar, { scaleX: 0 }, 0);
        tl.fromTo(r, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, t);
        tl.to(bar, { scaleX: 1, duration: 0.7, ease: "power3.out" }, t + 0.05);
      });
      const lbT = mk("ÚLTIMOS 3 MESES", "ov", "left:50px;top:1470px;font-size:24px;font-weight:800;letter-spacing:0.16em;color:#c9a54c;");
      tl.to(lbT, { opacity: 1, duration: 0.3 }, 3.9);
      // "por qué Pepe está más fuerte que todo el mercado"
      const crown = mk("👑", "ov", "left:6px;top:1512px;font-size:40px;");
      pop(crown, 35.54);
      const strong = tag("💪 MÁS FUERTE QUE TODO EL MERCADO", "gold", 36.14, 41.3, "left:40px;top:1760px;font-size:32px;");
      tl.to([LB, lbT, crown], { opacity: 0, duration: 0.3 }, 41.3);

      // ---------- table: Pepe nº 3 of the memes, will pass Shiba Inu ----------
      tl.set("#card", { opacity: 0 }, 41.4);
      tl.set("#tcard", { opacity: 1 }, 41.4);
      const ROWY = (n) => 80 + (n - 1) * 46.6;
      const rowBox = (n, col, t, t2) => { const r = sv("#mk2", "rect", { x: 6, y: ROWY(n) - 22, width: 1068, height: 44, rx: 10, fill: col + "22", stroke: col, "stroke-width": 5, opacity: 0 });
        tl.to(r, { opacity: 1, duration: 0.25 }, t); fade(r, t2, 0.2); return r; };
      rowBox(3, "#16c784", 44.44, 52.8);
      const n3 = mk("Nº 3 DE LAS MEMES", "pill green ov", "right:60px;top:1600px;font-size:34px;"); pop(n3, 44.9); fade(n3, 52.8, 0.2);
      rowBox(2, "#e5484d", 51.38, 52.8);
      const arr = sv("#mk2", "path", { d: `M960 ${ROWY(3)} C 1030 ${ROWY(3) - 10}, 1030 ${ROWY(2) + 10}, 980 ${ROWY(2) + 4}`, fill: "none", stroke: "#f0d488", "stroke-width": 8, "stroke-linecap": "round", "stroke-dasharray": 300, "stroke-dashoffset": 300 });
      tl.to(arr, { attr: { "stroke-dashoffset": 0 }, duration: 0.5, ease: "power2.out" }, 51.5); fade(arr, 52.8, 0.2);
      const pass = mk("🐸 PEPE SUPERARÁ A SHIBA INU", "pill gold ov", "left:40px;top:1680px;font-size:34px;"); pop(pass, 52.06); fade(pass, 52.8, 0.2);

      // ---------- end, full face ----------
      const fin = mk(`<img src="assets/logos/pepe.png"><b>PEPE</b><b style="color:#f0d488">&gt;</b><img src="assets/logos/shiba-inu.png"><b>SHIB</b>`, "glass chip ov", "left:220px;top:250px;");
      pop(fin, 53.12);
      tl.to(fin, { opacity: 0, duration: 0.2 }, 54.8);
