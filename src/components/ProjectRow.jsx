// One panel in the "Selected work" track. Driven entirely by data/projects.js.
export default function ProjectRow({ p, index }) {
  const soon = p.status === "coming-soon",
    n = String(index + 1).padStart(2, "0");
  return (
    <article
      className={`project ${soon ? "project--soon" : ""}`}
      data-cursor={soon ? "SOON" : "VIEW"}
    >
      <div className="project__visual">
        <div className="project__plate">
          <span>{n}</span>
        </div>
      </div>
      <div className="project__info">
        <p className="label">
          {n} / {soon ? "Work in progress" : p.category}
        </p>
        <h3>{p.title}</h3>
        <p className="project__desc">{p.description}</p>
        {p.technologies.length > 0 && (
          <ul className="tags">
            {p.technologies.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        )}
        {!soon && (
          <div className="project__links">
            <a
              className="ulink"
              href={p.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.githubUrl ? "LIVE EXPERIENCE" : "VIEW PROJECT"} →
            </a>
            {p.githubUrl && (
              <a
                className="ulink"
                href={p.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                SOURCE CODE →
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
