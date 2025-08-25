"use client";

import { Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useVoiceStore } from "@/lib/store";

export default function VisualizationBox() {
  const { submitted, time, displayedText, isTyping } = useVoiceStore();

  if (!submitted) return null;

  return (
    <motion.div
      className="absolute top-full left-1/2 transform -translate-x-1/2 rounded-2xl p-4 mt-4 max-w-md w-full z-10"
      style={{ backgroundColor: "#18181B" }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.4,
      }}
    >
      <motion.div
        className="rounded-xl p-4 mb-3 relative overflow-hidden"
        style={{ backgroundColor: "#121212" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
        <motion.p
          className="text-white/90 text-sm min-h-[120px]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          {time >= 3 ? (
            <>
              {displayedText}
              {isTyping && (
                <motion.span
                  className="inline-block w-0.5 h-4 bg-white/70 ml-0.5"
                  animate={{ opacity: [1, 0] }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                />
              )}
            </>
          ) : null}
        </motion.p>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#121212] to-transparent pointer-events-none"></div>
      </motion.div>

      {time < 3 && (
        <motion.div
          className="flex items-center gap-2 px-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <Loader className="w-3 h-3 text-white" />
          </motion.div>
          <span className="text-white/70 text-sm">Generating</span>
        </motion.div>
      )}
    </motion.div>
  );
}
