import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class QuestionsService {
  constructor(private prisma: PrismaService) {}

  async findByRoleAndDifficulty(
    role: string,
    difficulty: string,
    limit = 10,
  ) {
    return this.prisma.question.findMany({
      where: {
        role,
        difficulty,
      },
      take: limit,
    });
  }

  async findOne(id: string) {
    return this.prisma.question.findUnique({
      where: { id },
    });
  }

  async findAll() {
    return this.prisma.question.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async getRandomQuestions(
    role: string,
    difficulty: string,
    count = 8,
  ) {
    const questions = await this.findByRoleAndDifficulty(
      role,
      difficulty,
      100,
    );

    // Shuffle and return count
    return questions
      .sort(() => Math.random() - 0.5)
      .slice(0, count);
  }
}
