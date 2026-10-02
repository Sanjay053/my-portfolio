import { useState } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import NavBar from "./Components/Navbar";

import HomePage from "./Pages/Home";
import About from "./Pages/About";
import SkillsPage from "./Pages/Skill";
import ContactPage from "./Pages/Contact";
import NotFound from "./Pages/NotFound";

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Default */}
        <Route
          path="/"
          element={
            <Navigate
              to="/home"
              replace
            />
          }
        />

        {/* Home */}
        <Route
          path="/home"
          element={
            <PageTransition>
              <HomePage />
            </PageTransition>
          }
        />

        {/* Work / About */}
        <Route
          path="/work"
          element={
            <PageTransition>
              <About />
            </PageTransition>
          }
        />

        {/* Skills */}
        <Route
          path="/skills"
          element={
            <PageTransition>
              <SkillsPage />
            </PageTransition>
          }
        />

        {/* Contact */}
        <Route
          path="/contact"
          element={
            <PageTransition>
              <ContactPage />
            </PageTransition>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <PageTransition>
              <NotFound />
            </PageTransition>
          }
        />
      </Routes>
    </AnimatePresence>
  );
};

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({
  children,
}: PageTransitionProps) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 12,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        y: -12,
      }}
      transition={{
        duration: 0.25,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

function App() {
  const [isSticky, setIsSticky] =
    useState(false);

  return (
    <BrowserRouter basename="/my-portfolio">
      <div className="min-h-screen bg-[#050816]">
        <NavBar
          setIsSticky={setIsSticky}
        />

        <div
          className={`relative ${
            isSticky ? "z-0" : "z-0"
          }`}
        >
          <main className="min-h-screen pb-24 md:pb-0">
            <AnimatedRoutes />
          </main>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;