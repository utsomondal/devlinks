import { motion } from "framer-motion";

export default function LandingBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[32px_32px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.3, 0.2], x: [0, 40, -20, 0], y: [0, -30, 10, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 left-1/2 -translate-x-1/2 h-100 w-150 rounded-full bg-linear-to-r from-primary/30 via-secondary/20 to-accent/20 blur-[130px]"
      />
      <motion.div
        animate={{ scale: [1.1, 1, 1.1], opacity: [0.15, 0.25, 0.15], x: [0, -30, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 right-10 h-75 w-75 rounded-full bg-primary/20 blur-[100px]"
      />
    </div>
  );
}