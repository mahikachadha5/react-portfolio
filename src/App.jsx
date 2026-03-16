import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import ProjectDetail from "./components/ProjectDetail";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Background from "./components/Background";
import { ThemeProvider } from "./context/ThemeContext";
import Swing from "./components/Swing";
import Playground from "./components/Playground";
import PageTransition from "./components/PageTransition";
import { AnimatePresence, motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

function AppRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const isPlayground = location.pathname === "/playground";
  const [overlayActive, setOverlayActive] = useState(false);
  const [swingHovered, setSwingHovered] = useState(false);
  const animatingRef = useRef(false);

  // Reset overlayActive when route settles — isPlayground takes over keeping it expanded
  useEffect(() => {
    setOverlayActive(false);
    setSwingHovered(false);
    animatingRef.current = false;
  }, [location.pathname]);

  // Swing fires these events to control the overlay
  useEffect(() => {
    const onEnter = () => setSwingHovered(true);
    const onLeave = () => setSwingHovered(false);
    const onClick = () => {
      if (animatingRef.current) return;
      animatingRef.current = true;
      setSwingHovered(false);
      setOverlayActive(true);
      setTimeout(() => navigate("/playground"), 400);
    };
    window.addEventListener("swing-hover-enter", onEnter);
    window.addEventListener("swing-hover-leave", onLeave);
    window.addEventListener("navigate-playground", onClick);
    return () => {
      window.removeEventListener("swing-hover-enter", onEnter);
      window.removeEventListener("swing-hover-leave", onLeave);
      window.removeEventListener("navigate-playground", onClick);
    };
  }, [navigate]);

  return (
    <>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                {/* <CursorBlob /> */}
                <Background />
                <Swing />
                <Navbar />
                <Hero />
                <Projects />
                {/* <About /> */}
                <Contact />
              </PageTransition>
            }
          />
          <Route path="/playground" element={<Playground />} />
          <Route
            path="/projects/:id"
            element={
              <PageTransition>
                <ProjectDetail />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>

      <motion.div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#0e0e0e",
          zIndex: 5000,
          pointerEvents: "none",
        }}
        initial={false}
        animate={{
          clipPath: (overlayActive || isPlayground)
            ? "circle(150% at 100% 0%)"
            : swingHovered
              ? "circle(3% at 100% 0%)"
              : "circle(0% at 100% 0%)",
        }}
        transition={
          overlayActive || isPlayground
            ? { duration: 0.9, ease: [0.76, 0, 0.24, 1] }
            : { duration: 0.4, ease: "easeOut" }
        }
      />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <div className={styles.App}>
        {/* <ThemeToggle /> */}
        <AppRoutes />
      </div>
    </ThemeProvider>
  );
}

export default App;
