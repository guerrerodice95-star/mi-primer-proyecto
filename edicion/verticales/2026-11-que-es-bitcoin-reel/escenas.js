      // ================= explainer scenes =================
      const mk = (parent, html, cls, style) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (typeof parent === "string" ? $(parent) : parent).appendChild(d); return d; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const scn = (t0, t1) => { const d = mk("#scene", "", "sc"); tl.to(d, { opacity: 1, duration: 0.3 }, t0); if (t1 != null) tl.to(d, { opacity: 0, duration: 0.3 }, t1); return d; };
      const title = (sc, html, t, sub, ts) => {
        const h = mk(sc, html, "ttl"); tl.fromTo(h, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, t);
        if (sub) { const p = mk(sc, sub, "sub ov"); tl.fromTo(p, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.3 }, ts); }
        return h;
      };

      // ---------- HOOK (0 - 6): "un mundo sin dólares ni euros… ¿podría Bitcoin ocupar su lugar?" ----------
      tl.set("#vignette", { opacity: 1 }, 0);
      const nUSD = mk("#fx", `<b>$</b><div><span>DÓLAR</span><small>BANCO CENTRAL</small></div>`, "glass note ov", "left:70px;top:1090px;color:#fff;");
      const nEUR = mk("#fx", `<b>€</b><div><span>EURO</span><small>BANCO CENTRAL</small></div>`, "glass note ov", "left:610px;top:1190px;color:#fff;");
      gsap.set(nEUR, { width: 400, left: 610 });
      pop(nUSD, 1.36, { y: 40, rotation: -8 }); pop(nEUR, 2.12, { y: 40, rotation: 8 });
      [nUSD, nEUR].forEach((n, i) => {
        tl.to(n, { y: 260, rotation: i ? 18 : -18, opacity: 0, filter: "blur(10px)", duration: 0.8, ease: "power2.in" }, 3.3 + i * 0.12);
      });
      const c3w = mk("#fx", `<div id="c3"><div class="f">₿</div><div class="f back">₿</div></div>`, "", ""); c3w.id = "c3wrap";
      tl.fromTo(c3w, { opacity: 0, scale: 0.3, y: 120 }, { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: "back.out(1.8)" }, 4.84);
      tl.fromTo("#c3", { rotationY: -180 }, { rotationY: 360, duration: 1.2, ease: "power2.out" }, 4.84);
      tl.to(c3w, { opacity: 0, scale: 0.8, duration: 0.3 }, 5.95);

      // ---------- 6 - 12.8 (full): "¿QUÉ ES BITCOIN?" ----------
      const qb = mk("#fx", `<span style="font-size:110px;font-weight:900;color:#fff;letter-spacing:-0.02em">¿QUÉ ES <span style="color:#f7931a">BITCOIN</span>?</span>`, "big", "top:1250px;");
      tl.fromTo(qb, { opacity: 0, scale: 1.3 }, { opacity: 1, scale: 1, duration: 0.3, ease: "power3.out" }, 9.76);
      tl.to(qb, { x: -10, skewX: -8, duration: 0.05, yoyo: true, repeat: 3, ease: "none" }, 10.1);
      fade(qb, 11.6, 0.2);
      const mf = mk("#fx", "LA MONEDA DEL FUTURO", "pill gold ov", "top:1250px;font-size:46px;"); gsap.set(mf, { left: 540, xPercent: -50 });
      pop(mf, 11.72); fade(mf, 12.7, 0.2);

      // ---------- SCENE A (12.85 - 18.6): digital money, person to person, no bank ----------
      const A = scn(12.85, 18.55);
      title(A, "Dinero <em>digital</em>", 13.44, "de persona a persona", 15.08);
      const pL = mk(A, "🙂", "person ov", "left:90px;top:860px;"), pR = mk(A, "😎", "person ov", "left:820px;top:860px;");
      pop(pL, 13.6); pop(pR, 13.75);
      const line = mk(A, "", "ov", "left:260px;top:941px;width:560px;height:8px;border-radius:4px;background:repeating-linear-gradient(90deg,#c9a54c 0 22px,transparent 22px 36px);");
      tl.fromTo(line, { opacity: 0, scaleX: 0, transformOrigin: "0 50%" }, { opacity: 1, scaleX: 1, duration: 0.45, ease: "power2.out" }, 13.9);
      const cA = mk(A, "₿", "coin sm ov", "left:220px;top:899px;");
      tl.fromTo(cA, { opacity: 0, scale: 0.4 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2.4)" }, 14.46);
      tl.to(cA, { x: 520, duration: 1.1, ease: "power2.inOut" }, 14.75);
      tl.to(cA, { scale: 1.25, duration: 0.12, yoyo: true, repeat: 1 }, 15.85);
      const okA = mk(A, "✓ RECIBIDO", "pill green ov", "left:770px;top:1060px;font-size:28px;"); pop(okA, 15.9);
      const bank = mk(A, `<div style="font-size:100px;line-height:1">🏦</div><div style="font-size:26px;font-weight:900;color:#cfc3a6;margin-top:6px">BANCO</div>`, "card ov", "left:430px;top:640px;width:220px;height:190px;display:flex;flex-direction:column;align-items:center;justify-content:center;");
      pop(bank, 16.6);
      const xB = mk(A, `<svg viewBox="0 0 220 190" width="220" height="190"><path d="M30 30 L190 160 M190 30 L30 160" stroke="#e5484d" stroke-width="16" stroke-linecap="round" fill="none"/></svg>`, "ov", "left:430px;top:640px;");
      tl.fromTo(xB, { opacity: 0, scale: 1.6 }, { opacity: 1, scale: 1, duration: 0.25, ease: "power3.in" }, 17.26);
      const noB = mk(A, "SIN BANCOS QUE AUTORICEN", "pill red ov", "top:1220px;font-size:34px;"); gsap.set(noB, { left: 540, xPercent: -50 }); pop(noB, 17.94);
      // second transfer, no stop in the middle
      tl.set(cA, { x: 0, opacity: 0 }, 17.3);
      tl.to(cA, { opacity: 1, duration: 0.1 }, 17.4);
      tl.to(cA, { x: 520, duration: 0.7, ease: "power2.inOut" }, 17.5);

      // ---------- SCENE B (18.6 - 25.4): only 21 million, nobody can print more ----------
      const Bs = scn(18.6, 25.35);
      title(Bs, "Solo <em>21 millones</em>", 20.52, "y nunca habrá más", 22.86);
      const cnt = mk(Bs, "0", "ov", ""); cnt.id = "cnt";
      const bar = mk(Bs, `<div id="barF"></div>`, "ov", ""); bar.id = "bar";
      tl.to([cnt, bar], { opacity: 1, duration: 0.3 }, 19.0);
      gsap.set("#barF", { scaleX: 0 });
      const cv = { v: 0 };
      tl.to(cv, { v: 21000000, duration: 1.6, ease: "power2.out", onUpdate: () => { cnt.textContent = Math.round(cv.v).toLocaleString("es-ES"); } }, 20.7);
      tl.to("#barF", { scaleX: 1, duration: 1.6, ease: "power2.out" }, 20.7);
      const lock = mk(Bs, "🔒 MÁXIMO", "pill gold ov", "left:770px;top:960px;font-size:30px;"); pop(lock, 22.3);
      // government tries to print
      const gov = mk(Bs, `<div style="display:flex;align-items:center;gap:22px"><div style="font-size:80px">🏛️</div><div><div style="font-size:24px;font-weight:800;color:#c9a54c;letter-spacing:0.14em">GOBIERNO</div><div style="font-size:34px;font-weight:900;color:#fff">Fabricar más bitcoins</div></div></div>
          <div id="prt" style="margin-top:22px;height:80px;border-radius:18px;background:#2f6fe0;color:#fff;font-size:34px;font-weight:900;display:flex;align-items:center;justify-content:center">IMPRIMIR</div>`, "card ov", "left:150px;top:1080px;width:780px;padding:30px 36px;");
      pop(gov, 23.1, { y: 30 });
      tl.to("#prt", { scale: 0.94, duration: 0.07, yoyo: true, repeat: 1 }, 24.2);
      tl.to("#prt", { x: -14, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 24.36);
      tl.to("#prt", { backgroundColor: "#e5484d", duration: 0.1 }, 24.3);
      tl.set("#prt", { textContent: "✕ IMPOSIBLE" }, 24.32);
      const tap = mk(Bs, `<svg viewBox="0 0 24 24" width="70" height="70"><path d="M3 2l17 9.5-7.4 1.6L9.4 20z" fill="#fff" stroke="#111" stroke-width="1.4" stroke-linejoin="round"/></svg>`, "ov", "left:560px;top:1300px;");
      tl.fromTo(tap, { opacity: 0, x: 200, y: 160 }, { opacity: 1, x: 0, y: 0, duration: 0.4, ease: "power2.out" }, 23.7);

      // ---------- 25.5 - 27.3 (full): "¿Dónde se llevan las cuentas?" ----------
      const dq = mk("#fx", `<span style="font-size:86px;font-weight:900;color:#fff">¿DÓNDE SE LLEVAN</span><br><span style="font-size:96px;font-weight:900;color:#f0d488">LAS CUENTAS?</span>`, "big", "top:1180px;line-height:1.05;");
      tl.fromTo(dq, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.35, ease: "back.out(2)" }, 25.75);
      fade(dq, 27.1, 0.2);

      // ---------- SCENE C (27.3 - 35.4): thousands of computers, blockchain, no double spend ----------
      const C = scn(27.3, 35.4);
      const cT = title(C, "Miles de <em>ordenadores</em>", 27.46);
      const nodes = [];
      for (let r = 0; r < 6; r++) for (let c = 0; c < 7; c++) {
        const n = mk(C, "", "node ov", `left:${90 + c * 132}px;top:${560 + r * 130}px;`); nodes.push(n);
        tl.fromTo(n, { opacity: 0, scale: 0.5 }, { opacity: 1, scale: 1, duration: 0.25, ease: "back.out(2)" }, 27.6 + (r + c) * 0.05);
        tl.to(n, { borderColor: "#f0d488", backgroundColor: "#2a2312", duration: 0.15, yoyo: true, repeat: 1 }, 28.5 + (r + c) * 0.06);
      }
      // to the blockchain
      tl.to(nodes, { opacity: 0, scale: 0.6, duration: 0.3, stagger: 0.005 }, 29.6);
      fade(cT, 29.6, 0.2);
      title(C, "La <em>blockchain</em>", 29.84, "un registro que comprueba todo", 30.62);
      const BKX = [60, 270, 480, 690];
      const blks = BKX.map((x, i) => mk(C, `<b>#${1021 + i}</b><span>${["0,3 BTC", "1,2 BTC", "0,05 BTC", "…"][i]}</span><div class="ok">✓</div>`, "blk ov", `left:${x}px;top:760px;`));
      const links = BKX.slice(0, 3).map((x) => mk(C, "", "link ov", `left:${x + 170}px;top:840px;width:40px;`));
      blks.forEach((b, i) => {
        tl.fromTo(b, { opacity: 0, x: 120, scale: 0.8 }, { opacity: 1, x: 0, scale: 1, duration: 0.35, ease: "back.out(1.8)" }, 29.95 + i * 0.18);
        if (i < 3) tl.fromTo(links[i], { opacity: 0, scaleX: 0 }, { opacity: 1, scaleX: 1, duration: 0.2 }, 30.15 + i * 0.18);
      });
      // double spend: same coin twice
      const c1 = mk(C, "₿", "coin sm ov", "left:740px;top:1080px;"), c2 = mk(C, "₿", "coin sm ov", "left:740px;top:1080px;");
      const tag = mk(C, "MISMO DINERO", "pill dark ov", "left:640px;top:1200px;font-size:26px;");
      pop(c1, 31.5); pop(tag, 31.6);
      tl.to(c1, { x: -4, y: -280, scale: 0.7, duration: 0.6, ease: "power2.inOut" }, 31.82);
      tl.to(c1, { opacity: 0, duration: 0.15 }, 32.4);
      tl.to(blks[3].querySelector(".ok"), { opacity: 1, duration: 0.2 }, 32.42);
      tl.set(blks[3].querySelector("span"), { textContent: "0,5 BTC" }, 32.42);
      tl.set(c2, { opacity: 1 }, 32.46);
      tl.to(c2, { x: -4, y: -200, duration: 0.45, ease: "power2.in" }, 32.5);
      tl.to(c2, { x: 30, y: 0, rotation: 25, duration: 0.35, ease: "power2.out" }, 32.95);
      tl.to(c2, { backgroundImage: "radial-gradient(circle at 35% 30%, #ff9a9d, #e5484d 60%, #8f1c20)", duration: 0.1 }, 32.95);
      const rej = mk(C, "✕ DOBLE GASTO RECHAZADO", "pill red ov", "top:1250px;font-size:34px;"); gsap.set(rej, { left: 540, xPercent: -50 });
      pop(rej, 33.0); fade(tag, 32.9, 0.15);
      // all registered
      tl.to(blks.slice(0, 3).map((b) => b.querySelector(".ok")), { opacity: 1, duration: 0.2, stagger: 0.1 }, 34.22);
      const reg = mk(C, "✓ TODO QUEDA REGISTRADO", "pill green ov", "top:1360px;font-size:34px;"); gsap.set(reg, { left: 540, xPercent: -50 });
      pop(reg, 34.64);

      // ---------- SCENE D (35.4 - 41): digital gold, scarce, anywhere ----------
      const D = scn(35.4, 40.9);
      title(D, "El <em>oro</em> digital", 36.88);
      const gold = mk(D, `<svg viewBox="0 0 300 180" width="300" height="180"><defs><linearGradient id="gg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a8"/><stop offset="0.5" stop-color="#e2b84f"/><stop offset="1" stop-color="#8a6d2a"/></linearGradient></defs>
          <path d="M60 20 H240 L290 160 H10 Z" fill="url(#gg)" stroke="#6b521b" stroke-width="4"/><path d="M80 40 H220" stroke="rgba(255,255,255,0.5)" stroke-width="6" stroke-linecap="round"/></svg>`, "ov", "left:90px;top:760px;");
      const eq = mk(D, "=", "ov", "left:440px;top:770px;font-size:140px;font-weight:900;color:#f0d488;");
      const cD = mk(D, "₿", "coin ov", "left:640px;top:760px;width:190px;height:190px;font-size:116px;");
      pop(gold, 36.6, { x: -60 }); pop(eq, 36.9); pop(cD, 37.06, { x: 60 });
      const esc = mk(D, "ESCASO · 21 M", "pill gold ov", "left:600px;top:990px;font-size:30px;"); pop(esc, 37.98);
      // anywhere in the world
      const globe = mk(D, `<svg viewBox="0 0 900 360" width="900" height="360">
          <ellipse cx="450" cy="180" rx="430" ry="160" fill="none" stroke="rgba(201,165,76,0.35)" stroke-width="3" stroke-dasharray="6 10"/>
          <path id="arc" d="M120 250 Q450 -60 780 250" fill="none" stroke="#f0d488" stroke-width="6" stroke-linecap="round" stroke-dasharray="900" stroke-dashoffset="900"/>
          <text x="120" y="310" text-anchor="middle" font-size="64" font-family="Inter">🇪🇸</text><text x="780" y="310" text-anchor="middle" font-size="64" font-family="Inter">🇯🇵</text>
          <text x="450" y="330" text-anchor="middle" font-size="28" font-weight="900" fill="#cfc3a6" font-family="Inter">A CUALQUIER PARTE DEL MUNDO</text></svg>`, "ov", "left:90px;top:1110px;");
      tl.to(globe, { opacity: 1, duration: 0.3 }, 38.6);
      tl.to("#arc", { attr: { "stroke-dashoffset": 0 }, duration: 1.0, ease: "power2.inOut" }, 38.9);
      const cG = mk(D, "₿", "coin sm ov", "left:164px;top:1314px;width:70px;height:70px;font-size:42px;");
      tl.set(cG, { opacity: 1 }, 38.9);
      const gp = { k: 0 };
      tl.to(gp, { k: 1, duration: 1.0, ease: "power2.inOut", onUpdate: () => {
        const t = gp.k, x = (1 - t) * (1 - t) * 120 + 2 * (1 - t) * t * 450 + t * t * 780, y = (1 - t) * (1 - t) * 250 + 2 * (1 - t) * t * -60 + t * t * 250;
        cG.style.transform = `translate(${x - 120}px, ${y - 250}px)`;
      } }, 38.9);

      // ---------- 41 - 48 (full, glass in front): you don't need a whole bitcoin ----------
      const whole = mk("#fx", `<div class="coin" style="position:relative;width:240px;height:240px;font-size:150px">₿</div>`, "ov", "left:420px;top:1170px;");
      const wl = mk("#fx", "1 BITCOIN ENTERO", "pill dark ov", "top:1430px;font-size:34px;"); gsap.set(wl, { left: 540, xPercent: -50 });
      pop(whole, 42.84); pop(wl, 42.9);
      const xw = mk("#fx", `<svg viewBox="0 0 240 240" width="240" height="240"><path d="M30 30 L210 210 M210 30 L30 210" stroke="#e5484d" stroke-width="18" stroke-linecap="round"/></svg>`, "ov", "left:420px;top:1170px;");
      tl.fromTo(xw, { opacity: 0, scale: 1.5 }, { opacity: 1, scale: 1, duration: 0.22, ease: "power3.in" }, 43.42);
      tl.to([whole, xw, wl], { opacity: 0, duration: 0.25 }, 44.5);
      // small pieces
      const bits = [];
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2, rr = 230 + (i % 3) * 40;
        const b = mk("#fx", "₿", "coin sm ov", `left:${494}px;top:${1254}px;width:${70 - (i % 3) * 12}px;height:${70 - (i % 3) * 12}px;font-size:${40 - (i % 3) * 7}px;`);
        tl.fromTo(b, { opacity: 0, x: 0, y: 0, scale: 0.3 }, { opacity: 1, x: Math.cos(a) * rr, y: Math.sin(a) * rr * 0.55, scale: 1, duration: 0.6, ease: "back.out(1.6)" }, 44.74 + i * 0.03);
        bits.push(b);
      }
      const sats = mk("#fx", `<div style="font-size:30px;font-weight:800;color:#cfc3a6;letter-spacing:0.14em">1 BTC =</div><div style="font-size:72px;font-weight:900;color:#fff;line-height:1.05">100.000.000</div><div style="font-size:46px;font-weight:900;color:#f7931a">SATOSHIS</div>`, "glass ov", "left:270px;top:1170px;width:540px;padding:26px 0;text-align:center;");
      pop(sats, 46.9);
      tl.to(bits, { opacity: 0.35, duration: 0.3 }, 46.9);
      tl.to([sats, ...bits], { opacity: 0, duration: 0.3 }, 47.95);
