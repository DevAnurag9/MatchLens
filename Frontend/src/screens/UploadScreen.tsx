import { useState } from "react";
import BioInput from "../components/BioInput";
import PrimaryButton from "../components/PrimaryButton";

function UploadScreen() {
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = () => {
    if (!bio.trim()) {
      alert("Please enter your bio first");
      return;
    }

    setLoading(true);

    // fake analysis delay
    setTimeout(() => {
      setLoading(false);
      alert("Analysis complete (fake for now)");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="max-w-xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight">
          MatchLens
        </h1>

        <p className="mt-3 text-sm text-neutral-400">
          Private AI feedback for dating profiles
        </p>

        <div className="mt-10">
          <BioInput value={bio} onChange={setBio} />

          <div onClick={handleAnalyze}>
            <PrimaryButton
              loading={loading}
              disabled={!bio.trim()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadScreen;