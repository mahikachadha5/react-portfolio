
import styles from './App.module.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import Contact from './components/Contact';


function App() {
  return <div className={styles.App}>
    <Navbar />
    <Hero />
    <Projects />
    <Contact />
  </div>
}

export default App;
