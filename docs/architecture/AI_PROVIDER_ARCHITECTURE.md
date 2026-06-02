# AI Provider Architecture - Pluggable System

## Architecture Overview

```
┌────────────────────────────────────────┐
│       Interview Component              │
│    (interview.$id.tsx)                 │
└────────────────┬─────────────────────┘
                 │
                 ↓
┌────────────────────────────────────────┐
│       AI Service                       │
│  (ai.service.ts)                       │
│  - Handles all AI logic                │
│  - Provider agnostic                   │
└────────────────┬─────────────────────┘
                 │
    ┌────────────┴────────────┐
    ↓                         ↓
┌─────────────┐        ┌──────────────┐
│ SarvamAI    │        │ AnthropicAI  │
│ Provider    │        │ Provider     │
│ (current)   │        │ (future)     │
└─────────────┘        └──────────────┘
    ↓                         ↓
 Sarvam API              Anthropic API
(api.sarvam.com)    (api.anthropic.com)
```

## File Structure

```
mip-backend/src/modules/ai/
├── ai.module.ts
├── ai.service.ts                    # Core AI logic (provider agnostic)
├── interfaces/
│   ├── ai-provider.interface.ts     # Interface all providers implement
│   └── ai-response.interface.ts     # Standard response format
├── providers/
│   ├── sarvam.provider.ts           # Sarvam AI implementation
│   ├── anthropic.provider.ts        # Anthropic implementation (future)
│   └── openai.provider.ts           # OpenAI implementation (future)
└── dtos/
    └── evaluate.dto.ts              # Request/Response DTOs
```

## Step 1: Create AI Provider Interface

**File:** `mip-backend/src/modules/ai/interfaces/ai-provider.interface.ts`

```typescript
export interface AIResponse {
  action: 'followUp' | 'score';
  followUpQuestion?: string;
  reasoning?: string;
  score?: number;
  feedback?: string;
  strengths?: string[];
  improvements?: string[];
}

export interface AIProvider {
  evaluateResponse(question: string, answer: string): Promise<AIResponse>;
  getName(): string;
}
```

**File:** `mip-backend/src/modules/ai/interfaces/ai-response.interface.ts`

```typescript
export interface AIEvaluationResponse {
  action: 'followUp' | 'score';
  followUpQuestion?: string;
  reasoning?: string;
  score?: number;
  feedback?: string;
  strengths?: string[];
  improvements?: string[];
  provider: string;
  tokensUsed?: {
    input: number;
    output: number;
  };
}
```

---

## Step 2: Create Sarvam AI Provider

**File:** `mip-backend/src/modules/ai/providers/sarvam.provider.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class SarvamAIProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = 'https://api.sarvam.ai/';
  private model = 'Meta-Llama-3-8B-Instruct';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('SARVAM_API_KEY');
    if (!this.apiKey) {
      throw new Error('SARVAM_API_KEY not configured');
    }
  }

  async evaluateResponse(
    question: string,
    answer: string,
  ): Promise<AIResponse> {
    const prompt = this.buildPrompt(question, answer);

    try {
      const response = await fetch(`${this.baseUrl}chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'api-subscription-key': this.apiKey,
        },
        body: JSON.stringify({
          model: this.model,
          messages: [
            {
              role: 'user',
              content: prompt,
            },
          ],
          temperature: 0.7,
          top_p: 0.95,
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`Sarvam API error: ${response.statusText}`);
      }

      const data = await response.json();
      const content = data.choices[0].message.content;

      // Parse AI response to determine action
      return this.parseResponse(content);
    } catch (error) {
      console.error('Sarvam AI evaluation error:', error);
      throw error;
    }
  }

  private buildPrompt(question: string, answer: string): string {
    return `You are an expert technical interviewer. Evaluate this response:

Question: "${question}"
Candidate's Answer: "${answer}"

Analyze on:
1. Correctness & accuracy
2. Clarity of explanation
3. Depth of understanding
4. Communication skills
5. Problem-solving approach

Respond in this exact JSON format (choose ONE):

If answer needs more depth:
{
  "action": "followUp",
  "followUpQuestion": "Your follow-up question here",
  "reasoning": "Why this follow-up is important"
}

If answer is comprehensive:
{
  "action": "score",
  "score": <0-100>,
  "feedback": "Overall feedback",
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"]
}

Return ONLY the JSON, no other text.`;
  }

  private parseResponse(content: string): AIResponse {
    try {
      // Extract JSON from response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('No JSON found in response');
      }

      const parsed = JSON.parse(jsonMatch[0]);

      // Validate response structure
      if (!parsed.action || !['followUp', 'score'].includes(parsed.action)) {
        throw new Error('Invalid action in response');
      }

      return parsed as AIResponse;
    } catch (error) {
      console.error('Error parsing Sarvam response:', error);
      // Fallback: Generate a follow-up if parsing fails
      return {
        action: 'followUp',
        followUpQuestion: 'Can you provide more details or examples?',
        reasoning: 'Need more information to fully evaluate',
      };
    }
  }

  getName(): string {
    return 'sarvam';
  }
}
```

---

## Step 3: Create Anthropic Provider (Future)

**File:** `mip-backend/src/modules/ai/providers/anthropic.provider.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class AnthropicAIProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = 'https://api.anthropic.com/v1';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('ANTHROPIC_API_KEY');
  }

  async evaluateResponse(
    question: string,
    answer: string,
  ): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('ANTHROPIC_API_KEY not configured');
    }

    // Implementation with Anthropic SDK
    // Similar structure to Sarvam but using Anthropic API
    // Coming soon...
    
    throw new Error('Anthropic provider not yet implemented');
  }

  getName(): string {
    return 'anthropic';
  }
}
```

---

## Step 4: Create OpenAI Provider (Future)

**File:** `mip-backend/src/modules/ai/providers/openai.provider.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = 'https://api.openai.com/v1';

  constructor(private configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OPENAI_API_KEY');
  }

  async evaluateResponse(
    question: string,
    answer: string,
  ): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error('OPENAI_API_KEY not configured');
    }

    // Implementation with OpenAI SDK
    // Similar structure but using OpenAI API
    // Coming soon...
    
    throw new Error('OpenAI provider not yet implemented');
  }

  getName(): string {
    return 'openai';
  }
}
```

---

## Step 5: Create AI Service (Provider Agnostic)

**File:** `mip-backend/src/modules/ai/ai.service.ts`

```typescript
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SarvamAIProvider } from './providers/sarvam.provider';
import { AnthropicAIProvider } from './providers/anthropic.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { AIProvider, AIResponse } from './interfaces/ai-provider.interface';

