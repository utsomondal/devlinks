import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ExternalLink } from "lucide-react";
import { Link, Navigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import ProfileSection from "../components/dashboard/ProfileSection";
import LinksSection from "../components/dashboard/LinksSection";
import LivePreview from "../components/dashboard/LivePreview";

const Dashboard = () => {
  const { user } = useAuth();
  const [links, setLinks] = useState([]);
  const firstName = user?.name?.split(" ")[0] || "Developer";

  if (user?.role === "admin") {
    return <Navigate to="/admin" replace />;
  }
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* header — same as before */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
      >
        <div>
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Overview
          </div>
          <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
            Welcome back,{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {firstName}
            </span>
          </h1>
          <p className="mt-2 text-sm text-base-content/60">
            Manage your developer portfolio, links, and track your audience.
          </p>
        </div>

        {user?.username && (
          <Link
            to={`/u/${user.username}`}
            target="_blank"
            className="btn btn-outline btn-sm gap-2 rounded-xl"
          >
            <ExternalLink className="h-4 w-4" />
            View Live Page
          </Link>
        )}
      </motion.div>

      <div className="grid items-start gap-6 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_380px]">
        <div className="min-w-0 space-y-6 pb-10">
          <ProfileSection />
          <LinksSection onLinksChange={setLinks} />
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <LivePreview user={user} links={links} />
        </aside>
      </div>
    </div>
  );
};

export default Dashboard;
