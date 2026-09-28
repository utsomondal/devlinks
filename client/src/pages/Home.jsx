import { useState, useEffect } from "react";
import { Link } from "react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import toast from "react-hot-toast";

// Components
import LandingBackground from "../components/landing/LandingBackground";
import Navbar from "../components/layout/Navbar";
import PreviewCard from "../components/landing/PreviewCard";

const rotatingWords = [
  "dev presence",
  "GitHub profile",
  "tech stack",
  "portfolio",
];

export default function Home() {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Handler to guide the user on the login page
  const handleExploreDemo = () => {
    toast(
      "Tip: Choose 'Guest' or 'Admin' on the next page to explore without an account!",
      {
        icon: "💡",
        duration: 5000,
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      },
    );
  };

  return (
    <div className="relative h-dvh w-full overflow-hidden bg-base-100 font-sans antialiased text-base-content selection:bg-primary selection:text-primary-content">
      <LandingBackground />

      <div className="relative z-10 flex h-full flex-col px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto">
        <Navbar />

        <main className="flex flex-1 flex-col items-center justify-center py-2 pb-10">
          <div className="flex flex-col items-center gap-4 sm:gap-5 text-center w-full max-w-4xl">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, filter: "blur(4px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
            >
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-base-200/60 px-3 py-1 text-[11px] sm:text-xs font-semibold backdrop-blur-md shadow-sm">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 duration-1000"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-emerald-500"></span>
                </span>
                <span className="text-base-content/80">
                  Built for modern software engineers
                </span>
                <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-primary ml-0.5" />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.1,
              }}
              className="space-y-2 sm:space-y-3"
            >
              <h1 className="text-3xl font-black tracking-tight sm:text-5xl lg:text-6xl leading-[1.1] text-base-content">
                Your entire{" "}
                <span className="inline-block min-w-50 sm:min-w-60 text-left">
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={wordIndex}
                      initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: -25, filter: "blur(8px)" }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="bg-linear-to-r from-primary via-secondary to-accent bg-clip-text text-transparent absolute"
                    >
                      {rotatingWords[wordIndex]}
                    </motion.span>
                  </AnimatePresence>
                  <span className="opacity-0 pointer-events-none">
                    GitHub profile
                  </span>
                </span>
                <br />
                in one single link.
              </h1>
              <p className="mx-auto max-w-lg text-xs sm:text-base text-base-content/70 font-normal leading-relaxed px-4">
                Consolidate your projects, GitHub repositories, active social
                channels, and skills into a sleek, lightning-fast bio page.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 20,
                delay: 0.2,
              }}
              className="flex w-full max-w-xs flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center mt-1 sm:mt-2 z-20"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link
                  to="/register"
                  className="btn btn-primary btn-sm sm:btn-md gap-2 shadow-lg shadow-primary/25 w-full"
                >
                  Claim Your Handle
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                {/* Added onClick handler to trigger the toast before navigating */}
                <Link
                  to="/login"
                  onClick={handleExploreDemo}
                  className="btn btn-outline btn-sm sm:btn-md gap-2 w-full bg-base-100/50 backdrop-blur-sm border-base-300"
                >
                  Explore Demo
                </Link>
              </motion.div>
            </motion.div>

            <PreviewCard />
          </div>
        </main>

        <footer className="relative z-10 shrink-0 py-3 sm:py-4 text-center text-[10px] sm:text-xs text-base-content/40 border-t border-base-200/50">
          © {new Date().getFullYear()} DevLinks · Engineered for developers
        </footer>
      </div>
    </div>
  );
}
