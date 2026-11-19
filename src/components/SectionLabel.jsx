export default function SectionLabel({ n, children }) {
  return <p className="label" data-reveal><span>{n}</span> — {children}</p>;
}
