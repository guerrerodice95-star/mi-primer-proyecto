      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || $("#fx")).appendChild(d); return d; };
      const sv = (p, tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 24 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.4, ease: "back.out(1.9)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const kw = (html, t0, t1, top) => { const k = mk(html, "kw", top ? `top:${top}px` : ""); tl.fromTo(k, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.3, ease: "back.out(2)" }, t0); if (t1) fade(k, t1, 0.2); return k; };

      // ---------- keep the head centred ----------
      FACE.forEach((f, i) => {
        const v = Math.max(-50, Math.min(50, (1280 - f.x) * 0.75));
        if (!i) tl.set("#track", { x: v }, 0); else tl.to("#track", { x: v, duration: f.t - FACE[i - 1].t, ease: "none" }, FACE[i - 1].t);
      });

      // ---------- camera ----------
      const sideR = (t, s = 1.0) => { tl.to(cam, { x: 470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeL", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const sideL = (t, s = 1.0) => { tl.to(cam, { x: -470, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to("#fadeR", { opacity: 1, duration: 0.45 }, t + 0.1); };
      const full = (t, s = 1.06) => { tl.to(cam, { x: 0, scale: s, duration: 0.6, ease: "power3.inOut" }, t); tl.to(["#fadeL", "#fadeR"], { opacity: 0, duration: 0.3 }, t + 0.05); };
      tl.set(cam, { x: 0, scale: 1.06 }, 0);
      sideR(1.85, 1.0);
      full(7.35, 1.06);
      tl.to(cam, { scale: 1.1, duration: 5.2, ease: "none" }, 7.5);
      tl.set(cam, { scale: 1.18 }, 12.72);           // dry cut: "buscar un pelotazo"
      sideL(13.95, 1.0);
      full(18.85, 1.06);
      tl.to(cam, { scale: 1.1, duration: 1.4, ease: "none" }, 19.45);

      // ---------- 0–1.9: "desconecta ahora mismo" ----------
      const dk = mk(`<b class="box">⏻ DESCONECTA</b><span class="serif" style="margin:0 0 0 26px">ahora mismo</span>`, "kw", "opacity:1");
      tl.set(dk, { opacity: 1 }, 0);
      tl.fromTo(dk.querySelector(".box"), { scale: 1.12 }, { scale: 1, duration: 0.5, ease: "back.out(2)" }, 0.02);
      fade(dk, 1.8, 0.2);

      // ---------- 1.9–7.3: YouTube search, real results (lateral, panel on the left) ----------
      const ROWS = __ROWS__;
      const yt = mk(`<div style="position:absolute;left:36px;right:36px;top:34px;display:flex;align-items:center;gap:14px">
            <svg width="58" height="40" viewBox="0 0 58 40"><rect width="58" height="40" rx="11" fill="#ff0033"/><path d="M23 11l15 9-15 9z" fill="#fff"/></svg>
            <b style="font-size:34px;font-weight:900;letter-spacing:-.02em">YouTube</b></div>
          <div style="position:absolute;left:36px;right:36px;top:104px;height:66px;display:flex">
            <div style="flex:1;border:2px solid #303030;border-radius:33px 0 0 33px;background:#121212;display:flex;align-items:center;padding:0 24px"><span id="q" style="font-size:30px;font-weight:600;color:#f1f1f1;white-space:nowrap"></span><span id="cur" style="width:3px;height:36px;background:#fff;margin-left:3px"></span></div>
            <div id="lupa" style="width:96px;border:2px solid #303030;border-left:none;border-radius:0 33px 33px 0;background:#222;display:flex;align-items:center;justify-content:center">
              <svg width="34" height="34" viewBox="0 0 24 24"><circle cx="10" cy="10" r="6.5" fill="none" stroke="#f1f1f1" stroke-width="2.4"/><path d="M15 15l6 6" stroke="#f1f1f1" stroke-width="2.6" stroke-linecap="round"/></svg></div></div>
          <div id="res" style="position:absolute;left:36px;right:36px;top:200px"></div>`, "card", "left:80px;background:#0f0f0f;");
      ROWS.forEach(([id, title, meta, dur]) => {
        mk(`<div style="position:relative;flex:none;width:262px;height:147px;border-radius:14px;overflow:hidden;background:#222"><img src="assets/yt/${id}.jpg" style="width:100%;height:100%;object-fit:cover">
              <span style="position:absolute;right:8px;bottom:8px;padding:2px 8px;border-radius:6px;background:rgba(0,0,0,.85);font-size:20px;font-weight:700">${dur}</span></div>
            <div style="min-width:0"><div style="font-size:25px;font-weight:700;line-height:1.25;color:#f1f1f1;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden">${title}</div>
              <div style="margin-top:8px;font-size:20px;color:#aaa">${meta}</div></div>`, "yr", "display:flex;gap:20px;height:158px;margin-bottom:6px;opacity:0;", $("#res"));
      });
      tl.fromTo(yt, { opacity: 0, x: -60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 1.95);
      tl.to("#cur", { opacity: 0, duration: 0.01, repeat: 5, yoyo: true, repeatDelay: 0.25 }, 2.4);
      // "dale a la lupita"
      tl.to("#lupa", { backgroundColor: "#3a3a3a", scale: 1.12, duration: 0.15, yoyo: true, repeat: 1 }, 3.16);
      const ring = mk("", "ov", "left:794px;top:226px;width:110px;height:110px;margin:-55px 0 0 -55px;border-radius:50%;border:6px solid #f0d488;box-shadow:0 0 24px rgba(240,212,136,.8)");
      tl.fromTo(ring, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(2.5)" }, 3.1);
      tl.to(ring, { opacity: 0, scale: 1.4, duration: 0.35 }, 3.7);
      const Q = "el próximo x100 cripto";
      tl.call(() => { $("#q").textContent = ""; }, null, 3.83);
      for (let i = 1; i <= Q.length; i++) tl.call(() => { $("#q").textContent = Q.slice(0, i); }, null, 3.84 + (i / Q.length) * 1.6);
      $$(".yr").forEach((r, i) => tl.fromTo(r, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.3, ease: "power2.out" }, 5.6 + i * 0.15));
      // "y esos son tus vídeos"
      const tus = mk(`👈 ESOS SON<br>TUS VÍDEOS`, "pill gold ov", "left:905px;top:560px;font-size:40px;line-height:1.05;padding:16px 28px;border-radius:24px;");
      tl.fromTo(tus, { opacity: 0, x: -30, scale: 0.7 }, { opacity: 1, x: 0, scale: 1, duration: 0.4, ease: "back.out(2.2)" }, 6.26);
      tl.to("#res", { boxShadow: "0 0 0 4px #f0d488", borderRadius: "18px", duration: 0.25 }, 6.26);
      tl.to([yt, tus], { opacity: 0, x: -50, duration: 0.25, ease: "power2.in" }, 7.2);

      // ---------- 7.4–13.9: "dar el cambio, el salto de buscar un pelotazo" (full + glass) ----------
      kw(`<span class="serif">quieres</span><b class="box">DAR EL CAMBIO</b>`, 9.44, 10.85);
      kw(`<span class="serif">el</span><b class="box">SALTO ⤴</b>`, 11.14, 12.6);
      const pel = mk(`<span style="font-size:64px">🎰</span><div><b style="display:block;font-size:30px;font-weight:800;letter-spacing:.1em;opacity:.8">DE BUSCAR UN</b><b style="display:block;font-size:56px;color:#ff8a8e">PELOTAZO</b></div>`, "glass chip ov", "left:110px;top:300px;");
      pop(pel, 12.85, { x: -40 });
      tl.to(pel, { opacity: 0, x: -40, duration: 0.25 }, 13.85);

      // ---------- 13.95–18.85: the jump (lateral, card on the right) ----------
      const cS = mk(`<div style="position:absolute;left:56px;top:56px;font-size:28px;font-weight:800;letter-spacing:.16em;color:#c9a54c">EL SALTO</div>
          <div id="sA" style="position:absolute;left:56px;right:56px;top:112px;height:118px;border-radius:24px;background:rgba(229,72,77,.10);border:2px solid rgba(229,72,77,.35);display:flex;align-items:center;gap:20px;padding:0 26px">
            <span style="font-size:58px">🎰</span><b style="font-size:42px;font-weight:900;color:#ff9a9e">Buscar un pelotazo</b></div>
          <svg id="arr" width="120" height="110" viewBox="0 0 120 110" style="position:absolute;left:340px;top:236px"><path d="M60 6 V86" stroke="#f0d488" stroke-width="10" stroke-linecap="round" stroke-dasharray="90" stroke-dashoffset="90"/><path d="M30 66 L60 100 L90 66" fill="none" stroke="#f0d488" stroke-width="10" stroke-linecap="round" stroke-linejoin="round" opacity="0"/></svg>
          <div id="sB" style="position:absolute;left:56px;right:56px;top:352px;border-radius:24px;background:rgba(240,212,136,.10);border:2px solid #c9a54c;box-shadow:0 0 40px rgba(201,165,76,.25);padding:26px;opacity:0">
            <div style="display:flex;align-items:center;gap:20px"><span style="font-size:58px">🏛️</span><b style="font-size:44px;font-weight:900;line-height:1.05">Construir una<br><span style="color:#f0d488">cartera seria</span></b></div>
            <div id="b1" style="margin-top:24px;display:flex;align-items:center;gap:16px;font-size:36px;font-weight:800;opacity:0"><span style="color:#6fe0a6">✓</span>📅 A medio – largo plazo</div>
            <div id="b2" style="margin-top:14px;display:flex;align-items:center;gap:16px;font-size:36px;font-weight:800;opacity:0"><span style="color:#6fe0a6">✓</span>💰 Ganar dinero</div></div>`, "card", "left:1040px;");
      tl.fromTo(cS, { opacity: 0, x: 60, scale: 0.95 }, { opacity: 1, x: 0, scale: 1, duration: 0.5, ease: "expo.out" }, 14.05);
      const AR = cS.querySelectorAll("#arr path");
      tl.to(AR[0], { attr: { "stroke-dashoffset": 0 }, duration: 0.35, ease: "power2.out" }, 14.38);
      tl.to(AR[1], { opacity: 1, duration: 0.15 }, 14.65);
      tl.to("#sA", { opacity: 0.45, duration: 0.3 }, 14.84);
      tl.fromTo("#sB", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "back.out(1.8)" }, 14.84);
      tl.fromTo("#b1", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, 16.84);
      tl.fromTo("#b2", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.3 }, 17.8);
      tl.to(cS, { opacity: 0, x: 50, duration: 0.25, ease: "power2.in" }, 18.7);

      // ---------- 18.85–20.84: stay ----------
      kw(`<b class="box">QUÉDATE 👇</b>`, 19.08, 19.74);
      kw(`<span class="serif">este vídeo</span><b class="box">SÍ</b><span class="serif" style="margin:0 0 0 18px">te va a interesar</span>`, 19.78, null);
