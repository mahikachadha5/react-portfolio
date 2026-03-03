import styles from "./App.module.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import CursorBlob from "./components/CursorBlob";
import CustomCursor from "./components/CustomCursor";
import ProjectDetail from "./components/ProjectDetail";
import { Routes, Route } from "react-router-dom";
import About from "./components/About";

function App() {
  return (
    <div className={styles.App}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <CustomCursor />
              <CursorBlob />
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
  );
}

export default App;
