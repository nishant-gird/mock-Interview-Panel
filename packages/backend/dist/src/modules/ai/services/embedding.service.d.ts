import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
export declare class EmbeddingService {
    private configService;
    private prisma;
    private embeddingCache;
    constructor(configService: ConfigService, prisma: PrismaService);
    generateEmbedding(text: string): Promise<number[]>;
    private generateDeterministicEmbedding;
    private simpleHash;
    generateQuestionEmbeddings(): Promise<void>;
    clearCache(): void;
}
