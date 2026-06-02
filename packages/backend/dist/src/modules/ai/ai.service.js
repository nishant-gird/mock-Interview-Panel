"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const sarvam_provider_1 = require("./providers/sarvam.provider");
const anthropic_provider_1 = require("./providers/anthropic.provider");
const openai_provider_1 = require("./providers/openai.provider");
const retrieval_service_1 = require("./services/retrieval.service");
const context_extraction_service_1 = require("./services/context-extraction.service");
const prisma_service_1 = require("../../prisma/prisma.service");
let AIService = class AIService {
    configService;
    sarvamProvider;
    anthropicProvider;
    openaiProvider;
    retrievalService;
    contextExtractionService;
    prisma;
    activeProvider;
    providers = new Map();
    constructor(configService, sarvamProvider, anthropicProvider, openaiProvider, retrievalService, contextExtractionService, prisma) {
        this.configService = configService;
        this.sarvamProvider = sarvamProvider;
        this.anthropicProvider = anthropicProvider;
        this.openaiProvider = openaiProvider;
        this.retrievalService = retrievalService;
        this.contextExtractionService = contextExtractionService;
        this.prisma = prisma;
        this.initializeProviders();
    }
    initializeProviders() {
        this.providers.set('sarvam', this.sarvamProvider);
        this.providers.set('anthropic', this.anthropicProvider);
        this.providers.set('openai', this.openaiProvider);
        const activeProvider = this.configService.get('AI_PROVIDER') || 'sarvam';
        const provider = this.providers.get(activeProvider);
        if (!provider) {
            console.error(`❌ Unknown AI provider: ${activeProvider}. Using sarvam as fallback`);
            this.activeProvider = this.sarvamProvider;
            return;
        }
        this.activeProvider = provider;
        console.log(`✅ AI Service initialized with provider: ${activeProvider}`);
    }
    async evaluateResponse(question, answer, questionId) {
        console.log(`📊 Evaluating with ${this.activeProvider.getName()} provider...`);
        if (questionId) {
            try {
                const questionRecord = await this.prisma.question.findUnique({
                    where: { id: questionId },
                });
                if (questionRecord && questionRecord.embedding) {
                    const context = await this.retrievalService.getContextForEvaluation(questionRecord, answer);
                    const enhancedSystemPrompt = this.buildEnhancedPrompt(question, context);
                    console.log('📚 Using RAG-enhanced evaluation with context');
                }
            }
            catch (error) {
                console.warn('⚠️ Could not retrieve context for evaluation:', error);
            }
        }
        return this.activeProvider.evaluateResponse(question, answer);
    }
    buildEnhancedPrompt(question, context) {
        return `You are an expert technical interviewer evaluating a candidate.

QUESTION: ${question}

CONTEXT FROM SIMILAR INTERVIEWS:
- Similar questions: ${context.similarQuestions.map((q) => q.content).join('; ')}
- Expected answer points: ${context.similarQuestions[0]?.expectedPoints.join('; ') || 'N/A'}
- Sample strong answers: ${context.sampleAnswers.join('; ')}
- Common strengths: ${context.historicalPatterns.strengths.join('; ')}
- Common weaknesses: ${context.historicalPatterns.weaknesses.join('; ')}

Provide a comprehensive evaluation focusing on coverage of expected points and comparison to sample answers.`;
    }
    switchProvider(providerName) {
        const provider = this.providers.get(providerName);
        if (!provider) {
            throw new Error(`Unknown AI provider: ${providerName}`);
        }
        this.activeProvider = provider;
        console.log(`🔄 Switched to AI provider: ${providerName}`);
    }
    getActiveProvider() {
        return this.activeProvider.getName();
    }
    getAvailableProviders() {
        return Array.from(this.providers.keys());
    }
};
exports.AIService = AIService;
exports.AIService = AIService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        sarvam_provider_1.SarvamAIProvider,
        anthropic_provider_1.AnthropicAIProvider,
        openai_provider_1.OpenAIProvider,
        retrieval_service_1.RetrievalService,
        context_extraction_service_1.ContextExtractionService,
        prisma_service_1.PrismaService])
], AIService);
//# sourceMappingURL=ai.service.js.map