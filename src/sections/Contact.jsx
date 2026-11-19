import SectionLabel from "../components/SectionLabel";
import KineticHeading from "../components/KineticHeading";
import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";
export default function Contact() {
  return (
    <section id="contact" className="sec contact">
      <SectionLabel n="05">Contact</SectionLabel>
      <KineticHeading className="huge" lines={["LET'S", "CREATE", "IMPACT."]} />
      <div className="contact__cols">
        <div data-reveal><p>Have an idea? Need a website? Building something? Let's talk.</p><SocialLinks /></div>
        <div data-reveal><ContactForm /></div>
      </div>
    </section>
  );
}
