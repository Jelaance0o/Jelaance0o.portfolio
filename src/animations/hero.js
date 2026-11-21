import { gsap } from "gsap";
import { isTouch } from "../hooks/useReducedMotion";
// Deliberate editorial reveal (no scrambling): meta .2s → name .4s → headline .6s → supporting 1.4s → availability/CTA 1.6s.
// Then the line-art object: layered cursor parallax, hover accent, click/tap "pop" (also scatters the stars), touch spin.
export function heroIntro(root, reduced) {
  const q = (s) => root.querySelectorAll(s);
  const words = q(".hero__line > span");
  if (reduced) { gsap.set([...words, ...q("[data-hero]")], { opacity: 1, yPercent: 0, y: 0, clipPath: "none" }); return; }
  gsap.set(words, { yPercent: 70, opacity: 0, clipPath: "inset(0 0 100% 0)" });
  gsap.set(q("[data-hero]"), { opacity: 0, y: 16 });
  const up = { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" };
  gsap.timeline()
    .to(q('[data-hero="meta"]'), up, 0.2).to(q('[data-hero="brand"]'), up, 0.4)
    .to(words, { yPercent: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1.1, ease: "expo.out", stagger: 0.14 }, 0.6)
    .to(q('[data-hero="sub"]'), up, 1.4).to(q('[data-hero="cta"]'), { ...up, stagger: 0.1 }, 1.6);

  const shape = root.querySelector(".hero__shape");
  if (!shape) return;
  const parts = [...shape.querySelectorAll("[data-d]")], circle = shape.querySelector("g"), rect = shape.querySelector("rect");
  gsap.set(parts, { svgOrigin: "100 100" });
  const pop = () => { const b = shape.getBoundingClientRect(); window.dispatchEvent(new CustomEvent("starburst", { detail: { x: b.left + b.width / 2, y: b.top + b.height / 2 } })); return gsap.timeline()
    .to(circle, { scale: 1.2, duration: 0.2, ease: "power2.out" }).to(circle, { scale: 1, duration: 1, ease: "elastic.out(1,0.35)" })
    .to(rect, { rotation: "+=90", duration: 1.2, ease: "expo.out" }, 0); };
  const off = [];
  if (isTouch()) { // tap anywhere in the hero: shape spins and pops
    const tap = () => { gsap.to(shape, { rotation: "+=60", duration: 1.1, ease: "power3.out" }); pop(); };
    root.addEventListener("pointerdown", tap); off.push(() => root.removeEventListener("pointerdown", tap));
  } else {
    const o = { duration: 1.4, ease: "power3" }, o2 = { duration: 0.9, ease: "power3" };
    const x = gsap.quickTo(shape, "x", o), y = gsap.quickTo(shape, "y", o), r = gsap.quickTo(shape, "rotation", o);
    const lay = parts.map((el) => ({ x: gsap.quickTo(el, "x", o2), y: gsap.quickTo(el, "y", o2), d: +el.dataset.d }));
    const move = (e) => {
      const nx = e.clientX / innerWidth - 0.5, ny = e.clientY / innerHeight - 0.5, k = 1.4 - Math.min(1, Math.hypot(nx, ny) * 2) * 0.8;
      x(nx * 70 * k); y(ny * 70 * k); r(nx * 25 * k);
      lay.forEach((l) => { l.x(nx * l.d * 2); l.y(ny * l.d * 2); }); // each layer drifts at its own depth
    };
    window.addEventListener("pointermove", move); shape.addEventListener("pointerdown", pop);
    off.push(() => { window.removeEventListener("pointermove", move); shape.removeEventListener("pointerdown", pop); });
  }
  return () => off.forEach((f) => f());
}
