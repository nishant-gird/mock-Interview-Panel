export interface AIResponse {
    action: 'followUp' | 'score';
    followUpQuestion?: string;
    reasoning?: string;
    score?: number;
    feedback?: string;
    strengths?: string[];
    improvements?: string[];
}
export interface AIProvider {
    evaluateResponse(question: string, answer: string): Promise<AIResponse>;
    getName(): string;
}
