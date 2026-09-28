import { motion } from "framer-motion";
import { useAuth } from "../hooks/useAuth";
import {
  Link as LinkIcon,
  User,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { Link } from "react-router"; // or "react-router-dom" based on your setup
import ProfileSection from "../components/dashboard/ProfileSection";

const Dashboard = () => {
  const { user } = useAuth();
  const firstName = user?.name?.split(" ")[0] || "Developer";
  const avatarUrl = user?.profilePicture || null;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Overview</span>
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl text-base-content">
            Welcome back,{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              {firstName}
            </span>
          </h1>
          <p className="mt-2 text-sm font-medium text-base-content/60">
            Manage your developer portfolio, links, and track your audience.
          </p>
        </div>

        {user?.username && (
          <Link
            to={`/u/${user.username}`}
            target="_blank"
            className="btn btn-outline btn-sm gap-2 rounded-xl border-base-300 hover:bg-base-200 hover:text-base-content"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Page
          </Link>
        )}
      </motion.div>

      {/* Main Grid Layout */}
      <div className="grid gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
        {/* Left Column: Stats & Settings */}
        <ProfileSection />

        {/* Right Column: General Live Preview Canvas */}
        <motion.aside
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="lg:sticky lg:top-24 lg:self-start"
        >
          <div className="flex flex-col rounded-3xl border border-base-300/80 bg-base-100 shadow-xl shadow-base-200/50 overflow-hidden">
            {/* Mock Browser/Window Header */}
            <div className="flex items-center justify-between border-b border-base-200 bg-base-200/30 px-4 py-3">
              <div className="flex gap-1.5">
                <div className="h-2.5 w-2.5 rounded-full bg-base-300/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-base-300/80" />
                <div className="h-2.5 w-2.5 rounded-full bg-base-300/80" />
              </div>
              <div className="text-[10px] font-semibold uppercase tracking-widest text-base-content/40">
                Live Preview
              </div>
              <div className="w-8" /> {/* Spacer for centering */}
            </div>

            {/* Preview Content Area (The Canvas) */}
            <div className="relative min-h-[420px] w-full bg-gradient-to-b from-base-200/50 to-base-100 p-6 flex flex-col items-center">
              {/* Profile Skeleton/Data */}
              <div className="mt-4 flex flex-col items-center text-center">
                <div className="mb-4 h-20 w-20 overflow-hidden rounded-full border-4 border-base-100 shadow-md">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10">
                      <User className="h-8 w-8 text-primary/60" />
                    </div>
                  )}
                </div>

                <h3 className="text-lg font-bold text-base-content">
                  {user?.name || "Your Name"}
                </h3>
                <p className="mt-1 text-sm font-medium text-base-content/50">
                  @{user?.username || "username"}
                </p>
                <p className="mt-3 text-xs text-base-content/60 max-w-[200px]">
                  Your bio goes here. Add a short description about what you do.
                </p>
              </div>

              {/* Skeleton Links */}
              <div className="mt-8 w-full max-w-[240px] space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-11 w-full rounded-xl bg-base-200/80 border border-base-300/50 flex items-center justify-center"
                  >
                    <div className="h-2 w-24 rounded-full bg-base-300" />
                  </div>
                ))}
              </div>

              {/* URL Footer */}
              {user?.username && (
                <div className="mt-auto pt-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-base-200 px-3 py-1 text-[11px] font-medium text-base-content/50">
                    <LinkIcon className="h-3 w-3" /> devlinks.com/u/
                    {user.username}
                  </span>
                </div>
              )}
            </div>
          </div>
        </motion.aside>
      </div>
    </div>
  );
};

export default Dashboard;
