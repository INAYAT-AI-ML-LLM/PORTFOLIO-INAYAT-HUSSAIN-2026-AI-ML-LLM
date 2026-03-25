export const PERSONAL = {
  name: "Mohammad Inayat Hussain",
  displayName: "INAYAT HUSSAIN",
  firstName: "INAYAT",
  lastName: "HUSSAIN",
  monogram: "IH",
  title: "Software Engineer | Full Stack & GenAI Specialist",
  tagline: "Software Engineer — Full Stack & GenAI Specialist",
  subTagline: "Building Scalable Web Solutions & Intelligent AI Systems",
  bio: [
    "AI-focused Software Engineer and MCA candidate at LNCT.",
    "Specialized in integrating Generative AI (GenAI) and Large Language Models (LLMs) into scalable web applications.",
    "Recognized for urban innovation proposals and active leadership in technical seminars and high-stakes hackathons.",
    "Passionate about creating secure, efficient, and intelligent hardware-software synergies.",
  ],
  email: "mohammadinayathussain5@gmail.com",
  phone: "+91 8595260860",
  location: "Bhopal, MP, India",
  locationShort: "Bhopal, India",
  availability: "Open to Opportunities — AI & Full Stack",
  resumeUrl: "/resume.pdf",
  socials: {
    github: "https://github.com/Inayat-0007",
    linkedin: "https://linkedin.com/in/inayat-hussain-105a8834b",
    email: "mailto:mohammadinayathussain5@gmail.com",
  },
};

export const STATS = [
  { value: 4, suffix: "+", label: "Production Projects Shipped" },
  { value: 1, suffix: "", label: "Hackathon (AMD Slingshot)" },
  { value: 5, suffix: "+", label: "Certifications & Awards" },
  { value: 2, suffix: "+", label: "Years Building" },
];

export const IDENTITY_BLOCKS = [
  { icon: "brain" as const, label: "GenAI & LLMs", detail: "Gemini, RAG, AI Agents" },
  { icon: "code" as const, label: "Full Stack Dev", detail: "MERN, FastAPI, Python" },
  { icon: "shield" as const, label: "Security-First", detail: "Rate Limiting, XSS, Production-grade" },
  { icon: "rocket" as const, label: "Builder & Shipper", detail: "Hackathons to SaaS" },
];

export const SKILL_CATEGORIES = [
  {
    icon: "sparkles" as const,
    category: "AI & Automation",
    skills: ["Generative AI", "LLMs (Gemini 2.0 Flash)", "AI Agents", "RAG", "Query Expansion", "n8n Automation"],
  },
  {
    icon: "terminal" as const,
    category: "Languages",
    skills: ["Python", "JavaScript (ES6+)", "C/C++", "SQL"],
  },
  {
    icon: "layers" as const,
    category: "Frameworks & Runtime",
    skills: ["Node.js", "Express.js", "React", "Redux", "FastAPI"],
  },
  {
    icon: "wrench" as const,
    category: "Developer Tools",
    skills: ["GitHub", "VS Code", "Agile Methodology", "RESTful APIs", "Linux"],
  },
  {
    icon: "database" as const,
    category: "Data & Cloud",
    skills: ["MongoDB", "Pandas", "NumPy", "Hardware-Software Integration"],
  },
  {
    icon: "lock" as const,
    category: "Security",
    skills: ["Rate Limiting (Slowapi)", "XSS Sanitization (Bleach)", "Production-grade hardening"],
  },
];

export const ALL_SKILLS = [
  "Python", "JavaScript", "React", "Node.js", "Express.js", "FastAPI",
  "MongoDB", "Redux", "C/C++", "SQL", "Generative AI", "LLMs",
  "Gemini", "RAG", "AI Agents", "n8n", "Pandas", "NumPy",
  "GitHub", "Linux", "REST APIs", "Agile", "Slowapi", "Bleach",
  "Sentence-Transformers", "Hugging Face", "TypeScript", "Next.js",
];

export const TECH_TICKER = [
  "React", "Node.js", "Python", "GenAI", "FastAPI", "MongoDB",
  "GSAP", "Next.js", "LLMs", "C++", "Redux", "Agile",
];

