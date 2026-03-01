type BioInputProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  function getBioQuality(length: number) {
    if (length === 0) return { text: "Start typing your bio", color: "text-neutral-500" };
    if (length < 40) return { text: "Too short 😬", color: "text-red-400" };
    if (length < 80) return { text: "Good start 👍", color: "text-yellow-400" };
    return { text: "Great bio 🔥", color: "text-green-400" };
  }
  
  function BioInput({ value, onChange }: BioInputProps) {
    const { text, color } = getBioQuality(value.length);
  
    return (
      <div>
        <label className="block text-sm font-medium text-neutral-300">
          Your Profile Bio
        </label>
  
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={4}
          placeholder="Write something about yourself..."
          className="
            mt-2 w-full rounded-lg
            bg-neutral-900 text-white
            px-4 py-3 text-sm
            border border-neutral-700
            placeholder:text-neutral-500
            transition-all duration-200
            focus:outline-none
            focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/30
            resize-none
          "
        />
  
        <div className="mt-2 flex justify-between text-xs">
          <span className={color}>{text}</span>
          <span className="text-neutral-500">{value.length} chars</span>
        </div>
      </div>
    );
  }
  
  export default BioInput;