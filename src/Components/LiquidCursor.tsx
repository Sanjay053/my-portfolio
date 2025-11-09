import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface CursorPos {
  x: number;
  y: number;
}

export default function LiquidCursor() {
  const [pos, setPos] = useState<CursorPos>({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div style={{ filter: "url(#gooey)" }}>
      {/* MAIN blob */}
      <motion.div
        className="liquid-cursor"
        animate={{
          x: pos.x - 25,
          y: pos.y - 25,
        }}
        transition={{
          type: "spring",
          stiffness: 100,
          damping: 15,
          mass: 0.4,
        }}
      />

      {/* trailing blob */}
      <motion.div
        className="liquid-cursor trail"
        animate={{
          x: pos.x - 25,
          y: pos.y - 25,
        }}
        transition={{
          type: "spring",
          stiffness: 60,
          damping: 25,
          mass: 0.8,
        }}
      />
    </div>
  );
}
