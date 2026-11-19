import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroIntro } from "../animations/hero";
import { initMotion } from "../animations/motion";
import { prefersReduced } from "../hooks/useReducedMotion";
import Hero from "../sections/Hero"; import About from "../sections/About"; import Work from "../sections/Work";
import Stack from "../sections/Stack"; import Services from "../sections/Services";
import Contact from "../sections/Contact"; import Footer from "../sections/Footer";
gsap.registerPlugin(ScrollTrigger);
export default function Home({ ready }) {
  const root = useRef();
  useEffect(() => { // all scroll motion: one init, one cleanup
    const cleanup = initMotion(root.current);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return cleanup;
  }, []);
  useEffect(() => { // hero intro waits for preloader
    if (!ready) return;
    let off; const ctx = gsap.context(() => { off = heroIntro(root.current, prefersReduced()); }, root);
    return () => { off?.(); ctx.revert(); };
  }, [ready]);
  return (
    <main ref={root}>
      <div className="progress" aria-hidden="true"><i /></div>
      <Hero /><About /><Work /><Stack /><Services /><Contact /><Footer />
    </main>
  );
}
