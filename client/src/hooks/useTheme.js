import { useEffect, useState } from "react";
import { DEFAULT_THEME, THEMES } from "../utils/themes";

export const useTheme = () => {
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem("theme") || DEFAULT_THEME;
  });

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const setTheme = (next) => {
    if (THEMES.some((t) => t.id === next)) {
      setThemeState(next);
    }
  };

  return { theme, setTheme, themes: THEMES };
};