import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class SarvamAIProvider implements AIProvider {
  private apiKey: string;
  private baseUrl = 'https://api.sarvam.ai/';
  private model = 'Meta-Llama-3-8B-Instruct';

  constructor(private configService: ConfigService) {
    const key = this.configService.get<string>('SARVAM_API_KEY');
    this.apiKey = key || '';
    if (!this.apiKey) {
      console.warn('⚠️ SARVAM_API_KEY not configured - Sarvam provider will not work');
    }
  }

  async evaluateResponse(
    question: string,
    answer: string,
  ): Promise<AIResponse> {
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
    } catch (error) {
      console.error('❌ Sarvam AI evaluation error:', error);
      console.warn('⚠️ Falling back to mock response');
      return this.getFallbackResponse();
    }
  }

  private buildPrompt(question: string, answer: string): string {
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

  private parseResponse(content: string): AIResponse {
    try {
      // Extract JSON from response
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

      // Validate response structure
      if (!parsed.action || !['followUp', 'score'].includes(parsed.action)) {
        throw new Error('Invalid action in response');
      }

      console.log('✅ Response parsed successfully:', parsed.action);
      return parsed as AIResponse;
    } catch (error) {
      console.error('⚠️ Error parsing Sarvam response:', error);
      // Fallback: Generate a follow-up if parsing fails
      return {
        action: 'followUp',
        followUpQuestion: 'Can you provide more details or examples?',
        reasoning: 'Need more information to fully evaluate',
      };
    }
  }

  private getFallbackResponse(): AIResponse {
    return {
      action: 'followUp',
      followUpQuestion: 'Can you provide more details or examples to support your answer?',
      reasoning: 'Using fallback response - API currently unavailable',
    };
  }

  getName(): string {
    return 'sarvam';
  }
}
