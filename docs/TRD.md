# Technical Requirements Document (TRD)

## 1. System Architecture Overview
Client–server architecture with a stateless backend and session-based analysis. AI services are modular and invoked asynchronously.

---

## 2. Frontend Responsibilities
- Collect bio text and images
- Handle uploads and validation
- Display analysis results and errors
- Maintain session ID locally

---

## 3. Backend Responsibilities
- Session management
- Input validation
- Orchestrate AI analysis
- Aggregate results and scores
- Enforce data expiration

---

## 4. Database Schema (MongoDB)

### analysis_sessions
- session_id
- intent
- status
- created_at
- expires_at

### bio_analysis
- session_id
- original_bio
- tone
- issues
- suggestions
- bio_score

### photo_analysis
- session_id
- photo_metadata
- photo_score
- best_photo_id

### final_results
- session_id
- overall_score
- engagement_level
- action_items

---

## 5. API Structure
- POST /api/v1/analysis/session
- POST /api/v1/analysis/submit
- GET /api/v1/analysis/{session_id}/results
- DELETE /api/v1/analysis/{session_id}

---

## 6. Authentication Strategy
Anonymous, session-based authentication using UUIDs. No user accounts in V1.

---

## 7. Third-Party Dependencies
- OpenAI or Groq (text analysis)
- OpenCV / MediaPipe (image analysis)
- Cloudinary or S3 (temporary image storage)
- Render / Vercel (hosting)

---

## 8. Scalability Considerations
- Stateless API services
- Async background processing
- Rate limiting per session/IP
- TTL-based data cleanup

---

## Stability Principles
- Graceful degradation on AI failure
- Partial results over full failure
- Conservative timeouts and retries
