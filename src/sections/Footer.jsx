import SocialLinks from "../components/SocialLinks";
import ResumeLink from "../components/ResumeLink";
export default function Footer() {
  return (
    <footer className="footer">
      <p className="huge2">CREATING<br />IMPACT.</p>
      <div className="footer__row">
        <div><b>JELAANCE0O</b><p>SOFTWARE ENGINEER · CREATING IMPACT</p></div>
        <div className="footer__links"><SocialLinks /><ResumeLink /></div>
        <p className="avail"><i className="pulse" /> OPEN TO OPPORTUNITIES</p>
      </div>
      <p className="label">© {new Date().getFullYear()} JELAANCE0O</p>
    </footer>
  );
}