export const SKILL_ICONS: Record<string, string> = {
  "Python": "devicon-python-plain",
  "JavaScript (ES6+)": "devicon-javascript-plain",
  "JavaScript": "devicon-javascript-plain",
  "React": "devicon-react-original",
  "Node.js": "devicon-nodejs-plain",
  "Express.js": "devicon-express-original",
  "C/C++": "devicon-cplusplus-plain",
  "C++": "devicon-cplusplus-plain",
  "MongoDB": "devicon-mongodb-plain",
  "Redux": "devicon-redux-original",
  "TypeScript": "devicon-typescript-plain",
  "Next.js": "devicon-nextjs-plain",
  "FastAPI": "devicon-fastapi-plain",
  "SQL": "devicon-azuresqldatabase-bg",
  "Pandas": "devicon-pandas-original",
  "NumPy": "devicon-numpy-original",
  "GitHub": "devicon-github-original",
  "VS Code": "devicon-vscode-plain",
  "Linux": "devicon-linux-plain",
  "Agile Methodology": "devicon-jira-plain",
};

export const PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "SHL Assessment Recommender",
    tags: ["FastAPI", "Gemini 2.0 Flash", "Sentence-Transformers", "Securty"],
    description:
      "Developed a semantic recommendation engine utilizing all-MiniLM-L6-v2 and Gemini 2.0 Flash for query expansion. Integrated production-grade security including slowapi for rate limiting and bleach for XSS sanitization.",
    image: "/images/project-shl.webp",
    link: "https://github.com/Inayat-0007",
    period: "March 2026",
    color: "#00f0ff",
  },
  {
    id: 2,
    number: "02",
    title: "Shield Ryzen V2 - AMD Chipset Inspire",
    tags: ["C++", "Hardware Optimization", "Ryzen Chipsets"],
    description:
      "Developed a low-level performance utility for the AMD Slingshot Hackathon, optimized for Ryzen chipsets. Focused on hardware-software synergy to maximize CPU throughput and system-level processing efficiency.",
    image: "/images/project-shield.webp",
    link: "https://github.com/Inayat-0007/Shield-Ryzen-V2",
    period: "2025",
    color: "#f59e0b",
  },
  {
    id: 3,
    number: "03",
    title: "Jai K Bio Agritake Corporate Platform",
    tags: ["MERN Stack", "SaaS Architecture", "UI/UX"],
    description:
      "Built and deployed a mobile-responsive SaaS platform for a bio-fertilizer company to manage organic product inventories. Implemented secure user authentication and customer-centric UI/UX design to drive digital business growth.",
    image: "/images/project-agritake.webp",
    link: "https://github.com/Inayat-0007",
    period: "01/2025 - 10/2025",
    color: "#22c55e",
  },
];

export const EXPERIENCE = [
  {
    id: 1,
    period: "10/2024 — Present",
    type: "education" as const,
    role: "Master of Computer Applications (MCA)",
    company: "Lakshmi Narain College of Technology (LNCT), Bhopal",
    description:
      "Led academic seminars regarding real-world AI agent implementations. Enthusiastic experimenter and contributor to latest AI technology stacks and rapid prototyping research.",
    tech: ["Generative AI", "Software Engineering", "AI Seminars"],
  },
  {
    id: 2,
    period: "06/2022 — 12/2022",
    type: "work" as const,
    role: "Web Developer",
    company: "ATI Group of Technologies, Delhi",
    description:
      "Engineered high-performance backend services and RESTful APIs for an Account Management system using Node.js. Collaborated in a cross-functional Agile environment to deliver secure full-stack features, optimizing client data availability.",
    tech: ["Node.js", "REST APIs", "Agile", "Full Stack"],
  },
  {
    id: 3,
    period: "05/2020 — 05/2023",
    type: "education" as const,
    role: "Bachelor of Computer Applications (BCA)",
    company: "Swami Vivekanand Institute of Technology, Balaghat",
    description:
      "Developed a strong foundation in programming, software engineering, and core computer science concepts.",
    tech: ["Computer Science", "Programming Foundations"],
  },
];

