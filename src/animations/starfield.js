import { gsap } from "gsap";
import { isTouch, prefersReduced } from "../hooks/useReducedMotion";
// One canvas, drawn on the shared GSAP ticker. Stars: slow drift + scroll parallax/streaks, repulsion and glow near the
// pointer (thin lines to the nearest few on desktop), click/tap shockwave. Reduced motion: drawn once, static.
export function startStarfield(canvas) {
  const ctx = canvas.getContext("2d"), reduced = prefersReduced(), touch = isTouch();
  const R = touch ? 110 : 190, PUSH = touch ? 26 : 46, m = { x: -9999, y: -9999 };
  const sparks = [];
  let w = 0, h = 0, stars = [], t, burst = 0, bx = 0, by = 0, lastY = scrollY, vel = 0;
  const init = () => {
    const dpr = Math.min(devicePixelRatio || 1, touch ? 1 : 1.5);
    w = innerWidth; h = innerHeight; canvas.width = w * dpr; canvas.height = h * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.fillStyle = "#fff"; ctx.strokeStyle = "#fff"; ctx.lineWidth = 0.5;
    const n = Math.round(Math.min(touch ? 70 : 170, (w * h) / 9000));
    stars = Array.from({ length: n }, () => ({ x: Math.random() * w, y: Math.random() * h, r: 0.4 + Math.random() * 1.1, a: 0.2 + Math.random() * 0.5, d: 0.2 + Math.random() * 0.8, vx: (Math.random() - 0.5) * 0.05, vy: (Math.random() - 0.5) * 0.03, ox: 0, oy: 0 }));
    draw();
  };
  const draw = () => {
    ctx.clearRect(0, 0, w, h);
    vel += (scrollY - lastY - vel) * 0.15; lastY = scrollY;
    const sy = scrollY * 0.06; let lines = 0;
    for (const s of stars) {
      let y = s.y, tx = 0, ty = 0, a = s.a, near = 0;
      if (!reduced) {
        s.x += s.vx * s.d; s.y += s.vy * s.d;
        if (s.x < 0) s.x = w; else if (s.x > w) s.x = 0;
        if (s.y < 0) s.y = h; else if (s.y > h) s.y = 0;
        y = (((s.y - sy * s.d) % h) + h) % h;
        let dx = s.x - m.x, dy = y - m.y, d2 = dx * dx + dy * dy;
        if (d2 < R * R) { const d = Math.sqrt(d2) || 1; near = 1 - d / R; const f = near * near * PUSH * s.d; tx = (dx / d) * f; ty = (dy / d) * f; a = Math.min(1, a + near * 0.45); }
        if (burst > 0.02) { dx = s.x - bx; dy = y - by; const d = Math.sqrt(dx * dx + dy * dy) || 1; if (d < 320) { const f = (1 - d / 320) * burst * 70 * s.d; tx += (dx / d) * f; ty += (dy / d) * f; } }
        s.ox += (tx - s.ox) * 0.09; s.oy += (ty - s.oy) * 0.09;
      }
      const px = s.x + s.ox, py = y + s.oy;
      if (near > 0.25 && !touch && lines < 8) { lines++; ctx.globalAlpha = near * 0.35; ctx.beginPath(); ctx.moveTo(m.x, m.y); ctx.lineTo(px, py); ctx.stroke(); }
      ctx.globalAlpha = a;
      const st = Math.min(Math.abs(vel) * s.d * 0.5, 14); // streak with scroll speed
      if (st > 1.5) ctx.fillRect(px - s.r, py - s.r, s.r * 2, s.r * 2 + st); else { ctx.beginPath(); ctx.arc(px, py, s.r, 0, 6.2832); ctx.fill(); }
    }
    for (let i = sparks.length - 1; i >= 0; i--) { // star-burst particles (fired from the hero shape)
      const p = sparks[i]; p.x += p.vx; p.y += p.vy; p.vx *= 0.95; p.vy *= 0.95; p.life -= 0.014;
      if (p.life <= 0) { sparks.splice(i, 1); continue; }
      ctx.globalAlpha = p.life; ctx.fillStyle = p.c; ctx.beginPath(); ctx.arc(p.x, p.y, p.r * (0.5 + p.life * 0.5), 0, 6.2832); ctx.fill();
    }
    ctx.fillStyle = "#fff";
    burst *= 0.93;
  };
  const mv = (e) => { m.x = e.clientX; m.y = e.clientY; }, lv = () => { m.x = m.y = -9999; };
  const dn = (e) => { m.x = bx = e.clientX; m.y = by = e.clientY; burst = touch ? 0.8 : 1; };
  const sb = (e) => { const n = touch ? 18 : 32; for (let i = 0; i < n; i++) { const a = Math.random() * 6.2832, sp = 2 + Math.random() * 5; sparks.push({ x: e.detail.x, y: e.detail.y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, life: 1, r: 0.8 + Math.random() * 1.6, c: Math.random() < 0.35 ? "#c8ff3d" : "#fff" }); } };
  const rs = () => { clearTimeout(t); t = setTimeout(init, 150); };
  init(); window.addEventListener("resize", rs);
  const ev = [["pointermove", mv, { passive: true }], ["pointerdown", dn, { passive: true }], ["pointerup", lv], ["pointercancel", lv]];
  if (!reduced) { gsap.ticker.add(draw); window.addEventListener("starburst", sb); ev.forEach(([n, f, o]) => window.addEventListener(n, f, o)); document.documentElement.addEventListener("mouseleave", lv); }
  return () => { clearTimeout(t); gsap.ticker.remove(draw); window.removeEventListener("starburst", sb); window.removeEventListener("resize", rs); ev.forEach(([n, f]) => window.removeEventListener(n, f)); document.documentElement.removeEventListener("mouseleave", lv); };
}
