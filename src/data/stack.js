// Grouped technologies the developer works with or is learning. Edit freely; the Stack section renders whatever is here.
const t = (name, note) => ({ name, note });
export const stack = [
  { id: "frontend", label: "Frontend", blurb: "Interfaces, motion and everything the user touches.", items: [
    t("React", "Component-driven interface development."), t("Next.js", "React framework for production web apps."), t("Redux", "Predictable state management for larger React apps."),
    t("Tailwind CSS", "Rapid responsive interface development."), t("SCSS", "Structured and scalable styling."),
    t("GSAP", "Interactive motion and animation."), t("ScrollTrigger", "Scroll-driven experiences."), t("Lenis", "Smooth scrolling experiences.")] },
  { id: "backend", label: "Backend", blurb: "APIs, services and the security around them.", items: [
    t("Node.js", "Backend services and APIs."), t("Express.js", "Building web APIs and server-side applications."),
    t("FastAPI", "High-performance Python APIs."), t("REST APIs", "Designing clear client–server interfaces."), t("Microservices", "Splitting systems into small, independent services."),
    t("JWT", "Token-based authentication."), t("Authentication", "Verifying who a user is."),
    t("Authorization", "Controlling what a user can access."), t("HTTP-only Cookies", "Session tokens kept out of JavaScript.")] },
  { id: "database", label: "Database", blurb: "Where application data lives.", items: [
    t("MongoDB", "Flexible application data storage."), t("MySQL", "Relational database development."), t("Redis", "In-memory store for caching and rate limiting.")] },
  { id: "languages", label: "Languages", blurb: "What it's all written in.", items: [
    t("JavaScript", "Building interactive web experiences."), t("TypeScript", "Typed JavaScript for safer code."), t("Python", "Backend development and scripting.")] },
  { id: "ai", label: "AI", blurb: "Building with language models — actively exploring.", items: [
    t("LangChain", "Framework for building LLM-powered applications."), t("RAG", "Retrieval-augmented generation: grounding answers in your own data."), t("Generative AI", "Working with and building around language models.")] },
  { id: "tools", label: "Tools", blurb: "Day-to-day workflow.", items: [
    t("Git", "Version control and collaborative development."), t("GitHub", "Code hosting and open-source collaboration.")] },
];
