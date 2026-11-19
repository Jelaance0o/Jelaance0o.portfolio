import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { onVelocity } from "../hooks/useLenis";
import { initReveals, revealLines } from "./reveal";
gsap.registerPlugin(ScrollTrigger);

// One entry point for homepage motion; returns cleanup. Conditions: reduce | desk (>=900px, motion OK) | otherwise mobile.
export function initMotion(root) {
  const mm = gsap.matchMedia();
  const q = (s) => gsap.utils.toArray(s, root);
  mm.add(
    {
      reduce: "(prefers-reduced-motion: reduce)",
      desk: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
    },
    (ctx) => {
      const { reduce, desk } = ctx.conditions,
        off = [];
      if (reduce) {
        initReveals(root, true);
        gsap.set(q(".line__in"), { clearProps: "all" });
        return;
      }

      // 1) pins first. WORK: pinned horizontal track, released straight into vertical scroll.
      const wk = root.querySelector(".work__hz"),
        wt = root.querySelector(".work__track");
      if (desk && wk && wt) {
        const dist = () => wt.scrollWidth - innerWidth + 80;
        const tw = gsap.to(wt, {
          x: () => -dist(),
          ease: "none",
          scrollTrigger: {
            trigger: wk,
            pin: true,
            scrub: 0.6,
            start: "top top",
            end: () => "+=" + dist(),
            invalidateOnRefresh: true,
            anticipatePin: 1,
          },
        });
        const DIR = [
          { x: 90, rotation: 3 },
          { x: -90, rotation: -3 },
          { x: 50, rotation: 2 },
        ];
        q(".work__track .project").forEach((p, i) => {
          // cards fly in from different directions and settle
          const from = { opacity: 0, scale: 0.85, y: 100, ...DIR[i % 3] },
            to = { opacity: 1, scale: 1, y: 0, x: 0, rotation: 0 };
          if (i === 0)
            gsap.fromTo(p, from, {
              ...to,
              duration: 1.2,
              ease: "power3.out",
              scrollTrigger: { trigger: wk, start: "top 80%", once: true },
            });
          else
            gsap.fromTo(p, from, {
              ...to,
              ease: "none",
              scrollTrigger: {
                trigger: p,
                containerAnimation: tw,
                start: "left 95%",
                end: "left 55%",
                scrub: true,
              },
            });
          const plate = p.querySelector(".project__plate");
          if (plate)
            gsap.fromTo(
              plate,
              { x: -40, scale: 1.15 },
              {
                x: 40,
                scale: 1.15,
                ease: "none",
                scrollTrigger: {
                  trigger: p,
                  containerAnimation: tw,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
        });
      }

      // 2) hero zoom-out: large line-art object shrinks and drifts toward centre as the hero scrolls away
      gsap.fromTo(
        ".hero__shape svg",
        { scale: desk ? 2.6 : 1.8, xPercent: desk ? 20 : 0 },
        {
          scale: 0.9,
          xPercent: desk ? -25 : 0,
          ease: "none",
          scrollTrigger: {
            trigger: ".hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        },
      );

      // 3) reveals, line reveals, progress; mobile card entrance
      initReveals(root, false);
      revealLines(root);
      gsap.to(root.querySelector(".progress i"), {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
      });
      // services: two marquee rows, opposite directions; speed follows scroll velocity, slows on hover/touch
      const mq = q(".svc__row").map((r, i) => {
        const tr = r.querySelector(".svc__track"),
          L = i % 2 === 0;
        const tw = gsap.fromTo(
          tr,
          { xPercent: L ? 0 : -50 },
          {
            xPercent: L ? -50 : 0,
            duration: 45,
            ease: "none",
            repeat: -1,
            paused: true,
          },
        );
        const slow = () =>
            gsap.to(tw, { timeScale: 0.2, duration: 0.5, overwrite: true }),
          fast = () =>
            gsap.to(tw, { timeScale: 1, duration: 0.6, overwrite: true });
        r.addEventListener("pointerenter", slow);
        r.addEventListener("pointerleave", fast);
        off.push(() => {
          r.removeEventListener("pointerenter", slow);
          r.removeEventListener("pointerleave", fast);
        });
        return { r, tw };
      });
      const mio = new IntersectionObserver((es) =>
        es.forEach((e) =>
          mq.find((o) => o.r === e.target)?.tw.paused(!e.isIntersecting),
        ),
      );
      mq.forEach((o) => mio.observe(o.r));
      off.push(() => mio.disconnect());
      let mt;
      off.push(
        onVelocity((v) => {
          const k = 1 + Math.min(Math.abs(v) * 0.15, 6);
          mq.forEach((o) => {
            if (!o.r.matches(":hover")) o.tw.timeScale(k);
          });
          clearTimeout(mt);
          mt = setTimeout(
            () =>
              mq.forEach((o) => gsap.to(o.tw, { timeScale: 1, duration: 0.8 })),
            150,
          );
        }),
        () => clearTimeout(mt),
      );
      // horizontal scroll drift for headings + hero lines (all sizes; smaller on mobile)
      const A = desk ? 1 : 0.6;
      q("[data-kinetic]").forEach((h) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: h,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
        h.querySelectorAll(".line").forEach((l, i) =>
          tl.fromTo(
            l,
            { xPercent: (i % 2 ? 4 : -4) * A },
            { xPercent: (i % 2 ? -4 : 4) * A, ease: "none" },
            0,
          ),
        );
      });
      const htl = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
      q(".hero__line").forEach((l, i) =>
        htl.to(l, { xPercent: (i % 2 ? 38 : -38) * A, ease: "none" }, 0),
      );
      if (!desk) {
        q(".work__track .project").forEach((p) =>
          gsap.from(p, {
            opacity: 0,
            y: 40,
            scale: 0.94,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: p, start: "top 90%", once: true },
          }),
        );
        return () => off.forEach((f) => f());
      }

      // desktop-only extras
      const nst = {
        trigger: ".now",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      };
      gsap.fromTo(
        "[data-now]",
        { scale: 0.85, rotation: -6 },
        { scale: 1.1, rotation: 6, ease: "none", scrollTrigger: nst },
      );
      gsap.fromTo(
        "[data-now-load]",
        { x: -40 },
        { x: 40, ease: "none", scrollTrigger: nst },
      );
      const tw = new Map();
      q("[data-float]").forEach((el) =>
        tw.set(
          el,
          gsap.to(el, {
            y: -(+el.dataset.amp || 8),
            rotation: +el.dataset.rot || 1,
            duration: 3 / (+el.dataset.speed || 1),
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            paused: true,
          }),
        ),
      );
      const io = new IntersectionObserver((es) =>
        es.forEach((e) => tw.get(e.target)?.paused(!e.isIntersecting)),
      );
      tw.forEach((_, el) => io.observe(el));
      off.push(() => io.disconnect());
      const skew = q("[data-vel]").map((el) =>
        gsap.quickTo(el, "skewY", { duration: 0.6, ease: "power3" }),
      );
      let t;
      off.push(
        onVelocity((v) => {
          const s = gsap.utils.clamp(-3, 3, v * 0.12);
          skew.forEach((f) => f(s));
          clearTimeout(t);
          t = setTimeout(() => skew.forEach((f) => f(0)), 120);
        }),
        () => clearTimeout(t),
      );
      return () => off.forEach((f) => f());
    },
  );
  return () => mm.revert();
}
