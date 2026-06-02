import { ConfigService } from "@nestjs/config";
import { AIProvider, AIResponse } from "../interfaces/ai-provider.interface";
export declare class AnthropicAIProvider implements AIProvider {
    private configService;
    private apiKey;
    constructor(configService: ConfigService);
    evaluateResponse(question: string, answer: string): Promise<AIResponse>;
    private generateFallbackEvaluation;
    private generateFollowUp;
    private generateFeedback;
    getName(): string;
}
