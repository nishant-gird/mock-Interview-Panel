import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common';
import { AIService } from './ai.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@Controller('ai')
@UseGuards(JwtAuthGuard)
export class AIController {
  constructor(private aiService: AIService) {}

  @Post('evaluate')
  async evaluateResponse(
    @Body() dto: { question: string; answer: string },
    @Request() req,
  ) {
    if (!dto.question || !dto.answer) {
      return {
        error: 'Missing question or answer',
        status: 400,
      };
    }

    try {
      const result = await this.aiService.evaluateResponse(
        dto.question,
        dto.answer,
      );

      return {
        ...result,
        provider: this.aiService.getActiveProvider(),
        userId: req.user.userId,
      };
    } catch (error) {
      console.error('❌ Evaluation error:', error);
      return {
        error: error.message,
        status: 500,
      };
    }
  }

  @Post('switch-provider')
  switchProvider(@Body() dto: { provider: string }) {
    try {
      this.aiService.switchProvider(dto.provider);
      return {
        success: true,
        message: `Switched to ${dto.provider}`,
        activeProvider: this.aiService.getActiveProvider(),
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }

  @Post('providers')
  getProviders() {
    return {
      active: this.aiService.getActiveProvider(),
      available: this.aiService.getAvailableProviders(),
    };
  }
}
