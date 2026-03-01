import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import PrimaryButton from "../components/PrimaryButton";
import { analyzeProfile } from "../utils/analyzeProfile";

const SECTION_TRANSITION = {
  duration: 0.45,
  ease: [0.16, 1, 0.3, 1] as const,
};

const listVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.08,
    },
  },
};

const listItemVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0 },
};

function ResultsScreen() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { bio?: string } | null;
  const bio = state?.bio ?? "";
  const analysis = analyzeProfile(bio);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-white flex items-center justify-center px-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),transparent_55%)]" />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <motion.div
            className="mx-auto mb-4 h-9 w-9 rounded-2xl border border-indigo-400/40 bg-indigo-500/10 flex items-center justify-center"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
          >
            <div className="h-3 w-3 rounded-full bg-indigo-400/80" />
          </motion.div>
          <p className="text-sm font-medium tracking-[0.18em] text-indigo-300/80 uppercase">
            Generating report
          </p>
          <p className="mt-2 text-base text-neutral-300">
            Matching your bio against thousands of high-performing profiles.
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-white flex items-center justify-center px-4 py-10">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.18),transparent_55%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={SECTION_TRANSITION}
        className="relative w-full max-w-3xl"
      >
        <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/25 via-purple-500/15 to-emerald-500/25 opacity-70 blur-2xl" />

        <div className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/85 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur px-5 py-6 sm:px-8 sm:py-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SECTION_TRANSITION, delay: 0.05 }}
            className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between"
          >
            <div>
              <p className="text-xs font-medium tracking-[0.18em] text-indigo-300/80 uppercase">
                MatchLens report
              </p>
              <h1 className="mt-2 text-2xl sm:text-3xl font-semibold tracking-tight">
                Your Profile Analysis
              </h1>
              <p className="mt-2 text-sm text-neutral-400 sm:text-base">
                A quick breakdown of how your dating profile bio is likely to
                land on real people—based on tone, clarity, and specificity.
              </p>
            </div>
          </motion.header>

          {/* Overall score */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SECTION_TRANSITION, delay: 0.1 }}
            className="mt-6"
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-gradient-to-r from-indigo-500/15 via-neutral-900 to-emerald-500/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/80">
                  Overall bio score
                </p>
                <p className="mt-2 text-sm text-neutral-300">
                  {analysis.verdict}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...SECTION_TRANSITION, delay: 0.16 }}
                className="flex items-center justify-end sm:justify-center"
              >
                <AnimatedScore value={analysis.score} />
              </motion.div>
            </div>
          </motion.section>

          {/* Two-column content */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SECTION_TRANSITION, delay: 0.15 }}
            className="mt-8 grid gap-6 sm:grid-cols-2"
          >
            {/* Strengths */}
            <div>
              <h2 className="text-sm font-semibold text-neutral-100">
                Strengths
              </h2>
              <p className="mt-1 text-xs text-neutral-500">
                What your bio is already doing well.
              </p>

              <motion.ul
                className="mt-4 space-y-3"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {analysis.strengths.map((item) => (
                  <motion.li
                    key={item}
                    variants={listItemVariants}
                    className="flex gap-3 rounded-xl border border-neutral-800/90 bg-neutral-900/80 px-3.5 py-3 text-sm text-neutral-300"
                  >
                    <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-emerald-400" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            {/* Improvements */}
            <div>
              <h2 className="text-sm font-semibold text-neutral-100">
                Suggested improvements
              </h2>
              <p className="mt-1 text-xs text-neutral-500">
                Low-lift edits to increase real-world match quality.
              </p>

              <motion.ul
                className="mt-4 space-y-3"
                variants={listVariants}
                initial="hidden"
                animate="visible"
              >
                {analysis.improvements.map((item) => (
                  <motion.li
                    key={item}
                    variants={listItemVariants}
                    className="flex gap-3 rounded-xl border border-neutral-800/90 bg-neutral-900/80 px-3.5 py-3 text-sm text-neutral-300"
                  >
                    <span className="mt-1 inline-flex h-1.5 w-1.5 flex-shrink-0 rounded-full bg-amber-400" />
                    <span>{item}</span>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.section>

          {/* CTA */}
          <motion.footer
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...SECTION_TRANSITION, delay: 0.2 }}
            className="mt-8 flex flex-col gap-3 border-t border-neutral-800/80 pt-6 sm:flex-row sm:items-center sm:justify-between"
          >
            <p className="text-xs text-neutral-500">
              Want to see how small edits move your score? Try a different
              version of your bio.
            </p>

            <div className="sm:w-auto">
              <PrimaryButton
                loading={false}
                disabled={false}
                onClick={() => navigate("/")}
              >
                Analyze Another Profile
              </PrimaryButton>
            </div>
          </motion.footer>
        </div>
      </motion.div>
    </div>
  );
}

function AnimatedScore({ value }: { value: number }) {
  const score = useMotionValue(0);
  const rounded = useTransform(score, (latest) => Math.round(latest));
  const [display, setDisplay] = useState(0);
  const progress = useTransform(score, (latest) => Math.max(0, Math.min(100, latest)) / 100);
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = useTransform(progress, (p) => circumference * (1 - p));

  useEffect(() => {
    const controls = animate(score, value, {
      duration: 1.1,
      ease: "easeOut",
    });

    return () => controls.stop();
  }, [score, value]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplay(latest);
    });
    return unsubscribe;
  }, [rounded]);

  const textColor =
    value < 40
      ? "text-red-400"
      : value <= 70
      ? "text-yellow-300"
      : "text-emerald-400";

  const ringColor =
    value < 40 ? "#f87171" : value <= 70 ? "#facc15" : "#4ade80";

  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-950/80 shadow-[0_18px_40px_rgba(79,70,229,0.35)]">
      <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-500 to-emerald-500 opacity-40 blur-md" />
      <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-neutral-900/95 border border-neutral-700/60">
        <svg
          className="absolute h-[72px] w-[72px] -rotate-90 text-neutral-800"
          viewBox="0 0 72 72"
          aria-hidden="true"
        >
          <circle
            cx="36"
            cy="36"
            r={radius}
            fill="transparent"
            stroke="currentColor"
            strokeWidth="6"
          />
          <motion.circle
            cx="36"
            cy="36"
            r={radius}
            fill="transparent"
            stroke={ringColor}
            strokeWidth="6"
            strokeLinecap="round"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeOffset,
            }}
          />
        </svg>
        <span className={`text-2xl font-semibold ${textColor}`}>
          {display}
        </span>
        <span className="ml-1 text-xs text-neutral-500">/100</span>
      </div>
    </div>
  );
}

export default ResultsScreen;