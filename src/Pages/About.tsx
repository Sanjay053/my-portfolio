import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  CodeOutlined,
  BlockOutlined,
  GatewayOutlined,
  NodeExpandOutlined,
  BgColorsOutlined,
  Html5Outlined,
  HighlightOutlined,
  ApiOutlined,
  GithubOutlined,
  CodeSandboxOutlined,
  CameraOutlined,
  SmileOutlined,
} from "@ant-design/icons";
import ResumePDF from "../Asset/sanjay_resume.pdf";

/* ✅ Timeline Data */
const timeline = [
  {
    year: "2025 — Promotion Platform",
    desc: "Built multi-level promo workflows using GraphQL & Tailwind.",
  },
  {
    year: "2024 — Offer Management System",
    desc: "Developed UI with Angular & Playwright.",
  },
  {
    year: "2023 — Pet Service Booking",
    desc: "Created booking UI using React.",
  },
  {
    year: "2023 — Download Delight",
    desc: "Developed UI using Angular + Material.",
  },
];

const MotionLink = motion(Link);

const AboutPage = () => {
  const techStack = [
    { icon: <CodeSandboxOutlined />, name: "React" },
    { icon: <ApiOutlined />, name: "Angular" },
    { icon: <CodeOutlined />, name: "TypeScript" },
    { icon: <CodeOutlined />, name: "JavaScript" },
    { icon: <BlockOutlined />, name: "Redux Toolkit" },
    { icon: <GatewayOutlined />, name: "GraphQL" },
    { icon: <NodeExpandOutlined />, name: "Node Basics" },
    { icon: <BgColorsOutlined />, name: "Tailwind" },
    { icon: <Html5Outlined />, name: "HTML" },
    { icon: <HighlightOutlined />, name: "CSS" },
    { icon: <GithubOutlined />, name: "GitHub" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-violet-100 to-indigo-200 px-6 py-10">
      
      {/* ✅ Section 1 — Intro */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl mx-auto text-center"
      >
        <h1 className="text-4xl font-bold text-indigo-700">About Me</h1>
        <p className="mt-4 text-lg text-gray-700">
          Hi! I’m <strong>Sanjay</strong>, a passionate{" "}
          <strong>Frontend Developer</strong> who loves creating modern,
          intuitive & scalable web applications using React & Angular.
        </p>
      </motion.div>

      {/* ✅ Section 2 — Journey */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <h2 className="text-2xl font-semibold text-indigo-600">My Journey</h2>

        <motion.ul
          className="timeline mt-6 border-l-2 border-indigo-600 space-y-6 pl-6"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {timeline.map((item, index) => (
            <motion.li
              key={index}
              variants={{
                hidden: { opacity: 0, x: -30 },
                visible: { opacity: 1, x: 0 },
              }}
              className="relative"
            >
              <span className="absolute -left-[13px] top-1 w-3 h-3 bg-indigo-600 rounded-full"></span>
              <h3 className="font-bold">{item.year}</h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>

      {/* ✅ Section 3 — Skills */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        className="max-w-4xl mx-auto mt-12"
      >
        <h2 className="text-2xl font-semibold text-indigo-600">
          Skills & Tech Stack
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          {techStack.map((tech, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center gap-2 bg-white shadow-md p-3 rounded-xl"
            >
              <div className="text-3xl text-indigo-600">{tech.icon}</div>
              <p className="font-medium">{tech.name}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* ✅ Section 4 — Strengths */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-indigo-600">Strengths</h2>
        <ul className="mt-4 list-disc ml-6 space-y-2 text-gray-700">
          <li>Pixel-perfect UI development</li>
          <li>Reusable & scalable components</li>
          <li>Performance optimization</li>
          <li>Responsive web development</li>
        </ul>
      </div>

      {/* ✅ Section 5 — What I care about */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-indigo-600">
          What I care about
        </h2>
        <ul className="mt-4 list-disc ml-6 space-y-2 text-gray-700">
          <li>Accessible & user-centered design</li>
          <li>Clean, maintainable code</li>
          <li>Continuous improvement</li>
        </ul>
      </div>

      {/* ✅ Section 6 — Experience Summary */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-indigo-600">
          Experience Summary
        </h2>
        <p className="mt-4 text-gray-700 leading-relaxed">
          2+ years working across enterprise UI systems — promotions, e-commerce
          and workflow platforms. Strong in React, Angular, GraphQL, API
          integration & scalable component libraries.
        </p>
      </div>

      {/* ✅ Section 7 — Hobbies */}
      <div className="max-w-4xl mx-auto mt-12">
        <h2 className="text-2xl font-semibold text-indigo-600">Hobbies</h2>
        <ul className="flex gap-6 flex-wrap mt-4 text-gray-700">
          <li className="flex items-center gap-2">
            <CameraOutlined /> Photography
          </li>
          <li className="flex items-center gap-2">
            <SmileOutlined /> Dogs
          </li>
          <li>Anime & Tech Trends</li>
        </ul>
      </div>

      {/* ✅ Resume + Contact */}
      <div className="max-w-4xl mx-auto mt-12 flex gap-6">
        <motion.a
          href={ResumePDF}
          download
          whileHover={{ scale: 1.05 }}
          className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 transition"
        >
          Download Resume
        </motion.a>

        <MotionLink
  to="/contact"
  whileHover={{ scale: 1.05 }}
  className="px-6 py-3 border border-indigo-600 text-indigo-600 font-semibold rounded-md hover:bg-indigo-100 transition block text-center"
>
  Contact me
</MotionLink>
      </div>
    </div>
  );
};

export default AboutPage;
