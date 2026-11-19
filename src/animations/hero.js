import { gsap } from "gsap";
import { isTouch } from "../hooks/useReducedMotion";
// Deliberate editorial reveal (no scrambling/glitch): meta .2s → name .4s → headline .6s → supporting 1.4s → availability/CTA 1.6s.
export function heroIntro(root, reduced) {
  const q = (s) => root.querySelectorAll(s);
  const words = q(".hero__line > span");
  if (reduced) { gsap.set([...words, ...q("[data-hero]")], { opacity: 1, yPercent: 0, y: 0, clipPath: "none" }); return; }
  gsap.set(words, { yPercent: 70, opacity: 0, clipPath: "inset(0 0 100% 0)" });
  gsap.set(q("[data-hero]"), { opacity: 0, y: 16 });
  const up = { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" };
  gsap.timeline()
    .to(q('[data-hero="meta"]'), up, 0.2)
    .to(q('[data-hero="brand"]'), up, 0.4)
    .to(words, { yPercent: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out", stagger: 0.14 }, 0.6)
    .to(q('[data-hero="sub"]'), up, 1.4)
    .to(q('[data-hero="cta"]'), { ...up, stagger: 0.1 }, 1.6);
  const shape = root.querySelector(".hero__shape");
  if (!shape || isTouch()) return;
  const o = { duration: 1.4, ease: "power3" };
  const x = gsap.quickTo(shape, "x", o), y = gsap.quickTo(shape, "y", o), r = gsap.quickTo(shape, "rotation", o);
  const move = (e) => {
    const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5;
    const k = 1.4 - Math.min(1, Math.hypot(nx, ny) * 2) * 0.8;
    x(nx * 70 * k); y(ny * 70 * k); r(nx * 25 * k);
  };
  window.addEventListener("pointermove", move);
  return () => window.removeEventListener("pointermove", move);
}
