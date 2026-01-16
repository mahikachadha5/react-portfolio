import { useState, useEffect } from "react";
import styles from "./modules/CustomCursor.module.css";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorIcon, setCursorIcon] = useState("default");

  const cursorStyles = {
    default: "💜",
    link: "🚀",
    code: "💻",
    design: "🎨",
    project: "📁",
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  });

  useEffect(() => {
    const updateCursorIcon = () => {
      const elementUnderCursor = document.elementFromPoint(
        mousePosition.x,
        mousePosition.y
      );

      if (!elementUnderCursor) return;

      if (
        elementUnderCursor.tagName == "A" ||
        elementUnderCursor.tagName == "BUTTON"
      ) {
        setCursorIcon("link");
      } else if (elementUnderCursor.classList.contains("project")) {
        setCursorIcon("project");
      } else if (elementUnderCursor.classList.contains("code")) {
        setCursorIcon("code");
      } else if (elementUnderCursor.classList.contains("design")) {
        setCursorIcon("design");
      } else {
        setCursorIcon("default");
      }
    };

    updateCursorIcon();
  }, [mousePosition]);

  return (
    <div
      className={styles.customCursor}
      style={{
        left: mousePosition.x,
        top: mousePosition.y,
      }}
    >
      <span className={styles.cursorIcon}>{cursorStyles[cursorIcon]}</span>{" "}
    </div>
  );
};

export default CustomCursor;
