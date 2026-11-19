import { Link } from "react-router-dom";
import SectionLabel from "../components/SectionLabel";
import KineticHeading from "../components/KineticHeading";
import ProjectRow from "../components/ProjectRow";
import { projects } from "../data/projects";
// Live projects + the coming-soon slot. Desktop: pinned horizontal track; mobile: native swipe carousel. Full list on /projects.
const shown = projects.filter((p) => p.status === "live" || p.status === "coming-soon");
export default function Work() {
  return (
    <section id="work" className="sec work">
      <SectionLabel n="02">Selected work</SectionLabel>
      <KineticHeading lines={["WORK IN", "PROGRESS."]} />
      <Link to="/projects" className="ulink" data-reveal>VIEW FULL ARCHIVE ↗</Link>
      <div className="hz work__hz"><div className="work__track">{shown.map((p, i) => <ProjectRow key={p.id} p={p} index={i} />)}</div></div>
      <p className="label work__hint" aria-hidden="true">SWIPE →</p>
    </section>
  );
}
