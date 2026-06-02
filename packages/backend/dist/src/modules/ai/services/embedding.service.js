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
exports.EmbeddingService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const prisma_service_1 = require("../../../prisma/prisma.service");
let EmbeddingService = class EmbeddingService {
    configService;
    prisma;
    embeddingCache = new Map();
    constructor(configService, prisma) {
        this.configService = configService;
        this.prisma = prisma;
    }
    async generateEmbedding(text) {
        if (this.embeddingCache.has(text)) {
            return this.embeddingCache.get(text);
        }
        const embedding = this.generateDeterministicEmbedding(text);
        this.embeddingCache.set(text, embedding);
        return embedding;
    }
    generateDeterministicEmbedding(text) {
        const hash = this.simpleHash(text);
        const embedding = [];
        for (let i = 0; i < 1536; i++) {
            const seed = ((hash * 73856093) ^ (i * 19349663)) >>> 0;
            const x = Math.sin(seed) * 10000;
            embedding.push(x - Math.floor(x));
        }
        let norm = 0;
        for (let i = 0; i < embedding.length; i++) {
            norm += embedding[i] * embedding[i];
        }
        norm = Math.sqrt(norm);
        for (let i = 0; i < embedding.length; i++) {
            embedding[i] /= norm;
        }
        return embedding;
    }
    simpleHash(text) {
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash = hash & hash;
        }
        return Math.abs(hash);
    }
    async generateQuestionEmbeddings() {
        console.log('Starting question embedding generation...');
        const allQuestions = await this.prisma.question.findMany();
        const questionsWithoutEmbeddings = allQuestions.filter((q) => q.embedding === null || q.embedding === undefined);
        console.log(`Found ${questionsWithoutEmbeddings.length} questions without embeddings`);
        for (const question of questionsWithoutEmbeddings) {
            try {
                const embedding = await this.generateEmbedding(question.content);
                await this.prisma.question.update({
                    where: { id: question.id },
                    data: {
                        embedding: embedding,
                        embeddingVersion: 1,
                    },
                });
                console.log(`✓ Embedded question: ${question.id}`);
            }
            catch (error) {
                console.error(`✗ Failed to embed question ${question.id}:`, error);
            }
        }
        console.log('✓ Question embedding generation complete');
    }
    clearCache() {
        this.embeddingCache.clear();
    }
};
exports.EmbeddingService = EmbeddingService;
exports.EmbeddingService = EmbeddingService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        prisma_service_1.PrismaService])
], EmbeddingService);
//# sourceMappingURL=embedding.service.js.map