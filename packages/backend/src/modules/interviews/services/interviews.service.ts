import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { CreateInterviewDto, UpdateInterviewDto } from '../dtos/interview.dto';

@Injectable()
export class InterviewsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateInterviewDto) {
    return this.prisma.interview.create({
      data: {
        userId,
        role: dto.role,
        difficulty: dto.difficulty,
        panelTypes: dto.panelTypes,
        status: 'scheduled',
      },
    });
  }

  async findAll(userId: string) {
    return this.prisma.interview.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string, userId: string) {
    const interview = await this.prisma.interview.findUnique({
      where: { id },
      include: { responses: { include: { question: true } } },
    });

    if (!interview || interview.userId !== userId) {
      throw new NotFoundException('Interview not found');
    }

    return interview;
  }

  async update(id: string, userId: string, dto: UpdateInterviewDto) {
    await this.findOne(id, userId);

    return this.prisma.interview.update({
      where: { id },
      data: dto,
    });
  }

  async delete(id: string, userId: string) {
    await this.findOne(id, userId);

    return this.prisma.interview.delete({
      where: { id },
    });
  }

  async start(id: string, userId: string) {
    const interview = await this.findOne(id, userId);

    return this.prisma.interview.update({
      where: { id },
      data: {
        status: 'in_progress',
        startedAt: new Date(),
      },
    });
  }

  async complete(id: string, userId: string) {
    const interview = await this.findOne(id, userId);

    return this.prisma.interview.update({
      where: { id },
      data: {
        status: 'completed',
        completedAt: new Date(),
      },
    });
  }
}
