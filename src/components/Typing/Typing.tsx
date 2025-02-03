import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const devArr = ["Hello, Developer!", "Welcome to React!", "Enjoy Coding!"];

export default function TypingButton() {
  const [count, setCount] = useState(0);
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    setDisplayText(""); // Reset text before typing starts

    let i = 0;
    const currentText = devArr[count]; 
    const typingInterval = setInterval(() => {
      if (i < currentText.length - 1) {
        setDisplayText((prev) => prev + currentText[i]);
        i++;
      } else {
        clearInterval(typingInterval); // Stop typing when complete
        
        const timeout = setTimeout(() => {
          setCount((prevCount) => (prevCount + 1) % devArr.length);
        }, 1500); // Delay before switching text

        return () => clearTimeout(timeout); // ✅ Cleanup timeout
      }
    }, 100); // Typing speed

    return () => {
      clearInterval(typingInterval); // ✅ Cleanup interval
    };
  }, [count]); // Runs whenever count changes

  return (
    <motion.button
      className="button"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.1, backgroundColor: "#4facfe", color: "#fff" }}
      whileTap={{ scale: 0.95 }}
    >
      {displayText}
    </motion.button>
  );
}
