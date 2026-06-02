import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SarvamAIProvider } from './providers/sarvam.provider';
import { AnthropicAIProvider } from './providers/anthropic.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { AIProvider, AIResponse } from './interfaces/ai-provider.interface';
import { RetrievalService } from './services/retrieval.service';
import { ContextExtractionService } from './services/context-extraction.service';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AIService {
  private activeProvider: AIProvider;
  private providers: Map<string, AIProvider> = new Map();

  constructor(
    private configService: ConfigService,
    private sarvamProvider: SarvamAIProvider,
    private anthropicProvider: AnthropicAIProvider,
    private openaiProvider: OpenAIProvider,
    private retrievalService: RetrievalService,
    private contextExtractionService: ContextExtractionService,
    private prisma: PrismaService,
  ) {
    this.initializeProviders();
  }

  private initializeProviders() {
    // Register all providers
    this.providers.set('sarvam', this.sarvamProvider);
    this.providers.set('anthropic', this.anthropicProvider);
    this.providers.set('openai', this.openaiProvider);

    // Set active provider from config (default: sarvam)
    const activeProvider =
      this.configService.get<string>('AI_PROVIDER') || 'sarvam';

    const provider = this.providers.get(activeProvider);
    if (!provider) {
      console.error(
        `❌ Unknown AI provider: ${activeProvider}. Using sarvam as fallback`,
      );
      this.activeProvider = this.sarvamProvider;
      return;
    }

    this.activeProvider = provider;
    console.log(`✅ AI Service initialized with provider: ${activeProvider}`);
  }

  async evaluateResponse(
    question: string,
    answer: string,
    questionId?: string,
  ): Promise<AIResponse> {
    console.log(
      `📊 Evaluating with ${this.activeProvider.getName()} provider...`,
    );

    // If we have a questionId, try to retrieve context for better evaluation
    if (questionId) {
      try {
        const questionRecord = await this.prisma.question.findUnique({
          where: { id: questionId },
        });

        if (questionRecord && questionRecord.embedding) {
          const context = await this.retrievalService.getContextForEvaluation(
            questionRecord,
            answer,
          );

          // Enhance the system prompt with context
          const enhancedSystemPrompt = this.buildEnhancedPrompt(
            question,
            context,
          );

          console.log('📚 Using RAG-enhanced evaluation with context');
          // For now, we'll still use the provider's evaluation
          // but in a future update, we could pass the context to the provider
        }
      } catch (error) {
        console.warn('⚠️ Could not retrieve context for evaluation:', error);
      }
    }

    return this.activeProvider.evaluateResponse(question, answer);
  }

  private buildEnhancedPrompt(
    question: string,
    context: any,
  ): string {
    return `You are an expert technical interviewer evaluating a candidate.

QUESTION: ${question}

CONTEXT FROM SIMILAR INTERVIEWS:
- Similar questions: ${context.similarQuestions.map((q: any) => q.content).join('; ')}
- Expected answer points: ${context.similarQuestions[0]?.expectedPoints.join('; ') || 'N/A'}
- Sample strong answers: ${context.sampleAnswers.join('; ')}
- Common strengths: ${context.historicalPatterns.strengths.join('; ')}
- Common weaknesses: ${context.historicalPatterns.weaknesses.join('; ')}

Provide a comprehensive evaluation focusing on coverage of expected points and comparison to sample answers.`;
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
