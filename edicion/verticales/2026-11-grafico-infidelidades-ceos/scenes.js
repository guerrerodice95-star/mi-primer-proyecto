      const fx = $("#fx");
      const mk = (html, cls, style, par) => { const d = document.createElement("div"); if (cls) d.className = cls; if (style) d.style.cssText = style; d.innerHTML = html || ""; (par || fx).appendChild(d); return d; };
      const sv = (p, tag, a) => { const e = document.createElementNS(NS, tag); for (const k in a) e.setAttribute(k, a[k]); p.appendChild(e); return e; };
      const pct = (v, d = 0) => (v >= 0 ? "+" : "−") + Math.abs(v).toFixed(d).replace(".", ",").replace(/\B(?=(\d{3})+(?!\d))/g, ".") + " %";

      // ---------- title (always on) ----------
      const title = mk(`<h1>Infidelidades de CEOs<br>y su acción después</h1><p>Del día del escándalo a hoy</p>`, "", "", fx); title.id = "title"; title.style.position = "absolute";
      tl.fromTo(title, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }, 0.05);
      const date = mk("", "", "", fx); date.id = "date"; date.style.position = "absolute";
      const foot = mk(`Datos reales: Yahoo Finance, del día de la noticia al 25 nov 2026.<br>Que suba después no significa que sea por eso.`, "", "", fx); foot.id = "foot"; foot.style.position = "absolute";
      tl.fromTo(foot, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0.6);

      const SC = [
        ["bezos", "Jeff Bezos", "amzn", "Amazon", "💔 Se destapa su aventura con Lauren Sánchez", "9 ene. 2019"],
        ["gates", "Bill Gates", "msft", "Microsoft", "💔 Sale a la luz su relación con una empleada (WSJ)", "16 may. 2021"],
        ["chey", "Chey Tae-won", "skhynix", "SK hynix · presidente de SK Group", "💔 Admite una aventura y una hija fuera del matrimonio", "29 dic. 2015"],
        ["brin", "Sergey Brin", "googl", "Google · cofundador", "💔 Se publica su relación con una empleada de Google", "28 ago. 2013"],
        ["huang", "Jensen Huang", "nvda", "NVIDIA · CEO", "🕵️ Según el NYT, relación con una presunta espía china", "11 nov. 2026"],
      ];
      const X0 = 150, X1 = 830, Y0 = 690, Y1 = 1300, T0 = 1.3, LEN = 4.25;
      const nice = (m) => [25, 50, 100, 200, 500, 1000, 2000, 2500, 5000].find((s) => m / s <= 4.2) || 5000;
      SC.forEach(([ph, nm, lg, co, ev, evd], k) => {
        const D = DATA[k], P = D.pts, n = P.length, T = T0 + k * LEN, neg = D.pmax <= 0.01;
        const lo = Math.min(0, ...P.map((p) => p[0])); const vmax = neg ? 6 : D.pmax * 1.08, vmin = neg ? Math.floor((lo - 4) / 10) * 10 : lo - D.pmax * 0.04;
        const X = (i) => X0 + (i / (n - 1)) * (X1 - X0), Y = (v) => Y1 - ((v - vmin) / (vmax - vmin)) * (Y1 - Y0);
        const col = neg ? "#ff4d5e" : "#39e07a";
        // header
        const hd = mk(`<img class="ph" src="assets/ph/${ph}.png"><div><div class="nm">${nm}</div><div class="co"><img src="assets/logos/${lg}.png">${co}</div></div>`, "hd ov");
        const evl = mk(`${ev}<br><span>${evd}</span>`, "ev ov");
        tl.fromTo([hd, evl], { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.4, ease: "power3.out", stagger: 0.08 }, T);
        // chart
        const S = sv(fx, "svg", { class: "ch", viewBox: "0 0 1080 1920" });
        const step = neg ? 10 : nice(vmax);
        for (let v = neg ? vmin : 0; v <= vmax; v += step) {
          sv(S, "line", { x1: X0, x2: X1 + 20, y1: Y(v), y2: Y(v), stroke: v === 0 ? "rgba(255,255,255,.35)" : "rgba(255,255,255,.08)", "stroke-width": v === 0 ? 3 : 2 });
          const t = sv(S, "text", { x: X0 - 16, y: Y(v) + 9, "text-anchor": "end", fill: "#9a9a9a", "font-size": 26, "font-weight": 700, "font-family": "Inter" }); t.textContent = v === 0 ? "0 %" : pct(v);
        }
        sv(S, "line", { x1: X0, x2: X0, y1: Y0 - 30, y2: Y1 + 10, stroke: "rgba(255,255,255,.35)", "stroke-width": 3 });
        const xl = sv(S, "text", { x: X0, y: Y1 + 50, fill: "#9a9a9a", "font-size": 26, "font-weight": 700, "font-family": "Inter" }); xl.textContent = P[0][1];
        const glow = sv(S, "path", { d: "", fill: "none", stroke: col, "stroke-width": 14, "stroke-linejoin": "round", "stroke-linecap": "round", opacity: 0.35, style: "filter:blur(10px)" });
        const line = sv(S, "path", { d: "", fill: "none", stroke: col, "stroke-width": 6, "stroke-linejoin": "round", "stroke-linecap": "round", style: `filter:drop-shadow(0 0 8px ${col})` });
        const ring = sv(S, "circle", { r: 40, fill: "#000", stroke: col, "stroke-width": 5, style: `filter:drop-shadow(0 0 12px ${col})` });
        const img = sv(S, "image", { href: `assets/ph/${ph}.png`, width: 74, height: 74 });
        const vl = sv(S, "text", { "font-size": 46, "font-weight": 900, fill: col, "font-family": "Inter", stroke: "#000", "stroke-width": 10, "paint-order": "stroke", "stroke-linejoin": "round" });
        const vs = sv(S, "text", { "font-size": 24, "font-weight": 800, fill: "#cfcfcf", "font-family": "Inter", stroke: "#000", "stroke-width": 8, "paint-order": "stroke", "stroke-linejoin": "round" }); vs.textContent = neg ? "desde la noticia" : "desde el escándalo";
        // peak pin
        const pk = sv(S, "g", { opacity: 0 });
        if (!neg) {
          sv(pk, "circle", { cx: X(D.peak), cy: Y(P[D.peak][0]), r: 10, fill: "#f0d488" });
          const pt = sv(pk, "text", { x: X(D.peak), y: Y(P[D.peak][0]) - 26, "text-anchor": "middle", "font-size": 28, "font-weight": 900, fill: "#f0d488", "font-family": "Inter" });
          pt.textContent = "máx. " + pct(D.pmax);
        }
        const pr = { k: 0 };
        const draw = () => {
          const m = Math.max(1, Math.round(pr.k * (n - 1)));
          let d = `M${X(0)} ${Y(P[0][0])}`; for (let i = 1; i <= m; i++) d += ` L${X(i).toFixed(1)} ${Y(P[i][0]).toFixed(1)}`;
          line.setAttribute("d", d); glow.setAttribute("d", d);
          const hx = X(m), hy = Y(P[m][0]);
          ring.setAttribute("cx", hx); ring.setAttribute("cy", hy); img.setAttribute("x", hx - 37); img.setAttribute("y", hy - 37);
          const right = hx < 720;
          [vl, vs].forEach((e) => { e.setAttribute("text-anchor", right ? "start" : "end"); e.setAttribute("x", right ? hx + 56 : hx - 56); });
          vl.setAttribute("y", hy - 2); vs.setAttribute("y", hy + 30);
          vl.textContent = pct(P[m][0], Math.abs(P[m][0]) < 100 ? 1 : 0);
          date.textContent = P[m][1];
        };
        draw();
        tl.set(S, { opacity: 1 }, T + 0.15);
        tl.fromTo(S, { opacity: 0 }, { opacity: 1, duration: 0.3, immediateRender: false }, T + 0.15);
        tl.set(date, { opacity: 1 }, T + 0.15);
        tl.call(draw, null, T + 0.16);
        tl.to(pr, { k: 1, duration: 3.1, ease: "none", onUpdate: draw }, T + 0.35);
        if (!neg) tl.fromTo(pk, { opacity: 0 }, { opacity: 1, duration: 0.25 }, T + 0.35 + 3.1 * (D.peak / (n - 1)));
        tl.fromTo(vl, { scale: 1 }, { scale: 1.15, duration: 0.18, yoyo: true, repeat: 1, transformOrigin: "50% 50%", immediateRender: false }, T + 3.5);
        if (k < SC.length - 1) { tl.to([hd, evl, S], { opacity: 0, duration: 0.2 }, T + LEN - 0.2); }
        else {
          const q = mk("¿Y AHORA?", "tag ov", `left:${X1 - 140}px;top:${Y0 - 10}px;font-size:44px;background:#ff4d5e;color:#fff;`);
          tl.fromTo(q, { opacity: 0, scale: 0.6 }, { opacity: 1, scale: 1, duration: 0.35, ease: "back.out(2.5)" }, T + 3.55);
          tl.to([hd, evl, S, q, date], { opacity: 0, duration: 0.25 }, T + LEN + 0.3);
        }
      });

      // ---------- summary ----------
      const TS = T0 + SC.length * LEN + 0.45;
      const sh = mk(`<span style="font-size:30px;font-weight:800;letter-spacing:.14em;color:#f0d488">RESUMEN · MÁXIMO TRAS EL ESCÁNDALO</span>`, "ov", "left:0;right:0;text-align:center;top:440px;");
      tl.fromTo(sh, { opacity: 0 }, { opacity: 1, duration: 0.3 }, TS);
      SC.forEach(([ph, nm, lg, co], k) => {
        const D = DATA[k], neg = D.pmax <= 0.01;
        const r = mk(`<img class="p" src="assets/ph/${ph}.png"><div class="t"><b>${co.split(" · ")[0]}</b><span>${nm}</span></div><div class="v" style="color:${neg ? "#ff4d5e" : "#39e07a"}">${neg ? pct(D.last, 1) + " ?" : pct(D.pmax)}</div>`, "sum ov", `top:${520 + k * 150}px;`);
        tl.fromTo(r, { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.35, ease: "power3.out" }, TS + 0.15 + k * 0.18);
      });
