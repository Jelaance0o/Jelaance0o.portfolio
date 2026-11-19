import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// Batches every [data-reveal] inside root into grouped, staggered reveals.
export function initReveals(root, reduced) {
  const els = root.querySelectorAll("[data-reveal]");
  if (reduced) { gsap.set(els, { opacity: 1, y: 0 }); return; }
  gsap.set(els, { opacity: 0, y: 40 });
  ScrollTrigger.batch(els, {
    start: "top 90%", once: true,
    onEnter: (b) => gsap.to(b, { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08, overwrite: true }),
  });
}
export function initParallax(root, reduced) {
  if (reduced) return;
  gsap.matchMedia().add("(min-width: 900px)", () => {
    root.querySelectorAll("[data-parallax]").forEach((el) =>
      gsap.to(el, { yPercent: -10, ease: "none", scrollTrigger: { trigger: el, scrub: true } }));
  });
}
export function revealLines(root) {
  gsap.utils.toArray("[data-lines]", root).forEach((h) => gsap.fromTo(h.querySelectorAll(".line__in"),
    { yPercent: 100, opacity: 0, clipPath: "inset(0 0 100% 0)" },
    { yPercent: 0, opacity: 1, clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power4.out", stagger: 0.12, scrollTrigger: { trigger: h, start: "top 90%", once: true } }));
}
