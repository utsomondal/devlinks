import { Link } from "react-router";
import { motion } from "framer-motion";
import {
  Code2,
  Link2,
  Sparkles,
  ArrowRight,
  LayoutDashboard,
  Shield,
} from "lucide-react";

// Inline GitHub SVG component to replace removed brand icon from lucide-react
function GithubIcon({ className = "h-4 w-4" }) {
  return (
    <svg
      className={className}
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 16 },
  },
};

const features = [
  {
    icon: Link2,
    title: "One Link",
    desc: "Projects, GitHub, portfolio & skills",
  },
  {
    icon: LayoutDashboard,
    title: "Live Preview",
    desc: "See your public page as you build",
  },
  {
    icon: Shield,
    title: "Secure",
    desc: "JWT auth, RBAC & soft delete",
  },
];

export default function Home() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-base-100">
      {/* Ambient background — no scroll, pure CSS */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[60%] w-[60%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[50%] w-[50%] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-2xl" />
      </div>

      {/* Content — flex column, fits viewport */}
      <div className="relative z-10 flex h-full flex-col px-4 sm:px-6 lg:px-8">
        {/* Top bar */}
        <motion.header
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex shrink-0 items-center justify-between py-4 sm:py-5"
        >
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md">
              <Code2 className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <span className="text-lg font-bold tracking-tight sm:text-xl">
              DevLinks
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/login"
              className="btn btn-ghost btn-sm px-3 font-medium sm:btn-md"
            >
              Log in
            </Link>
            <Link
              to="/register"
              className="btn btn-primary btn-sm px-4 font-medium sm:btn-md"
            >
              Sign up
            </Link>
          </div>
        </motion.header>

        {/* Hero — grows to fill remaining space */}
        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-base-300 bg-base-200/80 px-3 py-1 text-xs font-medium text-base-content/80 backdrop-blur-sm sm:text-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Built for developers
            </span>
          </motion.div>

          {/* Headline */}
          <motion.div
            variants={item}
            className="max-w-xl space-y-3 sm:space-y-4"
          >
            <h1 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Your entire{" "}
              <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                dev presence
              </span>
              <br className="hidden sm:block" />
              in one link
            </h1>
            <p className="mx-auto max-w-md text-sm text-base-content/70 sm:text-base">
              Share projects, GitHub, portfolio & skills with a single beautiful
              link. Perfect for resume, Twitter, LinkedIn & more.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <Link
              to="/register"
              className="btn btn-primary btn-md gap-2 shadow-lg shadow-primary/25 sm:btn-lg"
            >
              Get started free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/login"
              className="btn btn-outline btn-md gap-2 sm:btn-lg"
            >
              <GithubIcon className="h-4 w-4" />
              Guest / Login
            </Link>
          </motion.div>

          {/* Feature pills — hidden on very small heights to avoid scroll */}
          <motion.div
            variants={item}
            className="mt-2 hidden w-full max-w-lg grid-cols-3 gap-3 xs:grid sm:mt-4 sm:gap-4"
          >
            {features.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="flex flex-col items-center gap-1.5 rounded-2xl border border-base-300/60 bg-base-200/40 px-2 py-3 backdrop-blur-sm sm:px-3 sm:py-4"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary sm:h-9 sm:w-9">
                  <Icon className="h-4 w-4 sm:h-4.5 sm:w-4.5" />
                </div>
                <p className="text-xs font-semibold sm:text-sm">{title}</p>
                <p className="hidden text-[10px] leading-tight text-base-content/60 sm:block sm:text-xs">
                  {desc}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.main>

        {/* Footer strip — minimal, no extra height */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="shrink-0 py-3 text-center text-[11px] text-base-content/50 sm:py-4 sm:text-xs"
        >
          DevLinks · Showcase your work in one link
        </motion.footer>
      </div>
    </div>
  );
}