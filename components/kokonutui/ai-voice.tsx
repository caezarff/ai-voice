"use client";

import { Mic } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "motion/react";
import { useVoiceStore } from "@/lib/store";
import VisualizationBox from "./visualization-box";

export default function AI_Voice() {
  const { submitted, time, toggleSubmitted } = useVoiceStore();

  const handleClick = () => {
    toggleSubmitted();
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{ backgroundColor: "#121212" }}
    >
      <div className="w-full py-4">
        <div className="relative max-w-xl w-full mx-auto flex items-center flex-col gap-2">
          <motion.button
            className={cn(
              "group w-16 h-16 rounded-xl flex items-center justify-center transition-colors",
              submitted ? "bg-none" : "bg-none hover:bg-white/10"
            )}
            type="button"
            onClick={handleClick}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="loading"
                  className="w-6 h-6 rounded-sm bg-white cursor-pointer pointer-events-auto"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1, rotate: 360 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                />
              ) : (
                <motion.div
                  key="mic"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                >
                  <Mic className="w-6 h-6 text-white/90" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>

          <div className="h-4 w-64 flex items-center justify-center gap-0.5">
            {[...Array(48)].map((_, i) => (
              <motion.div
                key={i}
                className={cn("w-0.5 rounded-full bg-white/10")}
                animate={{
                  height: submitted
                    ? `${20 + Math.sin(i * 0.5) * 30 + 20}%`
                    : "4px",
                  backgroundColor: submitted
                    ? "rgba(255, 255, 255, 0.5)"
                    : "rgba(255, 255, 255, 0.1)",
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.02,
                  repeat: submitted ? Infinity : 0,
                  repeatType: "reverse",
                  repeatDelay: 0.1,
                }}
              />
            ))}
          </div>

          <motion.div
            className="text-white/50 text-sm font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {String(Math.floor(time / 60)).padStart(2, "0")}:
            {String(time % 60).padStart(2, "0")}
          </motion.div>

          <motion.p
            className="h-4 text-xs text-white/70"
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {submitted ? "Listening..." : "Click to speak"}
          </motion.p>

          <AnimatePresence>
            <VisualizationBox />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
