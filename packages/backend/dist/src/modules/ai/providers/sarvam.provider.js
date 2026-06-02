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
exports.SarvamAIProvider = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let SarvamAIProvider = class SarvamAIProvider {
    configService;
    apiKey;
    baseUrl = 'https://api.sarvam.ai/';
    model = 'Meta-Llama-3-8B-Instruct';
    constructor(configService) {
        this.configService = configService;
        const key = this.configService.get('SARVAM_API_KEY');
        this.apiKey = key || '';
        if (!this.apiKey) {
            console.warn('⚠️ SARVAM_API_KEY not configured - Sarvam provider will not work');
        }
    }
    async evaluateResponse(question, answer) {
        if (!this.apiKey) {
            console.warn('⚠️ SARVAM_API_KEY not configured - using fallback response');
            return this.getFallbackResponse();
        }
        const prompt = this.buildPrompt(question, answer);
        try {
            console.log('📤 Sending request to Sarvam AI...');
            const response = await fetch(`${this.baseUrl}chat/completions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'api-subscription-key': this.apiKey,
                },
                body: JSON.stringify({
                    model: this.model,
                    messages: [
                        {
                            role: 'user',
                            content: prompt,
                        },
                    ],
                    temperature: 0.7,
                    top_p: 0.95,
                    max_tokens: 500,
                }),
            });
            if (!response.ok) {
                const error = await response.text();
                console.error('❌ Sarvam API error:', error);
                console.warn('⚠️ Falling back to mock response');
                return this.getFallbackResponse();
            }
            const data = await response.json();
            console.log('✅ Response received from Sarvam AI');
            const content = data.choices[0].message.content;
            return this.parseResponse(content);
        }
        catch (error) {
            console.error('❌ Sarvam AI evaluation error:', error);
            console.warn('⚠️ Falling back to mock response');
            return this.getFallbackResponse();
        }
    }
    buildPrompt(question, answer) {
        return `You are an expert technical interviewer. Evaluate this response:

Question: "${question}"
Candidate's Answer: "${answer}"

Analyze on:
1. Correctness & accuracy
2. Clarity of explanation
3. Depth of understanding
4. Communication skills
5. Problem-solving approach

Respond in this exact JSON format (choose ONE):

If answer needs more depth:
{
  "action": "followUp",
  "followUpQuestion": "Your follow-up question here",
  "reasoning": "Why this follow-up is important"
}

If answer is comprehensive:
{
  "action": "score",
  "score": 75,
  "feedback": "Overall feedback",
  "strengths": ["strength1", "strength2"],
  "improvements": ["improvement1", "improvement2"]
}

Return ONLY the JSON, no other text.`;
    }
    parseResponse(content) {
        try {
            const jsonMatch = content.match(/\{[\s\S]*\}/);
            if (!jsonMatch) {
                console.warn('⚠️ No JSON found in response, generating fallback');
                return {
                    action: 'followUp',
                    followUpQuestion: 'Can you provide more details or examples?',
                    reasoning: 'Need more information to fully evaluate',
                };
            }
            const parsed = JSON.parse(jsonMatch[0]);
            if (!parsed.action || !['followUp', 'score'].includes(parsed.action)) {
                throw new Error('Invalid action in response');
            }
            console.log('✅ Response parsed successfully:', parsed.action);
            return parsed;
        }
        catch (error) {
            console.error('⚠️ Error parsing Sarvam response:', error);
            return {
                action: 'followUp',
                followUpQuestion: 'Can you provide more details or examples?',
                reasoning: 'Need more information to fully evaluate',
            };
        }
    }
    getFallbackResponse() {
        return {
            action: 'followUp',
            followUpQuestion: 'Can you provide more details or examples to support your answer?',
            reasoning: 'Using fallback response - API currently unavailable',
        };
    }
    getName() {
        return 'sarvam';
    }
};
exports.SarvamAIProvider = SarvamAIProvider;
exports.SarvamAIProvider = SarvamAIProvider = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], SarvamAIProvider);
//# sourceMappingURL=sarvam.provider.js.map