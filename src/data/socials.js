// Single source of truth. Empty string = hidden. Add the X URL when you have it.
export const socials = {
  email: "mailto:jeelanceroy@gmail.com",
  linkedin: "https://linkedin.com/in/jeelance-roy/",
  instagram: "https://www.instagram.com/0o.dev/",
  x: "",
  github: "https://github.com/Jelaance0o",
};
export const socialList = Object.entries(socials).filter(([, v]) => v)
  .map(([k, v]) => ({ key: k, label: `${k === "x" ? "X" : k.toUpperCase()} ↗`, href: v }));
