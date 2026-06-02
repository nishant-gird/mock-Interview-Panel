import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { SessionsService } from '../services/sessions.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller('sessions')
@UseGuards(JwtAuthGuard)
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  async createSession(
    @Body()
    dto: {
      interviewId: string;
      totalScore: number;
      averageScore: number;
      durationSeconds: number;
    },
    @Request() req,
  ) {
    return this.sessionsService.createSession(
      req.user.userId,
      dto.interviewId,
      dto.totalScore,
      dto.averageScore,
      dto.durationSeconds,
    );
  }

  @Get()
  async getUserSessions(@Request() req) {
    return this.sessionsService.getUserSessions(req.user.userId);
  }

  @Get(':id')
  async getSession(@Param('id') id: string, @Request() req) {
    return this.sessionsService.getSession(id, req.user.userId);
  }
}
