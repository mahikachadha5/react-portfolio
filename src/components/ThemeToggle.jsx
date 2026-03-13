import { useTheme } from "../context/ThemeContext";
import styles from "./modules/ThemeToggle.module.css";

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();

  return (
    <button className={styles.toggle} onClick={toggle} aria-label="Toggle theme">
      {theme === "light" ? "dark" : "light"}
    </button>
  );
}
