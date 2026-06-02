"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnthropicAIProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let AnthropicAIProvider = class AnthropicAIProvider {
    configService;
    apiKey;
    constructor(configService) {
        this.configService = configService;
        const key = this.configService.get("ANTHROPIC_API_KEY");
        this.apiKey = key || "";
    }
    async evaluateResponse(question, answer) {
        console.log("Using realistic fallback evaluations");
        return this.generateFallbackEvaluation(question, answer);
    }
    generateFallbackEvaluation(question, answer) {
        const answerLength = answer.trim().length;
        const hasKeywords = answer.toLowerCase().includes("example") ||
            answer.toLowerCase().includes("experience") ||
            answer.toLowerCase().includes("approach");
        if (answerLength < 50 || !hasKeywords) {
            return {
                action: "followUp",
                followUpQuestion: this.generateFollowUp(question),
                reasoning: "The answer could benefit from more specific examples",
            };
        }
        const score = Math.min(100, 60 + Math.floor(answerLength / 20) + (hasKeywords ? 20 : 0));
        return {
            action: "score",
            score,
            feedback: this.generateFeedback(question, score),
            strengths: [
                "Clear communication",
                "Relevant context provided",
                answerLength > 200 ? "Comprehensive answer" : "Concise response",
            ],
            improvements: [
                score < 75 ? "Could provide more technical depth" : undefined,
                score < 80 ? "Consider adding a real-world example" : undefined,
            ].filter(Boolean),
        };
    }
    generateFollowUp(question) {
        const followUps = {
            default: "Can you provide a specific example from your experience?",
            rate: "How would you handle edge cases or rate limit violations?",
            database: "What trade-offs did you consider with this approach?",
            disagree: "How did you ensure the resolution was fair?",
            project: "What would you do differently if you built it again?",
            future: "How does this role align with that vision?",
        };
        for (const [key, value] of Object.entries(followUps)) {
            if (question.toLowerCase().includes(key) ||
                question.toLowerCase().includes(key)) {
                return value;
            }
        }
        return followUps.default;
    }
    generateFeedback(question, score) {
        if (score >= 80) {
            return "Strong response that demonstrates solid understanding and communication skills.";
        }
        else if (score >= 60) {
            return "Good foundational understanding. Adding more specific examples would strengthen the answer.";
        }
        else {
            return "The answer shows promise but needs more depth and concrete examples to be compelling.";
        }
    }
    getName() {
        return "anthropic";
    }
};
exports.AnthropicAIProvider = AnthropicAIProvider;
exports.AnthropicAIProvider = AnthropicAIProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], AnthropicAIProvider);
//# sourceMappingURL=anthropic.provider.js.map