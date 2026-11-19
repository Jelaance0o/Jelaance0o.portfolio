import { gsap } from "gsap";
// Mobile / tablet carousel only: staggered entrance per project. On desktop the cards fly in inside motion.js (pinned horizontal track).
export function initProjects(root, desk) {
  if (desk) return;
  gsap.utils.toArray(".project", root).forEach((p) => {
    const g = (s) => p.querySelectorAll(s);
    gsap.timeline({ defaults: { ease: "power3.out" }, scrollTrigger: { trigger: p, start: "top 80%", once: true } })
      .from(g('[data-p="num"]'), { opacity: 0, y: 20, duration: 0.5, clearProps: "transform,opacity" })
      .from(g('[data-p="title"]'), { yPercent: 60, opacity: 0, duration: 0.8, clearProps: "transform,opacity" }, "-=0.2")
      .fromTo(g(".project__plate"), { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1, ease: "power4.out" }, 0.1)
      .from(g('[data-p="meta"],[data-p="link"]'), { opacity: 0, y: 16, duration: 0.6, stagger: 0.08, clearProps: "transform,opacity" }, "-=0.5");
  });
}
