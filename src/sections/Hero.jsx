import { useLayoutEffect, useRef } from "react";
import ResumeLink from "../components/ResumeLink";
import FloatingElement from "../components/FloatingElement";
const L = ["BUILDING", "DIGITAL", "EXPERIENCES."];
export default function Hero() {
  const ref = useRef();
  // Fit-text: measures the real rendered words and sizes them to fill the available width.
  // Desktop: one shared size (the widest word fills the width, capped so the whole hero fits the viewport height). Mobile: each word fills the width, so the type is as big as it can be.
  useLayoutEffect(() => {
    const root = ref.current;
    const fit = () => {
      const lines = [...root.querySelectorAll(".hero__line")], avail = root.querySelector("h1").clientWidth;
      const sizes = lines.map((l) => { l.style.fontSize = "100px"; return ((100 * avail) / l.firstElementChild.offsetWidth) * 0.985; });
      const mobile = innerWidth < 900, cs = getComputedStyle(root);
      const others = [...root.children].reduce((a, c) => a + (c === root.querySelector("h1") || getComputedStyle(c).position === "absolute" ? 0 : c.offsetHeight), 0);
      const availH = root.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom) - others - 24;
      const common = Math.min(...sizes, mobile ? Infinity : availH / (lines.length * 0.9)); // desktop: also cap so everything fits one viewport
      lines.forEach((l, i) => (l.style.fontSize = (mobile ? sizes[i] : common) + "px"));
    };
    fit(); window.addEventListener("resize", fit); document.fonts?.ready.then(fit);
    return () => window.removeEventListener("resize", fit);
  }, []);
  return (
    <section id="home" className="hero" ref={ref}>
      <div className="hero__shape" data-cursor="PLAY" aria-hidden="true"><FloatingElement amp={8} rot={1.5} speed={0.7}><svg viewBox="0 0 200 200"><circle data-d="10" cx="100" cy="100" r="80" /><rect data-d="18" x="40" y="40" width="120" height="120" /><path data-d="26" d="M20 180 180 20" /><circle data-d="38" cx="100" cy="14" r="3.5" fill="#c8ff3d" stroke="none" /></svg></FloatingElement></div>
      <div>
        <p className="label" data-hero="meta">JELAANCE0O — Software Engineer · Frontend / Full-Stack Developer</p>
        <p className="hero__name" data-hero="brand">JEELANCE ROY</p>
      </div>
      <h1 aria-label="Building digital experiences.">{L.map((w) => <span className="hero__line" key={w} aria-hidden="true"><span>{w}</span></span>)}</h1>
      <span className="hero__cue" aria-hidden="true">SCROLL</span>
      <div className="hero__foot">
        <p data-hero="sub">Full-stack developer building SaaS products, REST APIs and production-ready web applications — with an eye for interaction and design.</p>
        <p className="avail" data-hero="cta"><i className="pulse" /> AVAILABLE FOR OPPORTUNITIES</p>
        <div className="hero__links" data-hero="cta"><ResumeLink /></div>
      </div>
    </section>
  );
}
