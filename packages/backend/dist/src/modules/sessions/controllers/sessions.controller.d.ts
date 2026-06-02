import { SessionsService } from '../services/sessions.service';
export declare class SessionsController {
    private sessionsService;
    constructor(sessionsService: SessionsService);
    createSession(dto: {
        interviewId: string;
        totalScore: number;
        averageScore: number;
        durationSeconds: number;
    }, req: any): Promise<any>;
    getUserSessions(req: any): Promise<any>;
    getSession(id: string, req: any): Promise<any>;
}
