import { type PropsWithChildren } from "react";
import { motion } from "framer-motion";

type PrimaryButtonProps = PropsWithChildren<{
  loading: boolean;
  disabled: boolean;
  onClick?: () => void;
}>;

function PrimaryButton({
  loading,
  disabled,
  onClick,
  children,
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <motion.button
      type="button"
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
      whileHover={
        isDisabled
          ? undefined
          : {
              scale: 1.015,
              boxShadow: "0 18px 40px rgba(79,70,229,0.35)",
            }
      }
      whileTap={
        isDisabled
          ? undefined
          : {
              scale: 0.985,
            }
      }
      transition={{ type: "spring", stiffness: 240, damping: 26 }}
      className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold
        relative overflow-hidden
        transition-colors duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70
        focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
        ${
          isDisabled
            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-60"
            : "bg-gradient-to-r from-indigo-500 via-indigo-500 to-indigo-400 text-white shadow-lg shadow-indigo-500/25 hover:from-indigo-500 hover:via-indigo-500 hover:to-indigo-300"
        }
        ${loading ? "animate-pulse" : ""}
      `}
    >
      {children ?? (loading ? "Analyzing..." : "Analyze My Profile →")}
    </motion.button>
  );
}

export default PrimaryButton;