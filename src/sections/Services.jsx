import { useState } from "react";
import SectionLabel from "../components/SectionLabel";
import { services } from "../data/services";
// Two infinite marquee rows (animated in motion.js). Pills float (CSS bob), fill on hover/tap, speed follows scroll.
// Copies beyond the first are aria-hidden duplicates for the seamless loop (hidden when reduced motion is on).
const half = Math.ceil(services.length / 2), ROWS = [services.slice(0, half).map((_, i) => i), services.slice(half).map((_, i) => i + half)], COPIES = 4;
export default function Services() {
  const [on, setOn] = useState(null);
  return (
    <section id="services" className="sec svc-sec">
      <SectionLabel n="04">What I build</SectionLabel>
      <div className="svc">
        {ROWS.map((ids, r) => (
          <div className="svc__row" key={r}>
            <ul className="svc__track">
              {Array.from({ length: COPIES }).flatMap((_, c) => ids.map((i) => (
                <li key={`${c}-${i}`} className={`svc__item ${c ? "svc__item--dup" : ""} ${on === i ? "is-on" : ""}`} style={{ "--s": `${4 + (i % 4) * 0.7}s`, "--d": `${-i * 0.6}s` }} aria-hidden={c ? true : undefined}>
                  <span className="svc__bob">
                    <button type="button" className="svc__in" tabIndex={c ? -1 : 0} aria-pressed={on === i} data-cursor="•" onClick={() => setOn(on === i ? null : i)}>
                      <em>{String(i + 1).padStart(2, "0")}</em>{services[i]}<b aria-hidden="true">→</b>
                    </button>
                  </span>
                </li>)))}
            </ul>
          </div>))}
      </div>
    </section>
  );
}
