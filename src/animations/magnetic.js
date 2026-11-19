import { gsap } from "gsap";
// Button follows pointer, text follows slightly more, subtle scale. quickTo only — no React state.
export function magnetic(el, s = 0.3) {
  const t = el.querySelector("[data-mag-text]");
  const q = (n, p, d = 0.7) => gsap.quickTo(n, p, { duration: d, ease: "elastic.out(1,0.6)" });
  const x = q(el, "x"), y = q(el, "y"), tx = q(t, "x"), ty = q(t, "y");
  const move = (e) => { const r = el.getBoundingClientRect(), dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2; x(dx * s); y(dy * s); tx(dx * s * 0.5); ty(dy * s * 0.5); };
  const enter = () => gsap.to(el, { scale: 1.06, duration: 0.4, ease: "power3.out", overwrite: "auto" });
  const leave = () => { x(0); y(0); tx(0); ty(0); gsap.to(el, { scale: 1, duration: 0.5, ease: "power3.out" }); };
  el.addEventListener("pointermove", move); el.addEventListener("pointerenter", enter); el.addEventListener("pointerleave", leave);
  return () => { el.removeEventListener("pointermove", move); el.removeEventListener("pointerenter", enter); el.removeEventListener("pointerleave", leave); gsap.killTweensOf([el, t]); };
}
