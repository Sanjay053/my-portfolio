import { useEffect, useMemo, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CodeOutlined,
  ApiOutlined,
  BlockOutlined,
  GatewayOutlined,
  NodeExpandOutlined,
  BgColorsOutlined,
  Html5Outlined,
  HighlightOutlined,
  GithubOutlined,
  CodeSandboxOutlined,
  CameraOutlined,
  SmileOutlined,
  RobotOutlined,
  DatabaseOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  CloudOutlined,
  ToolOutlined,
  RocketOutlined,
  DownloadOutlined,
  ArrowRightOutlined,
  ArrowUpOutlined,
  SafetyCertificateOutlined,
  ClusterOutlined,
  LayoutOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import ResumePDF from "../Asset/sanjay_resume.pdf";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const MotionLink = motion.create(Link);

/* Show the scroll-to-top button when the user is within this many px of the page bottom */
const SCROLL_TOP_DISTANCE_FROM_END = 600;

interface Experience {
  id: string;
  title: string;
  company: string;
  client?: string;
  role: string;
  startDate: string;
  endDate: string;
  description: string;
  responsibilities: string[];
  technologies: string[];
  tools: string[];
  order: number;
  isActive: boolean;
}

interface Skill {
  id: string;
  name: string;
  category: string;
  icon?: string;
  description?: string;
  level?: number | null;
  exp?: string;
  tools?: string[];
  project?: string | null;
  order?: number;
  isActive?: boolean;
}

const iconMap: Record<string, ReactNode> = {
  CodeOutlined: <CodeOutlined />,
  ApiOutlined: <ApiOutlined />,
  BlockOutlined: <BlockOutlined />,
  GatewayOutlined: <GatewayOutlined />,
  NodeExpandOutlined: <NodeExpandOutlined />,
  BgColorsOutlined: <BgColorsOutlined />,
  Html5Outlined: <Html5Outlined />,
  HighlightOutlined: <HighlightOutlined />,
  GithubOutlined: <GithubOutlined />,
  CodeSandboxOutlined: <CodeSandboxOutlined />,
  RobotOutlined: <RobotOutlined />,
  DatabaseOutlined: <DatabaseOutlined />,
  ThunderboltOutlined: <ThunderboltOutlined />,
  ExperimentOutlined: <ExperimentOutlined />,
  CloudOutlined: <CloudOutlined />,
  ToolOutlined: <ToolOutlined />,
};

/* ---------------------------------------------------------------
   Category look & feel. Class names are written in full so that
   Tailwind can see them at build time.
---------------------------------------------------------------- */
interface CategoryStyle {
  icon: ReactNode;
  text: string; // title / icon colour
  iconBox: string; // icon container
  chip: string; // skill chip
  bar: string; // top accent line
  glow: string; // corner glow
  tabActive: string; // selected filter tab
}

const categoryStyles: Record<string, CategoryStyle> = {
  Frontend: {
    icon: <LayoutOutlined />,
    text: "text-indigo-300",
    iconBox: "bg-indigo-500/10 border-indigo-400/20 text-indigo-300",
    chip: "hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-200",
    bar: "from-indigo-500 via-indigo-400/40 to-transparent",
    glow: "bg-indigo-500/20",
    tabActive: "from-indigo-600 to-indigo-400",
  },
  "AI / GenAI": {
    icon: <RobotOutlined />,
    text: "text-fuchsia-300",
    iconBox: "bg-fuchsia-500/10 border-fuchsia-400/20 text-fuchsia-300",
    chip: "hover:border-fuchsia-400/40 hover:bg-fuchsia-500/10 hover:text-fuchsia-200",
    bar: "from-fuchsia-500 via-fuchsia-400/40 to-transparent",
    glow: "bg-fuchsia-500/20",
    tabActive: "from-fuchsia-600 to-purple-500",
  },
  Backend: {
    icon: <ClusterOutlined />,
    text: "text-emerald-300",
    iconBox: "bg-emerald-500/10 border-emerald-400/20 text-emerald-300",
    chip: "hover:border-emerald-400/40 hover:bg-emerald-500/10 hover:text-emerald-200",
    bar: "from-emerald-500 via-emerald-400/40 to-transparent",
    glow: "bg-emerald-500/15",
    tabActive: "from-emerald-600 to-emerald-400",
  },
  "API Integration": {
    icon: <ApiOutlined />,
    text: "text-cyan-300",
    iconBox: "bg-cyan-500/10 border-cyan-400/20 text-cyan-300",
    chip: "hover:border-cyan-400/40 hover:bg-cyan-500/10 hover:text-cyan-200",
    bar: "from-cyan-500 via-cyan-400/40 to-transparent",
    glow: "bg-cyan-500/15",
    tabActive: "from-cyan-600 to-cyan-400",
  },
  Authentication: {
    icon: <SafetyCertificateOutlined />,
    text: "text-amber-300",
    iconBox: "bg-amber-500/10 border-amber-400/20 text-amber-300",
    chip: "hover:border-amber-400/40 hover:bg-amber-500/10 hover:text-amber-200",
    bar: "from-amber-500 via-amber-400/40 to-transparent",
    glow: "bg-amber-500/15",
    tabActive: "from-amber-600 to-amber-400",
  },
  "State Management": {
    icon: <SyncOutlined />,
    text: "text-violet-300",
    iconBox: "bg-violet-500/10 border-violet-400/20 text-violet-300",
    chip: "hover:border-violet-400/40 hover:bg-violet-500/10 hover:text-violet-200",
    bar: "from-violet-500 via-violet-400/40 to-transparent",
    glow: "bg-violet-500/20",
    tabActive: "from-violet-600 to-violet-400",
  },
  Testing: {
    icon: <ExperimentOutlined />,
    text: "text-rose-300",
    iconBox: "bg-rose-500/10 border-rose-400/20 text-rose-300",
    chip: "hover:border-rose-400/40 hover:bg-rose-500/10 hover:text-rose-200",
    bar: "from-rose-500 via-rose-400/40 to-transparent",
    glow: "bg-rose-500/15",
    tabActive: "from-rose-600 to-rose-400",
  },
  "DevOps & Tools": {
    icon: <ToolOutlined />,
    text: "text-sky-300",
    iconBox: "bg-sky-500/10 border-sky-400/20 text-sky-300",
    chip: "hover:border-sky-400/40 hover:bg-sky-500/10 hover:text-sky-200",
    bar: "from-sky-500 via-sky-400/40 to-transparent",
    glow: "bg-sky-500/15",
    tabActive: "from-sky-600 to-sky-400",
  },
  Optimization: {
    icon: <ThunderboltOutlined />,
    text: "text-yellow-300",
    iconBox: "bg-yellow-500/10 border-yellow-400/20 text-yellow-300",
    chip: "hover:border-yellow-400/40 hover:bg-yellow-500/10 hover:text-yellow-200",
    bar: "from-yellow-500 via-yellow-400/40 to-transparent",
    glow: "bg-yellow-500/15",
    tabActive: "from-yellow-600 to-yellow-400",
  },
  Methodologies: {
    icon: <RocketOutlined />,
    text: "text-teal-300",
    iconBox: "bg-teal-500/10 border-teal-400/20 text-teal-300",
    chip: "hover:border-teal-400/40 hover:bg-teal-500/10 hover:text-teal-200",
    bar: "from-teal-500 via-teal-400/40 to-transparent",
    glow: "bg-teal-500/15",
    tabActive: "from-teal-600 to-teal-400",
  },
};

const defaultCategoryStyle: CategoryStyle = {
  icon: <CodeOutlined />,
  text: "text-indigo-300",
  iconBox: "bg-indigo-500/10 border-indigo-400/20 text-indigo-300",
  chip: "hover:border-indigo-400/40 hover:bg-indigo-500/10 hover:text-indigo-200",
  bar: "from-indigo-500 via-indigo-400/40 to-transparent",
  glow: "bg-indigo-500/20",
  tabActive: "from-indigo-600 to-cyan-500",
};

const getCategoryStyle = (category: string) =>
  categoryStyles[category] ?? defaultCategoryStyle;

const strengths = [
  {
    icon: <RocketOutlined />,
    title: "Scalable UI",
    description: "Building reusable and maintainable frontend architectures.",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Performance",
    description: "Focused on fast, responsive and optimized user experiences.",
  },
  {
    icon: <CodeOutlined />,
    title: "Clean Code",
    description: "Writing structured, readable and production-ready code.",
  },
  {
    icon: <RobotOutlined />,
    title: "AI Engineering",
    description:
      "Exploring LLMs, RAG, AI agents and intelligent application workflows.",
  },
];

const AboutPage = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loadingExperiences, setLoadingExperiences] = useState(true);
  const [loadingSkills, setLoadingSkills] = useState(true);
  const [experienceError, setExperienceError] = useState("");
  const [skillsError, setSkillsError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const fetchPortfolioData = async () => {
      setLoadingExperiences(true);
      setLoadingSkills(true);
      setExperienceError("");
      setSkillsError("");

      try {
        const [experienceSnapshot, skillSnapshot] = await Promise.all([
          getDocs(collection(db, "experiences")),
          getDocs(collection(db, "skills")),
        ]);

        const experienceData: Experience[] = experienceSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Experience, "id">),
          }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (b.order ?? 0) - (a.order ?? 0));

        const skillData: Skill[] = skillSnapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...(doc.data() as Omit<Skill, "id">),
          }))
          .filter((item) => item.isActive !== false)
          .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));

        setExperiences(experienceData);
        setSkills(skillData);
      } catch (error) {
        console.error("Failed to fetch portfolio data:", error);
        setExperienceError("Unable to load experience data right now.");
        setSkillsError("Unable to load skills data right now.");
      } finally {
        setLoadingExperiences(false);
        setLoadingSkills(false);
      }
    };

    fetchPortfolioData();
  }, []);

  /* Show "scroll to top" once the user nears the end of the page */
  useEffect(() => {
    const onScroll = () => {
      const scrolled = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      const hasScrolled = window.scrollY > 300;
      setShowScrollTop(
        hasScrolled && scrolled >= pageHeight - SCROLL_TOP_DISTANCE_FROM_END
      );
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [skills.length, experiences.length, activeCategory]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  /* Group skills by category, keeping the order they first appear in */
  const groupedSkills = useMemo(() => {
    const map = new Map<string, Skill[]>();
    skills.forEach((skill) => {
      const key = skill.category || "Other";
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(skill);
    });
    return Array.from(map.entries()).map(([category, items]) => ({
      category,
      items,
    }));
  }, [skills]);

  const visibleGroups =
    activeCategory === "All"
      ? groupedSkills
      : groupedSkills.filter((g) => g.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#050816] text-white px-5 sm:px-6 py-20 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-indigo-600/20 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute top-[40%] right-0 w-96 h-96 bg-cyan-500/10 blur-[140px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-[35%] w-96 h-96 bg-purple-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        {/* =====================================================
            HERO
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto"
        >
          <p className="text-indigo-400 uppercase tracking-[0.3em] text-sm mb-4">
            About Me
          </p>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Building digital experiences
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              with code & intelligence.
            </span>
          </h1>

          <p className="mt-7 text-gray-400 text-lg leading-relaxed max-w-3xl mx-auto">
            I'm Sanjay, a Full Stack Engineer focused on building scalable
            frontend applications with React, Angular, TypeScript and modern web
            technologies — while exploring AI-powered applications and
            intelligent developer tools.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[
              ["3+", "Years Experience"],
              ["10+", "Technologies"],
              ["20+", "Projects"],
              ["∞", "Learning Mode"],
            ].map(([value, label], index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5"
              >
                <p className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  {value}
                </p>
                <p className="text-sm text-gray-500 mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =====================================================
            ABOUT / PROFILE
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-24"
        >
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8">
            {/* About */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10">
              <p className="text-indigo-400 uppercase tracking-[0.2em] text-sm mb-3">
                Who I am
              </p>

              <h2 className="text-3xl font-bold mb-6">
                Engineer first.
                <span className="text-gray-500"> Always learning.</span>
              </h2>

              <div className="space-y-5 text-gray-400 leading-relaxed">
                <p>
                  I enjoy turning complex requirements into clean, intuitive and
                  scalable interfaces.
                </p>

                <p>
                  My primary experience is across React and Angular ecosystems,
                  with hands-on experience in TypeScript, Redux Toolkit,
                  GraphQL, Node.js and modern CSS frameworks.
                </p>

                <p>
                  I'm also expanding into AI engineering, working with concepts
                  such as LLMs, RAG, embeddings, vector databases and AI agents.
                </p>
              </div>
            </div>

            {/* Focus */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 backdrop-blur-xl p-8 md:p-10">
              <p className="text-cyan-400 uppercase tracking-[0.2em] text-sm mb-3">
                Current Focus
              </p>

              <h2 className="text-3xl font-bold mb-8">What I'm building</h2>

              <div className="space-y-5">
                {[
                  {
                    icon: <CodeOutlined />,
                    title: "Modern Web Apps",
                    text: "React, Angular & TypeScript",
                  },
                  {
                    icon: <ApiOutlined />,
                    title: "Backend APIs",
                    text: "Node.js, Express & GraphQL",
                  },
                  {
                    icon: <RobotOutlined />,
                    title: "AI Applications",
                    text: "LLMs, RAG & AI Agents",
                  },
                  {
                    icon: <DatabaseOutlined />,
                    title: "Data & Systems",
                    text: "MongoDB, Firebase & APIs",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                      {item.icon}
                    </div>

                    <div>
                      <p className="font-medium text-gray-200">{item.title}</p>
                      <p className="text-sm text-gray-500">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            JOURNEY
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-14">
            <p className="text-indigo-400 uppercase tracking-[0.3em] text-sm mb-3">
              My Journey
            </p>

            <h2 className="text-4xl font-bold">Experience & milestones</h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Timeline Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500 via-purple-500 to-cyan-500" />

            <div className="space-y-12">
              {loadingExperiences ? (
                <div className="text-center py-10 text-gray-500">
                  Loading experience...
                </div>
              ) : experienceError ? (
                <div className="text-center py-10 text-red-400">
                  {experienceError}
                </div>
              ) : experiences.length === 0 ? (
                <div className="text-center py-10 text-gray-500">
                  No experience records found.
                </div>
              ) : (
                experiences.map((item, index) => {
                  const isRight = index % 2 !== 0;

                  return (
                    <motion.div
                      key={item.id}
                      initial={{
                        opacity: 0,
                        x: isRight ? 40 : -40,
                      }}
                      whileInView={{
                        opacity: 1,
                        x: 0,
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 0.5,
                      }}
                      className="relative grid md:grid-cols-2 gap-8"
                    >
                      {/* Dot */}
                      <div className="absolute left-[9px] md:left-1/2 md:-translate-x-1/2 top-7 w-3 h-3 rounded-full bg-indigo-400 shadow-lg shadow-indigo-500/50 ring-4 ring-[#050816]" />

                      <div
                        className={`ml-10 md:ml-0 ${
                          isRight ? "md:col-start-2" : "md:pr-12"
                        }`}
                      >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-indigo-500/30 transition">
                          <p className="text-indigo-400 text-sm font-medium mb-2">
                            {item.startDate} — {item.endDate}
                          </p>

                          <h3 className="text-xl font-semibold">{item.title}</h3>

                          <div className="mt-2 text-sm text-gray-300">
                            <span>{item.role}</span>
                            <span className="mx-2 text-gray-600">•</span>
                            <span>{item.company}</span>
                            {item.client && (
                              <>
                                <span className="mx-2 text-gray-600">•</span>
                                <span>{item.client}</span>
                              </>
                            )}
                          </div>

                          <p className="text-gray-400 text-sm leading-relaxed mt-4">
                            {item.description}
                          </p>

                          {item.technologies?.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-5">
                              {item.technologies.map((technology) => (
                                <span
                                  key={technology}
                                  className="px-3 py-1 rounded-full text-xs bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
                                >
                                  {technology}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            TECH STACK — CATEGORY WISE
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-10">
            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-3">
              Tech Stack
            </p>

            <h2 className="text-4xl font-bold">Tools I work with</h2>

            <p className="text-gray-500 mt-4">
              Technologies I use to build modern applications.
            </p>
          </div>

          {loadingSkills ? (
            <div className="text-center py-10 text-gray-500">
              Loading skills...
            </div>
          ) : skillsError ? (
            <div className="text-center py-10 text-red-400">{skillsError}</div>
          ) : skills.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No skills found.
            </div>
          ) : (
            <>
              {/* Category filter tabs */}
              <div className="-mx-5 sm:mx-0 mb-8">
                <div className="flex gap-2 overflow-x-auto px-5 sm:px-0 sm:flex-wrap sm:justify-center pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {[
                    { category: "All", count: skills.length },
                    ...groupedSkills.map((g) => ({
                      category: g.category,
                      count: g.items.length,
                    })),
                  ].map(({ category, count }) => {
                    const isActive = activeCategory === category;
                    const style =
                      category === "All"
                        ? defaultCategoryStyle
                        : getCategoryStyle(category);

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => setActiveCategory(category)}
                        className={`shrink-0 inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition ${
                          isActive
                            ? `border-transparent bg-gradient-to-r ${
                                category === "All"
                                  ? "from-indigo-600 via-purple-600 to-cyan-500"
                                  : style.tabActive
                              } text-white shadow-lg shadow-indigo-500/20`
                            : "border-white/10 bg-white/[0.04] text-gray-400 hover:text-white hover:bg-white/[0.08]"
                        }`}
                      >
                        {category}
                        <span
                          className={`text-[11px] px-1.5 py-0.5 rounded-full ${
                            isActive
                              ? "bg-white/20 text-white"
                              : "bg-white/5 text-gray-500"
                          }`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Category cards */}
              <div
                key={activeCategory}
                className={`grid gap-5 items-start ${
                  activeCategory === "All"
                    ? "md:grid-cols-2 lg:grid-cols-3"
                    : "max-w-3xl mx-auto"
                }`}
              >
                {visibleGroups.map(({ category, items }, groupIndex) => {
                  const style = getCategoryStyle(category);

                  return (
                    <motion.div
                      key={category}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: groupIndex * 0.07, duration: 0.45 }}
                      whileHover={{ y: -4 }}
                      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-white/20 transition-colors"
                    >
                      {/* Top accent line */}
                      <div
                        className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${style.bar}`}
                      />

                      {/* Corner glow */}
                      <div
                        className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-[70px] opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none ${style.glow}`}
                      />

                      {/* Header */}
                      <div className="relative flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3 min-w-0">
                          <div
                            className={`shrink-0 w-11 h-11 rounded-xl border flex items-center justify-center text-lg ${style.iconBox}`}
                          >
                            {style.icon}
                          </div>

                          <h3
                            className={`font-semibold text-lg leading-tight ${style.text}`}
                          >
                            {category}
                          </h3>
                        </div>

                        <span className="shrink-0 text-xs text-gray-400 px-2.5 py-1 rounded-full border border-white/10 bg-white/[0.04]">
                          {items.length} {items.length === 1 ? "skill" : "skills"}
                        </span>
                      </div>

                      {/* Skills */}
                      <div className="relative flex flex-wrap gap-2 mt-5">
                        {items.map((skill) => (
                          <span
                            key={skill.id}
                            title={skill.description}
                            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-black/20 text-sm text-gray-300 transition cursor-default ${style.chip}`}
                          >
                            <span className={`text-sm ${style.text}`}>
                              {iconMap[skill.icon || "CodeOutlined"] || (
                                <CodeOutlined />
                              )}
                            </span>
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </>
          )}
        </motion.section>

        {/* =====================================================
            STRENGTHS
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">
            <p className="text-purple-400 uppercase tracking-[0.3em] text-sm mb-3">
              What I do
            </p>

            <h2 className="text-4xl font-bold">Engineering mindset</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {strengths.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-indigo-500/30 transition"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 text-xl mb-5">
                  {item.icon}
                </div>

                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>

                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* =====================================================
            HOBBIES
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10">
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-indigo-400 uppercase tracking-[0.2em] text-sm mb-3">
                  Beyond Code
                </p>

                <h2 className="text-3xl font-bold mb-4">When I'm not coding</h2>

                <p className="text-gray-500 leading-relaxed">
                  I enjoy exploring technology trends, photography, anime and
                  anything that gives me a different perspective on creativity
                  and problem solving.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4">
                {[
                  {
                    icon: <CameraOutlined />,
                    name: "Photography",
                  },
                  {
                    icon: <SmileOutlined />,
                    name: "Dogs",
                  },
                  {
                    icon: <RobotOutlined />,
                    name: "AI Trends",
                  },
                ].map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{
                      y: -5,
                    }}
                    className="rounded-2xl border border-white/10 bg-black/20 p-3 text-center"
                  >
                    <div className="text-2xl text-indigo-400">{item.icon}</div>

                    <p className="text-xs text-gray-400 mt-3">{item.name}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.section>

        {/* =====================================================
            CTA
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{
            opacity: 1,
            scale: 1,
          }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-br from-indigo-600/20 via-purple-600/10 to-cyan-500/10 p-10 md:p-14 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_60%)]" />

            <div className="relative">
              <p className="text-indigo-300 uppercase tracking-[0.3em] text-sm mb-4">
                Let's work together
              </p>

              <h2 className="text-3xl md:text-5xl font-bold">Have an idea?</h2>

              <p className="text-gray-400 max-w-xl mx-auto mt-5">
                Let's turn your idea into a fast, scalable and intelligent
                digital experience.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                <motion.a
                  href={ResumePDF}
                  download
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-500 font-semibold shadow-lg shadow-indigo-500/20"
                >
                  <DownloadOutlined />
                  Download Resume
                </motion.a>

                <MotionLink
                  to="/contact"
                  whileHover={{
                    scale: 1.04,
                  }}
                  whileTap={{
                    scale: 0.97,
                  }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 font-semibold transition"
                >
                  Let's Talk
                  <ArrowRightOutlined />
                </MotionLink>
              </div>
            </div>
          </div>
        </motion.section>
      </div>

      {/* =====================================================
          SCROLL TO TOP
      ====================================================== */}

      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            type="button"
            onClick={scrollToTop}
            aria-label="Scroll to top"
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: 0.25 }}
            className="fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-50 w-12 h-12 rounded-2xl border border-white/15 bg-gradient-to-br from-indigo-600 via-purple-600 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 flex items-center justify-center backdrop-blur-xl"
          >
            <ArrowUpOutlined />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AboutPage;