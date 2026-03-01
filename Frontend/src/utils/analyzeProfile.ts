export type ProfileAnalysis = {
  tone: "Friendly" | "Confident" | "Generic" | "Neutral";
  score: number;
  strengths: string[];
  improvements: string[];
  verdict: string;
};

const GENERIC_PHRASES = [
  "love to travel",
  "love travelling",
  "i love to travel",
  "foodie",
  "down to earth",
  "easygoing",
  "easy-going",
  "love to laugh",
  "love making people laugh",
  "looking for someone who",
  "partner in crime",
  "good vibes only",
  "work hard play hard",
];

const CONFIDENT_PHRASES = [
  "i am",
  "i'm",
  "i am someone who",
  "i love",
  "i enjoy",
  "i like",
  "i work as",
  "i lead",
  "i run",
  "i value",
  "i care about",
  "i'm passionate about",
];

const INTEREST_KEYWORDS = [
  "travel",
  "travelling",
  "hiking",
  "hike",
  "running",
  "run",
  "gym",
  "fitness",
  "books",
  "reading",
  "music",
  "concerts",
  "cooking",
  "baking",
  "coffee",
  "tea",
  "dogs",
  "dog",
  "cats",
  "cat",
  "movies",
  "films",
  "art",
];

const WORK_KEYWORDS = [
  "engineer",
  "developer",
  "designer",
  "teacher",
  "doctor",
  "nurse",
  "student",
  "lawyer",
  "founder",
  "manager",
  "consultant",
  "researcher",
];

const LOOKING_FOR_PHRASES = [
  "looking for",
  "here for",
  "hoping to find",
  "open to",
  "interested in",
];

function includesAny(source: string, phrases: string[]): string | undefined {
  for (const phrase of phrases) {
    if (source.includes(phrase)) return phrase;
  }
  return undefined;
}

export function analyzeProfile(bio: string): ProfileAnalysis {
  const raw = bio.trim();

  if (!raw) {
    return {
      tone: "Neutral",
      score: 0,
      strengths: [
        "You’ll get the best results once you add 2–3 sentences about yourself.",
      ],
      improvements: [
        "Share a quick line about what your day-to-day looks like.",
        "Add a short hint about what you’re hoping to find here.",
      ],
      verdict:
        "Add a short bio and I can give you much more tailored, personal feedback.",
    };
  }

  const lower = raw.toLowerCase();

  const hasEmoji = /[\u{1F300}-\u{1FAFF}]/u.test(raw);
  const hasExclamation = raw.includes("!");
  const genericPhrase = includesAny(lower, GENERIC_PHRASES);
  const confidentPhrase = includesAny(lower, CONFIDENT_PHRASES);
  const interestKeyword = includesAny(lower, INTEREST_KEYWORDS);
  const workKeyword = includesAny(lower, WORK_KEYWORDS);
  const lookingForPhrase = includesAny(lower, LOOKING_FOR_PHRASES);

  let tone: ProfileAnalysis["tone"] = "Neutral";

  if (hasEmoji && hasExclamation) {
    tone = "Friendly";
  } else if (confidentPhrase) {
    tone = "Confident";
  } else if (genericPhrase) {
    tone = "Generic";
  }

  const strengths: string[] = [];
  const improvements: string[] = [];

  const length = raw.length;
  const isShort = length < 40;
  const isMedium = length >= 40 && length < 90;

  let score = 55;

  // Strengths
  if (tone === "Friendly") {
    strengths.push(
      "Your bio reads friendly and approachable, which makes it easier for people to start a conversation."
    );
    score += 5;
  }

  if (tone === "Confident") {
    strengths.push(
      "Your first-person language makes you sound clear and confident about who you are."
    );
    score += 7;
  }

  if (interestKeyword) {
    strengths.push(
      `You mention specific interests like “${interestKeyword}”, which gives people something real to connect with.`
    );
  }

  if (workKeyword) {
    strengths.push(
      "You hint at your work or studies, which adds helpful context without turning into a résumé."
    );
  }

  if (!isShort && !isMedium) {
    score += 10;
    strengths.push(
      "You share enough detail for someone to get a genuine sense of your life."
    );
  } else if (!isShort && !interestKeyword) {
    score += 4;
    strengths.push(
      "Even in a shorter bio, you still give a clear snapshot of who you are."
    );
  }

  // Improvements
  if (isShort) {
    score -= 10;
    improvements.push(
      "Add one or two more sentences so people get more than just a headline view of you."
    );
  }

  if (!lookingForPhrase) {
    score -= 3;
    improvements.push(
      "Include a short line about what you’re hoping to find here, so matches can quickly see if you’re aligned."
    );
  }

  if (genericPhrase) {
    score -= 4;
    improvements.push(
      `Instead of phrases like “${genericPhrase}”, try one specific example or story that shows what you mean.`
    );
  }

  if (!interestKeyword) {
    score -= 3;
    improvements.push(
      "Mention one concrete hobby, interest, or weekend activity to make your bio more memorable."
    );
  }

  // Make sure improvements stay concise and non-repetitive
  const uniqueImprovements = Array.from(new Set(improvements)).slice(0, 4);

  if (tone === "Generic") {
    score -= 3;
  }

  if (score < 0) score = 0;
  if (score > 100) score = 100;

  // Verdict
  let verdict: string;

  if (isShort) {
    verdict =
      "You’ve got a solid opener; a bit more texture will help people instantly understand who they’re swiping on.";
  } else if (tone === "Friendly" && genericPhrase) {
    verdict =
      "You come across warm and approachable; swapping in a few concrete details would keep it from blending in.";
  } else if (tone === "Friendly") {
    verdict =
      "You feel warm and easy to approach—that’s a strong foundation to build the rest of your bio on.";
  } else if (tone === "Confident") {
    verdict =
      "You come across confident and grounded without slipping into résumé mode, which tends to work well on dating apps.";
  } else if (tone === "Generic") {
    verdict =
      "You read as pleasant but a bit familiar—adding a few sharp specifics will help you stand out in a crowd.";
  } else {
    verdict =
      "Your bio gives a clear quick snapshot; one or two vivid details would make it feel even more memorable.";
  }

  return {
    tone,
    score,
    strengths,
    improvements: uniqueImprovements,
    verdict,
  };
}

