/* Renders the diagram specs described in CONTENT_SCHEMA.md as inline SVG (styled by CSS classes). */
(function () {
  "use strict";
  const W = 760;
  let uid = 0;
  const esc = s => String(s == null ? "" : s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  function wrap(text, max) {
    const words = String(text || "").split(/\s+/).filter(Boolean), lines = [];
    let cur = "";
    for (const w of words) {
      if (!cur) cur = w;
      else if ((cur + " " + w).length <= max) cur += " " + w;
      else { lines.push(cur); cur = w; }
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }
  function textBlock(x, y, lines, cls, lh) {
    const off = -((lines.length - 1) * lh) / 2;
    return lines.map((l, i) => `<text x="${x}" y="${y + off + i * lh}" text-anchor="middle" dominant-baseline="central" class="${cls}">${esc(l)}</text>`).join("");
  }
  function node(cx, cy, w, h, item, alt) {
    const label = wrap(item.label, Math.max(8, Math.floor(w / 8.6)));
    const sub = item.sub ? wrap(item.sub, Math.max(10, Math.floor(w / 6.8))) : [];
    const total = label.length * 17 + sub.length * 15;
    const top = cy - total / 2;
    let s = `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" rx="9" class="dg-box${alt ? " alt" : ""}"/>`;
    s += textBlock(cx, top + (label.length * 17) / 2, label, "dg-label", 17);
    if (sub.length) s += textBlock(cx, top + label.length * 17 + (sub.length * 15) / 2, sub, "dg-sub", 15);
    return s;
  }
  function edgePoint(cx, cy, hw, hh, dx, dy) {
    const t = Math.min(dx ? hw / Math.abs(dx) : Infinity, dy ? hh / Math.abs(dy) : Infinity);
    return [cx + dx * t, cy + dy * t];
  }
  function arrow(x1, y1, x2, y2, id) {
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" class="dg-line" marker-end="url(#${id})"/>`;
  }
  function defs(id) {
    return `<defs><marker id="${id}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" class="dg-arrow"/></marker></defs>`;
  }
  function svg(h, body, label) {
    return `<svg viewBox="0 0 ${W} ${h}" role="img" aria-label="${esc(label)}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  }

  function flow(d, id) {
    const st = d.steps || [], n = st.length;
    if (n <= 4) {
      const gap = 40, bw = (W - 20 - gap * (n - 1)) / n, bh = 84, y = 60;
      let b = "";
      st.forEach((s, i) => {
        const cx = 10 + bw / 2 + i * (bw + gap);
        b += node(cx, y, bw, bh, s, false);
        if (i < n - 1) b += arrow(cx + bw / 2 + 3, y, cx + bw / 2 + gap - 4, y, id);
      });
      let h = 122;
      if (d.loop && n > 1) {
        const x1 = 10 + bw / 2 + (n - 1) * (bw + gap), x0 = 10 + bw / 2;
        b += `<path d="M${x1},${y + bh / 2 + 2} V${y + bh / 2 + 26} H${x0} V${y + bh / 2 + 6}" class="dg-line" marker-end="url(#${id})"/>`;
        h = 160;
      }
      return { h, b };
    }
    const bw = 400, bh = 58, gap = 26, x = W / 2;
    let b = "";
    st.forEach((s, i) => {
      const cy = 12 + bh / 2 + i * (bh + gap);
      b += node(x, cy, bw, bh, s, false);
      if (i < n - 1) b += arrow(x, cy + bh / 2 + 2, x, cy + bh / 2 + gap - 3, id);
    });
    const last = 12 + bh / 2 + (n - 1) * (bh + gap);
    if (d.loop) {
      const first = 12 + bh / 2;
      b += `<path d="M${x + bw / 2 + 2},${last} H${x + bw / 2 + 40} V${first} H${x + bw / 2 + 6}" class="dg-line" marker-end="url(#${id})"/>`;
    }
    return { h: last + bh / 2 + 12, b };
  }

  function ring(d, id, arrows) {
    const st = d.steps || [], n = st.length, H = n > 6 ? 500 : 440;
    const cx = W / 2, cy = H / 2, rx = 275, ry = H / 2 - 52, bw = 160, bh = 66;
    const pts = st.map((_, i) => { const a = -Math.PI / 2 + (2 * Math.PI * i) / n; return [cx + rx * Math.cos(a), cy + ry * Math.sin(a)]; });
    let b = "";
    if (d.center) {
      const cl = wrap(d.center, 12);
      if (!arrows) pts.forEach(([x, y]) => {
        const [x1, y1] = edgePoint(cx, cy, 62, 62, x - cx, y - cy), [x2, y2] = edgePoint(x, y, bw / 2, bh / 2, cx - x, cy - y);
        b += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" class="dg-line"/>`;
      });
      b += `<circle cx="${cx}" cy="${cy}" r="66" class="dg-center"/>` + textBlock(cx, cy, cl, "dg-center-label", 18);
    } else if (!arrows) {
      b += `<circle cx="${cx}" cy="${cy}" r="8" class="dg-center"/>`;
    }
    if (arrows) pts.forEach(([x, y], i) => {
      const [nx, ny] = pts[(i + 1) % n], dx = nx - x, dy = ny - y;
      const [x1, y1] = edgePoint(x, y, bw / 2 + 4, bh / 2 + 4, dx, dy), [x2, y2] = edgePoint(nx, ny, bw / 2 + 6, bh / 2 + 6, -dx, -dy);
      b += arrow(x1, y1, x2, y2, id);
    });
    pts.forEach(([x, y], i) => { b += node(x, y, bw, bh, st[i], false); });
    return { h: H, b };
  }

  function layers(d) {
    const it = d.items || [], bh = 60, gap = 10;
    let b = "";
    it.forEach((s, i) => { b += node(W / 2, 8 + bh / 2 + i * (bh + gap), W - 40, bh, s, i === 0); });
    return { h: 16 + it.length * (bh + gap) - gap, b };
  }

  function pyramid(d) {
    const it = d.items || [], n = it.length, lh = 74, gap = 6, top = 10, minW = 180, maxW = W - 20;
    let b = "";
    it.forEach((s, i) => {
      const y0 = top + i * (lh + gap), y1 = y0 + lh;
      const w0 = minW + ((maxW - minW) * i) / n, w1 = minW + ((maxW - minW) * (i + 1)) / n;
      b += `<polygon points="${W / 2 - w0 / 2},${y0} ${W / 2 + w0 / 2},${y0} ${W / 2 + w1 / 2},${y1} ${W / 2 - w1 / 2},${y1}" class="dg-box${i === 0 ? " alt" : ""}"/>`;
      const label = wrap(s.label, 24), sub = s.sub ? wrap(s.sub, 40) : [];
      const total = label.length * 17 + sub.length * 15, t0 = y0 + lh / 2 - total / 2;
      b += textBlock(W / 2, t0 + (label.length * 17) / 2, label, "dg-label", 17);
      if (sub.length) b += textBlock(W / 2, t0 + label.length * 17 + (sub.length * 15) / 2, sub, "dg-sub", 15);
    });
    return { h: top * 2 + n * (lh + gap) - gap, b };
  }

  function matrix(d) {
    const rows = d.rows || [], cols = d.cols || [], cells = d.cells || [];
    const rh = rows.length ? 150 : 0, cw = (W - 4 - rh) / Math.max(1, cols.length), chars = Math.max(10, Math.floor(cw / 7.2));
    const headH = 40;
    const rowHeights = rows.map((r, i) => {
      const ls = [wrap(r, 18).length].concat((cells[i] || []).map(c => wrap(c, chars).length));
      return Math.max(46, Math.max.apply(null, ls) * 16 + 18);
    });
    let b = "", y = 2;
    cols.forEach((c, j) => {
      const x = 2 + rh + j * cw;
      b += `<rect x="${x}" y="${y}" width="${cw}" height="${headH}" class="dg-cell-head"/>` + textBlock(x + cw / 2, y + headH / 2, wrap(c, chars), "dg-label", 16);
    });
    y += headH;
    rows.forEach((r, i) => {
      const h = rowHeights[i];
      b += `<rect x="2" y="${y}" width="${rh}" height="${h}" class="dg-cell-head"/>` + textBlock(2 + rh / 2, y + h / 2, wrap(r, 18), "dg-label", 16);
      cols.forEach((_, j) => {
        const x = 2 + rh + j * cw;
        b += `<rect x="${x}" y="${y}" width="${cw}" height="${h}" class="dg-cell"/>` + textBlock(x + cw / 2, y + h / 2, wrap((cells[i] || [])[j] || "", chars), "dg-sub dg-cell-text", 16);
      });
      y += h;
    });
    return { h: y + 2, b };
  }

  function render(d) {
    if (!d || !d.type) return "";
    const id = "ah" + ++uid;
    let r;
    switch (d.type) {
      case "flow": r = flow(d, id); break;
      case "cycle": r = ring(d, id, true); break;
      case "hub": r = ring(d, id, false); break;
      case "layers": r = layers(d); break;
      case "pyramid": r = pyramid(d); break;
      case "matrix": r = matrix(d); break;
      default: return "";
    }
    const parts = (d.steps || d.items || []).map(s => s.label).concat(d.rows || []);
    const label = (d.title || "Diagram") + ": " + parts.join(", ");
    return `<figure class="diagram">${svg(r.h, defs(id) + r.b, label)}${d.title ? `<figcaption>${esc(d.title)}</figcaption>` : ""}</figure>`;
  }

  window.AAISMDiagram = { render, esc };
})();