@Injectable()
export class AIService {
  private activeProvider: AIProvider;
  private providers: Map<string, AIProvider> = new Map();

  constructor(
    private configService: ConfigService,
    private sarvamProvider: SarvamAIProvider,
    private anthropicProvider: AnthropicAIProvider,
    private openaiProvider: OpenAIProvider,
  ) {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Register all providers
    this.providers.set('sarvam', this.sarvamProvider);
    this.providers.set('anthropic', this.anthropicProvider);
    this.providers.set('openai', this.openaiProvider);

    // Set active provider from config
    const activeProvider =
      this.configService.get<string>('AI_PROVIDER') || 'sarvam';

    const provider = this.providers.get(activeProvider);
    if (!provider) {
      throw new Error(`Unknown AI provider: ${activeProvider}`);
    }

    this.activeProvider = provider;
    console.log(`✅ AI Service initialized with: ${activeProvider}`);
  }

  async evaluateResponse(
    question: string,
    answer: string,
  ): Promise<AIResponse> {
    console.log(
      `📊 Evaluating with ${this.activeProvider.getName()} provider...`,
    );
    return this.activeProvider.evaluateResponse(question, answer);
  }

  switchProvider(providerName: string): void {
    const provider = this.providers.get(providerName);
    if (!provider) {
      throw new Error(`Unknown AI provider: ${providerName}`);
    }
    this.activeProvider = provider;
    console.log(`🔄 Switched to AI provider: ${providerName}`);
  }

  getActiveProvider(): string {
    return this.activeProvider.getName();
  }

  getAvailableProviders(): string[] {
    return Array.from(this.providers.keys());
  }
}
```

---

## Step 6: Create AI Module

**File:** `mip-backend/src/modules/ai/ai.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AIService } from './ai.service';
import { SarvamAIProvider } from './providers/sarvam.provider';
import { AnthropicAIProvider } from './providers/anthropic.provider';
import { OpenAIProvider } from './providers/openai.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    AIService,
    SarvamAIProvider,
    AnthropicAIProvider,
    OpenAIProvider,
  ],
  exports: [AIService],
})
export class AIModule {}
```

---

## Step 7: Create Evaluate Controller & DTO

**File:** `mip-backend/src/modules/ai/dtos/evaluate.dto.ts`

```typescript
import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';

export class EvaluateResponseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  question: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  answer: string;
}

export class EvaluationResultDto {
  action: 'followUp' | 'score';
  followUpQuestion?: string;
  reasoning?: string;
  score?: number;
  feedback?: string;
  strengths?: string[];
  improvements?: string[];
  provider: string;
}
```

**File:** `mip-backend/src/modules/ai/ai.controller.ts`

```typescript
import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AIService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { EvaluateResponseDto, EvaluationResultDto } from './dtos/evaluate.dto';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('evaluate')
  async evaluateResponse(
    @Body() dto: EvaluateResponseDto,
    @Request() req,
  ): Promise<EvaluationResultDto> {
    const result = await this.aiService.evaluateResponse(
      dto.question,
      dto.answer,
    );

    return {
      ...result,
      provider: this.aiService.getActiveProvider(),
    };
  }

  @Post('switch-provider')
  switchProvider(@Body() dto: { provider: string }) {
    this.aiService.switchProvider(dto.provider);
    return {
      message: `Switched to ${dto.provider}`,
      activeProvider: this.aiService.getActiveProvider(),
    };
  }

  @Post('providers')
  getProviders() {
    return {
      active: this.aiService.getActiveProvider(),
      available: this.aiService.getAvailableProviders(),
    };
  }
}
```

---

## Step 8: Update .env Configuration

**File:** `mip-backend/.env`

```bash
# AI Provider Configuration
AI_PROVIDER=sarvam                    # Current provider (sarvam, anthropic, openai)

