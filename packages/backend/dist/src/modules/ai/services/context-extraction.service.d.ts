import { PrismaService } from '../../../prisma/prisma.service';
export declare class ContextExtractionService {
    private prisma;
    constructor(prisma: PrismaService);
    extractAndSaveContext(responseId: string, feedback: string, answerText: string): Promise<void>;
    private extractStrengths;
    private extractWeaknesses;
    private extractKeywords;
    private extractConcepts;
}
