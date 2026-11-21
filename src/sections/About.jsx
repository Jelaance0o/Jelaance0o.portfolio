import SectionLabel from "../components/SectionLabel";
import ResumeLink from "../components/ResumeLink";
import KineticHeading from "../components/KineticHeading";
import FloatingElement from "../components/FloatingElement";
const I = ["Full-Stack Development","SaaS Products","REST APIs","Microservices","React","Redux","Node.js","FastAPI","Production-Ready Apps","Generative AI","Interactive UI"];
export default function About() {
  return (
    <section id="about" className="sec about">
      <SectionLabel n="01">About</SectionLabel>
      <KineticHeading lines={["I LIKE BUILDING THINGS", "THAT ARE BOTH", "USEFUL AND", "IMPOSSIBLE TO IGNORE."]} accent="USEFUL" />
      <FloatingElement className="about__mark" amp={10} rot={6} speed={0.6}>✦</FloatingElement>
      <div className="about__cols">
        <p data-reveal>I'm a full-stack developer building SaaS products, scalable REST APIs and production-ready web applications — from React and Redux interfaces to Node.js and FastAPI services and microservice architectures — with a real eye for interaction and design.</p>
        <ul className="chips" data-reveal>{I.map((x) => <li key={x}>{x}</li>)}</ul>
        <ResumeLink />
      </div>
      <div className="now">
        <div className="now__num" data-now aria-hidden="true">00</div>
        <KineticHeading as="h3" lines={["CURRENTLY", "SOFTWARE ENGINEER", "AT A STARTUP"]} />
        <p className="label" data-reveal>Frontend / Full-Stack Developer · Frontend / Full-Stack Developer · Based in Jabalpur, India</p>
        <p data-reveal>Working with a startup, building SaaS products and production-ready full-stack applications — from React interfaces to APIs and services behind them.</p>
        <p className="label now__load" data-now-load aria-hidden="true">PROJECTS LOADING...</p>
      </div>
    </section>
  );
}