# Sarvam AI
SARVAM_API_KEY=your_sarvam_key_here

# Anthropic (for future use)
ANTHROPIC_API_KEY=your_anthropic_key

# OpenAI (for future use)
OPENAI_API_KEY=your_openai_key
```

---

## Step 9: Update App Module to Include AI

**File:** `mip-backend/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { InterviewsModule } from './modules/interviews/interviews.module';
import { QuestionsModule } from './modules/questions/questions.module';
import { ResponsesModule } from './modules/responses/responses.module';
import { SessionsModule } from './modules/sessions/sessions.module';
import { AIModule } from './modules/ai/ai.module';  // Add this

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    AuthModule,
    InterviewsModule,
    QuestionsModule,
    ResponsesModule,
    SessionsModule,
    AIModule,  // Add this
  ],
})
export class AppModule {}
```

---

## Step 10: Integrate AI into Interview Flow

**File:** `mock-Interview-Panel/src/routes/interview.$id.tsx` (Updated)

```typescript
import { useState, useEffect } from 'react';
import { apiClient } from '../lib/api-client';

export function InterviewQuestion() {
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiResponse, setAIResponse] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);

  const handleSubmitAnswer = async () => {
    if (!answer.trim()) return;

    setLoading(true);
    try {
      // Call AI evaluation endpoint
      const response = await fetch('/ai/evaluate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
        },
        body: JSON.stringify({
          question: currentQuestion,
          answer: answer,
        }),
      });

      if (!response.ok) {
        throw new Error('AI evaluation failed');
      }

      const result = await response.json();
      setAIResponse(result);

      // Save response to database
      await apiClient.submitResponse({
        interviewId: interview.id,
        questionId: currentQuestion.id,
        answerText: answer,
        aiScore: result.score || null,
        aiFeedback: result.feedback || null,
        strengths: result.strengths || [],
        improvements: result.improvements || [],
      });

      // Handle follow-up or move to next question
      if (result.action === 'followUp') {
        // Show follow-up question
        setCurrentQuestion(result.followUpQuestion);
        setAnswer('');
      } else {
        // Move to next question
        moveToNextQuestion();
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="interview-container">
      <div className="question">{currentQuestion}</div>
      
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        placeholder="Type your answer here..."
        disabled={loading}
      />

      <button onClick={handleSubmitAnswer} disabled={loading || !answer.trim()}>
        {loading ? 'AI Evaluating...' : 'Submit Answer'}
      </button>

      {aiResponse && (
        <div className="ai-feedback">
          {aiResponse.action === 'followUp' ? (
            <div className="follow-up">
              <h4>Follow-up Question:</h4>
              <p>{aiResponse.followUpQuestion}</p>
              <small>Reasoning: {aiResponse.reasoning}</small>
            </div>
          ) : (
            <div className="score-feedback">
              <h4>Score: {aiResponse.score}/100</h4>
              <p>{aiResponse.feedback}</p>
              
              <div className="strengths">
                <h5>Strengths:</h5>
                <ul>
                  {aiResponse.strengths.map((s, i) => (
                    <li key={i}>{s}</li>
                  ))}
                </ul>
              </div>

              <div className="improvements">
                <h5>Areas to Improve:</h5>
                <ul>
                  {aiResponse.improvements.map((i, idx) => (
                    <li key={idx}>{i}</li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
```

---

## Step 11: Update API Client

**File:** `mock-Interview-Panel/src/lib/api-client.ts` (Add method)

```typescript
// Add to ApiClient class:

async evaluateAnswer(question: string, answer: string) {
  return this.request('/ai/evaluate', 'POST', { question, answer });
}

async switchAIProvider(provider: string) {
  return this.request('/ai/switch-provider', 'POST', { provider });
}

async getAIProviders() {
  return this.request('/ai/providers', 'POST');
}
```

---

## Getting Sarvam AI API Key

1. Go to: https://cloud.sarvam.ai/
2. Sign up for an account
3. Create new API key in dashboard
4. Add to `.env`:
   ```bash
   SARVAM_API_KEY=your_api_key_here
   ```

---

## Switching Providers Later

### Simple switch in code:
```bash
# Change .env
AI_PROVIDER=anthropic  # or openai

# Restart backend
npm run start:dev
```

### Or via API:
```bash
curl -X POST http://localhost:3001/ai/switch-provider \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"provider": "anthropic"}'
```

---

## Summary

✅ **Current:** Sarvam AI provider ready
⏳ **Future:** Easily add Anthropic, OpenAI
🔌 **Pluggable:** Single interface, multiple implementations
🔄 **Switchable:** Change providers without code changes
