import { PrismaService } from '../../prisma/prisma.service';
export declare class SeedController {
    private prisma;
    constructor(prisma: PrismaService);
    seedQuestions(): Promise<{
        success: boolean;
        message: string;
        count: any;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
        count?: undefined;
    }>;
}
