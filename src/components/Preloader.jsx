import { useEffect, useRef } from "react";
import { gsap } from "gsap";
export default function Preloader({ onDone }) {
  const root = useRef(), bar = useRef(), lbl = useRef();
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.timeline({ onComplete: onDone })
        .to(bar.current, { scaleX: 1, duration: 0.5, ease: "power2.inOut" })
        .add(() => { root.current.firstChild.textContent = "CREATING IMPACT"; })
        .call(() => { lbl.current.textContent = "CREATING IMPACT"; })
        .to(root.current, { yPercent: -100, duration: 0.8, ease: "power4.inOut" })
        .set(root.current, { display: "none" });
    }, root);
    return () => ctx.revert();
  }, []);
  return (<div ref={root} className="preloader" role="status" aria-label="Loading">
    <p>JELAANCE0O</p><p className="label">Initializing experience...</p><i ref={bar} />
  </div>);
}
