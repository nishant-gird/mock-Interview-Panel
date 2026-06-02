# 🤖 Sarvam AI Integration - Setup Guide

## Quick Start (5 minutes)

### Step 1: Get Sarvam AI API Key

1. Go to: **https://cloud.sarvam.ai/**
2. Sign up for an account (or login)
3. Go to **API Keys** section
4. Create a new API key
5. Copy the key

### Step 2: Update Backend .env

Open `mip-backend/.env` and add:

```bash
# AI Provider Configuration
AI_PROVIDER=sarvam
SARVAM_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Sarvam API key.

### Step 3: Verify Setup

The backend will automatically initialize Sarvam AI provider on startup. Look for:

```
✅ AI Service initialized with provider: sarvam
```

---

## What's Implemented

### ✅ Backend AI Layer
- **AI Module** with pluggable provider system
- **Sarvam AI Provider** - Fully implemented
- **API Endpoints:**
  - `POST /ai/evaluate` - Evaluate interview answer
  - `POST /ai/switch-provider` - Switch AI provider (future)
  - `POST /ai/providers` - Get available providers

### ✅ Frontend Integration
- **API Client Methods:**
  - `apiClient.evaluateAnswer(question, answer)`
  - `apiClient.switchAIProvider(provider)`
  - `apiClient.getAIProviders()`

### ⏳ Not Yet Integrated
- Interview component doesn't call evaluate yet
- Responses not saved to database with AI scores

---

## Testing the AI

### Test 1: Check Backend is Running

```bash
curl -X POST http://localhost:3001/ai/providers \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Response:
```json
{
  "active": "sarvam",
  "available": ["sarvam", "anthropic", "openai"]
}
```

### Test 2: Evaluate an Answer

```bash
curl -X POST http://localhost:3001/ai/evaluate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "question": "How do you handle errors in production?",
    "answer": "I implement comprehensive error handling using try-catch blocks, logging, monitoring, and alerting systems to detect and respond to issues quickly."
  }'
```

Response (Follow-up):
```json
{
  "action": "followUp",
  "followUpQuestion": "Can you give a specific example of an error handling implementation you've done?",
  "reasoning": "The answer is good but lacks concrete examples",
  "provider": "sarvam"
}
```

Or Response (Score):
```json
{
  "action": "score",
  "score": 78,
  "feedback": "Good understanding of error handling with multiple approaches mentioned",
  "strengths": [
    "Mentions logging and monitoring",
    "Discusses alerting systems",
    "Proactive approach to errors"
  ],
  "improvements": [
    "Could mention specific tools used",
    "More detail on error recovery strategies",
    "Discussion of error isolation techniques"
  ],
  "provider": "sarvam"
}
```

---

## Next: Integrate AI into Interview Flow

To actually use AI in interviews, update `interview.$id.tsx`:

```typescript
const handleSubmitAnswer = async (answer: string) => {
  setLoading(true);
  try {
    // Call AI evaluation
    const aiResult = await apiClient.evaluateAnswer(
      currentQuestion,
      answer
    );

    // Handle follow-up
    if (aiResult.action === 'followUp') {
      setCurrentQuestion(aiResult.followUpQuestion);
      setAnswer('');
    } else {
      // Save to database
      await apiClient.submitResponse({
        interviewId: interview.id,
        questionId: currentQuestion.id,
        answerText: answer,
        aiScore: aiResult.score,
        aiFeedback: aiResult.feedback,
        strengths: aiResult.strengths,
        improvements: aiResult.improvements
      });
      
      // Move to next question
      moveToNextQuestion();
    }

    // Show feedback
    setAIFeedback(aiResult);
  } catch (error) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};
```

---

## Switching to Anthropic Later

When ready to switch to Anthropic:

### 1. Update .env
```bash
AI_PROVIDER=anthropic
ANTHROPIC_API_KEY=your_key_here
```

### 2. Implement Anthropic Provider
```bash
# Edit: mip-backend/src/modules/ai/providers/anthropic.provider.ts
# Add the implementation using Anthropic SDK
```

### 3. Restart Backend
```bash
npm run start:dev
```

That's it! No code changes needed in interview component.

---

## Switching to OpenAI

Same process as Anthropic - just update .env and implement the provider.

---

## Cost Comparison

### Sarvam AI (Current)
- **Per interview:** ~$0.001-0.002
- **Per 1000 interviews:** ~$1-2
- **Monthly (1000 users × 1 interview/month):** ~$1-2

### Anthropic Claude 3.5 Sonnet
- **Per interview:** ~$0.015
- **Per 1000 interviews:** ~$15
- **Monthly (1000 users):** ~$15

### OpenAI GPT-4
- **Per interview:** ~$0.05
- **Per 1000 interviews:** ~$50
- **Monthly (1000 users):** ~$50

---

## Architecture

```
Interview Component
    ↓
apiClient.evaluateAnswer()
    ↓
POST /ai/evaluate
    ↓
AIService
    ↓
SarvamAIProvider (current)
    ↓
Sarvam API
    ↓
Claude/OpenAI (future - just switch provider)
```

---

## Files Created

```
mip-backend/src/modules/ai/
├── ai.controller.ts              ✅ API endpoints
├── ai.service.ts                 ✅ Core logic
├── ai.module.ts                  ✅ NestJS module
├── interfaces/
│   └── ai-provider.interface.ts  ✅ Provider contract
└── providers/
    ├── sarvam.provider.ts        ✅ Sarvam implementation
    ├── anthropic.provider.ts     ⏳ Placeholder for future
    └── openai.provider.ts        ⏳ Placeholder for future
```

---

## Troubleshooting

### Issue: "SARVAM_API_KEY not configured"

**Solution:** Add to `.env`:
```bash
SARVAM_API_KEY=your_actual_key
```

Then restart backend.

### Issue: "Failed to evaluate response"

**Possible causes:**
1. Invalid API key
2. Sarvam API down
3. Network issues

**Solution:**
```bash
# Test with curl
curl -X POST https://api.sarvam.ai/chat/completions \
  -H "api-subscription-key: YOUR_KEY" \
  -H "Content-Type: application/json" \
  -d '{"model": "Meta-Llama-3-8B-Instruct", "messages": [{"role": "user", "content": "test"}]}'
```

### Issue: AI responses not being saved to database

**Current status:** AI evaluation works but responses aren't saved yet.

**Next step:** Need to integrate into interview.$id.tsx (see section above).

---

## What's Next

1. ✅ AI provider system built
2. ✅ Sarvam AI provider implemented
3. ✅ API endpoints created
4. ⏳ Integrate into interview component
5. ⏳ Save AI scores to database
6. ⏳ Display AI feedback in reports
7. ⏳ Implement Anthropic provider
8. ⏳ Implement OpenAI provider

---

## Support

**Sarvam AI Docs:** https://docs.sarvam.ai/
**API Reference:** https://docs.sarvam.ai/api-reference

---

## Summary

✅ **AI layer is ready** - Backend supports Sarvam AI  
⏳ **Next step** - Wire it into interview flow  
🔄 **Easy switch** - Change AI provider anytime with 1 env var

Happy interviewing with AI! 🚀
