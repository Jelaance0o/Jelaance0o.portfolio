import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { prefersReduced } from "./useReducedMotion";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
export let lenis = null;
const velListeners = new Set();
export const onVelocity = (fn) => { velListeners.add(fn); return () => velListeners.delete(fn); };
// Lenis -> ScrollTrigger.update ; GSAP ticker drives Lenis (single RAF loop)
export default function useLenis() {
  useEffect(() => {
    if (prefersReduced()) return;
    lenis = new Lenis({ lerp: 0.14, wheelMultiplier: 1, touchMultiplier: 1.4, smoothWheel: true });
    lenis.on("scroll", (e) => { ScrollTrigger.update(); velListeners.forEach((f) => f(e.velocity)); });
    const tick = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    return () => { gsap.ticker.remove(tick); lenis.destroy(); lenis = null; };
  }, []);
}
export const scrollToId = (id) => {
  const el = document.getElementById(id);
  if (!el) return;
  lenis ? lenis.scrollTo(el, { offset: 0 }) : el.scrollIntoView();
};
