import { useEffect, useRef } from "react";
import { projects } from "../data/projects";
import { initArchive } from "../animations/archive";
import KineticHeading from "../components/KineticHeading";
import MagneticButton from "../components/MagneticButton";
import SectionLabel from "../components/SectionLabel";
import Footer from "../sections/Footer";
// Shows every project with status "live" from src/data/projects.js; empty state otherwise.
const published = projects.filter((p) => p.status === "live");
export default function Projects() {
  const root = useRef();
  useEffect(() => initArchive(root.current), []);
  return (
    <main ref={root} className="archive">
      <section className="sec archive__head">
        <SectionLabel n="↗">Projects — all work</SectionLabel>
        <KineticHeading className="huge" lines={published.length ? ["COMPLETE", "ARCHIVE."] : ["THE WORK IS", "COMING."]} />
        {!published.length && <p className="archive__empty" data-reveal>Projects are currently being built.</p>}
      </section>
      <ul className="archive__list">
        {published.map((p, i) => {
          const n = String(i + 1).padStart(2, "0");
          return (
            <li key={p.slug} className="arow" data-reveal data-img={p.image} data-n={n} data-cursor="VIEW">
              <span className="label">{n}</span>
              <h2 className="arow__t">{p.title}</h2>
              <ul className="arow__m"><li>{p.category}</li>{p.year && <li>{p.year}</li>}{p.technologies.map((t) => <li key={t}>{t}</li>)}</ul>
              <p className="arow__d">{p.description}</p>
              <div className="arow__l">
                {p.liveUrl && <MagneticButton as="a" href={p.liveUrl} target="_blank" rel="noopener noreferrer" label="GO">VIEW PROJECT →</MagneticButton>}
                {p.githubUrl && <a className="ulink" href={p.githubUrl} target="_blank" rel="noopener noreferrer">SOURCE CODE →</a>}
                {p.caseStudyUrl && <a className="ulink" href={p.caseStudyUrl}>CASE STUDY →</a>}
              </div>
            </li>);
        })}
      </ul>
      <div className="preview" aria-hidden="true"><div className="preview__img" /></div>
      <Footer />
    </main>
  );
}
