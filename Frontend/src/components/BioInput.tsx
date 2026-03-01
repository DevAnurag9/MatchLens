type BioInputProps = {
    value: string;
    onChange: (value: string) => void;
  };
  
  function BioInput({ value, onChange }: BioInputProps) {
    return (
      <div className="space-y-2">
        <label className="text-sm font-medium">
          Your Profile Bio
        </label>
  
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Write something about yourself..."
          rows={4}
          className="w-full rounded-lg border border-neutral-700 bg-neutral-900 p-3 text-sm text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    );
  }
  
  export default BioInput;