export const CERTIFICATIONS = [
  {
    badge: "🏆",
    badgeColor: "#f59e0b",
    title: "1 Million Prompters",
    issuer: "Dubai Centre for Artificial Intelligence",
    date: "Oct 2025",
    credentialId: "N/A",
    featured: true,
    description: "My AI Skillset Just Got a Major Upgrade! Thrilled to announce I've successfully completed the 1 Million Prompters certification, expanding my capabilities in Generative AI.",
    skills: ["Generative AI", "Prompt Engineering"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_1m_prompters.png",
  },
  {
    badge: "🤖",
    badgeColor: "#8b5cf6",
    title: "Artificial Intelligence with Python",
    issuer: "SkillForge",
    date: "May 2025",
    credentialId: "111326953",
    featured: false,
    description: "Awarded an internship completion certificate in Artificial Intelligence with Python. Developed production-grade skills emphasizing end-to-end Machine Learning lifecycles.",
    skills: ["Python (Programming Language)", "Machine Learning", "Artificial Intelligence (AI)", "Data Science", "Deep Learning"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_ai_internship.png",
  },
  {
    badge: "🧠",
    badgeColor: "#0ea5e9",
    title: "Internship Common Aptitude Test",
    issuer: "iStudio Technologies - Digital Transformation company",
    date: "May 2025",
    credentialId: "CIT P 1764855",
    featured: false,
    description: "Successfully cleared the common aptitude test demonstrating high proficiency in logical deduction and advanced reasoning required for software engineering internships.",
    skills: ["Analytical Reasoning", "Reasoning Skills"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_aptitude.png", // Will use default icon if missing
  },
  {
    badge: "💻",
    badgeColor: "#22c55e",
    title: "Python (Basic) Certificate",
    issuer: "HackerRank",
    date: "Mar 2025",
    credentialId: "26527DE0C47F",
    featured: false,
    description: "Demonstrated fundamental understanding of Python working with variables, loops, data structures, and basic algorithms.",
    skills: ["Python (Programming Language)", "Algorithms"],
    link: "https://www.hackerrank.com/profile/mohammadinayath1",
    image: "/images/cert_hackerrank_python.png",
  },
  {
    badge: "⚛️",
    badgeColor: "#00f0ff",
    title: "React JS Basic Certificate",
    issuer: "HackerRank",
    date: "Mar 2025",
    credentialId: "N/A",
    featured: false,
    description: "Covers topics like Basic Routing, Rendering Elements, State Management, and component lifecycles in React.js.",
    skills: ["React.js", "Front-End Development"],
    link: "https://www.hackerrank.com/profile/mohammadinayath1",
    image: "/images/cert_hackerrank_react.png",
  },
  {
    badge: "🌐",
    badgeColor: "#ef4444",
    title: "MERN Stack Development",
    issuer: "upGrad KnowledgeHut",
    date: "Aug 2022",
    credentialId: "N/A",
    featured: false,
    description: "Comprehensive training and certification in full stack MERN development, learning scalable software architecture.",
    skills: ["MongoDB", "Software Development", "Express.js", "React.js", "Node.js", "REST APIs"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_mern_stack.png",
  },
  {
    badge: "📘",
    badgeColor: "#3b82f6",
    title: "ReactJS Beginners",
    issuer: "Simplilearn",
    date: "Dec 2022",
    credentialId: "N/A",
    featured: false,
    description: "Foundation in ReactJS principles, enabling the creation of dynamic UI components and single-page applications.",
    skills: ["English", "HTML", "React.js", "CSS", "JavaScript"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_simplilearn_react.png",
  },
  {
    badge: "🖥️",
    badgeColor: "#14b8a6",
    title: "Web Development",
    issuer: "Internshala",
    date: "Jun 2022",
    credentialId: "N/A",
    featured: false,
    description: "Completed intensive training in full-stack web development spanning HTML, CSS, JavaScript, MySQL, and PHP.",
    skills: ["Bootstrap (Framework)", "English", "HTML5", "CSS3", "JavaScript", "MySQL", "PHP"],
    link: "https://www.linkedin.com/in/inayat-hussain-105a8834b",
    image: "/images/cert_internshala_web.png",
  }
];

export const CERT_MARQUEE = [
  "1 Million Prompters",
  "HackerRank Python",
  "MERN Stack Certified",
  "AI with Python",
  "AMD Slingshot Hackathon",
  "React JS Certified",
  "Seminar Leadership",
];

export const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Certifications", href: "#certifications" },
  { label: "Contact", href: "#contact" },
];

export const CONTACT_CTA = {
  heading: "Let's Build Something Together",
  subtext: "Got a project, idea, or opportunity? I'm always excited to talk tech and build.",
};

export const FOOTER = {
  copyright: "© 2026 Inayat Hussain. Built with passion & too much chai ☕",
};
