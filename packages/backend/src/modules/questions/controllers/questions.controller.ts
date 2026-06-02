import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { QuestionsService } from '../services/questions.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
  constructor(private questionsService: QuestionsService) {}

  @Get()
  async findByRoleAndDifficulty(
    @Query('role') role: string,
    @Query('difficulty') difficulty: string,
    @Query('limit') limit?: string,
  ) {
    return this.questionsService.findByRoleAndDifficulty(
      role,
      difficulty,
      limit ? parseInt(limit) : 10,
    );
  }

  @Get('random')
  async getRandomQuestions(
    @Query('role') role: string,
    @Query('difficulty') difficulty: string,
    @Query('count') count?: string,
  ) {
    return this.questionsService.getRandomQuestions(
      role,
      difficulty,
      count ? parseInt(count) : 8,
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.questionsService.findOne(id);
  }
}
