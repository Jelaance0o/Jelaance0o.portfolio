// Line-level (not per-character) reveal + scroll-driven horizontal drift. Animated by animations/motion.js.
export default function KineticHeading({ as: Tag = "h2", lines, className = "big", accent, kinetic = true }) {
  return (
    <Tag className={className} data-lines data-vel {...(kinetic ? { "data-kinetic": "" } : {})}>
      {lines.map((l) => {
        const [a, b] = accent && l.includes(accent) ? l.split(accent) : [l];
        return <span className="line" key={l}><span className="line__in">{b === undefined ? a : <>{a}<em>{accent}</em>{b}</>}</span></span>;
      })}
    </Tag>
  );
}
