import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import PrimaryButton from "../components/PrimaryButton";

const MOCK_RESULTS = {
  overallScore: 82,
  verdict: "Strong, but could be sharper in a few places.",
  strengths: [
    "Comes across as warm and approachable without oversharing.",
    "Clear sense of what you enjoy and how you spend your time.",
    "Shows personality with specific details instead of generic traits.",
  ],
  improvements: [
    "You could tighten the opening sentence so it hooks attention a bit faster.",
    "Consider swapping 1–2 familiar phrases for more concrete, real-world examples.",
    "Try adding a short line about what you’re looking for to gently set expectations.",
  ],
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
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative w-full max-w-3xl"
      >
        <div className="pointer-events-none absolute -inset-[1px] -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/25 via-purple-500/15 to-emerald-500/25 opacity-70 blur-2xl" />

        <div className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/85 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur px-5 py-6 sm:px-8 sm:py-8">
          {/* Header */}
          <motion.header
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
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
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.12 }}
            className="mt-6"
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-neutral-800 bg-gradient-to-r from-indigo-500/15 via-neutral-900 to-emerald-500/10 px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-300/80">
                  Overall bio score
                </p>
                <p className="mt-2 text-sm text-neutral-300">
                  {MOCK_RESULTS.verdict}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: "easeOut", delay: 0.18 }}
                className="flex items-center justify-end sm:justify-center"
              >
                <AnimatedScore value={MOCK_RESULTS.overallScore} />
              </motion.div>
            </div>
          </motion.section>

          {/* Two-column content */}
          <motion.section
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.16 }}
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
                {MOCK_RESULTS.strengths.map((item) => (
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
                {MOCK_RESULTS.improvements.map((item) => (
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
            transition={{ duration: 0.45, ease: "easeOut", delay: 0.22 }}
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
    value < 50
      ? "text-red-400"
      : value <= 75
      ? "text-amber-300"
      : "text-emerald-400";

  return (
    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-neutral-950/80 shadow-[0_18px_40px_rgba(79,70,229,0.35)]">
      <div className="absolute inset-[2px] rounded-2xl bg-gradient-to-br from-indigo-600 via-purple-500 to-emerald-500 opacity-40 blur-md" />
      <div className="relative flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-neutral-900/95 border border-neutral-700/60">
        <span className={`text-2xl font-semibold ${textColor}`}>
          {display}
        </span>
        <span className="ml-1 text-xs text-neutral-500">/100</span>
      </div>
    </div>
  );
}

export default ResultsScreen;