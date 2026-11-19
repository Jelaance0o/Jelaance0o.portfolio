import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import SectionLabel from "../components/SectionLabel";
import { stack } from "../data/stack";
import { prefersReduced } from "../hooks/useReducedMotion";
// Category index on the left (hover / focus / tap to switch), the technologies for that category on the right.
// State changes only on user interaction (never on scroll or pointer move); GSAP staggers the new items in.
export default function Stack() {
  const [i, setI] = useState(0);
  const panel = useRef();
  const cat = stack[i];
  useEffect(() => {
    if (prefersReduced()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".tech__item", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, ease: "power3.out", stagger: 0.05, clearProps: "all" });
      gsap.fromTo(".tech__big", { yPercent: 25, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.8, ease: "power3.out", clearProps: "all" });
    }, panel);
    return () => ctx.revert();
  }, [i]);
  return (
    <section id="stack" className="sec">
      <SectionLabel n="03">Stack — working with, building with, learning</SectionLabel>
      <div className="tech" data-reveal>
        <div className="tech__tabs" role="tablist" aria-label="Technology categories">
          {stack.map((c, k) => (
            <button key={c.id} role="tab" id={`tab-${c.id}`} aria-selected={k === i} aria-controls="tech-panel" className="tech__tab"
              onMouseEnter={() => setI(k)} onFocus={() => setI(k)} onClick={() => setI(k)}>
              {c.label}<small>{String(c.items.length).padStart(2, "0")}</small>
            </button>))}
        </div>
        <div className="tech__panel" id="tech-panel" role="tabpanel" aria-labelledby={`tab-${cat.id}`} ref={panel}>
          <span className="tech__big" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
          <p className="label tech__blurb">{cat.blurb}</p>
          <ul className="tech__grid">
            {cat.items.map((t) => <li className="tech__item" key={t.name}><b>{t.name}</b><span>{t.note}</span></li>)}
          </ul>
        </div>
      </div>
    </section>
  );
}
