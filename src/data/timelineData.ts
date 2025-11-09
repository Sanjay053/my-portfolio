export interface TimelineItemType {
  section?: string;
  project?: string;
  company?: string;
  tech?: string[];
  duration?: string;
  description?: string[];
  certifications?: string[];
  education?: string;
}

export const timelineData: TimelineItemType[] = [
  {
    section: "Work Experience",
    project: "Unified Promotions Platform",
    company: "Nisum Consulting Pvt Ltd | Hyderabad, India",
    duration: "Apr 2025 – Present",
    tech: [
      "React.js",
      "RTK Query",
      "Tailwind",
      "Apollo GraphQL",
      "MSAL",
      "SonarQube",
      "GitHub",
    ],
    description: [
      "Delivered a microservices-driven promotion platform enabling vendor promotion operations.",
      "Built promotion lifecycle modules with filters, table & calendar views.",
      "Improved micro-frontend & GraphQL performance via profiling and optimization patterns.",
    ],
  },
  {
    project: "Offer Management System",
    company: "Nisum Consulting Pvt Ltd | Hyderabad, India",
    duration: "Sep 2024 – Mar 2025",
    tech: [
      "Angular 18",
      "Node.js 17",
      "RxJS",
      "Tailwind CSS",
      "GraphQL",
      "REST APIs",
      "SonarQube",
      "Jira",
      "GitHub",
    ],
    description: [
      "Architected an enterprise-grade Offer Management System with Angular & GraphQL.",
      "Built RBAC screens with structured validation & approval workflows.",
      "Utilized RxJS caching + async pipelines to improve UI consistency.",
    ],
  },
  {
    project: "My Beneficiary",
    company: "Agile Cyber Solutions | Nagercoil, India",
    duration: "Jun 2023 – Jan 2024",
    tech: [
      "React.js",
      "Bootstrap",
      "REST API",
      "Firebase",
      "Jest",
      "GitHub",
      "Jira",
    ],
    description: [
      "Developed secure beneficiary management portal with MF authentication.",
      "Implemented reusable dashboards & cross-browser validation.",
      "Enhanced UI performance with code splitting & lazy loading.",
    ],
  },
  {
    project: "Download Delight",
    company: "Agile Cyber Solutions | Nagercoil, India",
    duration: "Jan 2023 – Jun 2023",
    tech: ["Angular 17", "RxJS", "Material UI", "Bootstrap", "REST APIs", "GitHub", "Jira"],
    description: [
      "Built interactive game discovery platform with advanced filtering logic.",
      "Optimized real-time content delivery through API integration.",
      "Designed smooth purchase journey with responsive UI.",
    ],
  },

  // ✅ Certifications
  {
    section: "Certifications",
    certifications: [
      "Responsive Web Design (JavaScript), FreeCodeCamp — Nov 2022 – Feb 2023",
      "Artificial Neural Networks — IBM — Apr 2022 – Sep 2022",
      "Machine Learning for Real-World Applications — TCS iON — Jul 2021 – Dec 2021",
    ],
  },

  // ✅ Education
  {
    section: "Education",
    education: "B.E — Computer Science & Engineering (Anna University, Nagercoil)",
    duration: "2019 – 2023",
  },
];
