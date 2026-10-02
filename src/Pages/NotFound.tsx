import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import type { MotionProps, TargetAndTransition, Transition } from "framer-motion";
import {
  ArrowLeftOutlined,
  CodeOutlined,
  HomeOutlined,
  MailOutlined,
  RocketOutlined,
} from "@ant-design/icons";

const quickLinks = [
  {
    to: "/home",
    title: "Home",
    text: "Back to the start",
    icon: <HomeOutlined />,
    tone: "bg-indigo-500/10 border-indigo-400/15 text-indigo-300",
  },
  {
    to: "/work",
    title: "My work",
    text: "Projects and skills",
    icon: <CodeOutlined />,
    tone: "bg-cyan-500/10 border-cyan-400/15 text-cyan-300",
  },
  {
    to: "/contact",
    title: "Contact",
    text: "Let's talk",
    icon: <MailOutlined />,
    tone: "bg-fuchsia-500/10 border-fuchsia-400/15 text-fuchsia-300",
  },
];

const NotFound = () => {
  const reduce = useReducedMotion();

  // Looping animations are switched off when the user prefers reduced motion
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
    <main className="min-h-screen bg-[#050816] text-white relative overflow-x-hidden flex items-center">
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

      {/* ================= CONTENT ================= */}
      <div className="relative w-full max-w-5xl mx-auto px-5 sm:px-8 py-20 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: reduce ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center text-center"
        >
          {/* Status badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-2 sm:px-4 rounded-full border border-white/10 bg-white/[0.04] backdrop-blur-xl">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-fuchsia-400 opacity-60 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-fuchsia-400" />
            </span>
            <span className="text-xs sm:text-sm text-gray-400 tracking-wide">
              Error 404 · Page not found
            </span>
          </div>

          {/* 404 with orbit */}
          <div className="relative mt-10 sm:mt-12 flex items-center justify-center">
            {/* Glow */}
            <div className="absolute h-[70%] w-[90%] rounded-full bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/15 to-cyan-400/25 blur-[70px] sm:blur-[90px]" />

            {/* Orbit ring */}
            <motion.div
              {...(reduce
                ? {}
                : {
                    animate: { rotate: 360 },
                    transition: {
                      duration: 26,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  })}
              className="absolute w-[300px] h-[300px] sm:w-[440px] sm:h-[440px] lg:w-[520px] lg:h-[520px] rounded-full border border-white/10"
            >
              <span className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-indigo-400 shadow-[0_0_18px_rgba(129,140,248,0.8)]" />
            </motion.div>

            <motion.div
              {...(reduce
                ? {}
                : {
                    animate: { rotate: -360 },
                    transition: {
                      duration: 32,
                      repeat: Infinity,
                      ease: "linear",
                    },
                  })}
              className="absolute w-[230px] h-[230px] sm:w-[340px] sm:h-[340px] lg:w-[410px] lg:h-[410px] rounded-full border border-cyan-400/10"
            >
              <span className="absolute top-1/2 -right-1.5 -translate-y-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.8)]" />
            </motion.div>

            {/* Big number */}
            <motion.h1
              {...loop({ y: [0, -8, 0] }, { duration: 5 })}
              className="relative text-[7rem] sm:text-[11rem] lg:text-[14rem] font-semibold tracking-[-0.08em] leading-none text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-cyan-400 select-none"
            >
              404
            </motion.h1>
          </div>

          {/* Copy */}
          <h2 className="mt-8 sm:mt-10 text-2xl sm:text-4xl font-semibold tracking-tight">
            This page doesn't exist
          </h2>

          <p className="mt-4 max-w-xl text-base sm:text-lg text-gray-400 leading-relaxed">
            The link may be broken or the page may have moved. Head back home or
            pick one of the pages below.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-9 w-full sm:w-auto">
            <Link to="/home" className="block">
              <motion.div
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex w-full items-center justify-center gap-3 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-cyan-500 font-medium shadow-lg shadow-indigo-500/20"
              >
                <HomeOutlined />
                Back to home
              </motion.div>
            </Link>

            <motion.button
              type="button"
              onClick={() => window.history.back()}
              whileHover={{ scale: 1.03, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-xl text-gray-200 hover:bg-white/[0.07] transition"
            >
              <ArrowLeftOutlined />
              Go back
            </motion.button>
          </div>

          {/* Quick links */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12 sm:mt-14 w-full max-w-3xl">
            {quickLinks.map((l) => (
              <Link key={l.title} to={l.to} className="block">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="h-full rounded-3xl border border-white/10 bg-white/[0.035] backdrop-blur-xl p-5 flex flex-col items-center text-center hover:bg-white/[0.06] transition"
                >
                  <div
                    className={`w-11 h-11 rounded-xl border flex items-center justify-center ${l.tone}`}
                  >
                    {l.icon}
                  </div>
                  <h3 className="text-base font-semibold mt-4">{l.title}</h3>
                  <p className="text-sm text-gray-400 mt-1">{l.text}</p>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Footer hint */}
          <p className="mt-10 inline-flex items-center gap-2 text-xs text-gray-500">
            <RocketOutlined />
            Lost in space? Every route here leads somewhere good.
          </p>
        </motion.div>
      </div>
    </main>
  );
};

export default NotFound;