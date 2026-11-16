      // ================= face on top + his TradingView chart below (never altered); full face at the end =================
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const svA = (tag, a, par) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); $(par || "#mkB").appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const CIN = $("#cin");
      const SP = 0.925, FL = 1920 / 1124, CUT_A = 7.12, CUT_B = 23.28, FULL = 25.8;
      const SA = 0.625, SB = 0.7535, BX0 = -222;
      const fx = (s, x) => Math.min(0, Math.max(1080 - 1728 * s, 540 - s * x));
      const near = (F, t) => F.reduce((b, f) => (Math.abs(f.t - t) < Math.abs(b.t - t) ? f : b), F[0]).x;

      // ---------- framing ----------
      tl.set("#fw", { scale: SP, x: fx(SP, FACE[0].x), y: 0, opacity: 1 }, 0);
      tl.set("#fw2", { scale: SP, x: fx(SP, near(FACE2, CUT_B + 0.3)), y: -20, opacity: 0 }, 0);
      FACE.forEach((f, i) => { if (!i || f.t > CUT_B) return; const p = FACE[i - 1]; tl.to("#fw", { x: fx(SP, f.x), duration: f.t - p.t, ease: "none" }, p.t); });
      tl.set("#fw", { opacity: 0 }, CUT_B);
      tl.set("#fw2", { opacity: 1 }, CUT_B);
      FACE2.forEach((f, i) => {
        if (!i || f.t < CUT_B + 0.1) return; const p = FACE2[i - 1];
        if (p.t < FULL + 0.6 && f.t > FULL - 0.05) return;
        tl.to("#fw2", { x: fx(f.t > FULL ? FL : SP, f.x), duration: f.t - p.t, ease: "none" }, p.t);
      });
      tl.to("#fw2", { scale: FL, y: 0, x: fx(FL, near(FACE2, FULL + 0.6)), duration: 0.6, ease: "power3.inOut" }, FULL);
      tl.set("#caps", { y: -560 }, 0);
      tl.to("#caps", { y: 0, duration: 0.6, ease: "power3.inOut" }, FULL);
      tl.to("#card", { y: 980, duration: 0.6, ease: "power3.inOut" }, FULL);

      // chart A (zoomed, hook) → chart B (weekly, zoomed out)
      tl.set("#cA", { scale: SA, x: 0, y: 0, opacity: 1 }, 0);
      tl.set("#cB", { scale: SB, x: BX0, y: 0, opacity: 0 }, 0);
      tl.set("#cA", { opacity: 0 }, CUT_A);
      tl.set("#cB", { opacity: 1 }, CUT_A);
      tl.fromTo(CIN, { scale: 1.08, x: -40, y: -20 }, { scale: 1, x: 0, y: 0, duration: 0.45, ease: "power3.out", immediateRender: false }, CUT_A);
      const PA = (x, y) => [x * SA, y * SA], PB = (x, y) => [x * SB + BX0, y * SB];

      // ---------- hook: 1, 2, 3 bull traps (badges on his own blue lines) ----------
      const counter = mk(`<span style="font-size:24px;font-weight:800;letter-spacing:.14em;display:block;opacity:.8">BULL TRAPS</span><span id="ctn" style="font-size:66px;font-weight:900;line-height:1">×1</span>`,
        "pill dark ov", "left:660px;top:56px;border-radius:26px;padding:12px 30px;text-align:center;line-height:1.1;background:rgba(17,15,12,.94);color:#fff;border-color:rgba(229,72,77,.7);", CIN);
      pop(counter, 1.58);
      [[460, 368, "1", 1.58], [660, 476, "2", 2.34], [944, 452, "3", 3.48]].forEach(([x, y, n, t]) => {
        const [X, Y] = PA(x, y);
        const b = mk(n, "badge ov", `left:${X - 43}px;top:${Y - 112}px;`, CIN);
        tl.fromTo(b, { opacity: 0, scale: 0.2 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(3)" }, t);
        tl.call(() => { $("#ctn").textContent = "×" + n; }, null, t);
        tl.call(() => { $("#ctn").textContent = "×" + (n - 1); }, null, t - 0.01);
        if (n !== "1") tl.fromTo(counter, { scale: 1.18 }, { scale: 1, duration: 0.3, ease: "back.out(3)", immediateRender: false }, t);
        fade(b, CUT_A - 0.12, 0.1);
      });
      tl.to(counter, { x: -6, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 3.5);
      tl.to("#redTint", { opacity: 0.55, duration: 0.12, yoyo: true, repeat: 1 }, 3.48);
      fade(counter, CUT_A - 0.12, 0.1);
      // "¿y ahora?" on the last candle
      const [LX, LY] = PA(972, 672);
      const ring = mk("", "ov", `left:${LX - 46}px;top:${LY - 46}px;width:92px;height:92px;border-radius:50%;border:6px solid #e5484d;box-shadow:0 0 22px rgba(229,72,77,.7);`, CIN);
      tl.fromTo(ring, { opacity: 0, scale: 0.3 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, 5.3);
      tl.to(ring, { scale: 1.25, duration: 0.4, yoyo: true, repeat: 2, ease: "sine.inOut" }, 5.65);
      const ahora = mk("¿Y AHORA?", "pill red ov", `left:${LX + 40}px;top:${LY + 30}px;font-size:40px;`, CIN);
      pop(ahora, 6.6);
      fade([ring, ahora], CUT_A - 0.12, 0.1);

      // ---------- chart B: the zone to hold ----------
      const zone = svA("ellipse", { cx: 1190, cy: 418, rx: 205, ry: 64, fill: "rgba(63,191,127,0.22)", opacity: 0 });
      tl.to(zone, { opacity: 1, duration: 0.3 }, 9.44);
      const [ZX, ZY] = PB(1190, 467);
      const zl = mk(`ZONA A AGUANTAR <span style="opacity:.75;font-weight:800">· 57K–65K</span>`, "pill green ov", `left:${ZX - 300}px;top:${ZY + 22}px;font-size:32px;`, CIN);
      pop(zl, 9.44);
      tl.to(zl, { scale: 1.08, duration: 0.18, yoyo: true, repeat: 1 }, 9.9);
      // "si no, cuidado" → danger below the 0.382
      const dz = svA("rect", { x: 0, y: 467, width: 1665, height: 249, fill: "rgba(229,72,77,0.16)", opacity: 0 });
      tl.to(dz, { opacity: 1, duration: 0.3 }, 11.1);
      const cu = mk("⚠️ CUIDADO", "pill red ov", `left:690px;top:${PB(0, 600)[1]}px;font-size:40px;`, CIN);
      pop(cu, 11.4);
      tl.to(cu, { x: -7, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 11.75);
      tl.to("#redTint", { opacity: 0.6, duration: 0.15, yoyo: true, repeat: 1 }, 11.5);
      fade([cu, dz, zl, zone], 12.6, 0.3);

      // ---------- "salvo catástrofe, COVID 2.0, guerra mundial, algo gordo" (glass chips on the face band) ----------
      const sal = mk(`<span class="serif" style="font-size:58px;color:#f6e6b8">salvo…</span>`, "ov", "left:44px;top:96px;");
      pop(sal, 12.78);
      const CH = [["💥", "CATÁSTROFE", 13.14, "left:30px;top:180px;"], ["🦠", "COVID 2.0", 14.3, "left:30px;top:292px;"],
        ["💣", "GUERRA MUNDIAL", 15.3, "left:30px;top:404px;"], ["🌋", "ALGO GORDO", 16.0, "left:30px;top:516px;"]];
      const chips = CH.map(([ic, tx, t, st]) => {
        const e = mk(`<span style="font-size:46px">${ic}</span><b style="font-size:36px">${tx}</b>`, "glass chip ov", st + "padding:12px 24px 12px 14px;gap:14px;");
        pop(e, t, { x: -40 });
        return e;
      });
      tl.to([sal, ...chips], { opacity: 0, y: -20, duration: 0.3, stagger: 0.04 }, 16.9);

      // ---------- "no veo a bitcoin cayendo a estas zonas… técnicamente… pero no lo veo" ----------
      const fz = svA("rect", { x: 0, y: 593, width: 1665, height: 123, fill: "rgba(229,72,77,0.22)", stroke: "#e5484d", "stroke-width": 4, "stroke-dasharray": "14 10", opacity: 0 });
      tl.to(fz, { opacity: 1, duration: 0.3 }, 19.1);
      tl.to(fz, { attr: { "fill-opacity": 0.5 }, duration: 0.25, yoyo: true, repeat: 1 }, 19.82);
      const fl = mk(`ZONA FIBO 0,5 – 0,618 <span style="opacity:.8">· 34.600–44.300 $</span>`, "pill red ov", `left:24px;top:${PB(0, 610)[1]}px;font-size:28px;`, CIN);
      pop(fl, 19.2);
      const tec = mk(`📐 LO MARCA EL ANÁLISIS TÉCNICO`, "pill dark ov", `left:24px;top:${PB(0, 735)[1]}px;font-size:30px;`, CIN);
      pop(tec, 20.66);
      const nv = mk("NO LO VEO ✋", "ov", `left:330px;top:${PB(0, 560)[1]}px;padding:14px 34px;border-radius:22px;border:7px solid #e5484d;color:#e5484d;background:rgba(255,255,255,.92);font-size:66px;font-weight:900;letter-spacing:.02em;transform:rotate(-7deg);box-shadow:0 18px 40px rgba(0,0,0,.35);`, CIN);
      tl.fromTo(nv, { opacity: 0, scale: 2.2, rotation: -7 }, { opacity: 1, scale: 1, rotation: -7, duration: 0.25, ease: "power4.in" }, 22.5);
      tl.to(CIN, { x: 8, duration: 0.04, yoyo: true, repeat: 5, ease: "none" }, 22.75);
      fade([fl, tec, nv, fz], 23.55, 0.25);

      // ---------- "los 50 mil, ni zonas inferiores" ----------
      const l50 = svA("line", { x1: 300, x2: 1665, y1: 528, y2: 528, stroke: "#111", "stroke-width": 6, "stroke-dasharray": "22 14", opacity: 0 });
      tl.to(l50, { opacity: 1, duration: 0.25 }, 23.74);
      const p50 = mk(`50.000 $`, "pill dark ov", `left:820px;top:${PB(0, 528)[1] - 30}px;font-size:36px;background:#111;color:#fff;border:none;`, CIN);
      pop(p50, 23.74);
      const x50 = mk(`<span style="font-size:58px;color:#e5484d;font-weight:900">✕</span>`, "ov", `left:740px;top:${PB(0, 528)[1] - 44}px;`, CIN);
      tl.fromTo(x50, { opacity: 0, scale: 2 }, { opacity: 1, scale: 1, duration: 0.22, ease: "power3.in" }, 24.14);
      const low = svA("rect", { x: 300, y: 532, width: 1365, height: 742, fill: "rgba(229,72,77,0.18)", opacity: 0 });
      tl.to(low, { opacity: 1, duration: 0.3 }, 24.7);
      const ni = mk("✕ NI ZONAS INFERIORES", "pill red ov", `left:330px;top:${PB(0, 820)[1]}px;font-size:40px;`, CIN);
      pop(ni, 24.85);

      // ---------- full face: escenario preparado · liquidez · siempre ×3 · vela · emociones ----------
      const topChip = (html, t0, t1, from) => { const e = mk(html, "glass chip ov", "left:0;right:0;margin:0 auto;width:max-content;top:110px;"); pop(e, t0, from); if (t1) fade(e, t1, 0.2); return e; };
      topChip(`<span style="font-size:56px">✅</span><b>ESCENARIO PREPARADO</b>`, 26.5, 27.9);
      topChip(`<span style="font-size:56px">💰</span><b>LIQUIDEZ GUARDADA</b>`, 28.1, 29.8);
      const sm = topChip(`<span style="font-size:56px">🔁</span><b>SIEMPRE</b><span id="sdots" style="display:flex;gap:10px;margin-left:6px"><i class="sd"></i><i class="sd"></i><i class="sd"></i></span>`, 30.0, 32.25);
      $$(".sd").forEach((d, i) => {
        d.style.cssText = "display:block;width:30px;height:30px;border-radius:50%;background:rgba(255,255,255,.25);border:2px solid rgba(255,255,255,.5)";
        const t = [30.0, 30.56, 31.42][i];
        tl.to(d, { backgroundColor: "#f0d488", borderColor: "#f0d488", boxShadow: "0 0 16px rgba(240,212,136,.9)", duration: 0.12 }, t);
        tl.fromTo(d, { scale: 1.6 }, { scale: 1, duration: 0.25, ease: "back.out(3)", immediateRender: false }, t);
      });
      // decision card: candles + the next candle still unknown
      const vc = mk(`<div style="display:flex;align-items:center;gap:26px;padding:18px 30px">
          <div style="text-align:left"><div style="font-size:24px;font-weight:800;letter-spacing:.12em;opacity:.8">DECISIÓN TOMADA</div><div style="font-size:46px;font-weight:900;line-height:1.05">ANTES DE LA<br><span style="color:#f0d488">SIGUIENTE VELA</span></div></div>
          <svg id="cdl" width="300" height="190" viewBox="0 0 300 190"></svg></div>`, "glass ov", "left:0;right:0;margin:0 auto;width:max-content;top:70px;");
      const C = $("#cdl"); const cs = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); C.appendChild(e); return e; };
      const CND = [[40, 70, 120, 1], [100, 95, 140, 0], [80, 110, 160, 0], [60, 120, 150, 1]];
      const cels = CND.map(([o, hi, lo, up], i) => { const x = 22 + i * 52, col = up ? "#3fbf7f" : "#e5484d";
        const g = [cs("line", { x1: x + 14, x2: x + 14, y1: hi - 25, y2: lo + 18, stroke: col, "stroke-width": 4, opacity: 0 }), cs("rect", { x, y: Math.min(o, hi), width: 28, height: Math.abs(hi - o) + 30, rx: 3, fill: col, opacity: 0 })]; return g; });
      const nx = cs("rect", { x: 230, y: 40, width: 34, height: 110, rx: 4, fill: "none", stroke: "#fff", "stroke-width": 4, "stroke-dasharray": "9 7", opacity: 0 });
      const q = cs("text", { x: 247, y: 108, "text-anchor": "middle", "font-size": 44, "font-weight": 900, fill: "#fff", opacity: 0 }); q.textContent = "?";
      pop(vc, 32.4);
      cels.forEach((g, i) => tl.to(g, { opacity: 1, duration: 0.12 }, 32.55 + i * 0.12));
      tl.to([nx, q], { opacity: 1, duration: 0.2 }, 34.34);
      tl.to(nx, { opacity: 0.3, duration: 0.25, yoyo: true, repeat: 1 }, 34.6);
      fade(vc, 35.9, 0.2);
      const em = topChip(`<span style="font-size:56px">😰</span><b style="color:#ff8a8e">EMOCIONES</b>`, 36.42, null);
      tl.to(em, { x: -8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 36.8);
      tl.to("#redTint", { opacity: 0.6, duration: 0.3 }, 36.42);
      tl.to("#redTint", { opacity: 0, duration: 0.5 }, 37.6);
      tl.set("#redTint", { opacity: 0 }, 0);
