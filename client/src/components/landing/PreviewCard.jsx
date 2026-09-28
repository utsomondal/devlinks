import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Check, Copy, Eye, Star, Zap, Globe } from "lucide-react";

function GithubIcon({ className = "h-4 w-4" }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export default function PreviewCard() {
  const [copied, setCopied] = useState(false);
  const [activeLink, setActiveLink] = useState(null);

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{ type: "spring", stiffness: 60, damping: 20, delay: 0.3 }}
      className="relative mt-3 sm:mt-5 w-full max-w-95 sm:max-w-md z-10"
    >
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, -2, 0], x: [0, -3, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-4 -left-4 z-20 hidden sm:flex items-center gap-1.5 rounded-xl border border-base-300/80 bg-base-100/90 px-2.5 py-1 text-[10px] sm:text-xs font-semibold shadow-xl backdrop-blur-md"
      >
        <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
        <span>1.4k Stars</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, 2, 0], x: [0, 3, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute -bottom-3 -right-4 z-20 hidden sm:flex items-center gap-1.5 rounded-xl border border-base-300/80 bg-base-100/90 px-2.5 py-1 text-[10px] sm:text-xs font-semibold shadow-xl backdrop-blur-md"
      >
        <Eye className="h-3 w-3 text-primary" />
        <span>12.8k Views</span>
      </motion.div>

      <div className="group relative rounded-3xl border border-base-300/80 bg-linear-to-b from-base-100/90 to-base-200/80 p-4 sm:p-5 shadow-2xl backdrop-blur-xl duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-primary/40 hover:shadow-primary/10">
        <div className="absolute inset-x-8 top-0 h-px bg-linear-to-r from-transparent via-primary/50 to-transparent opacity-50 duration-500 group-hover:opacity-100" />

        <div className="flex items-center justify-between pb-3 border-b border-base-300/50">
          <div className="flex items-center gap-2.5">
            <div className="relative">
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-linear-to-br from-primary to-secondary p-px shadow-md">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
                  alt="Alex Rivera"
                  className="h-full w-full rounded-[14px] object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-emerald-500 border-2 border-base-100" />
            </div>
            <div className="text-left">
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-xs sm:text-sm">Alex Rivera</h2>
                <span className="text-[9px] sm:text-[10px] bg-primary/10 text-primary px-1.5 rounded font-mono">
                  PRO
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-base-content/60">
                Full-Stack Engineer
              </p>
            </div>
          </div>
          <button
            onClick={handleCopy}
            className="btn btn-ghost btn-xs text-primary gap-1 bg-primary/5 duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-primary/15 h-7 min-h-0"
          >
            {copied ? (
              <Check className="h-3 w-3" />
            ) : (
              <Copy className="h-3 w-3" />
            )}
            <span className="hidden sm:inline">
              {copied ? "Copied" : "Share"}
            </span>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 py-2.5">
          {["React", "TypeScript", "Node.js", "Tailwind"].map((tech) => (
            <span
              key={tech}
              className="rounded-md bg-base-200 px-2 py-0.5 text-[9px] sm:text-[10px] font-medium text-base-content/70"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="space-y-1.5">
          {[
            { label: "GitHub Profile", icon: GithubIcon, meta: "142 Repos" },
            {
              label: "Personal Portfolio",
              icon: Globe,
              meta: "alexrivera.dev",
            },
            { label: "Latest Side Project", icon: Zap, meta: "DevTools SaaS" },
          ].map((item, idx) => {
            const IconComponent = item.icon;
            const isActive = activeLink === idx;
            return (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                onClick={() => setActiveLink(idx)}
                className={`group/link flex items-center justify-between p-2 sm:p-2.5 rounded-xl border duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] cursor-pointer ${isActive ? "bg-primary text-primary-content border-primary shadow-md shadow-primary/20" : "bg-base-200/50 border-base-300/40 hover:border-primary/40 hover:bg-base-200"}`}
              >
                <div className="flex items-center gap-2">
                  <IconComponent
                    className={`h-3.5 w-3.5 duration-500 ${isActive ? "text-primary-content" : "text-primary group-hover/link:scale-110"}`}
                  />
                  <span className="text-[11px] sm:text-xs font-semibold">
                    {item.label}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className={`text-[9px] sm:text-[10px] duration-500 ${isActive ? "text-primary-content/80" : "text-base-content/50"}`}
                  >
                    {item.meta}
                  </span>
                  <ExternalLink
                    className={`h-2.5 w-2.5 duration-500 ${isActive ? "opacity-100" : "opacity-0 group-hover/link:opacity-60 -translate-x-2 group-hover/link:translate-x-0"}`}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}
