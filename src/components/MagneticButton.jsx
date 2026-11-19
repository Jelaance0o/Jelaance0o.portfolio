import { useEffect, useRef } from "react";
import { magnetic } from "../animations/magnetic";
import { isTouch, prefersReduced } from "../hooks/useReducedMotion";
export default function MagneticButton({ as: Tag = "button", children, label = "GO", ...p }) {
  const ref = useRef();
  useEffect(() => (isTouch() || prefersReduced() ? undefined : magnetic(ref.current)), []);
  return <Tag ref={ref} data-cursor={label} className="btn" {...p}><span data-mag-text style={{ display: "block" }}>{children}</span></Tag>;
}
