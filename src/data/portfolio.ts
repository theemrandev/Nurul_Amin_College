export interface ProjectItem {
  id: string;
  tags: string[];
  github: string;
  demo: string;
  featured: boolean;
  metrics?: string;
}

export interface SkillCategory {
  id: "frontend" | "styling" | "state" | "tools";
  skills: { name: string; level: string; icon?: string }[];
}

export interface LearningCategory {
  id: "backend" | "devops" | "genai";
  skills: string[];
}

export interface SkillItemDetail {
  name: string;
  tag?: string;
}

export interface SkillGroup {
  id: "frontend" | "backend" | "devops" | "genai";
  isLearning?: boolean;
  skills: SkillItemDetail[];
}

export const personalInfo = {
  name: "Md Emran Chokder",
  brandName: "theemrandev",
  role: "Frontend Developer",
  email: "theemrandev@gmail.com",
  phone: "+880 1760 038127",
  location: "Dhaka, Bangladesh",
  github: "https://github.com/theemrandev",
  linkedin: "https://linkedin.com/in/theemrandev",
  cvPath: "/md-emran-chokder-theemrandev-frontend-developer-resume.pdf",
  photoPath: "/md-emran-chokder-theemrandev-portrait.png",
  bannerPath: "/md-emran-chokder-theemrandev-portfolio-banner.png",
};

/**
 * 4 Primary Skill Groups strictly complying with architectural guidelines:
 * - Frontend Development (Core / Production-Ready)
 * - Backend Development (Learning)
 * - DevOps Engineering (Learning)
 * - Generative AI (Learning)
 */
export const skillGroups: SkillGroup[] = [
  {
    id: "frontend",
    isLearning: false,
    skills: [
      { name: "React.js", tag: "UI Library" },
      { name: "Next.js", tag: "Fullstack Framework" },
      { name: "TypeScript", tag: "Type-Safe Language" },
      { name: "JavaScript (ES6+)", tag: "Core Language" },
      { name: "HTML5", tag: "Semantic Markup" },
      { name: "CSS3", tag: "Modern Styling" },
      { name: "Tailwind CSS", tag: "Utility CSS" },
      { name: "Bootstrap 5", tag: "Component UI" },
      { name: "jQuery", tag: "DOM Scripting" },
      { name: "Redux / Redux Toolkit", tag: "State Store" },
      { name: "Zustand", tag: "Micro State" },
      { name: "Git & GitHub", tag: "Version Control" },
      { name: "Figma", tag: "UI/UX Design" },
      { name: "Vite Bundler", tag: "Next-Gen Tooling" },
      { name: "Responsive Layouts", tag: "Adaptive Grid" },
      { name: "Figma to Pixel UI", tag: "High-Fidelity Code" },
      { name: "RESTful APIs", tag: "Data Integration" },
      { name: "Async Data Fetching", tag: "Network Layer" },
      { name: "State Architecture", tag: "Data Flow" },
      { name: "VS Code & Debugging", tag: "Dev Environment" },
      { name: "npm / Tooling", tag: "Package Ecosystem" },
      { name: "Performance Profiling", tag: "Core Web Vitals" },
    ],
  },
  {
    id: "backend",
    isLearning: true,
    skills: [
      { name: "Node.js", tag: "JavaScript Runtime" },
      { name: "Express.js", tag: "Web Framework" },
      { name: "REST APIs", tag: "API Architecture" },
      { name: "MongoDB", tag: "Document Database" },
      { name: "Mongoose", tag: "Schema ODM" },
      { name: "PostgreSQL", tag: "Relational Database" },
      { name: "Prisma", tag: "Type-safe ORM" },
      { name: "Redis", tag: "In-Memory Cache" },
      { name: "JWT (JSON Web Tokens)", tag: "Auth Tokens" },
      { name: "Role-Based Access Control (RBAC)", tag: "Authorization" },
      { name: "Postman", tag: "API Testing" },
      { name: "Swagger", tag: "OpenAPI Specs" },
    ],
  },
  {
    id: "devops",
    isLearning: true,
    skills: [
      { name: "Linux", tag: "Operating System" },
      { name: "Bash Scripting", tag: "Shell Automation" },
      { name: "Python for Automation", tag: "Automation Scripting" },
      { name: "GitHub Actions", tag: "CI/CD Workflows" },
      { name: "Docker", tag: "Containerization" },
      { name: "Docker Compose", tag: "Multi-Container" },
      { name: "AWS (Cloud Computing & EKS)", tag: "Cloud Infrastructure" },
      { name: "Terraform (Infrastructure as Code)", tag: "Declarative IaC" },
      { name: "Ansible (Configuration Management)", tag: "Automation Engine" },
      { name: "Kubernetes", tag: "Container Orchestration" },
      { name: "Helm", tag: "K8s Package Manager" },
      { name: "CI/CD Pipelines", tag: "Continuous Delivery" },
      { name: "DevSecOps", tag: "Security Integration" },
      { name: "Observability & Monitoring", tag: "Telemetry & Logs" },
    ],
  },
  {
    id: "genai",
    isLearning: true,
    skills: [
      { name: "Large Language Models (LLMs)", tag: "Foundation Models" },
      { name: "Prompt Engineering", tag: "Context Optimization" },
      { name: "Tool Calling & Function Calling", tag: "External Tools" },
      { name: "RAG (Retrieval-Augmented Generation)", tag: "Knowledge Retrieval" },
      { name: "Vector Databases & Embeddings", tag: "Semantic Search" },
      { name: "Agentic AI", tag: "Autonomous Agents" },
      { name: "LangGraph", tag: "Cyclic State Machines" },
      { name: "Multi-Agent Systems", tag: "Agent Swarms" },
      { name: "Model Context Protocol (MCP)", tag: "Standard Protocol" },
      { name: "Generative UI", tag: "Dynamic Components" },
      { name: "Agent Observability & Evaluation", tag: "Tracing & Evals" },
      { name: "Human-in-the-Loop AI", tag: "Oversight & Guardrails" },
    ],
  },
];

