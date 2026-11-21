import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onVelocity } from "../hooks/useLenis";
import { initReveals, revealLines } from "./reveal";
gsap.registerPlugin(ScrollTrigger);

// One entry point for homepage motion; returns cleanup. Conditions: reduce | desk (>=900px, motion OK) | otherwise mobile.
export function initMotion(root) {
  const mm = gsap.matchMedia();
  const q = (s) => gsap.utils.toArray(s, root);
  mm.add({ reduce: "(prefers-reduced-motion: reduce)", desk: "(min-width: 900px) and (prefers-reduced-motion: no-preference)" }, (ctx) => {
    const { reduce, desk } = ctx.conditions, off = [];
    if (reduce) { initReveals(root, true); gsap.set(q(".line__in"), { clearProps: "all" }); return; }

    // 1) pins first. WORK: pinned horizontal track, released straight into vertical scroll.
    const wk = root.querySelector(".work__hz"), wt = root.querySelector(".work__track");
    if (wk && wt) {
      const dist = () => wt.scrollWidth - innerWidth + 80;
      const tw = gsap.to(wt, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: wk, pin: true, scrub: 0.6, start: "top top", end: () => "+=" + dist() * (desk ? 0.6 : 1), invalidateOnRefresh: true, anticipatePin: 1 } });
      const DIR = [{ x: 90, rotation: 3 }, { x: -90, rotation: -3 }, { x: 50, rotation: 2 }];
      q(".work__track .project").forEach((p, i) => { // cards fly in from different directions and settle
        const from = { opacity: 0, scale: 0.85, y: 100, ...DIR[i % 3] }, to = { opacity: 1, scale: 1, y: 0, x: 0, rotation: 0 };
        if (i === 0) gsap.fromTo(p, from, { ...to, duration: 1.2, ease: "power3.out", scrollTrigger: { trigger: wk, start: "top 80%", once: true } });
        else gsap.fromTo(p, from, { ...to, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tw, start: "left 95%", end: "left 55%", scrub: true } });
        const plate = p.querySelector(".project__plate");
        if (plate) gsap.fromTo(plate, { x: -40, scale: 1.15 }, { x: 40, scale: 1.15, ease: "none", scrollTrigger: { trigger: p, containerAnimation: tw, start: "left right", end: "right left", scrub: true } });
      });
    }

    // 2) hero zoom-out: large line-art object shrinks and drifts toward centre as the hero scrolls away
    gsap.fromTo(".hero__shape svg", { scale: desk ? 1.3 : 1, xPercent: desk ? 10 : 0 }, { scale: 0.85, xPercent: desk ? -15 : 0, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });

    // 3) reveals, line reveals, progress; mobile card entrance
    initReveals(root, false);
    revealLines(root);
    gsap.to(root.querySelector(".progress i"), { scaleY: 1, ease: "none", scrollTrigger: { start: 0, end: "max", scrub: 0.3 } });
    // services marquee is pure CSS (works on every device); here only the scroll-speed boost via playbackRate
    const trs = q(".svc__track"), rate = (k) => trs.forEach((t) => t.getAnimations().forEach((a) => a.updatePlaybackRate(k)));
    let mt; off.push(onVelocity((v) => { rate(1 + Math.min(Math.abs(v) * 0.15, 6)); clearTimeout(mt); mt = setTimeout(() => rate(1), 150); }), () => clearTimeout(mt));
    // horizontal scroll drift for headings + hero lines (all sizes; smaller on mobile)
    const A = desk ? 1 : 0.6;
    q("[data-kinetic]").forEach((h) => { const tl = gsap.timeline({ scrollTrigger: { trigger: h, start: "top bottom", end: "bottom top", scrub: true } });
      h.querySelectorAll(".line").forEach((l, i) => tl.fromTo(l, { xPercent: (i % 2 ? 4 : -4) * A }, { xPercent: (i % 2 ? -4 : 4) * A, ease: "none" }, 0)); });
    const htl = gsap.timeline({ scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    q(".hero__line").forEach((l, i) => htl.to(l, { xPercent: (i % 2 ? 38 : -38) * A, ease: "none" }, 0));
    if (!desk) {
      return () => off.forEach((f) => f());
    }

    // desktop-only extras
    const nst = { trigger: ".now", start: "top bottom", end: "bottom top", scrub: true };
    gsap.fromTo("[data-now]", { scale: 0.85, rotation: -6 }, { scale: 1.1, rotation: 6, ease: "none", scrollTrigger: nst });
    gsap.fromTo("[data-now-load]", { x: -40 }, { x: 40, ease: "none", scrollTrigger: nst });
    const tw = new Map();
    q("[data-float]").forEach((el) => tw.set(el, gsap.to(el, { y: -(+el.dataset.amp || 8), rotation: +el.dataset.rot || 1, duration: 3 / (+el.dataset.speed || 1), ease: "sine.inOut", yoyo: true, repeat: -1, paused: true })));
    const io = new IntersectionObserver((es) => es.forEach((e) => tw.get(e.target)?.paused(!e.isIntersecting)));
    tw.forEach((_, el) => io.observe(el)); off.push(() => io.disconnect());
    return () => off.forEach((f) => f());
  });
  return () => mm.revert();
}
