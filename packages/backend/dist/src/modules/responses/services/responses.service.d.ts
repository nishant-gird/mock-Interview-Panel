import { PrismaService } from '../../../prisma/prisma.service';
import { SubmitResponseDto } from '../dtos/response.dto';
export declare class ResponsesService {
    private prisma;
    constructor(prisma: PrismaService);
    submitResponse(userId: string, dto: SubmitResponseDto): Promise<any>;
    getInterviewResponses(interviewId: string, userId: string): Promise<any>;
    getResponse(id: string): Promise<any>;
}
