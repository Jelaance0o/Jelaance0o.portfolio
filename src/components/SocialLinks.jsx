import { socialList } from "../data/socials";
export default function SocialLinks({ className = "" }) {
  return (
    <ul className={`socials ${className}`}>
      {socialList.map((s) => (
        <li key={s.key}>
          <a
            className="ulink"
            href={s.href}
            {...(s.key === "email"
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
          >
            {s.label}
          </a>
        </li>
      ))}
    </ul>
  );
}

