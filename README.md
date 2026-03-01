## MatchLens

AI-powered dating profile analyzer that gives clear, actionable feedback on your dating bio without sending anything to a server.

### Overview

Most dating bios are either too generic (“love to travel, foodie, good vibes only”) or too sparse to say much. MatchLens helps people quickly understand how their bio reads to others and what small edits would make it sharper, clearer, and more personal — all in a focused, distraction-free UI.

### Key Features

- **Instant, private analysis**: Bio is analyzed entirely in the browser — nothing is sent to a backend.
- **Tone + score insight**: Simple 0–100 score with tone tagging (friendly, confident, generic, neutral).
- **Actionable strengths**: Highlights what the bio is already doing well using concrete references to the text.
- **Targeted improvements**: Suggests specific edits (add a hobby, clarify intent, adjust structure) instead of generic tips.
- **Premium UI/UX**: Dark, SaaS-style interface with subtle motion and clear hierarchy, optimized for mobile and desktop.

### How It Works

1. **Write or paste your bio** on the upload screen.
2. **Client-side analyzer** runs a set of deterministic rules over the text:
   - Detects tone from emojis, exclamation marks, first-person phrasing, and clichés.
   - Looks for concrete interests, work hints, and whether intent is stated.
   - Derives a score and short, human-readable feedback objects (strengths, improvements, verdict).
3. **Analyzing screen** adds a brief, animated “AI thinking” step for user feedback.
4. **Results screen** shows:
   - Overall score with an animated circular indicator.
   - Strengths and improvements separated into clear sections.
   - A one-line verdict and a short “Why this score?” explanation.

Nothing leaves the browser; the entire flow is front-end only.

### Tech Stack

- **Framework**: React + Vite + TypeScript
- **Routing**: React Router
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion

### Why This Approach

- **Privacy by design**: All analysis logic lives in a small, pure TypeScript utility (`analyzeProfile`). Bios are never sent to a server or third-party API, which is important for sensitive personal text.
- **Zero-cost AI behavior**: Instead of calling paid LLM APIs, MatchLens uses deterministic rules tuned for dating bios (tone detection, clichés, interests, intent). This keeps the project cheap to run, predictable, and easy to reason about in interviews or demos.
- **Great demo surface**: The combination of a focused feature set, thoughtful microcopy, and polished motion makes it easy for reviewers to understand the value in under a minute.

### Screenshots

> _Add screenshots here once deployed or when you have static mocks._
>
> Recommended:
> - Upload screen (bio input + primary CTA)
> - Analyzing screen (loading/processing state)
> - Results screen (score, strengths, improvements)

### Future Improvements

- **Richer analysis model**: Add more nuanced rules around humor, clichés, and overused prompts, plus basic detection of red flags or unclear phrasing.
- **Side-by-side comparisons**: Let users compare two bio versions and see how the score and feedback change.
- **Preset templates**: Offer lightweight starting templates for different vibes (playful, direct, low-key, etc.).
- **Export & sharing**: Provide a way to copy a “suggested bio” or share a summary screenshot for quick iteration.
- **Multi-language support**: Extend the analyzer rules beyond English once the core experience is solid.

### Architecture Decisions

- **No external AI APIs in v1**: For hackathons and small portfolios, latency, cost, and rate limits on hosted LLMs are usually the biggest failure modes. v1 is designed to be instantly demoable offline or on a basic static host.
- **Deterministic “AI-like” logic**: The `analyzeProfile` utility uses readable rules (tone, clichés, interests, intent, length) to simulate an AI coach. Because it’s deterministic, the same bio always gets the same feedback, which is ideal for testing and review.
- **Privacy-first by construction**: There is no backend service; bios never leave the browser. This is easier to reason about than “we don’t store your data” claims and is a strong talking point for judges and recruiters.
- **Easy path to real AI later**: The current analysis function is already a single seam where a real model call could be plugged in (e.g., `POST /analyze` or a direct LLM API). Its return shape (`tone`, `score`, `strengths`, `improvements`, `verdict`) is model-agnostic, so upgrading to hosted AI later does not require redesigning the UI.

### What I Learned Building This

- **Frontend architecture**: How to keep a small React + Vite codebase modular by isolating screens, shared components, and pure utilities like `analyzeProfile`, while still feeling lightweight.
- **UX for AI products**: That perceived intelligence often comes from UX details (loading states, microcopy, motion, confidence in language) as much as from the underlying model.
- **Prompt-driven development**: How to iteratively refine flows and copy by treating requirements as prompts, then folding that feedback back into small, composable components.
- **Deterministic AI logic**: That well-crafted rule-based analysis can deliver “AI-like” value for narrow domains (like dating bios) with zero latency, zero cost, and predictable behavior.

For deeper product and technical details, see:
- `/docs/prd.md` — Product scope
- `/docs/trd.md` — Technical architecture
