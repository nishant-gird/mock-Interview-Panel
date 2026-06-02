# 🤖 AI Layer Architecture - Where Claude is Used

## Location & Status

**File:** `mock-Interview-Panel/src/routes/api/interview/evaluate.ts`

**Status:** ✅ Built and ready, but **not yet integrated into interview flow**

---

## The AI Layer - Complete Flow

```
┌─────────────────────────────────────────────────────────┐
│         INTERVIEW COMPONENT (Frontend)                  │
│   User submits answer to a question                     │
└────────────────────┬────────────────────────────────────┘
                     │
                     ↓
        ┌────────────────────────────────┐
        │ fetch('/api/interview/evaluate')|
        │ POST {question, answer}        │
        └────────────────┬───────────────┘
                         │
                         ↓
        ┌───────────────────────────────────────┐
        │  evaluate.ts (API Handler)            │
        │  ├─ Receives question & answer        │
        │  └─ Calls Claude AI                   │
        └────────────────┬─────────────────────┘
                         │
                         ↓
    ┌─────────────────────────────────────────────────────┐
    │    CLAUDE 3.5 SONNET (Anthropic API)                │
    │                                                      │
    │  Tool Use System:                                   │
    │  ├─ Tool 1: askFollowUpQuestion()                  │
    │  │   └─ Return: { action, followUpQuestion }       │
    │  │                                                  │
    │  └─ Tool 2: scoreResponse()                        │
    │      └─ Return: { action, score, feedback, ... }   │
    └────────────────┬────────────────────────────────────┘
                     │
                     ↓
        ┌────────────────────────────────────┐
        │ Claude decides: Follow-up or Score?│
        │                                    │
        │ Logic:                             │
        │ - Answer incomplete?               │
        │   → Ask follow-up question         │
        │ - Answer comprehensive?            │
        │   → Score 0-100 + feedback         │
        └────────────────┬───────────────────┘
                         │
                         ↓
        ┌──────────────────────────────────────┐
        │ Response JSON                        │
        │                                      │
        │ Option 1 (Follow-up):               │
        │ {                                   │
        │   "action": "followUp",             │
        │   "followUpQuestion": "...",        │
        │   "reasoning": "..."                │
        │ }                                   │
        │                                      │
        │ Option 2 (Score):                  │
        │ {                                   │
        │   "action": "score",                │
        │   "score": 78,                      │
        │   "feedback": "...",                │
        │   "strengths": ["..."],             │
        │   "improvements": ["..."]           │
        │ }                                   │
        └────────────────┬────────────────────┘
                         │
                         ↓
    ┌──────────────────────────────────────────┐
    │ Frontend receives response                │
    │                                           │
    │ if (action === "followUp")                │
    │   Display: New question for candidate    │
    │                                           │
    │ else if (action === "score")              │
    │   Display: Score badge + feedback        │
    │   Save: score to database                │
    │   Move to: Next question                 │
    └──────────────────────────────────────────┘
```

---

## How Claude AI Makes Decisions

### The Tool Use System

Claude is given **two tools** to choose from:

**Tool 1: `askFollowUpQuestion`**
```typescript
{
  description: "Ask a follow-up question to dig deeper",
  parameters: {
    question: string,        // The follow-up
    reasoning: string        // Why this follow-up matters
  }
}
```

**When Claude chooses this:**
- Answer is incomplete
- Needs more depth
- Missing concrete examples
- Candidate could elaborate

**Example Output:**
```json
{
  "action": "followUp",
  "followUpQuestion": "Can you give a specific example of a distributed system you've designed?",
  "reasoning": "The answer shows understanding but lacks concrete examples"
}
```

---

**Tool 2: `scoreResponse`**
```typescript
{
  description: "Score the response and provide feedback",
  parameters: {
    score: number (0-100),       // Final score
    feedback: string,            // Overall feedback
    strengths: string[],         // What went well
    improvements: string[]       // Areas to improve
  }
}
```

**When Claude chooses this:**
- Answer is comprehensive
- Sufficient depth demonstrated
- Ready to move to next question
- Enough information to score

**Example Output:**
```json
{
  "action": "score",
  "score": 82,
  "feedback": "Excellent understanding of system design principles with practical examples. Communication was clear and structured.",
  "strengths": [
    "Clear architecture explanation",
    "Mentioned scaling considerations",
    "Discussed failure scenarios",
    "Good communication of trade-offs"
  ],
  "improvements": [
    "Could mention monitoring/observability",
    "More detail on consistency models",
    "Cost considerations could be explored"
  ]
}
```

---

## The AI Evaluation Criteria

Claude analyzes responses on **5 dimensions:**

```
1. Correctness & Accuracy
   ↓ Is the technical information correct?

2. Clarity of Explanation
   ↓ Can others understand what they're saying?

3. Depth of Understanding
   ↓ How deep is their knowledge?

4. Communication Skills
   ↓ How well do they articulate ideas?

5. Problem-Solving Approach
   ↓ Is their approach logical and systematic?
```

---

## Current Integration Status

### ✅ What's Ready:

1. **evaluate.ts endpoint** - Fully implemented
2. **Claude API integration** - Using tool use system
3. **Documentation** - Complete with examples
4. **Cost calculation** - ~$0.015 per interview

### ⚠️ What's NOT Yet Integrated:

1. **interview.$id.tsx** - Doesn't call the evaluate endpoint
2. **Database storage** - AI scores not saved to responses table
3. **Session feedback** - AI feedback not displayed in reports
4. **Progress tracking** - AI scores not aggregated for analytics

---

## How to Integrate AI into Interview Flow

