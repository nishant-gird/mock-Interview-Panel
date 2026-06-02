import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Question } from '@prisma/client';
import { EmbeddingService } from './embedding.service';

interface ContextData {
  similarQuestions: Array<{
    id: string;
    content: string;
    expectedPoints: string[];
  }>;
  sampleAnswers: string[];
  historicalPatterns: {
    strengths: string[];
    weaknesses: string[];
    commonKeywords: string[];
  };
}

@Injectable()
export class RetrievalService {
  constructor(
    private prisma: PrismaService,
    private embeddingService: EmbeddingService,
  ) {}

  async findSimilarQuestions(
    question: string,
    role: string,
    limit: number = 3,
  ): Promise<Question[]> {
    const questionEmbedding = await this.embeddingService.generateEmbedding(
      question,
    );

    const allQuestionsForRole = await this.prisma.question.findMany({
      where: { role },
    });

    const questionsWithScores = allQuestionsForRole
      .filter((q) => q.embedding !== null && q.embedding !== undefined)
      .map((q) => ({
        ...q,
        similarity: this.cosineSimilarity(
          questionEmbedding,
          (q.embedding as any) as number[],
        ),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit);

    const similarQuestionIds = questionsWithScores.map((q) => q.id);

    return this.prisma.question.findMany({
      where: {
        id: { in: similarQuestionIds },
      },
    });
  }

  async getContextForEvaluation(
    question: Question,
    candidateAnswer: string,
  ): Promise<ContextData> {
    const similarQuestions = await this.findSimilarQuestions(
      question.content,
      question.role,
      3,
    );

    const expectedPointsArrays = similarQuestions.map((q) =>
      q.expectedPoints
        .split('\n')
        .filter((line) => line.trim())
        .map((line) => line.trim()),
    );

    const flatExpectedPoints = Array.from(
      new Set(expectedPointsArrays.flat()),
    );

    const sampleAnswersArrays = similarQuestions.map((q) =>
      q.sampleAnswers
        .split('\n')
        .filter((line) => line.trim())
        .slice(0, 2),
    );

    const flatSampleAnswers = Array.from(
      new Set(sampleAnswersArrays.flat()),
    ).slice(0, 3);

    const responses = await this.prisma.response.findMany({
      where: {
        question: {
          role: question.role,
        },
      },
      include: {
        context: true,
      },
      take: 10,
    });

    const allStrengths: string[] = [];
    const allWeaknesses: string[] = [];
    const allKeywords: string[] = [];

    responses.forEach((response) => {
      if (response.context) {
        allStrengths.push(...(response.context.strengths || []));
        allWeaknesses.push(...(response.context.weaknesses || []));
        allKeywords.push(...(response.context.keywords || []));
      }
    });

    const historicalPatterns = {
      strengths: Array.from(new Set(allStrengths)).slice(0, 5),
      weaknesses: Array.from(new Set(allWeaknesses)).slice(0, 5),
      commonKeywords: Array.from(new Set(allKeywords)).slice(0, 10),
    };

    return {
      similarQuestions: similarQuestions.map((q) => ({
        id: q.id,
        content: q.content,
        expectedPoints: q.expectedPoints
          .split('\n')
          .filter((line) => line.trim()),
      })),
      sampleAnswers: flatSampleAnswers,
      historicalPatterns,
    };
  }

  private cosineSimilarity(vecA: number[], vecB: number[]): number {
    if (vecA.length !== vecB.length) {
      throw new Error('Vectors must have the same length');
    }

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < vecA.length; i++) {
      dotProduct += vecA[i] * vecB[i];
      normA += vecA[i] * vecA[i];
      normB += vecB[i] * vecB[i];
    }

    normA = Math.sqrt(normA);
    normB = Math.sqrt(normB);

    if (normA === 0 || normB === 0) {
      return 0;
    }

    return dotProduct / (normA * normB);
  }
}