// Preserved for backward compatibility
export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    skills: [
      { name: "React.js", level: "Core" },
      { name: "Next.js", level: "Core" },
      { name: "TypeScript", level: "Core" },
      { name: "JavaScript (ES6+)", level: "Core" },
      { name: "HTML5", level: "Core" },
      { name: "CSS3", level: "Core" },
    ],
  },
  {
    id: "styling",
    skills: [
      { name: "Tailwind CSS", level: "Core" },
      { name: "Bootstrap 5", level: "Core" },
      { name: "Responsive Layouts", level: "Core" },
      { name: "Figma to Pixel UI", level: "Core" },
      { name: "jQuery", level: "Core" },
    ],
  },
  {
    id: "state",
    skills: [
      { name: "Redux / Redux Toolkit", level: "Core" },
      { name: "Zustand", level: "Core" },
      { name: "RESTful APIs", level: "Core" },
      { name: "Async Data Fetching", level: "Core" },
      { name: "State Architecture", level: "Core" },
    ],
  },
  {
    id: "tools",
    skills: [
      { name: "Git & GitHub", level: "Core" },
      { name: "Vite Bundler", level: "Core" },
      { name: "VS Code & Debugging", level: "Core" },
      { name: "npm / Tooling", level: "Core" },
      { name: "Performance Profiling", level: "Core" },
    ],
  },
];

export const learningCategories: LearningCategory[] = [
  {
    id: "backend",
    skills: [
      "Node.js",
      "Express.js",
      "REST APIs",
      "MongoDB",
      "Mongoose",
      "PostgreSQL",
      "Prisma",
      "Redis",
      "JWT (JSON Web Tokens)",
      "Role-Based Access Control (RBAC)",
      "Postman",
      "Swagger",
    ],
  },
  {
    id: "devops",
    skills: [
      "Linux",
      "Bash Scripting",
      "Python for Automation",
      "GitHub Actions",
      "Docker",
      "Docker Compose",
      "AWS (Cloud Computing & EKS)",
      "Terraform (Infrastructure as Code)",
      "Ansible (Configuration Management)",
      "Kubernetes",
      "Helm",
      "CI/CD Pipelines",
      "DevSecOps",
      "Observability & Monitoring",
    ],
  },
  {
    id: "genai",
    skills: [
      "Large Language Models (LLMs)",
      "Prompt Engineering",
      "Tool Calling & Function Calling",
      "RAG (Retrieval-Augmented Generation)",
      "Vector Databases & Embeddings",
      "Agentic AI",
      "LangGraph",
      "Multi-Agent Systems",
      "Model Context Protocol (MCP)",
      "Generative UI",
      "Agent Observability & Evaluation",
      "Human-in-the-Loop AI",
    ],
  },
];

export const projectsList: ProjectItem[] = [
  {
    id: "p1",
    tags: ["React.js", "Vite", "Tailwind CSS", "Redux"],
    github: "https://github.com/theemrandev",
    demo: "https://github.com/theemrandev",
    featured: true,
    metrics: "100% Responsive · Cart State Management",
  },
  {
    id: "p2",
    tags: ["HTML5", "CSS3", "JavaScript", "Bootstrap"],
    github: "https://github.com/theemrandev",
    demo: "https://github.com/theemrandev",
    featured: true,
    metrics: "Dynamic Notice Board · Bilingual Support",
  },
  {
    id: "p3",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/theemrandev",
    demo: "https://github.com/theemrandev",
    featured: false,
    metrics: "WCAG Compliant · Dark Mode Primitives",
  },
];
