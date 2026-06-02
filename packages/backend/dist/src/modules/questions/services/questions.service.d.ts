import { PrismaService } from '../../../prisma/prisma.service';
export declare class QuestionsService {
    private prisma;
    constructor(prisma: PrismaService);
    findByRoleAndDifficulty(role: string, difficulty: string, limit?: number): Promise<any>;
    findOne(id: string): Promise<any>;
    findAll(): Promise<any>;
    getRandomQuestions(role: string, difficulty: string, count?: number): Promise<any>;
}
