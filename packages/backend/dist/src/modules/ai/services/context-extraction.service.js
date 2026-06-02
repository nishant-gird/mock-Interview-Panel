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
exports.ContextExtractionService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ContextExtractionService = class ContextExtractionService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async extractAndSaveContext(responseId, feedback, answerText) {
        const strengths = this.extractStrengths(feedback);
        const weaknesses = this.extractWeaknesses(feedback);
        const keywords = this.extractKeywords(answerText);
        const conceptsMatched = this.extractConcepts(feedback);
        await this.prisma.responseContext.upsert({
            where: { responseId },
            update: {
                strengths,
                weaknesses,
                keywords,
                conceptsMatched,
            },
            create: {
                responseId,
                strengths,
                weaknesses,
                keywords,
                conceptsMatched,
            },
        });
    }
    extractStrengths(feedback) {
        const strengthPatterns = [
            /strong\s+(?:point|response|understanding|communication)[\w\s]*/gi,
            /demonstrates?\s+(?:solid|good|excellent)\s+[\w\s]*/gi,
            /good\s+[\w\s]*/gi,
            /clear\s+[\w\s]*/gi,
            /comprehensive\s+[\w\s]*/gi,
            /well[\s\-]?(explained|thought|organized|structured)/gi,
        ];
        const strengths = [];
        for (const pattern of strengthPatterns) {
            const matches = feedback.match(pattern);
            if (matches) {
                strengths.push(...matches);
            }
        }
        return Array.from(new Set(strengths.map((s) => s.trim()))).slice(0, 5);
    }
    extractWeaknesses(feedback) {
        const weaknessPatterns = [
            /(?:could|should|need|lacks?)\s+(?:more|better|additional)\s+[\w\s]*/gi,
            /missing\s+[\w\s]*/gi,
            /incomplete\s+[\w\s]*/gi,
            /lack(?:s|ing)?\s+[\w\s]*/gi,
            /improve\s+[\w\s]*/gi,
            /insufficient\s+[\w\s]*/gi,
        ];
        const weaknesses = [];
        for (const pattern of weaknessPatterns) {
            const matches = feedback.match(pattern);
            if (matches) {
                weaknesses.push(...matches);
            }
        }
        return Array.from(new Set(weaknesses.map((w) => w.trim()))).slice(0, 5);
    }
    extractKeywords(answerText) {
        const commonKeywords = /\b(?:algorithm|database|api|cache|server|client|network|security|performance|scalability|optimization|design|pattern|architecture|microservice|containerization|kubernetes|docker|rest|graphql|sql|nosql|distributed|concurrent|async|promise|callback|event|stream|buffer|queue|stack|tree|graph|hash|index)\b/gi;
        const matches = answerText.match(commonKeywords);
        const keywords = matches
            ? Array.from(new Set(matches.map((m) => m.toLowerCase())))
            : [];
        return keywords.slice(0, 10);
    }
    extractConcepts(feedback) {
        const conceptPatterns = /(?:covers?|addresses?|mentions?|discusses?|explains?)\s+([a-z\s]+?)(?:\.|,|;|and|or)/gi;
        const concepts = [];
        let match;
        while ((match = conceptPatterns.exec(feedback)) !== null) {
            const concept = match[1].trim();
            if (concept && concept.length > 2) {
                concepts.push(concept);
            }
        }
        return Array.from(new Set(concepts)).slice(0, 5);
    }
};
exports.ContextExtractionService = ContextExtractionService;
exports.ContextExtractionService = ContextExtractionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ContextExtractionService);
//# sourceMappingURL=context-extraction.service.js.map