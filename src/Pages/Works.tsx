import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import {
  ArrowRightOutlined,
  CalendarOutlined,
  CheckCircleFilled,
  CodeOutlined,
  DatabaseOutlined,
  DownOutlined,
  GithubOutlined,
  RocketOutlined,
  ToolOutlined,
  UpOutlined,
} from "@ant-design/icons";

import {
  collection,
  getDocs,
} from "firebase/firestore";

import { db } from "../firebase";

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
  order?: number;
  isActive?: boolean;
}

const Works = () => {
  const [experiences, setExperiences] = useState<Experience[]>(
    []
  );

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [expandedId, setExpandedId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(
          collection(db, "experiences")
        );

        const experienceData: Experience[] =
          snapshot.docs.map((doc) => {
            const data = doc.data();

            return {
              id: doc.id,

              title:
                typeof data.title === "string"
                  ? data.title
                  : "",

              company:
                typeof data.company === "string"
                  ? data.company
                  : "",

              client:
                typeof data.client === "string"
                  ? data.client
                  : "",

              role:
                typeof data.role === "string"
                  ? data.role
                  : "",

              startDate:
                typeof data.startDate === "string"
                  ? data.startDate
                  : "",

              endDate:
                typeof data.endDate === "string"
                  ? data.endDate
                  : "",

              description:
                typeof data.description === "string"
                  ? data.description
                  : "",

              responsibilities: Array.isArray(
                data.responsibilities
              )
                ? data.responsibilities.filter(
                    (item): item is string =>
                      typeof item === "string"
                  )
                : [],

              technologies: Array.isArray(
                data.technologies
              )
                ? data.technologies.filter(
                    (item): item is string =>
                      typeof item === "string"
                  )
                : [],

              tools: Array.isArray(data.tools)
                ? data.tools.filter(
                    (item): item is string =>
                      typeof item === "string"
                  )
                : [],

              order:
                typeof data.order === "number"
                  ? data.order
                  : 999,

              isActive:
                data.isActive !== false,
            };
          });

        const activeExperiences =
          experienceData
            .filter(
              (item) => item.isActive !== false
            )
            .sort(
              (a, b) =>
                (b.order ?? 999) -
                (a.order ?? 999)
            );

        setExperiences(activeExperiences);
      } catch (err) {
        console.error(
          "Error fetching experiences:",
          err
        );

        setError(
          "Unable to load experience data right now."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  const toggleExperience = (id: string) => {
    setExpandedId((current) =>
      current === id ? null : id
    );
  };

  return (
    <div className="min-h-screen bg-[#050816] text-white relative overflow-hidden">
      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-40 w-[520px] h-[520px] rounded-full bg-indigo-600/15 blur-[150px]" />

        <div className="absolute top-[35%] -right-48 w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />

        <div className="absolute bottom-0 left-[30%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[150px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 py-16 md:py-24">
        {/* =========================================================
            HERO
        ========================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.7,
          }}
          className="max-w-5xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/[0.035] backdrop-blur-xl text-xs uppercase tracking-[0.18em] text-gray-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Career Timeline
          </div>

          <p className="text-sm md:text-base text-indigo-300 tracking-[0.25em] uppercase mt-8">
            My Work
          </p>

          <h1 className="mt-4 text-5xl md:text-7xl lg:text-8xl font-semibold tracking-[-0.06em] leading-[0.95]">
            Experience
            <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-cyan-400">
              that shaped me.
            </span>
          </h1>

          <p className="max-w-2xl mx-auto mt-7 text-base md:text-lg text-gray-400 leading-relaxed">
            A timeline of projects, engineering challenges,
            technologies and systems I've worked with throughout
            my professional journey.
          </p>
        </motion.section>

        {/* =========================================================
            STATS
        ========================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.6,
            delay: 0.15,
          }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-14"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/10 border border-indigo-400/15 flex items-center justify-center text-indigo-300">
              <CalendarOutlined />
            </div>

            <p className="text-xs uppercase tracking-[0.18em] text-gray-600 mt-5">
              Experience
            </p>

            <p className="text-3xl md:text-4xl font-semibold mt-2">
              4+
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Years
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/15 flex items-center justify-center text-cyan-300">
              <RocketOutlined />
            </div>

            <p className="text-xs uppercase tracking-[0.18em] text-gray-600 mt-5">
              Projects
            </p>

            <p className="text-3xl md:text-4xl font-semibold mt-2 text-cyan-300">
              {experiences.length}
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Timeline entries
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-6">
            <div className="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-400/15 flex items-center justify-center text-purple-300">
              <CodeOutlined />
            </div>

            <p className="text-xs uppercase tracking-[0.18em] text-gray-600 mt-5">
              Focus
            </p>

            <p className="text-xl md:text-2xl font-semibold mt-3">
              Web + AI
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Product engineering
            </p>
          </div>

          <div className="rounded-3xl border border-emerald-400/15 bg-gradient-to-br from-emerald-500/10 to-transparent backdrop-blur-xl p-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-400/10 border border-emerald-400/15 flex items-center justify-center text-emerald-300">
              <CheckCircleFilled />
            </div>

            <p className="text-xs uppercase tracking-[0.18em] text-gray-600 mt-5">
              Current
            </p>

            <p className="text-xl md:text-2xl font-semibold mt-3">
              Software Engineer
            </p>

            <p className="text-sm text-gray-500 mt-1">
              Active role
            </p>
          </div>
        </motion.section>

        {/* =========================================================
            TIMELINE HEADER
        ========================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.6,
          }}
          className="mt-24"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-indigo-400">
                Career Journey
              </p>

              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-3">
                From projects to products.
              </h2>
            </div>

            <p className="text-sm text-gray-600">
              Click an experience to explore
            </p>
          </div>
        </motion.section>

        {/* =========================================================
            LOADING
        ========================================================= */}

        {loading && (
          <div className="relative max-w-5xl mx-auto mt-14">
            <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-white/10" />

            <div className="space-y-12">
              {Array.from({ length: 5 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="relative"
                  >
                    <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-8 w-4 h-4 rounded-full bg-white/10 ring-8 ring-[#050816]" />

                    <div
                      className={`ml-12 md:w-[calc(50%-32px)] ${
                        index % 2 === 0
                          ? "md:mr-auto"
                          : "md:ml-auto"
                      }`}
                    >
                      <div className="h-64 rounded-[1.75rem] border border-white/10 bg-white/[0.03] animate-pulse" />
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* =========================================================
            ERROR
        ========================================================= */}

        {!loading && error && (
          <div className="mt-14 rounded-3xl border border-red-500/20 bg-red-500/5 p-10 text-center">
            <p className="text-red-300">
              {error}
            </p>
          </div>
        )}

        {/* =========================================================
            EMPTY
        ========================================================= */}

        {!loading &&
          !error &&
          experiences.length === 0 && (
            <div className="mt-14 rounded-3xl border border-white/10 bg-white/[0.03] p-14 text-center">
              <DatabaseOutlined className="text-4xl text-gray-600" />

              <h3 className="text-xl font-medium mt-5">
                No experience found
              </h3>

              <p className="text-gray-600 mt-2">
                Add experience documents to your Firestore
                collection.
              </p>
            </div>
          )}

        {/* =========================================================
            TIMELINE
        ========================================================= */}

        {!loading &&
          !error &&
          experiences.length > 0 && (
            <section className="relative max-w-5xl mx-auto mt-14">
              {/* Timeline line */}
              <div className="absolute left-[19px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/80 via-purple-500/50 to-cyan-500/20" />

              <div className="space-y-12 md:space-y-20">
                {experiences.map(
                  (item, index) => {
                    const isRight =
                      index % 2 !== 0;

                    const isExpanded =
                      expandedId === item.id;

                    const isCurrent =
                      item.endDate
                        ?.toLowerCase()
                        .includes("present");

                    return (
                      <motion.div
                        key={item.id}
                        initial={{
                          opacity: 0,
                          y: 35,
                        }}
                        whileInView={{
                          opacity: 1,
                          y: 0,
                        }}
                        viewport={{
                          once: true,
                          amount: 0.15,
                        }}
                        transition={{
                          duration: 0.6,
                          delay:
                            index * 0.05,
                        }}
                        className="relative"
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-[11px] md:left-1/2 md:-translate-x-1/2 top-8 z-10">
                          <div
                            className={`w-4 h-4 rounded-full ring-8 ring-[#050816] ${
                              isCurrent
                                ? "bg-emerald-400 shadow-[0_0_24px_rgba(52,211,153,0.45)]"
                                : "bg-indigo-400 shadow-[0_0_24px_rgba(129,140,248,0.4)]"
                            }`}
                          />
                        </div>

                        <div
                          className={`ml-12 md:w-[calc(50%-32px)] ${
                            isRight
                              ? "md:ml-auto"
                              : "md:mr-auto"
                          }`}
                        >
                          <motion.div
                            layout
                            className="group relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.035] backdrop-blur-xl transition-all duration-300 hover:bg-white/[0.05] hover:border-indigo-400/25 hover:shadow-2xl hover:shadow-indigo-950/20"
                          >
                            {/* Gradient accent */}
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                            {/* Glow */}
                            <div className="absolute -top-20 -right-20 w-44 h-44 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />

                            <div className="relative p-6 md:p-7">
                              {/* Header row */}
                              <div className="flex items-start justify-between gap-4">
                                <div>
                                  <div className="flex items-center flex-wrap gap-2">
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-indigo-400/10 border border-indigo-400/15 text-[10px] uppercase tracking-[0.12em] text-indigo-300">
                                      {item.startDate}{" "}
                                      —{" "}
                                      {item.endDate}
                                    </span>

                                    {isCurrent && (
                                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-400/10 border border-emerald-400/15 text-[10px] uppercase tracking-[0.12em] text-emerald-300">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        Current
                                      </span>
                                    )}
                                  </div>

                                  <h3 className="text-2xl font-semibold mt-4 leading-tight">
                                    {item.title}
                                  </h3>
                                </div>

                                <div className="shrink-0 w-9 h-9 rounded-xl border border-white/10 bg-black/20 flex items-center justify-center text-xs text-gray-500">
                                  {String(
                                    index + 1
                                  ).padStart(
                                    2,
                                    "0"
                                  )}
                                </div>
                              </div>

                              {/* Role / company / client */}
                              <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-4 text-sm text-gray-400">
                                <span className="text-gray-200">
                                  {item.role}
                                </span>

                                <span className="text-gray-700">
                                  •
                                </span>

                                <span>
                                  {item.company}
                                </span>

                                {item.client && (
                                  <>
                                    <span className="text-gray-700">
                                      •
                                    </span>

                                    <span className="text-gray-500">
                                      {item.client}
                                    </span>
                                  </>
                                )}
                              </div>

                              {/* Description */}
                              {item.description && (
                                <p className="mt-5 text-sm leading-relaxed text-gray-500">
                                  {item.description}
                                </p>
                              )}

                              {/* Technologies */}
                              {item.technologies
                                ?.length >
                                0 && (
                                <div className="mt-6">
                                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-600 mb-3">
                                    <CodeOutlined />
                                    Technologies
                                  </div>

                                  <div className="flex flex-wrap gap-2">
                                    {item.technologies.map(
                                      (
                                        technology
                                      ) => (
                                        <span
                                          key={
                                            technology
                                          }
                                          className="px-3 py-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/15 text-xs text-indigo-300"
                                        >
                                          {
                                            technology
                                          }
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Expanded details */}
                              <motion.div
                                initial={
                                  false
                                    ? undefined
                                    : false
                                }
                                animate={{
                                  height:
                                    isExpanded
                                      ? "auto"
                                      : 0,
                                  opacity:
                                    isExpanded
                                      ? 1
                                      : 0,
                                }}
                                transition={{
                                  duration: 0.3,
                                }}
                                className="overflow-hidden"
                              >
                                <div className="pt-6 mt-6 border-t border-white/10">
                                  {/* Responsibilities */}
                                  {item
                                    .responsibilities
                                    ?.length >
                                    0 && (
                                    <div>
                                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-600 mb-4">
                                        <RocketOutlined />
                                        Responsibilities
                                      </div>

                                      <div className="space-y-3">
                                        {item.responsibilities.map(
                                          (
                                            responsibility,
                                            responsibilityIndex
                                          ) => (
                                            <div
                                              key={`${item.id}-responsibility-${responsibilityIndex}`}
                                              className="flex items-start gap-3"
                                            >
                                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 shrink-0" />

                                              <p className="text-sm text-gray-500 leading-relaxed">
                                                {
                                                  responsibility
                                                }
                                              </p>
                                            </div>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}

                                  {/* Tools */}
                                  {item.tools
                                    ?.length >
                                    0 && (
                                    <div className="mt-7">
                                      <div className="flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-gray-600 mb-3">
                                        <ToolOutlined />
                                        Tools
                                      </div>

                                      <div className="flex flex-wrap gap-2">
                                        {item.tools.map(
                                          (
                                            tool
                                          ) => (
                                            <span
                                              key={
                                                tool
                                              }
                                              className="px-3 py-1.5 rounded-xl bg-white/[0.035] border border-white/10 text-xs text-gray-400"
                                            >
                                              {
                                                tool
                                              }
                                            </span>
                                          )
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </motion.div>

                              {/* Expand button */}
                              <button
                                type="button"
                                onClick={() =>
                                  toggleExperience(
                                    item.id
                                  )
                                }
                                className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-gray-600 hover:text-indigo-300 transition"
                              >
                                {isExpanded ? (
                                  <>
                                    Hide details
                                    <UpOutlined />
                                  </>
                                ) : (
                                  <>
                                    View details
                                    <DownOutlined />
                                  </>
                                )}
                              </button>
                            </div>
                          </motion.div>
                        </div>
                      </motion.div>
                    );
                  }
                )}
              </div>
            </section>
          )}

        {/* =========================================================
            CTA
        ========================================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 30,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{
            once: true,
            amount: 0.2,
          }}
          transition={{
            duration: 0.7,
          }}
          className="mt-24"
        >
          <div className="relative overflow-hidden rounded-[2rem] border border-indigo-500/15 bg-gradient-to-br from-indigo-500/10 via-white/[0.02] to-cyan-500/10 p-8 md:p-12">
            <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-indigo-500/10 blur-[130px]" />

            <div className="relative flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
                  Next chapter
                </p>

                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight mt-3">
                  Still building. Still learning.
                </h2>

                <p className="max-w-2xl text-gray-500 leading-relaxed mt-4">
                  My journey continues across modern frontend
                  architecture, backend systems and AI-powered
                  applications.
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <div className="w-12 h-12 rounded-2xl border border-white/10 bg-white/[0.04] flex items-center justify-center text-indigo-300">
                  <GithubOutlined />
                </div>

                <div>
                  <p className="text-sm font-medium">
                    {experiences.length}
                  </p>

                  <p className="text-xs text-gray-600">
                    Career milestones
                  </p>
                </div>

                <ArrowRightOutlined className="text-gray-600 ml-2" />
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
};

export default Works;