import { ConfigService } from '@nestjs/config';
import { AIProvider, AIResponse } from '../interfaces/ai-provider.interface';
export declare class SarvamAIProvider implements AIProvider {
    private configService;
    private apiKey;
    private baseUrl;
    private model;
    constructor(configService: ConfigService);
    evaluateResponse(question: string, answer: string): Promise<AIResponse>;
    private buildPrompt;
    private parseResponse;
    private getFallbackResponse;
    getName(): string;
}
