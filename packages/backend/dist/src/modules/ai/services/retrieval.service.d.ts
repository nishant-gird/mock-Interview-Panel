import { PrismaService } from '../../../prisma/prisma.service';
import { Question } from '@prisma/client';
import { EmbeddingService } from './embedding.service';
interface ContextData {
    similarQuestions: Array<{
        id: string;
        content: string;
        expectedPoints: string[];
    }>;
    sampleAnswers: string[];
    historicalPatterns: {
        strengths: string[];
        weaknesses: string[];
        commonKeywords: string[];
    };
}
export declare class RetrievalService {
    private prisma;
    private embeddingService;
    constructor(prisma: PrismaService, embeddingService: EmbeddingService);
    findSimilarQuestions(question: string, role: string, limit?: number): Promise<Question[]>;
    getContextForEvaluation(question: Question, candidateAnswer: string): Promise<ContextData>;
    private cosineSimilarity;
}
export {};
