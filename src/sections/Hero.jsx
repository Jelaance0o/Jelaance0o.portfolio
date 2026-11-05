export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__shape" aria-hidden="true" />

      <p className="label" data-hero-in>
        JEELANCE ROY — Software Engineer · Frontend / Full-Stack Developer
      </p>

      <h1 aria-label="Building digital experiences.">
        {["BUILDING", "DIGITAL", "EXPERIENCES."].map((word) => (
          <span className="hero__line" key={word}>
            <span>{word}</span>
          </span>
        ))}
      </h1>

      <div className="hero__foot">
        <p data-hero-in>
          Developer focused on modern web applications, interactive interfaces
          and creative digital experiences.
        </p>

        <p className="avail" data-hero-in>
          <i className="pulse" />
          AVAILABLE FOR OPPORTUNITIES
        </p>
      </div>
    </section>
  );
}
