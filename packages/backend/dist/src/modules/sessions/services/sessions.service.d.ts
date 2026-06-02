import { PrismaService } from '../../../prisma/prisma.service';
export declare class SessionsService {
    private prisma;
    constructor(prisma: PrismaService);
    createSession(userId: string, interviewId: string, totalScore: number, averageScore: number, durationSeconds: number): Promise<any>;
    getUserSessions(userId: string): Promise<any>;
    getSession(id: string, userId: string): Promise<any>;
}
