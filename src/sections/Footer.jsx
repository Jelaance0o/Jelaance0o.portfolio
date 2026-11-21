import SocialLinks from "../components/SocialLinks";
import ResumeLink from "../components/ResumeLink";
import { scrollToId } from "../hooks/useLenis";
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <p className="huge2">KEEP BUILDING.<br />KEEP SHIPPING.</p>
      <div className="footer__row">
        <div><b>JELAANCE0O</b><p>SOFTWARE ENGINEER · FRONTEND / FULL-STACK DEVELOPER</p></div>
        <div className="footer__links"><SocialLinks /><ResumeLink /></div>
        <p className="avail"><i className="pulse" /> OPEN TO OPPORTUNITIES</p>
      </div>
      <div className="footer__legal">
        <p className="label">© {year} Jelaance Roy. All rights reserved.<br />Designed &amp; developed by Jelaance Roy.</p>
        <button type="button" className="totop" onClick={() => scrollToId("home")} aria-label="Back to top">BACK TO TOP <span aria-hidden="true">↑</span></button>
      </div>
    </footer>
  );
}
