import { Palette } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

const ThemeToggle = () => {
  const { theme, setTheme, themes } = useTheme();

  return (
    <div className="dropdown dropdown-end">
      <div
        tabIndex={0}
        role="button"
        className="btn btn-ghost btn-sm btn-circle"
        title="Theme"
      >
        <Palette className="h-4 w-4" />
      </div>

      <ul
        tabIndex={0}
        className="menu dropdown-content z-60 mt-3 w-44 rounded-2xl border border-base-300/80 bg-base-100 p-2 shadow-xl"
      >
        {themes.map((t) => (
          <li key={t.id}>
            <button
              type="button"
              className={theme === t.id ? "active font-semibold" : ""}
              onClick={() => setTheme(t.id)}
            >
              {t.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ThemeToggle;
