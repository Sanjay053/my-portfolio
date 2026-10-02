import { useEffect, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
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
} from "@ant-design/icons";
import ResumePDF from "../Asset/sanjay_resume.pdf";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

const MotionLink = motion.create(Link);

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


const strengths = [
  {
    icon: <RocketOutlined />,
    title: "Scalable UI",
    description:
      "Building reusable and maintainable frontend architectures.",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Performance",
    description:
      "Focused on fast, responsive and optimized user experiences.",
  },
  {
    icon: <CodeOutlined />,
    title: "Clean Code",
    description:
      "Writing structured, readable and production-ready code.",
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
        setExperienceError(
          "Unable to load experience data right now."
        );
        setSkillsError("Unable to load skills data right now.");
      } finally {
        setLoadingExperiences(false);
        setLoadingSkills(false);
      }
    };

    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-[#050816] text-white px-6 py-20 relative overflow-hidden">

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
            I'm Sanjay, a Full Stack Engineer focused on building
            scalable frontend applications with React, Angular,
            TypeScript and modern web technologies — while exploring
            AI-powered applications and intelligent developer tools.
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

                <p className="text-sm text-gray-500 mt-1">
                  {label}
                </p>
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
                <span className="text-gray-500">
                  {" "}
                  Always learning.
                </span>
              </h2>

              <div className="space-y-5 text-gray-400 leading-relaxed">

                <p>
                  I enjoy turning complex requirements into clean,
                  intuitive and scalable interfaces.
                </p>

                <p>
                  My primary experience is across React and Angular
                  ecosystems, with hands-on experience in TypeScript,
                  Redux Toolkit, GraphQL, Node.js and modern CSS
                  frameworks.
                </p>

                <p>
                  I'm also expanding into AI engineering, working with
                  concepts such as LLMs, RAG, embeddings, vector
                  databases and AI agents.
                </p>

              </div>

            </div>

            {/* Focus */}
            <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/10 to-cyan-500/5 backdrop-blur-xl p-8 md:p-10">

              <p className="text-cyan-400 uppercase tracking-[0.2em] text-sm mb-3">
                Current Focus
              </p>

              <h2 className="text-3xl font-bold mb-8">
                What I'm building
              </h2>

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
                  <div
                    key={item.title}
                    className="flex items-center gap-4"
                  >
                    <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-indigo-400">
                      {item.icon}
                    </div>

                    <div>
                      <p className="font-medium text-gray-200">
                        {item.title}
                      </p>

                      <p className="text-sm text-gray-500">
                        {item.text}
                      </p>
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

            <h2 className="text-4xl font-bold">
              Experience & milestones
            </h2>

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
                          isRight
                            ? "md:col-start-2"
                            : "md:pr-12"
                        }`}
                      >
                        <div className="rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6 hover:border-indigo-500/30 transition">
                          <p className="text-indigo-400 text-sm font-medium mb-2">
                            {item.startDate} — {item.endDate}
                          </p>

                          <h3 className="text-xl font-semibold">
                            {item.title}
                          </h3>

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
            TECH STACK
        ====================================================== */}

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24"
        >
          <div className="text-center mb-12">

            <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-3">
              Tech Stack
            </p>

            <h2 className="text-4xl font-bold">
              Tools I work with
            </h2>

            <p className="text-gray-500 mt-4">
              Technologies I use to build modern applications.
            </p>

          </div>

          {loadingSkills ? (
            <div className="text-center py-10 text-gray-500">
              Loading skills...
            </div>
          ) : skillsError ? (
            <div className="text-center py-10 text-red-400">
              {skillsError}
            </div>
          ) : skills.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No skills found.
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    delay: index * 0.04,
                  }}
                  whileHover={{
                    y: -6,
                    scale: 1.03,
                  }}
                  className="group rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl p-5 text-center hover:border-indigo-500/40 hover:bg-indigo-500/[0.05] transition"
                >
                  <div className="text-3xl text-indigo-400 group-hover:text-cyan-400 transition">
                    {iconMap[skill.icon || "CodeOutlined"] || <CodeOutlined />}
                  </div>

                  <p className="font-medium mt-3">
                    {skill.name}
                  </p>

                  <p className="text-xs text-gray-600 mt-1">
                    {skill.category}
                  </p>
                </motion.div>
              ))}
            </div>
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

            <h2 className="text-4xl font-bold">
              Engineering mindset
            </h2>

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

                <h3 className="text-lg font-semibold mb-2">
                  {item.title}
                </h3>

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

                <h2 className="text-3xl font-bold mb-4">
                  When I'm not coding
                </h2>

                <p className="text-gray-500 leading-relaxed">
                  I enjoy exploring technology trends, photography,
                  anime and anything that gives me a different
                  perspective on creativity and problem solving.
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
                    className="rounded-2xl border border-white/10 bg-black/20 p-5 text-center"
                  >
                    <div className="text-2xl text-indigo-400">
                      {item.icon}
                    </div>

                    <p className="text-xs text-gray-400 mt-3">
                      {item.name}
                    </p>
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

              <h2 className="text-3xl md:text-5xl font-bold">
                Have an idea?
              </h2>

              <p className="text-gray-400 max-w-xl mx-auto mt-5">
                Let's turn your idea into a fast, scalable and
                intelligent digital experience.
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
    </div>
  );
};

export default AboutPage;