import { useEffect, useRef } from "react";
import { startStarfield } from "../animations/starfield";
export default function Starfield() {
  const ref = useRef();
  useEffect(() => startStarfield(ref.current), []);
  return <canvas ref={ref} className="stars" aria-hidden="true" />;
}
