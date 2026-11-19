// Add a project = add an object. status "live" → shown on /projects; "coming-soon" → homepage teaser slot only.
// Optional (for future case-study pages): fullDescription, features[], challenges[], solutions[], caseStudyUrl, video.
// List only verified technologies. Leave year/image empty rather than guessing.
export const projects = [
  {
    id: 1,
    slug: "dr-bandwar",
    title: "Dr Bandwar",
    category: "Client Product",
    year: "",
    description: "A live client product, designed and built for the web.",
    technologies: [],
    image: "https://ik.imagekit.io/c3pdk6uzm/image.png?updatedAt=1793269663553",
    liveUrl: "https://drbandwar.vercel.app/",
    githubUrl: "",
    status: "live",
  },
  {
    id: 2,
    slug: "teamspace",
    title: "Teamspace",
    category: "Team Management Software",
    year: "",
    description: "Team management software, live on the web.",
    technologies: [],
    image: "https://ik.imagekit.io/c3pdk6uzm/image_DgR7No_iY.png",
    liveUrl: "https://teamspace-rmxd.onrender.com/",
    githubUrl: "",
    status: "live",
  },
  {
    id: 3,
    slug: "next-project",
    title: "Next Project",
    category: "Coming Soon",
    year: "",
    description: "Space reserved.",
    technologies: [],
    image: "",
    liveUrl: "",
    githubUrl: "",
    status: "coming-soon",
  },
];
