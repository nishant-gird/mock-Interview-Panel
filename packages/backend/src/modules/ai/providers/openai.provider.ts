import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AIProvider, AIResponse } from '../interfaces/ai-provider.interface';

@Injectable()
export class OpenAIProvider implements AIProvider {
  private apiKey: string;

  constructor(private configService: ConfigService) {
    const key = this.configService.get<string>('OPENAI_API_KEY');
    this.apiKey = key || '';
  }

  async evaluateResponse(
    question: string,
    answer: string,
  ): Promise<AIResponse> {
    if (!this.apiKey) {
      throw new Error(
        'OpenAI provider not configured. Set OPENAI_API_KEY in .env',
      );
    }

    // TODO: Implement with OpenAI SDK
    throw new Error('OpenAI provider not yet implemented');
  }

  getName(): string {
    return 'openai';
  }
}
