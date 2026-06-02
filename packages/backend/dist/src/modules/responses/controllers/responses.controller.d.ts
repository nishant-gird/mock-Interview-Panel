import { ResponsesService } from '../services/responses.service';
import { SubmitResponseDto } from '../dtos/response.dto';
export declare class ResponsesController {
    private responsesService;
    constructor(responsesService: ResponsesService);
    submitResponse(dto: SubmitResponseDto, req: any): Promise<any>;
    getInterviewResponses(interviewId: string, req: any): Promise<any>;
    getResponse(id: string): Promise<any>;
}
