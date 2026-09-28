import { Link, useNavigate } from "react-router";
import { motion } from "framer-motion";
import {
  Code2,
  LayoutDashboard,
  LogOut,
  User as UserIcon,
  Shield,
  ExternalLink,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/", { replace: true });
    } catch {
      // ignore
    }
  };

  const displayName = user?.name || user?.username || "Developer";
  const avatarUrl = user?.profilePicture || null;
  const isAdmin = user?.role === "admin";

  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="relative z-50 flex w-full shrink-0 items-center justify-between border-b border-base-300/40 bg-base-100/80 px-4 py-3 backdrop-blur-md sm:px-6"
    >
      {/* Brand Logo */}
      <Link
        to={user ? "/dashboard" : "/"}
        className="group flex items-center gap-2.5"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-tr from-primary to-secondary text-primary-content shadow-lg shadow-primary/25 transition-transform duration-300 group-hover:scale-105 sm:h-10 sm:w-10">
          <Code2 className="h-4 w-4 sm:h-5 sm:w-5" strokeWidth={2.5} />
        </div>
        <span className="text-lg font-black tracking-tight sm:text-xl">
          Dev<span className="text-primary">Links</span>
        </span>
      </Link>

      <div className="flex items-center gap-2 sm:gap-3">
        {user ? (
          <>
            {/* Nav Quick Links */}
            <Link
              to="/dashboard"
              className="btn btn-ghost btn-sm hidden gap-2 rounded-xl px-3.5 font-semibold sm:inline-flex hover:bg-base-200/60"
            >
              <LayoutDashboard className="h-4 w-4 text-primary" />
              Dashboard
            </Link>

            {isAdmin && (
              <Link
                to="/admin"
                className="btn btn-ghost btn-sm hidden gap-2 rounded-xl px-3.5 font-semibold sm:inline-flex hover:bg-base-200/60"
              >
                <Shield className="h-4 w-4 text-secondary" />
                Admin
              </Link>
            )}

            {/* Premium Avatar Dropdown Menu */}
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar transition-all duration-300 ring-2 ring-primary/20 hover:ring-primary focus:ring-primary"
              >
                <div className="w-9 rounded-full sm:w-10">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={displayName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-primary">
                      <UserIcon className="h-5 w-5" />
                    </div>
                  )}
                </div>
              </div>

              {/* Enhanced Dropdown Menu */}
              <ul
                tabIndex={0}
                className="menu dropdown-content z-60 mt-3 w-64 rounded-2xl border border-base-300/80 bg-base-100/95 p-2 shadow-2xl backdrop-blur-xl space-y-1"
              >
                {/* User Header Profile Card */}
                <li className="menu-title p-0">
                  <div className="flex items-center gap-3 rounded-xl bg-base-200/50 p-3">
                    <div className="avatar">
                      <div className="w-10 rounded-full ring-1 ring-base-300">
                        {avatarUrl ? (
                          <img src={avatarUrl} alt={displayName} />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center bg-primary/20 text-primary font-bold">
                            {displayName.charAt(0).toUpperCase()}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0 flex-1">
                      <span className="truncate font-bold text-sm text-base-content">
                        {displayName}
                      </span>
                      {user.username ? (
                        <span className="truncate text-xs font-medium text-base-content/50">
                          @{user.username}
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-primary">
                          <Sparkles className="h-3 w-3" /> Dev User
                        </span>
                      )}
                    </div>
                  </div>
                </li>

                <div className="my-1 h-px bg-base-200" />

                {/* Navigation Items */}
                <li>
                  <Link
                    to="/dashboard"
                    className="flex items-center gap-2.5 rounded-xl py-2.5 px-3 text-xs font-semibold text-base-content/80 hover:bg-primary/10 hover:text-primary transition-all"
                  >
                    <LayoutDashboard className="h-4 w-4" />
                    Dashboard
                  </Link>
                </li>

                {isAdmin && (
                  <li>
                    <Link
                      to="/admin"
                      className="flex items-center gap-2.5 rounded-xl py-2.5 px-3 text-xs font-semibold text-base-content/80 hover:bg-secondary/10 hover:text-secondary transition-all"
                    >
                      <Shield className="h-4 w-4" />
                      Admin Control Panel
                    </Link>
                  </li>
                )}

                {user.username && (
                  <li>
                    <Link
                      to={`/u/${user.username}`}
                      className="flex items-center gap-2.5 rounded-xl py-2.5 px-3 text-xs font-semibold text-base-content/80 hover:bg-primary/10 hover:text-primary transition-all"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Public Profile
                    </Link>
                  </li>
                )}

                <div className="my-1 h-px bg-base-200" />

                {/* Logout Button */}
                <li>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex items-center gap-2.5 rounded-xl py-2.5 px-3 text-xs font-semibold text-error hover:bg-error/10 transition-all"
                  >
                    <LogOut className="h-4 w-4" />
                    Sign out
                  </button>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="btn btn-ghost btn-sm px-3.5 font-semibold text-xs sm:text-sm"
            >
              Log in
            </Link>
            <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <Link
                to="/register"
                className="btn btn-primary btn-sm px-4 font-semibold text-xs sm:text-sm shadow-md shadow-primary/25 rounded-xl"
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