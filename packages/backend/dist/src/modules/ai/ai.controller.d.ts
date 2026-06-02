import { AIService } from './ai.service';
export declare class AIController {
    private aiService;
    constructor(aiService: AIService);
    evaluateResponse(dto: {
        question: string;
        answer: string;
    }, req: any): Promise<{
        provider: string;
        userId: any;
        action: "followUp" | "score";
        followUpQuestion?: string;
        reasoning?: string;
        score?: number;
        feedback?: string;
        strengths?: string[];
        improvements?: string[];
        error?: undefined;
        status?: undefined;
    } | {
        error: any;
        status: number;
    }>;
    switchProvider(dto: {
        provider: string;
    }): {
        success: boolean;
        message: string;
        activeProvider: string;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
        activeProvider?: undefined;
    };
    getProviders(): {
        active: string;
        available: string[];
    };
}
