import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const ANALYSIS_STEPS = [
  "Analyzing bio tone...",
  "Detecting clichés...",
  "Evaluating clarity...",
  "Generating insights...",
];

function AnalyzingScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { bio?: string } | null;
  const bio = state?.bio ?? "";
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/results", { state: { bio } });
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate, bio]);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % ANALYSIS_STEPS.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-white flex items-center justify-center px-4">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.2),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.15),transparent_55%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-md"
      >
        <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/25 via-purple-500/15 to-emerald-500/25 opacity-70 blur-2xl" />

        <div className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/85 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur px-6 py-7 sm:px-8 sm:py-8">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
            className="flex items-center gap-3"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-300 border border-indigo-500/30">
              <motion.div
                className="h-4 w-4 rounded-full border-2 border-indigo-300 border-t-transparent"
                animate={{ rotate: 360 }}
                transition={{
                  repeat: Infinity,
                  duration: 1.2,
                  ease: "linear",
                }}
              />
            </div>

            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-indigo-400/80 uppercase">
                MatchLens is thinking
              </p>
              <p className="mt-1 text-sm text-neutral-300">
                This usually takes just a few seconds.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.1 }}
            className="mt-6"
          >
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight">
              Analyzing your profile...
            </h1>

            <div className="mt-3 h-6 overflow-hidden text-sm text-neutral-400">
              <AnimatePresence mode="wait">
                <motion.p
                  key={ANALYSIS_STEPS[stepIndex]}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="flex items-center gap-2"
                >
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span>{ANALYSIS_STEPS[stepIndex]}</span>
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
            className="mt-7"
          >
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-800/90">
              <motion.div
                className="h-full w-1/3 bg-gradient-to-r from-indigo-400 via-sky-400 to-emerald-400"
                animate={{ x: ["-120%", "20%", "120%"] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.4,
                  ease: "easeInOut",
                }}
              />
            </div>

            <p className="mt-3 text-xs text-neutral-500">
              We&apos;re running a local analysis of tone, clarity, and strength
              of your dating profile bio.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default AnalyzingScreen;