// Marker only: motion.js groups all [data-float] elements (visible-only) in one init.
export default function FloatingElement({ children, speed = 1, amp = 8, rot = 1, className = "" }) {
  return <span className={`float ${className}`} data-float data-vel data-speed={speed} data-amp={amp} data-rot={rot} aria-hidden="true">{children}</span>;
}
