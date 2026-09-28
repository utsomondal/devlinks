import { motion } from "framer-motion";

export default function AmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <motion.div 
        animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -left-20 h-125 w-125 rounded-full bg-linear-to-tr from-primary/30 via-secondary/20 to-transparent blur-[130px]"
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute -bottom-20 -right-20 h-125 w-125 rounded-full bg-linear-to-br from-accent/20 via-primary/10 to-transparent blur-[130px]"
      />
    </div>
  );
}