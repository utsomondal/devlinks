import { motion } from "framer-motion";
import { Terminal, Globe, Cpu, CheckCircle2 } from "lucide-react";

export default function DevEngineSpotlight() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 25 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="hidden lg:flex flex-col justify-center space-y-5 pl-2"
    >
      {/* Main IDE Window */}
      <div className="relative rounded-2xl border border-base-300/80 bg-base-900/90 shadow-2xl backdrop-blur-2xl overflow-hidden font-mono text-xs">
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-base-700/60 bg-base-900/80 px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-error/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-warning/80 inline-block" />
            <span className="h-3 w-3 rounded-full bg-success/80 inline-block" />
          </div>
          <div className="flex items-center gap-1.5 text-base-content/50 text-[11px] font-sans font-medium">
            <Terminal className="h-3.5 w-3.5 text-primary" />
            <span>devlinks.config.ts</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-[10px] text-emerald-400 font-sans font-semibold uppercase tracking-wider">
              Engine Ready
            </span>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 space-y-2 text-base-content/90 leading-relaxed overflow-x-auto">
          <div className="text-base-content/40">
            // Developer Bio & Stack Config
          </div>
          <div>
            <span className="text-purple-400 font-bold">export const</span>{" "}
            <span className="text-blue-400 font-bold">devProfile</span> = &#123;
          </div>
          <div className="pl-4">
            <span className="text-emerald-400">handle</span>:{" "}
            <span className="text-amber-300">&quot;@octocat_dev&quot;</span>,
          </div>
          <div className="pl-4">
            <span className="text-emerald-400 font-bold">role</span>:{" "}
            <span className="text-amber-300">
              &quot;Full-Stack Engineer&quot;
            </span>
            ,
          </div>
          <div className="pl-4">
            <span className="text-emerald-400">techStack</span>: [
            <span className="text-amber-300">&quot;React&quot;</span>,{" "}
            <span className="text-amber-300">&quot;TypeScript&quot;</span>,{" "}
            <span className="text-amber-300">&quot;Node.js&quot;</span>],
          </div>
          <div className="pl-4">
            <span className="text-emerald-400">activeChannels</span>:{" "}
            <span className="text-cyan-400 font-bold">12</span>,
          </div>
          <div className="pl-4">
            <span className="text-emerald-400">customDomain</span>:{" "}
            <span className="text-emerald-400 font-bold">true</span>,
          </div>
          <div>&#125;;</div>
        </div>
      </div>

      {/* Feature Highlights Grid */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-xl border border-base-300/60 bg-base-100/60 p-3 backdrop-blur-md text-center shadow-sm">
          <div className="inline-flex p-1.5 rounded-lg bg-primary/10 text-primary mb-1">
            <Globe className="h-4 w-4" />
          </div>
          <p className="text-[11px] font-bold text-base-content">One Handle</p>
          <p className="text-[10px] text-base-content/50">Unified Portfolio</p>
        </div>

        <div className="rounded-xl border border-base-300/60 bg-base-100/60 p-3 backdrop-blur-md text-center shadow-sm">
          <div className="inline-flex p-1.5 rounded-lg bg-secondary/10 text-secondary mb-1">
            <Cpu className="h-4 w-4" />
          </div>
          <p className="text-[11px] font-bold text-base-content">GitHub Sync</p>
          <p className="text-[10px] text-base-content/50">Realtime Repos</p>
        </div>

        <div className="rounded-xl border border-base-300/60 bg-base-100/60 p-3 backdrop-blur-md text-center shadow-sm">
          <div className="inline-flex p-1.5 rounded-lg bg-emerald-500/10 text-emerald-500 mb-1">
            <CheckCircle2 className="h-4 w-4" />
          </div>
          <p className="text-[11px] font-bold text-base-content">JWT Guard</p>
          <p className="text-[10px] text-base-content/50">RBAC Secure</p>
        </div>
      </div>
    </motion.div>
  );
}
