import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { nav, navMain } from "../data/services";
import { lenis, scrollToId, onVelocity } from "../hooks/useLenis";
import ResumeLink from "./ResumeLink";
import SocialLinks from "./SocialLinks";
const id = (n) => n.toLowerCase();
const SHORT = ["Work", "About", "Contact"]; // concise desktop nav; full list lives in the mobile menu
export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const { pathname } = useLocation(),
    navigate = useNavigate(),
    home = pathname === "/";
  const menu = useRef(),
    tl = useRef(),
    bar = useRef(),
    openRef = useRef(false);
  useEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline({ paused: true, defaults: { ease: "power4.inOut" } })
        .set(menu.current, { display: "flex" })
        .fromTo(
          menu.current,
          { clipPath: "inset(0 0 100% 0)" },
          { clipPath: "inset(0 0 0% 0)", duration: 0.7 },
        )
        .from(
          ".menu a",
          {
            yPercent: 100,
            opacity: 0,
            stagger: 0.05,
            duration: 0.6,
            ease: "power3.out",
          },
          "-=0.3",
        )
        .eventCallback("onReverseComplete", () =>
          gsap.set(menu.current, { display: "none" }),
        );
    }, menu);
    // hide on scroll down, show on scroll up (transform only)
    let hidden = false;
    const off = onVelocity((v) => {
      if (Math.abs(v) < 1 || openRef.current) return;
      const hide = v > 0 && scrollY > 240;
      if (hide !== hidden) {
        hidden = hide;
        gsap.to(bar.current, {
          yPercent: hide ? -100 : 0,
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      }
    });
    return () => {
      ctx.revert();
      off();
    };
  }, []);
  useEffect(() => {
    if (!home) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    nav.forEach((n) => {
      const s = document.getElementById(id(n));
      s && io.observe(s);
    });
    return () => io.disconnect();
  }, [home]);
  useEffect(() => {
    openRef.current = open;
    open ? tl.current?.play() : tl.current?.reverse();
    open ? lenis?.stop() : lenis?.start();
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);
  const go = (n) => (e) => {
    e.preventDefault();
    const was = open;
    setOpen(false);
    const run = () => scrollToId(id(n));
    if (!home) {
      navigate("/");
      setTimeout(run, 700);
    } else setTimeout(run, was ? 500 : 0);
  };
  return (
    <>
      <header className="nav" ref={bar}>
        <a href="#home" onClick={go("Home")} className="nav__logo">
          JELAANCE0O
        </a>
        <nav aria-label="Primary" className="nav__links">
          {SHORT.map((n) => (
            <a
              key={n}
              href={`#${id(n)}`}
              onClick={go(n)}
              className={home && active === id(n) ? "on" : ""}
            >
              {n}
            </a>
          ))}
          <ResumeLink />
        </nav>
        <button
          className="nav__burger"
          aria-expanded={open}
          aria-controls="menu"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </header>
      <div id="menu" ref={menu} className="menu" aria-hidden={!open}>
        {nav.map((n) => (
          <a
            key={n}
            tabIndex={open ? 0 : -1}
            href={`#${id(n)}`}
            onClick={go(n)}
          >
            {n}
          </a>
        ))}
        <Link
          tabIndex={open ? 0 : -1}
          to="/projects"
          onClick={() => setOpen(false)}
        >
          Projects ↗
        </Link>
        <div className="menu__foot">
          <ResumeLink />
          <SocialLinks />
        </div>
      </div>
    </>
  );
}
