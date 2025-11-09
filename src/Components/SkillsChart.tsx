import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import skillsData from "../Mocks/skillsData";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler
);

export const SkillsRadarChart = () => {
  const data = {
    labels: skillsData.map((s) => s.name),
    datasets: [
      {
        label: "Skill Level",
        data: skillsData.map((s) => s.level),
        backgroundColor: "rgba(99,102,241,0.35)",
        borderColor: "rgb(99,102,241)",
        borderWidth: 2,
        pointBackgroundColor: "rgb(99,102,241)",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      r: {
        min: 0,
        max: 100,
        angleLines: { color: "#ddd" },
        grid: { color: "#ccc" },
      },
    },
  };

  return (
    <div
      className="mx-auto bg-white p-6 rounded-lg shadow"
      style={{ width: "100%", maxWidth: "600px", height: "400px", maxHeight: "300px" }}
    >
      <Radar data={data} options={options as any} />
    </div>
  );
};
