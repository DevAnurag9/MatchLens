import { useEffect, useState } from "react";

function ResultsScreen() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center text-white">
        <p className="animate-pulse text-lg">Analyzing profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white px-6 py-12">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">Your Profile Analysis</h1>

        <ResultCard title="Bio Score" value="78 / 100" />
        <ResultCard title="Photo Score" value="Pending" />
        <ResultCard title="Engagement Potential" value="High" />
      </div>
    </div>
  );
}

function ResultCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl bg-neutral-900 p-5 shadow-md transition hover:scale-[1.02]">
      <p className="text-sm text-neutral-400">{title}</p>
      <p className="mt-2 text-xl font-semibold">{value}</p>
    </div>
  );
}

export default ResultsScreen;