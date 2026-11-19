import SectionLabel from "../components/SectionLabel";
import ResumeLink from "../components/ResumeLink";
import KineticHeading from "../components/KineticHeading";
import FloatingElement from "../components/FloatingElement";
const I = ["Frontend Development","React","Full-Stack Development","UI Animation","Interactive Experiences","Backend APIs","Generative AI","SaaS Products","Creative Development"];
export default function About() {
  return (
    <section id="about" className="sec about">
      <SectionLabel n="01">About</SectionLabel>
      <KineticHeading
        lines={[
          "I LIKE BUILDING THINGS",
          "THAT ARE BOTH",
          "USEFUL AND",
          "IMPOSSIBLE TO IGNORE.",
        ]}
        accent="USEFUL"
      />
      <FloatingElement className="about__mark" amp={10} rot={6} speed={0.6}>
        ✦
      </FloatingElement>
      <div className="about__cols">
        <p data-reveal>
          I turn ambitious ideas into working products, obsess over the little
          details, and build things that make the internet a little more
          interesting. From pixels to databases, I like being involved in the
          whole journey.
        </p>
        <ul className="chips" data-reveal>
          {I.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <ResumeLink />
      </div>
      <div className="now">
        <div className="now__num" data-now aria-hidden="true">
          00
        </div>
        <KineticHeading
          as="h3"
          lines={["CURRENTLY", "SOFTWARE ENGINEER", "AT A STARTUP"]}
        />
        <p className="label" data-reveal>
          Frontend / Full-Stack Developer · Frontend / Full-Stack Developer ·
          Based in Jabalpur, India
        </p>
        <p data-reveal>
          Working with a startup, building SaaS products and pushing modern web
          experiences further — from frontend interfaces to full-stack
          applications and highly interactive websites.
        </p>
        <p className="label now__load" data-now-load aria-hidden="true">
          PROJECTS LOADING...
        </p>
      </div>
    </section>
  );
}
