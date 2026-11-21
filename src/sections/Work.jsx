import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SectionLabel from "../components/SectionLabel";
import KineticHeading from "../components/KineticHeading";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";
// Live projects + the coming-soon slot. Desktop: pinned horizontal track (motion.js).
// Mobile / narrow: a normally scrollable row — touch swipe, mouse drag, arrow buttons, counter + progress bar (no React state).
const shown = projects.filter((p) => p.status === "live" || p.status === "coming-soon");
export default function Work() {
  const trk = useRef(), cnt = useRef(), bar = useRef();
  useEffect(() => {
    const t = trk.current;
    if (!window.matchMedia("(max-width: 899px)").matches) return;
    const f = () => {
      const c = t.firstElementChild; if (!c) return;
      const max = t.scrollWidth - t.clientWidth, i = Math.min(Math.round(t.scrollLeft / (c.offsetWidth + 16)), t.children.length - 1);
      if (cnt.current) cnt.current.textContent = String(i + 1).padStart(2, "0");
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? t.scrollLeft / max : 0})`;
    };
    let down = false, sx = 0, sl = 0;
    const pd = (e) => { if (e.pointerType !== "mouse") return; down = true; sx = e.clientX; sl = t.scrollLeft; t.classList.add("is-drag"); };
    const pm = (e) => { if (down) t.scrollLeft = sl - (e.clientX - sx); };
    const pu = () => { down = false; t.classList.remove("is-drag"); };
    f(); t.addEventListener("scroll", f, { passive: true }); t.addEventListener("pointerdown", pd); window.addEventListener("pointermove", pm); window.addEventListener("pointerup", pu);
    return () => { t.removeEventListener("scroll", f); t.removeEventListener("pointerdown", pd); window.removeEventListener("pointermove", pm); window.removeEventListener("pointerup", pu); };
  }, []);
  const go = (d) => { const t = trk.current, c = t.firstElementChild; t.scrollBy({ left: d * (c.offsetWidth + 16), behavior: "smooth" }); };
  return (
    <section id="work" className="sec work">
      <SectionLabel n="02">Selected work</SectionLabel>
      <KineticHeading lines={["WORK IN", "PROGRESS."]} />
      <Link to="/projects" className="ulink" data-reveal>VIEW FULL ARCHIVE ↗</Link>
      <div className="hz work__hz">
        <div className="work__track" ref={trk}>{shown.map((p, i) => <ProjectRow key={p.id} p={p} index={i} />)}</div>
        <div className="work__bar" aria-hidden="true"><i ref={bar} /></div>
      </div>
      <div className="work__ctrl">
        <p className="label"><span ref={cnt}>01</span> / {String(shown.length).padStart(2, "0")}</p>
        <div className="work__arrows"><button type="button" aria-label="Previous project" onClick={() => go(-1)}>←</button><button type="button" aria-label="Next project" onClick={() => go(1)}>→</button></div>
      </div>
    </section>
  );
}
