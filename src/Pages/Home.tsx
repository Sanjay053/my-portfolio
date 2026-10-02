import { motion, useReducedMotion } from "framer-motion";
import type { MotionProps, TargetAndTransition, Transition } from "framer-motion";
import {
  ArrowRightOutlined,
  CodeOutlined,
  GithubOutlined,
  LinkedinOutlined,
  MailOutlined,
  RocketOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import Profile from "../Asset/profile.png";

const stats = [
  { value: "4+", label: "Years", color: "text-indigo-300" },
  { value: "React", label: "Frontend", color: "text-cyan-300" },
  { value: "AI", label: "Engineering", color: "text-fuchsia-300" },
  { value: "24/7", label: "Learning", color: "text-emerald-300" },
];

const features = [
  {
    icon: <CodeOutlined />,
    title: "Modern frontend",
    text: "Responsive interfaces, reusable components and scalable frontend architecture.",
    tone: "bg-indigo-500/10 border-indigo-400/15 text-indigo-300",
  },
  {
    icon: <ThunderboltOutlined />,
    title: "Performance focused",
    text: "Fast loading experiences, clean interactions and thoughtful optimization.",
    tone: "bg-cyan-500/10 border-cyan-400/15 text-cyan-300",
  },
  {
    icon: <RocketOutlined />,
    title: "AI-powered ideas",
    text: "Exploring intelligent products and practical AI workflows alongside modern web development.",
    tone: "bg-fuchsia-500/10 border-fuchsia-400/15 text-fuchsia-300",
  },
];

const socials = [
  {
    href: "https://github.com/Sanjay053?tab=repositories",
    label: "GitHub",
    icon: <GithubOutlined className="text-lg" />,
    hover: "hover:text-white hover:border-white/20",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/sanjayrajan053",
    label: "LinkedIn",
    icon: <LinkedinOutlined className="text-lg" />,
    hover: "hover:text-[#0A66C2] hover:border-[#0A66C2]/30",
    external: true,
  },
  {
    href: "mailto:sanjayrajan053@gmail.com",
    label: "Email",
    icon: <MailOutlined className="text-lg" />,
    hover: "hover:text-cyan-300 hover:border-cyan-400/30",
    external: false,
  },
];

const HomePage = () => {
  const reduce = useReducedMotion();

  // Infinite looping animations are switched off when the user prefers reduced motion
  const loop = (
    animate: TargetAndTransition,
    transition: Transition
  ): MotionProps =>
    reduce
      ? {}
      : {
          animate,
          transition: { repeat: Infinity, ease: "easeInOut", ...transition },
        };

  return (
    <main className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden">
      {/* ================= BACKGROUND ================= */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-48 -left-40 h-[320px] w-[320px] sm:h-[520px] sm:w-[520px] rounded-full bg-indigo-600/20 blur-[120px] sm:blur-[150px]" />
        <div className="absolute top-[25%] -right-48 h-[320px] w-[320px] sm:h-[520px] sm:w-[520px] rounded-full bg-cyan-500/10 blur-[120px] sm:blur-[150px]" />
        <div className="absolute bottom-[-180px] left-[30%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-purple-600/10 blur-[120px] sm:blur-[150px]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.8) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* ================= CONTAINER ================= */}
      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <section className="lg:min-h-screen flex items-center pt-14 pb-12 sm:pt-16 lg:py-10">
          <div className="w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-8 items-center">
            {/* ============ LEFT CONTENT ============ */}
            <motion.div
              initial={{ opacity: 0, x: reduce ? 0 : -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
              className="text-left"
            >
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 animate-ping" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
                </span>
                <span className="text-xs sm:text-sm text-gray-400 tracking-wide">
                  Software Engineer · Building for the web
                </span>
              </div>

              <p className="mt-7 sm:mt-8 text-xs sm:text-sm uppercase tracking-[0.3em] text-indigo-300">
                Hi, I'm
              </p>

              <h1 className="mt-3 sm:mt-4 text-5xl sm:text-7xl lg:text-[5.5rem] xl:text-[7rem] font-semibold tracking-[-0.06em] leading-[0.92]">
                Sanjay
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400">
                  S.
                </span>
              </h1>

              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-2 sm:gap-3 text-lg sm:text-xl md:text-2xl">
                <span className="text-gray-200">Frontend</span>
                <span className="text-indigo-400">/</span>
                <span className="text-gray-400">Full Stack</span>
                <span className="text-indigo-400">/</span>
                <span className="text-cyan-300">AI</span>
              </div>

              <p className="mt-6 sm:mt-7 max-w-2xl text-base sm:text-lg text-gray-400 leading-relaxed">
                I build modern, responsive digital experiences with React,
                Angular, TypeScript and intelligent application workflows.
              </p>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-9">
                <motion.a
                  href="/work"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="group inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 font-medium shadow-lg shadow-indigo-500/20"
                >
                  Explore my work
                  <ArrowRightOutlined className="transition-transform duration-300 group-hover:translate-x-1" />
                </motion.a>

                <motion.a
                  href="/contact"
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-gray-200 hover:bg-white/[0.07] transition"
                >
                  Let's talk
                  <MailOutlined />
                </motion.a>
              </div>

              {/* Social links */}
              <div className="flex items-center gap-3 mt-7 sm:mt-8">
                {socials.map((s) => (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target={s.external ? "_blank" : undefined}
                    rel={s.external ? "noreferrer" : undefined}
                    whileHover={{ y: -4 }}
                    className={`w-11 h-11 rounded-xl border border-white/10 bg-white/[0.035] flex items-center justify-center text-gray-500 transition ${s.hover}`}
                    aria-label={s.label}
                  >
                    {s.icon}
                  </motion.a>
                ))}
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-10 sm:mt-12 max-w-2xl">
                {stats.map((s) => (
                  <div
                    key={s.label}
                    className="rounded-2xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-4 text-left"
                  >
                    <p
                      className={`text-2xl sm:text-3xl font-semibold ${s.color}`}
                    >
                      {s.value}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* ============ RIGHT VISUAL ============ */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="w-full flex justify-center lg:justify-end"
            >
              {/*
                Mobile  (< sm): normal stacked flow — profile card, then the
                                three small cards wrapped underneath. Nothing overlaps.
                Tablet+ (>= sm): square stage with orbits and floating cards.
              */}
              <div className="relative w-full max-w-[360px] sm:max-w-[460px] lg:max-w-[560px] sm:aspect-square">
                {/* Outer glow */}
                <div className="absolute inset-[4%] sm:inset-[8%] rounded-full bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/10 to-cyan-400/20 blur-[70px] sm:blur-[90px]" />

                {/* Orbit 1 (tablet and up) */}
                <motion.div
                  {...loop({ rotate: 360 }, { duration: 24, ease: "linear" })}
                  className="hidden sm:block absolute inset-[3%] rounded-full border border-white/10"
                >
                  <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_18px_rgba(129,140,248,0.8)]" />
                </motion.div>

                {/* Orbit 2 (tablet and up) */}
                <motion.div
                  {...loop({ rotate: -360 }, { duration: 30, ease: "linear" })}
                  className="hidden sm:block absolute inset-[11%] rounded-full border border-cyan-400/10"
                >
                  <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
                </motion.div>

                {/* Main glass card */}
                <motion.div
                  {...loop({ y: [0, -8, 0] }, { duration: 5 })}
                  className="relative sm:absolute sm:inset-[12%] rounded-[2rem] sm:rounded-[2.5rem] border border-white/10 bg-white/[0.045] backdrop-blur-2xl shadow-2xl shadow-indigo-950/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-transparent to-cyan-500/10" />

                  <div className="relative h-full flex flex-col items-center justify-center gap-1 px-5 py-8 sm:p-8">
                    {/* Profile image */}
                    <div className="relative">
                      <div className="absolute -inset-3 sm:-inset-4 rounded-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 opacity-70 blur-lg" />
                      <div className="relative w-28 h-28 sm:w-36 sm:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden border border-white/20 bg-[#080b1c]">
                        <img
                          src={Profile}
                          alt="Sanjay S"
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>

                    <p className="mt-6 text-2xl sm:text-2xl lg:text-3xl font-semibold text-center">
                      Sanjay S
                    </p>

                    <p className="text-base lg:text-lg text-gray-400 text-center">
                      Software Engineer
                    </p>

                    <div className="flex flex-wrap justify-center gap-2 sm:gap-2.5 mt-4 sm:mt-5">
                      <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-indigo-400/10 border border-indigo-400/15 text-xs sm:text-sm text-indigo-300">
                        React
                      </span>
                      <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-cyan-400/10 border border-cyan-400/15 text-xs sm:text-sm text-cyan-300">
                        Angular
                      </span>
                      <span className="px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-fuchsia-400/10 border border-fuchsia-400/15 text-xs sm:text-sm text-fuchsia-300">
                        AI
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/*
                  Floating cards wrapper. Must NOT be positioned: on sm+ each
                  card's outer div is placed against the square stage, centred
                  on a point of the outer orbit ring (radius 47% of the stage):
                    top-left     (16.8%, 16.8%)  -> AI workflows
                    top-right    (83.2%, 16.8%)  -> Performance
                    bottom-left  (16.8%, 83.2%)  -> Clean code
                  The outer div carries the translate; the inner motion.div
                  carries the float animation, so the two transforms don't clash.
                */}
                <div className="mt-5 flex flex-wrap justify-center gap-2.5 sm:mt-0 sm:block">
                  {/* Code - bottom left on desktop */}
                  <div className="sm:absolute sm:left-[10.8%] sm:top-[83.2%] sm:-translate-x-1/2 sm:-translate-y-1/2">
                    <motion.div
                      {...loop({ y: [0, -6, 0] }, { duration: 4 })}
                      className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-[#0b0f24]/90 backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center text-sm bg-indigo-500/10 border-indigo-400/15 text-indigo-300">
                          <CodeOutlined />
                        </div>
                        <div>
                          <p className="text-xs text-white font-medium leading-tight">
                            Clean code
                          </p>
                          <p className="text-[10px] text-gray-500 leading-tight">
                            scalable architecture
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  {/* Performance - top right on desktop */}
                  <div className="sm:absolute sm:left-[83.2%] sm:top-[16.8%] sm:-translate-x-1/2 sm:-translate-y-1/2">
                    <motion.div
                      {...loop({ y: [0, 6, 0] }, { duration: 4.5, delay: 0.3 })}
                      className="relative rounded-xl sm:rounded-2xl border border-white/10 bg-[#0b0f24]/90 backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center text-sm bg-cyan-500/10 border-cyan-400/15 text-cyan-300">
                          <ThunderboltOutlined />
                        </div>
                        <div>
                          <p className="text-xs text-white font-medium leading-tight">
                            Performance
                          </p>
                          <p className="text-[10px] text-gray-500 leading-tight">
                            fast experiences
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                  {/* AI - top left on desktop */}
                  <div className="sm:absolute sm:left-[16.8%] sm:top-[16.8%] sm:-translate-x-1/2 sm:-translate-y-1/2">
                    <motion.div
                      {...loop({ y: [0, -5, 0] }, { duration: 4.2, delay: 0.6 })}
                      className="relative rounded-xl sm:rounded-2xl border border-fuchsia-400/15 bg-[#0b0f24]/90 backdrop-blur-xl px-3 py-2 sm:px-4 sm:py-3 shadow-xl whitespace-nowrap"
                    >
                      <div className="flex items-center gap-2.5 sm:gap-3">
                        <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg sm:rounded-xl border flex items-center justify-center text-sm bg-fuchsia-500/10 border-fuchsia-400/15 text-fuchsia-300">
                          <RocketOutlined />
                        </div>
                        <div>
                          <p className="text-xs text-white font-medium leading-tight">
                            AI workflows
                          </p>
                          <p className="text-[10px] text-gray-500 leading-tight">
                            build · test · iterate
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ================= SCROLL INDICATOR (desktop only) ================= */}
        <div className="hidden lg:flex justify-center pb-8">
          <motion.a
            href="#"
            {...loop({ y: [0, 7, 0] }, { duration: 1.8 })}
            className="flex flex-col items-center gap-2 text-gray-500 hover:text-gray-300 transition"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Scroll to explore
            </span>
            <div className="w-px h-10 bg-gradient-to-b from-indigo-400/60 to-transparent" />
          </motion.a>
        </div>

        {/* ================= FEATURE STRIP (content centered) ================= */}
        <section id="explore" className="pb-8 md:pb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {features.map((f) => (
              <motion.div
                key={f.title}
                whileHover={{ y: -5 }}
                className="rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-5 sm:p-6 flex flex-col items-center text-center"
              >
                <div
                  className={`w-11 h-11 rounded-xl border flex items-center justify-center ${f.tone}`}
                >
                  {f.icon}
                </div>
                <h3 className="text-lg font-semibold mt-4">{f.title}</h3>
                <p className="text-sm text-gray-400 mt-2 leading-relaxed max-w-xs">
                  {f.text}
                </p>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default HomePage;