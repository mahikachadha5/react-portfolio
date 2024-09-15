
import styles from './App.module.css'
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';


function App() {
  return <div className={styles.App}>
    <Navbar />
    <Hero />
    <Projects />
  </div>
}

export default App;
