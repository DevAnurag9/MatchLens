import BioInput from "../components/BioInput";
import PrimaryButton from "../components/PrimaryButton";

function UploadScreen() {
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
          <BioInput />
          <PrimaryButton />
        </div>
      </div>
    </div>
  );
}

export default UploadScreen;