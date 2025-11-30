import { useState, useEffect } from "react";
import { RouterProvider } from "react-router";
import router from "./Routes/router"; // your router file
import "./App.css";

function App() {
  // theme state and load from localStorage
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  // theme effect
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className={
        theme === "dark"
          ? "bg-slate-900 text-slate-100 min-h-screen transition-colors"
          : "bg-white text-slate-900 min-h-screen transition-colors"
      }
    >
      {/* Make theme accessible in Navbar only */}
      <RouterProvider router={router} />
    </div>
  );
}

export default App;