### Step 1: Get Claude API Key

```bash
# Go to https://console.anthropic.com/
# Create API key
# Add to .env:
VITE_ANTHROPIC_API_KEY=sk-ant-your-key-here
```

### Step 2: Update interview.$id.tsx to Use AI

```typescript
// Current: Uses hardcoded questions
// TODO: Call evaluate endpoint when answer submitted

const handleSubmitAnswer = async (answer: string) => {
  try {
    const response = await fetch('/api/interview/evaluate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: currentQuestion,
        answer: answer
      }),
    });
    
    const aiResponse = await response.json();
    
    if (aiResponse.action === 'followUp') {
      // Show follow-up question
      setCurrentQuestion(aiResponse.followUpQuestion);
    } else if (aiResponse.action === 'score') {
      // Save score to database
      await apiClient.submitResponse({
        interviewId: interview.id,
        questionId: currentQuestion.id,
        answerText: answer,
        aiScore: aiResponse.score,
        aiFeedback: aiResponse.feedback,
        strengths: aiResponse.strengths,
        improvements: aiResponse.improvements
      });
      
      // Move to next question
      moveToNextQuestion();
    }
  } catch (error) {
    setError(error.message);
  }
};
```

### Step 3: Save AI Responses to Database

```typescript
// Update responses table with AI data:
{
  interviewId: string,
  questionId: string,
  answerText: string,
  aiScore: number,           // ← Claude score
  aiFeedback: string,        // ← Claude feedback
  strengths: string[],       // ← Claude strengths
  improvements: string[]     // ← Claude improvements
}
```

### Step 4: Display AI Feedback in Reports

```typescript
// In report.$id.tsx

{response.aiScore && (
  <div>
    <h4>AI Evaluation</h4>
    <div className="score-badge">{response.aiScore}/100</div>
    <p>{response.aiFeedback}</p>
    
    <div className="strengths">
      <h5>What went well:</h5>
      {response.strengths.map(s => <li>{s}</li>)}
    </div>
    
    <div className="improvements">
      <h5>To improve:</h5>
      {response.improvements.map(i => <li>{i}</li>)}
    </div>
  </div>
)}
```

---

## AI Layer - Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                  FRONTEND (React)                           │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  interview.$id.tsx (Interview Component)            │   │
│  │  ├─ Display question                                │   │
│  │  ├─ Get user answer                                 │   │
│  │  ├─ Submit to AI evaluate endpoint                  │   │
│  │  └─ Show result (follow-up or score)                │   │
│  └──────────────┬───────────────────────────────────────┘   │
└─────────────────┼───────────────────────────────────────────┘
                  │
         HTTP POST /api/interview/evaluate
         {question, answer}
                  │
                  ↓
┌─────────────────────────────────────────────────────────────┐
│              BACKEND (NestJS - Not yet)                     │
│  Actually in: Frontend route handler (evaluate.ts)          │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  evaluate.ts (API Handler)                          │   │
│  │  ├─ Parse request                                   │   │
│  │  ├─ Build Claude prompt                             │   │
│  │  ├─ Call Anthropic API                              │   │
│  │  ├─ Tool use decision                               │   │
│  │  └─ Return result                                   │   │
│  └──────────────┬───────────────────────────────────────┘   │
└─────────────────┼───────────────────────────────────────────┘
                  │
         ANTHROPIC API Call
                  │
                  ↓
┌─────────────────────────────────────────────────────────────┐
│         CLAUDE 3.5 SONNET (External AI)                     │
│                                                              │
│  analyzeResponse(question, answer) →                        │
│  Evaluates on 5 criteria →                                  │
│  Chooses tool →                                             │
│  Returns {action, score/followUp, feedback}                 │
└────────────────┬──────────────────────────────────────────┘
                 │
        JSON Response
                 │
                 ↓
        ┌────────────────────┐
        │  Save to DB        │
        │  Display to User   │
        │  Continue Interview│
        └────────────────────┘
```

---

## Cost Analysis

### Per-Interview Cost (Claude 3.5 Sonnet)

```
Input Tokens:    ~2,000 × $0.003/1K = $0.006
Output Tokens:   ~500   × $0.015/1K = $0.0075
─────────────────────────────────────────
Total per interview:               $0.0135

Per Month (1,000 interviews):      ~$13.50
Per Year (12,000 interviews):      ~$162
```

---

## Next Steps to Enable AI

### Priority 1 (Enable AI scoring):
1. ✅ API endpoint exists (evaluate.ts)
2. ⚠️ Hook it into interview.$id.tsx
3. ⚠️ Save AI scores to database
4. ⚠️ Display scores in report

### Priority 2 (Advanced AI features):
1. Multi-round context awareness
2. Personalized follow-ups by weakness
3. AI-generated interview summaries
4. Real-time scoring in dashboard

### Priority 3 (Production):
1. Rate limiting for Claude API
2. Caching repeated evaluations
3. Cost tracking & limits
4. Error recovery & retry logic

---

## Summary: Where is the AI?

| Component | Status | Location |
|-----------|--------|----------|
| Claude Integration | ✅ Ready | `evaluate.ts` |
| Tool Use System | ✅ Ready | Uses askFollowUpQuestion & scoreResponse |
| API Endpoint | ✅ Ready | POST `/api/interview/evaluate` |
| Interview Hook | ❌ TODO | `interview.$id.tsx` |
| Database Storage | ❌ TODO | responses.aiScore field |
| Report Display | ❌ TODO | `report.$id.tsx` |
| Analytics | ❌ TODO | Progress page |

**The AI layer is built but dormant—it just needs to be wired into the interview flow!**
