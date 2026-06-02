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
exports.RetrievalService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const embedding_service_1 = require("./embedding.service");
let RetrievalService = class RetrievalService {
    prisma;
    embeddingService;
    constructor(prisma, embeddingService) {
        this.prisma = prisma;
        this.embeddingService = embeddingService;
    }
    async findSimilarQuestions(question, role, limit = 3) {
        const questionEmbedding = await this.embeddingService.generateEmbedding(question);
        const allQuestionsForRole = await this.prisma.question.findMany({
            where: { role },
        });
        const questionsWithScores = allQuestionsForRole
            .filter((q) => q.embedding !== null && q.embedding !== undefined)
            .map((q) => ({
            ...q,
            similarity: this.cosineSimilarity(questionEmbedding, q.embedding),
        }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, limit);
        const similarQuestionIds = questionsWithScores.map((q) => q.id);
        return this.prisma.question.findMany({
            where: {
                id: { in: similarQuestionIds },
            },
        });
    }
    async getContextForEvaluation(question, candidateAnswer) {
        const similarQuestions = await this.findSimilarQuestions(question.content, question.role, 3);
        const expectedPointsArrays = similarQuestions.map((q) => q.expectedPoints
            .split('\n')
            .filter((line) => line.trim())
            .map((line) => line.trim()));
        const flatExpectedPoints = Array.from(new Set(expectedPointsArrays.flat()));
        const sampleAnswersArrays = similarQuestions.map((q) => q.sampleAnswers
            .split('\n')
            .filter((line) => line.trim())
            .slice(0, 2));
        const flatSampleAnswers = Array.from(new Set(sampleAnswersArrays.flat())).slice(0, 3);
        const responses = await this.prisma.response.findMany({
            where: {
                question: {
                    role: question.role,
                },
            },
            include: {
                context: true,
            },
            take: 10,
        });
        const allStrengths = [];
        const allWeaknesses = [];
        const allKeywords = [];
        responses.forEach((response) => {
            if (response.context) {
                allStrengths.push(...(response.context.strengths || []));
                allWeaknesses.push(...(response.context.weaknesses || []));
                allKeywords.push(...(response.context.keywords || []));
            }
        });
        const historicalPatterns = {
            strengths: Array.from(new Set(allStrengths)).slice(0, 5),
            weaknesses: Array.from(new Set(allWeaknesses)).slice(0, 5),
            commonKeywords: Array.from(new Set(allKeywords)).slice(0, 10),
        };
        return {
            similarQuestions: similarQuestions.map((q) => ({
                id: q.id,
                content: q.content,
                expectedPoints: q.expectedPoints
                    .split('\n')
                    .filter((line) => line.trim()),
            })),
            sampleAnswers: flatSampleAnswers,
            historicalPatterns,
        };
    }
    cosineSimilarity(vecA, vecB) {
        if (vecA.length !== vecB.length) {
            throw new Error('Vectors must have the same length');
        }
        let dotProduct = 0;
        let normA = 0;
        let normB = 0;
        for (let i = 0; i < vecA.length; i++) {
            dotProduct += vecA[i] * vecB[i];
            normA += vecA[i] * vecA[i];
            normB += vecB[i] * vecB[i];
        }
        normA = Math.sqrt(normA);
        normB = Math.sqrt(normB);
        if (normA === 0 || normB === 0) {
            return 0;
        }
        return dotProduct / (normA * normB);
    }
};
exports.RetrievalService = RetrievalService;
exports.RetrievalService = RetrievalService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        embedding_service_1.EmbeddingService])
], RetrievalService);
//# sourceMappingURL=retrieval.service.js.map