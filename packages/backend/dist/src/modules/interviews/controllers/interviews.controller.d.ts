import { InterviewsService } from '../services/interviews.service';
import { CreateInterviewDto, UpdateInterviewDto } from '../dtos/interview.dto';
export declare class InterviewsController {
    private interviewsService;
    constructor(interviewsService: InterviewsService);
    getRoles(): Promise<{
        roles: {
            id: string;
            name: string;
            description: string;
        }[];
    }>;
    getInterviewers(): Promise<{
        interviewers: {
            id: string;
            name: string;
            role: string;
            avatar: string;
        }[];
    }>;
    create(dto: CreateInterviewDto, req: any): Promise<any>;
    findAll(req: any): Promise<any>;
    findOne(id: string, req: any): Promise<any>;
    update(id: string, dto: UpdateInterviewDto, req: any): Promise<any>;
    delete(id: string, req: any): Promise<any>;
    start(id: string, req: any): Promise<any>;
    complete(id: string, req: any): Promise<any>;
}
