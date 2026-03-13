import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import OldCursorBlob from "./components/OldCursorBlob";
import CustomCursor from "./components/CustomCursor";
import ProjectDetail from "./components/ProjectDetail";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";
import Background from "./components/Background";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeToggle from "./components/ThemeToggle";

function App() {
  return (
    <ThemeProvider>
      <div className={styles.App}>
        {/* <ThemeToggle /> */}
        <Routes>
          <Route
            path="/"
            element={
              <>
                <CustomCursor />
                {/* <CursorBlob /> */}
                <Background />
                <Navbar />
                <Hero />
                <Projects />
                {/* <About /> */}
                <Contact />
              </>
            }
          />
          <Route
            path="/projects/:id"
            element={
              <>
                <ProjectDetail /> <CustomCursor />
              </>
            }
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
