      // ================= layout: A full face · B face + news · C face + chart · D full face =================
      const mk = (html, cls, style) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; $("#fx").appendChild(d); return d; };
      const sv = (tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); $("#mk").appendChild(e); return e; };
      const pop = (e, t, from) => tl.fromTo(e, Object.assign({ opacity: 0, scale: 0.6, y: 20 }, from || {}), { opacity: 1, scale: 1, x: 0, y: 0, duration: 0.35, ease: "back.out(2.2)" }, t);
      const fade = (e, t, d = 0.25) => tl.to(e, { opacity: 0, duration: d }, t);
      const fc = { b: 0 }, setFace = () => { $("#face").style.clipPath = `inset(0 0 ${fc.b}px 0)`; };
      const ccl = { b: 0 }, setCt = () => { $("#ct").style.clipPath = `inset(0 0 ${ccl.b}px 0)`; };
      setFace();
      const KF = __KF__;
      tl.set("#rw", { scale: KF.k[0][1], x: KF.k[0][2], y: KF.k[0][3] }, 0);
      tl.set("#rwfade", { y: KF.k[0][4] - 120 }, 0);
      KF.k.forEach((k, i) => {
        if (i === 0) return;
        const p = KF.k[i - 1], dt = k[0] - p[0];
        if (dt > 0.15 || Math.abs(k[3] - p[3]) > 60 || k[1] !== p[1]) { tl.set("#rw", { scale: k[1], x: k[2], y: k[3] }, k[0]); tl.set("#rwfade", { y: k[4] - 120 }, k[0]); return; }
        tl.to("#rw", { x: k[2], y: k[3], duration: dt, ease: "none" }, p[0]);
        tl.to("#rwfade", { y: k[4] - 120, duration: dt, ease: "none" }, p[0]);
      });
      // A 0 - 6.76: raw framed (head at the top, chips + captions below)
      tl.set("#face", { opacity: 0 }, 0);
      tl.set("#caps", { y: -60 }, 0);
      // B 6.76 - 14.68: face 0-900, news 900-1836
      tl.set(["#rw", "#rwfade"], { opacity: 0 }, 6.76);
      tl.set("#face", { opacity: 1 }, 6.76);
      tl.set(fc, { b: 1020 }, 6.76); tl.call(setFace, null, 6.77);
      tl.set("#ct", { top: 900, opacity: 1 }, 6.76);
      tl.set(ccl, { b: 284 }, 6.76); tl.call(setCt, null, 6.77);
      tl.fromTo("#ctIn", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.35, ease: "power2.out" }, 6.76);
      tl.set("#caps", { y: -610 }, 6.76);
      // C 14.68 - 27.2: face 0-700, chart 700-1920 (the TradingView chart itself is never altered)
      tl.set(fc, { b: 1220 }, 14.68); tl.call(setFace, null, 14.69);
      tl.set("#ct", { top: 700 }, 14.68);
      tl.set(ccl, { b: 0 }, 14.68); tl.call(setCt, null, 14.69);
      tl.set("#caps", { y: -830 }, 14.68);
      // D 27.2 - end: raw framed again
      tl.set("#ct", { opacity: 0 }, 27.2);
      tl.set("#face", { opacity: 0 }, 27.2);
      tl.set(["#rw", "#rwfade"], { opacity: 1 }, 27.2);
      tl.set("#caps", { y: -60 }, 27.2);
      tl.to("#caps", { y: 0, duration: 0.6, ease: "power2.inOut" }, 31.9);
      tl.to("#rwfade", { opacity: 0, duration: 0.4 }, 32.2);

      // ---------- A: hook ----------
      const hack = mk(`<span style="font-size:70px">🚨</span><b>HACKEO</b>`, "glass chip ov", "left:70px;top:1500px;");
      pop(hack, 0.1); tl.to("#redTint", { opacity: 1, duration: 0.15, yoyo: true, repeat: 3 }, 1.5);
      tl.to(hack, { x: -8, duration: 0.05, yoyo: true, repeat: 5, ease: "none" }, 1.5);
      tl.to(hack, { opacity: 0, duration: 0.2 }, 5.9);
      const top1 = mk("EL MÁS IMPORTANTE DEL MUNDO CRIPTO", "pill red ov", "left:70px;top:1640px;font-size:34px;");
      pop(top1, 3.24);
      const bnb = mk(`<img src="assets/logos/binancecoin.png"><b>BINANCE</b>`, "glass chip ov", "right:70px;top:1500px;");
      pop(bnb, 6.0, { x: 40 });
      tl.to([top1, bnb], { opacity: 0, duration: 0.2 }, 6.7);

      // ---------- B: the news, underlined while he says it ----------
      const ul = (x1, x2, y, t, col, d = 0.5) => {
        const r = sv("rect", { x: x1, y: y - 10, width: x2 - x1, height: 22, rx: 6, fill: col || "#ffe14d", opacity: 0.85, style: "mix-blend-mode:multiply" });
        tl.set(r, { scaleX: 0, transformOrigin: "0% 50%" }, 0); tl.to(r, { scaleX: 1, duration: d, ease: "power2.inOut" }, t); return r;
      };
      const u1 = ul(335, 1030, 172, 8.02, "#ffe14d", 0.9);
      const u2 = ul(420, 670, 285, 13.56, "#7ff0b5", 0.5);
      const stolen = mk(`<img src="assets/logos/pepe.png"><b>7.770.000.000 PEPE</b>`, "glass chip ov", "left:70px;top:610px;");
      pop(stolen, 8.4);
      const robados = mk("ROBADOS", "pill red ov", "left:700px;top:560px;font-size:30px;");
      pop(robados, 7.6);
      const toEth = mk(`<img src="assets/logos/pepe.png" style="width:64px;height:64px"><b style="font-size:40px">→</b><img src="assets/logos/ethereum.png" style="width:64px;height:64px"><b style="font-size:40px">14.049 ETH</b>`, "glass chip ov", "left:70px;top:610px;");
      tl.to(stolen, { opacity: 0, duration: 0.2 }, 13.4);
      pop(toEth, 13.56);
      tl.to([toEth, robados, u1, u2], { opacity: 0, duration: 0.2 }, 14.5);

      // ---------- C: the chart (his own marks stay, ours are added on top) ----------
      const chartTag = mk("PEPE · GRÁFICO SEMANAL", "pill dark ov", "left:40px;top:722px;font-size:26px;");
      pop(chartTag, 15.96);
      const noMod = mk("✓ NINGUNA MODIFICACIÓN", "pill green ov", "left:40px;top:790px;font-size:34px;");
      pop(noMod, 18.5);
      // the hack candle (wide view, 26 Oct week)
      const HX = 791, HY = 465;
      const arr = sv("g", { opacity: 0 });
      const ap = (d, w, c) => { const p = document.createElementNS(NS, "path"); p.setAttribute("d", d); p.setAttribute("fill", "none"); p.setAttribute("stroke", c); p.setAttribute("stroke-width", w); p.setAttribute("stroke-linecap", "round"); p.setAttribute("stroke-linejoin", "round"); arr.appendChild(p); };
      ap(`M${HX - 250} ${HY - 230} Q${HX - 120} ${HY - 220} ${HX - 30} ${HY - 40}`, 16, "#1a0507");
      ap(`M${HX - 250} ${HY - 230} Q${HX - 120} ${HY - 220} ${HX - 30} ${HY - 40}`, 10, "#e5484d");
      ap(`M${HX - 64} ${HY - 62} L${HX - 30} ${HY - 40} L${HX - 22} ${HY - 80}`, 10, "#e5484d");
      const hackTag = sv("g", { opacity: 0 });
      { const r = document.createElementNS(NS, "rect"); r.setAttribute("x", HX - 560); r.setAttribute("y", HY - 300); r.setAttribute("width", 330); r.setAttribute("height", 64); r.setAttribute("rx", 32); r.setAttribute("fill", "#e5484d"); hackTag.appendChild(r);
        const tx = document.createElementNS(NS, "text"); tx.setAttribute("x", HX - 395); tx.setAttribute("y", HY - 256); tx.setAttribute("text-anchor", "middle"); tx.setAttribute("font-size", 32); tx.setAttribute("font-weight", 900); tx.setAttribute("fill", "#fff"); tx.setAttribute("font-family", "Inter"); tx.textContent = "🚨 HACKEO · 30 OCT"; hackTag.appendChild(tx); }
      tl.to([arr, hackTag], { opacity: 1, duration: 0.25 }, 21.14);
      tl.to([arr, hackTag], { opacity: 0, duration: 0.2 }, 23.5);
      tl.to(noMod, { opacity: 0, duration: 0.2 }, 21.0);
      const nada = mk("NO HA PASADO ABSOLUTAMENTE NADA", "pill gold ov", "left:40px;top:790px;font-size:32px;");
      pop(nada, 24.72);
      tl.to([chartTag, nada], { opacity: 0, duration: 0.2 }, 27.0);

      // ---------- D: strength, big buyers ----------
      const bigPepe = mk(`<img src="assets/logos/pepe.png" style="width:230px;height:230px;border-radius:50%;box-shadow:0 0 0 8px #7dff9a,0 0 60px 14px rgba(80,255,140,0.6)">`, "ov", "left:425px;top:1420px;");
      tl.fromTo(bigPepe, { opacity: 0, scale: 0.3, rotation: -25 }, { opacity: 1, scale: 1, rotation: 0, duration: 0.4, ease: "back.out(2.4)" }, 27.3);
      tl.to(bigPepe, { opacity: 0, scale: 0.6, duration: 0.2 }, 27.95);
      const inm = mk(`<img src="assets/logos/pepe.png"><b>NI SE HA INMUTADO</b>`, "glass chip ov", "left:70px;top:1500px;");
      pop(inm, 28.0);
      tl.to(inm, { opacity: 0, duration: 0.2 }, 30.0);
      const str = mk(`<span style="font-size:70px">💪</span><b>FUERZA</b>`, "glass chip ov", "right:70px;top:1500px;");
      pop(str, 30.14, { x: 40 });
      tl.to(str, { opacity: 0, duration: 0.2 }, 33.3);
      const whale = mk(`<span style="font-size:76px">🐋</span><div><b style="display:block;font-size:44px">GRANDES COMPRADORES</b><b style="display:block;font-size:44px;color:#7ff0b5">DETRÁS</b></div>`, "glass chip ov", "left:120px;top:1560px;");
      pop(whale, 33.52);
      tl.to(whale, { opacity: 0, duration: 0.2 }, 34.05);
