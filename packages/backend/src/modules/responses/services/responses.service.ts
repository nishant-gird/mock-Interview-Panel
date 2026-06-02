import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SubmitResponseDto } from '../dtos/response.dto';

@Injectable()
export class ResponsesService {
  constructor(private prisma: PrismaService) {}

  async submitResponse(userId: string, dto: SubmitResponseDto) {
    // Verify interview exists and belongs to user
    const interview = await this.prisma.interview.findUnique({
      where: { id: dto.interviewId },
    });

    if (!interview || interview.userId !== userId) {
      throw new NotFoundException('Interview not found');
    }

    // Create response
    return this.prisma.response.create({
      data: {
        interviewId: dto.interviewId,
        questionId: dto.questionId,
        answerText: dto.answerText,
        aiScore: dto.aiScore,
        aiFeedback: dto.aiFeedback || '',
        strengths: dto.strengths || [],
        improvements: dto.improvements || [],
      },
    });
  }

  async getInterviewResponses(interviewId: string, userId: string) {
    const interview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview || interview.userId !== userId) {
      throw new NotFoundException('Interview not found');
    }

    return this.prisma.response.findMany({
      where: { interviewId },
      include: { question: true },
      orderBy: { submittedAt: 'asc' },
    });
  }

  async getResponse(id: string) {
    return this.prisma.response.findUnique({
      where: { id },
      include: { question: true, interview: true },
    });
  }
}
