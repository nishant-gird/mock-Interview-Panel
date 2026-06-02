import { PrismaService } from '../../../prisma/prisma.service';
import { CreateInterviewDto, UpdateInterviewDto } from '../dtos/interview.dto';
export declare class InterviewsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateInterviewDto): Promise<any>;
    findAll(userId: string): Promise<any>;
    findOne(id: string, userId: string): Promise<any>;
    update(id: string, userId: string, dto: UpdateInterviewDto): Promise<any>;
    delete(id: string, userId: string): Promise<any>;
    start(id: string, userId: string): Promise<any>;
    complete(id: string, userId: string): Promise<any>;
}
