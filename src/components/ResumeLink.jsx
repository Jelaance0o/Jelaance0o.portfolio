import { resumeUrl } from "../data/site";
export default function ResumeLink({ className = "" }) {
  return (
    <a className={`ulink resume ${className}`} href={resumeUrl} target="_blank" rel="noopener noreferrer" aria-label="Open resume PDF in a new tab">
      <svg width="12" height="14" viewBox="0 0 12 14" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true"><path d="M1 1h6l4 4v8H1z" /><path d="M7 1v4h4M3 8h6M3 10.5h4" /></svg>
      RESUME ↗
    </a>
  );
}
