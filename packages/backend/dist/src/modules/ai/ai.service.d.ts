import { ConfigService } from '@nestjs/config';
import { SarvamAIProvider } from './providers/sarvam.provider';
import { AnthropicAIProvider } from './providers/anthropic.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { AIResponse } from './interfaces/ai-provider.interface';
import { RetrievalService } from './services/retrieval.service';
import { ContextExtractionService } from './services/context-extraction.service';
import { PrismaService } from '../../prisma/prisma.service';
export declare class AIService {
    private configService;
    private sarvamProvider;
    private anthropicProvider;
    private openaiProvider;
    private retrievalService;
    private contextExtractionService;
    private prisma;
    private activeProvider;
    private providers;
    constructor(configService: ConfigService, sarvamProvider: SarvamAIProvider, anthropicProvider: AnthropicAIProvider, openaiProvider: OpenAIProvider, retrievalService: RetrievalService, contextExtractionService: ContextExtractionService, prisma: PrismaService);
    private initializeProviders;
    evaluateResponse(question: string, answer: string, questionId?: string): Promise<AIResponse>;
    private buildEnhancedPrompt;
    switchProvider(providerName: string): void;
    getActiveProvider(): string;
    getAvailableProviders(): string[];
}
