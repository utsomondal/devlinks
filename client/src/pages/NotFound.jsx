import { Link } from "react-router";
import { motion } from "framer-motion";
import { Code2, ArrowLeft, Home, Sparkles, AlertCircle } from "lucide-react";

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

export default function NotFound() {
  return (
    <div className="relative h-dvh w-full overflow-hidden bg-base-100">
      {/* Ambient background — Home page aesthetic with error accent */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-1/4 top-0 h-[60%] w-[60%] rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-1/4 bottom-0 h-[50%] w-[50%] rounded-full bg-secondary/10 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-error/10 blur-2xl" />
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
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-content shadow-md">
              <Code2 className="h-5 w-5" strokeWidth={2.2} />
            </div>
            <span className="text-lg font-bold tracking-tight sm:text-xl">
              DevLinks
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              to="/"
              className="btn btn-ghost btn-sm px-3 font-medium sm:btn-md"
            >
              Back Home
            </Link>
          </div>
        </motion.header>

        {/* Hero Section */}
        <motion.main
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-1 flex-col items-center justify-center gap-6 text-center sm:gap-8"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-error/20 bg-error/10 px-3 py-1 text-xs font-medium text-error backdrop-blur-sm sm:text-sm">
              <AlertCircle className="h-3.5 w-3.5" />
               Error 404 — Page Not Found
            </span>
          </motion.div>

          {/* Headline & 404 Visual */}
          <motion.div
            variants={item}
            className="max-w-xl space-y-3 sm:space-y-4"
          >
            <h1 className="text-6xl font-extrabold tracking-tight sm:text-7xl md:text-8xl">
              <span className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                404
              </span>
            </h1>
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Lost in space?
            </h2>
            <p className="mx-auto max-w-md text-sm text-base-content/70 sm:text-base">
              The page you are looking for doesn't exist, was removed, or had its URL changed.
            </p>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={item}
            className="flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center"
          >
            <Link
              to="/"
              className="btn btn-primary btn-md gap-2 shadow-lg shadow-primary/25 sm:btn-lg"
            >
              <Home className="h-4 w-4" />
              Back to Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="btn btn-outline btn-md gap-2 sm:btn-lg"
            >
              <ArrowLeft className="h-4 w-4" />
              Previous Page
            </button>
          </motion.div>

          {/* Feature-like helper card */}
          <motion.div
            variants={item}
            className="mt-2 hidden w-full max-w-sm rounded-2xl border border-base-300/60 bg-base-200/40 p-4 text-center backdrop-blur-sm sm:mt-4 sm:block"
          >
            <div className="flex items-center justify-center gap-2 text-xs font-semibold sm:text-sm">
              <Sparkles className="h-4 w-4 text-primary" />
              Looking for your DevLinks profile?
            </div>
            <p className="mt-1 text-[11px] text-base-content/60 sm:text-xs">
              Make sure the username in the URL is spelled correctly.
            </p>
          </motion.div>
        </motion.main>

        {/* Footer strip */}
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