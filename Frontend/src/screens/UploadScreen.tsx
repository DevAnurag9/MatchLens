import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import BioInput from "../components/BioInput";
import PrimaryButton from "../components/PrimaryButton";

function UploadScreen() {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleAnalyze = () => {
    if (!bio.trim()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      navigate("/results");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 via-neutral-950 to-neutral-900 text-white px-4 py-10 flex items-center justify-center">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.25),transparent_55%),radial-gradient(circle_at_bottom,_rgba(14,116,144,0.2),transparent_55%)]" />

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full max-w-2xl"
      >
        <div
          className="pointer-events-none absolute -inset-[1px] -z-10 rounded-3xl bg-gradient-to-r from-indigo-500/25 via-purple-500/15 to-sky-500/25 opacity-75 blur-2xl"
          aria-hidden="true"
        />

        <div className="relative overflow-hidden rounded-3xl border border-neutral-800/80 bg-neutral-900/80 shadow-[0_24px_80px_rgba(0,0,0,0.85)] backdrop-blur">
          <div className="px-5 py-6 sm:px-8 sm:py-8">
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <p className="text-xs font-medium uppercase tracking-[0.2em] text-indigo-400/80">
                Private AI review
              </p>
              <h1 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
                MatchLens
              </h1>
              <p className="mt-3 text-sm text-neutral-400 sm:text-base">
                Get signal‑boosted feedback on your dating profile bio, powered
                by on‑device AI. No screenshots. No uploads. Just insight.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.5, ease: "easeOut" }}
              className="mt-8 space-y-6"
            >
              <BioInput value={bio} onChange={setBio} />

              <div className="flex flex-col-reverse gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs text-neutral-500">
                  Your bio never leaves this page. Results are generated
                  instantly for you only.
                </p>

                <div className="sm:self-end">
                  <PrimaryButton
                    loading={loading}
                    disabled={!bio.trim()}
                    onClick={handleAnalyze}
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default UploadScreen;