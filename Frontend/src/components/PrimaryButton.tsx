type PrimaryButtonProps = {
    loading: boolean;
    disabled: boolean;
  };
  
  function PrimaryButton({ loading, disabled }: PrimaryButtonProps) {
    return (
      <button
        disabled={disabled || loading}
        className={`mt-8 w-full rounded-lg py-3 text-sm font-semibold
            transition-all duration-150 ease-out
            ${
              disabled || loading
                ? "bg-neutral-700 cursor-not-allowed opacity-70"
                : "bg-indigo-600 hover:bg-indigo-500 active:scale-95"
            }
          `}
      >
        {loading ? "Analyzing..." : "Analyze My Profile →"}
      </button>
    );
  }
  
  export default PrimaryButton;