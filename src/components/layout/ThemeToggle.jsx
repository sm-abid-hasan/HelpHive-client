"use client";

import { useEffect, useState } from "react";
import { FaMoon, FaSun } from "react-icons/fa6";


export default function ThemeToggle() {
  const [theme, setTheme] = useState("helphive");


  useEffect(() => {
    setTheme(document.documentElement.getAttribute("data-theme") || "helphive");
  }, []);

  const handleToggle = () => {
    const nextTheme = theme === "helphive" ? "helphive-dark" : "helphive";
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      
    }
    setTheme(nextTheme);
  };

  return (
    <button onClick={handleToggle} className="btn btn-ghost btn-circle" aria-label="Switch between light and dark theme">
      {theme === "helphive" ? <FaMoon className="text-lg" /> : <FaSun className="text-lg" />}
    </button>
  );
}
