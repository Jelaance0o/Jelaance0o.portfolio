import { gsap } from "gsap";
import { initReveals, revealLines } from "./reveal";
// Projects page motion: reveals, line reveals, and a cursor-following preview (quickTo, no React state).
export function initArchive(root) {
  const mm = gsap.matchMedia();
  mm.add({ reduce: "(prefers-reduced-motion: reduce)", ok: "(prefers-reduced-motion: no-preference)", desk: "(min-width: 900px) and (prefers-reduced-motion: no-preference) and (hover: hover)" }, (ctx) => {
    const { reduce, desk } = ctx.conditions;
    initReveals(root, reduce);
    if (reduce) { gsap.set(root.querySelectorAll(".line__in"), { clearProps: "all" }); return; }
    revealLines(root);
    const list = root.querySelector(".archive__list"), pv = root.querySelector(".preview");
    if (!desk || !list || !pv) return;
    const img = pv.firstElementChild;
    gsap.set(pv, { scale: 0.8, autoAlpha: 0 });
    const x = gsap.quickTo(pv, "x", { duration: 0.6, ease: "power3" }), y = gsap.quickTo(pv, "y", { duration: 0.6, ease: "power3" });
    const mv = (e) => { x(e.clientX + 40); y(e.clientY); };
    const over = (e) => {
      const r = e.target.closest(".arow"); if (!r) return;
      img.style.backgroundImage = r.dataset.img ? `url(${r.dataset.img})` : "none"; img.textContent = r.dataset.img ? "" : r.dataset.n;
      gsap.to(pv, { autoAlpha: 1, scale: 1, duration: 0.45, ease: "power3.out", overwrite: "auto" });
    };
    const out = () => gsap.to(pv, { autoAlpha: 0, scale: 0.8, duration: 0.3, overwrite: "auto" });
    window.addEventListener("pointermove", mv); list.addEventListener("pointerover", over); list.addEventListener("pointerleave", out);
    return () => { window.removeEventListener("pointermove", mv); list.removeEventListener("pointerover", over); list.removeEventListener("pointerleave", out); };
  });
  return () => mm.revert();
}
