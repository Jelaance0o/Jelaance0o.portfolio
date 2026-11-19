import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { isTouch, prefersReduced } from "../hooks/useReducedMotion";
// Labels come from data-cursor="VIEW|GO|SOON". No React state per mouse move.
export default function Cursor() {
  const el = useRef(), txt = useRef();
  useEffect(() => {
    if (isTouch() || prefersReduced()) return;
    const node = el.current;
    document.documentElement.classList.add("has-cursor");
    const x = gsap.quickTo(node, "x", { duration: 0.25, ease: "power3" });
    const y = gsap.quickTo(node, "y", { duration: 0.25, ease: "power3" });
    const move = (e) => { x(e.clientX); y(e.clientY); };
    const over = (e) => {
      const t = e.target.closest("[data-cursor], a, button, input, textarea, select");
      const label = t?.dataset.cursor ?? (t?.matches("a.ulink") ? "VIEW" : "");
      txt.current.textContent = label;
      node.classList.toggle("is-link", !!t);
      node.classList.toggle("is-label", !!label);
    };
    window.addEventListener("pointermove", move); window.addEventListener("pointerover", over);
    return () => { window.removeEventListener("pointermove", move); window.removeEventListener("pointerover", over); document.documentElement.classList.remove("has-cursor"); };
  }, []);
  return <div ref={el} className="cursor" aria-hidden="true"><span ref={txt} /></div>;
}
