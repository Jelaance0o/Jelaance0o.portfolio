import ResumeLink from "../components/ResumeLink";
import FloatingElement from "../components/FloatingElement";
const L = ["CREATING", "IMPACT."];
export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__shape" aria-hidden="true"><FloatingElement amp={8} rot={1.5} speed={0.7}><svg viewBox="0 0 200 200"><circle cx="100" cy="100" r="80" /><rect x="40" y="40" width="120" height="120" /><path d="M20 180 180 20" /></svg></FloatingElement></div>
      <div>
        <p className="label" data-hero="meta">JELAANCE0O — Software Engineer · Frontend / Full-Stack Developer</p>
        <p className="hero__name" data-hero="brand">JEELANCE ROY</p>
      </div>
      <h1 aria-label="Creating impact.">{L.map((w) => <span className="hero__line" key={w} aria-hidden="true"><span>{w}</span></span>)}</h1>
      <div className="hero__foot">
        <p data-hero="sub">Developer focused on modern web applications, interactive interfaces and creative digital experiences.</p>
        <p className="avail" data-hero="cta"><i className="pulse" /> AVAILABLE FOR OPPORTUNITIES</p>
        <div className="hero__links" data-hero="cta"><ResumeLink /></div>
      </div>
    </section>
  );
}
