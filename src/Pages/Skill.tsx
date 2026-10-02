import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";

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
  RobotOutlined,
  DatabaseOutlined,
  ThunderboltOutlined,
  ExperimentOutlined,
  CloudOutlined,
  ToolOutlined,
} from "@ant-design/icons";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { SkillsRadarChart } from "../Components/SkillsChart";

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

const SkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        setLoading(true);
        setError("");

        const snapshot = await getDocs(collection(db, "skills"));

        const skillsData: Skill[] = snapshot.docs.map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            name: typeof data.name === "string" ? data.name : "",
            category:
              typeof data.category === "string" ? data.category : "",
            icon:
              typeof data.icon === "string"
                ? data.icon
                : "CodeOutlined",
            description:
              typeof data.description === "string"
                ? data.description
                : "",
            level:
              typeof data.level === "number"
                ? data.level
                : null,
            exp:
              typeof data.exp === "string"
                ? data.exp
                : "",
            tools: Array.isArray(data.tools)
              ? data.tools.filter(
                  (tool): tool is string =>
                    typeof tool === "string"
                )
              : [],
            project:
              typeof data.project === "string"
                ? data.project
                : null,
            order:
              typeof data.order === "number"
                ? data.order
                : 999,
            isActive:
              data.isActive !== false,
          };
        });

        const activeSkills = skillsData
          .filter((skill) => skill.isActive !== false)
          .sort(
            (a, b) =>
              (a.order ?? 999) - (b.order ?? 999)
          );

        setSkills(activeSkills);
      } catch (err) {
        console.error("Error fetching skills:", err);
        setError("Unable to load skills right now.");
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-indigo-200 p-6">
      {/* ==============================
          TITLE
      =============================== */}
      <motion.h1
        className="text-4xl font-bold text-center text-indigo-700"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Skills
      </motion.h1>

      {/* ==============================
          RADAR CHART
      =============================== */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="mt-10 flex flex-col gap-10 items-center"
      >
        <SkillsRadarChart />
      </motion.div>

      {/* ==============================
          LOADING
      =============================== */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-indigo-700 mt-12"
        >
          Loading skills...
        </motion.div>
      )}

      {/* ==============================
          ERROR
      =============================== */}
      {!loading && error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-red-600 mt-12"
        >
          {error}
        </motion.div>
      )}

      {/* ==============================
          EMPTY STATE
      =============================== */}
      {!loading && !error && skills.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center text-gray-600 mt-12"
        >
          No skills found.
        </motion.div>
      )}

      {/* ==============================
          SKILL CARDS
      =============================== */}
      {!loading && !error && skills.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          {skills.map((skill, index) => {
            const isActive = activeIndex === index;

            return (
              <div
                key={skill.id}
                className="perspective cursor-pointer"
                onClick={() =>
                  setActiveIndex(
                    isActive ? null : index
                  )
                }
              >
                <motion.div
                  animate={{
                    rotateY: isActive ? 180 : 0,
                  }}
                  whileHover={{
                    scale: 1.05,
                  }}
                  transition={{
                    duration: 0.6,
                  }}
                  style={{
                    transformStyle: "preserve-3d",
                  }}
                  className="relative w-full"
                >
                  {/* ==============================
                      FRONT
                  =============================== */}
                  <div
                    className="bg-white shadow-lg rounded-xl p-6 border border-indigo-200 text-center flex flex-col items-center justify-center min-h-[220px] hover:shadow-xl transition-shadow"
                    style={{
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Icon */}
                    <div className="text-4xl text-indigo-600 mb-3">
                      {iconMap[
                        skill.icon || "CodeOutlined"
                      ] || <CodeOutlined />}
                    </div>

                    {/* Name */}
                    <p className="text-xl font-semibold text-indigo-700">
                      {skill.name}
                    </p>

                    {/* Category */}
                    <p className="text-sm text-gray-500 mt-2">
                      {skill.category}
                    </p>

                    {/* Level */}
                    {skill.level !== null &&
                      skill.level !== undefined && (
                        <p className="text-gray-600 mt-2">
                          Level: {skill.level}%
                        </p>
                      )}

                    {/* Experience */}
                    {skill.exp && (
                      <p className="text-gray-500 text-sm mt-2">
                        {skill.exp}
                      </p>
                    )}
                  </div>

                  {/* ==============================
                      BACK
                  =============================== */}
                  <div
                    className="absolute inset-0 bg-indigo-700 rounded-xl text-white text-center p-5 flex flex-col items-center justify-center min-h-[220px]"
                    style={{
                      transform: "rotateY(180deg)",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    {/* Skill Name */}
                    <p className="text-xl font-bold mb-3">
                      {skill.name}
                    </p>

                    {/* Description */}
                    {skill.description && (
                      <p className="text-sm leading-snug mb-3 px-3">
                        {skill.description}
                      </p>
                    )}

                    {/* Experience */}
                    {skill.exp && (
                      <p className="text-sm text-indigo-200">
                        Experience: {skill.exp}
                      </p>
                    )}

                    {/* Tools */}
                    {skill.tools &&
                      skill.tools.length > 0 && (
                        <p className="text-xs mt-3 text-indigo-200 font-light leading-snug px-2">
                          <span className="font-medium">
                            Tools:
                          </span>{" "}
                          {skill.tools.join(", ")}
                        </p>
                      )}

                    {/* Project */}
                    {skill.project && (
                      <p className="text-xs mt-3 text-yellow-300 font-medium leading-snug px-2">
                        <span className="font-semibold">
                          Project:
                        </span>{" "}
                        {skill.project}
                      </p>
                    )}
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SkillsPage;