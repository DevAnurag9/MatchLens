import { motion } from "framer-motion";

type PrimaryButtonProps = {
  loading: boolean;
  disabled: boolean;
  onClick?: () => void;
};

function PrimaryButton({
  loading,
  disabled,
  onClick,
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
              scale: 1.02,
            }
      }
      whileTap={
        isDisabled
          ? undefined
          : {
              scale: 0.97,
            }
      }
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold
        relative overflow-hidden
        transition-colors duration-200 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/70
        focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900
        ${
          isDisabled
            ? "bg-neutral-800 text-neutral-500 cursor-not-allowed opacity-60"
            : "bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 hover:bg-indigo-400"
        }
        ${loading ? "animate-pulse" : ""}
      `}
    >
      {loading ? "Analyzing..." : "Analyze My Profile →"}
    </motion.button>
  );
}

export default PrimaryButton;