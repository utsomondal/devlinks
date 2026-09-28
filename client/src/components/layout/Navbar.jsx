import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Code2,
  LayoutDashboard,
  LogOut,
  Settings,
  User as UserIcon,
} from "lucide-react";

export default function Navbar() {
  // MOCK USER STATE: Replace this with your actual auth hook (e.g., useSession, useAuth)
  // Set to null to see the logged-out state, or an object to see the logged-in state.
  const user = null;
  // Example of logged in state:
  // const user = { name: "Alex Rivera", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80" };

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 80, damping: 20 }}
      className="relative z-50 flex shrink-0 items-center justify-between py-4 w-full"
    >
      {/* Brand Logo */}
      <Link to="/" className="flex items-center gap-2.5 group cursor-pointer">
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-linear-to-tr from-primary to-secondary text-primary-content shadow-lg shadow-primary/25 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110">
          <Code2 className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
        </div>
        <span className="text-lg sm:text-xl font-black tracking-tight">
          Dev<span className="text-primary">Links</span>
        </span>
      </Link>

      {/* Auth Actions / User Menu */}
      <div className="flex items-center gap-2 sm:gap-3">
        {user ? (
          <>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                to="/dashboard"
                className="btn btn-ghost btn-sm px-3 sm:px-4 font-medium gap-2 hidden sm:inline-flex"
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Link>
            </motion.div>

            {/* DaisyUI Dropdown for Profile */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar border border-base-300/50 hover:border-primary/50 duration-300 transition-colors"
              >
                <div className="w-8 sm:w-9 rounded-full">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} />
                  ) : (
                    <UserIcon className="h-full w-full p-1.5 opacity-70" />
                  )}
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-1 p-2 shadow-xl shadow-base-300/20 menu menu-sm dropdown-content bg-base-100 border border-base-200 rounded-box w-52"
              >
                <li className="menu-title px-4 py-2 border-b border-base-200 mb-1">
                  <span className="font-semibold text-base-content block">
                    {user.name}
                  </span>
                  <span className="text-xs text-base-content/60 font-normal">
                    Free Plan
                  </span>
                </li>
                <li>
                  <Link
                    to="/dashboard"
                    className="py-2 hover:bg-base-200/50 hover:text-primary"
                  >
                    <LayoutDashboard className="h-4 w-4" /> Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="py-2 hover:bg-base-200/50 hover:text-primary"
                  >
                    <Settings className="h-4 w-4" /> Settings
                  </Link>
                </li>
                <li className="mt-1 border-t border-base-200">
                  <button className="py-2 mt-1 text-error hover:bg-error/10 hover:text-error">
                    <LogOut className="h-4 w-4" /> Logout
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost btn-sm px-3 sm:px-4 font-medium duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-base-200"
            >
              Log in
            </Link>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Link
                to="/register"
                className="btn btn-primary btn-sm px-4 sm:px-5 font-semibold shadow-md shadow-primary/25 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-primary/40"
              >
                Sign up
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </motion.header>
  );
}
