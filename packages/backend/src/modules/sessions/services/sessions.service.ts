import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class SessionsService {
  constructor(private prisma: PrismaService) {}

  async createSession(
    userId: string,
    interviewId: string,
    totalScore: number,
    averageScore: number,
    durationSeconds: number,
  ) {
    // Verify interview exists
    const interview = await this.prisma.interview.findUnique({
      where: { id: interviewId },
    });

    if (!interview || interview.userId !== userId) {
      throw new NotFoundException('Interview not found');
    }

    return this.prisma.session.create({
      data: {
        userId,
        interviewId,
        durationSeconds,
        totalScore,
        averageScore,
        status: 'completed',
      },
    });
  }

  async getUserSessions(userId: string) {
    return this.prisma.session.findMany({
      where: { userId },
      include: { interview: true },
      orderBy: { completedAt: 'desc' },
    });
  }

  async getSession(id: string, userId: string) {
    const session = await this.prisma.session.findUnique({
      where: { id },
      include: { interview: { include: { responses: { include: { question: true } } } }, user: true },
    });

    if (!session || session.userId !== userId) {
      throw new NotFoundException('Session not found');
    }

    return session;
  }
}
