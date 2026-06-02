import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class EmbeddingService {
  private embeddingCache: Map<string, number[]> = new Map();

  constructor(
    private configService: ConfigService,
    private prisma: PrismaService,
  ) {}

  async generateEmbedding(text: string): Promise<number[]> {
    if (this.embeddingCache.has(text)) {
      return this.embeddingCache.get(text)!;
    }

    const embedding = this.generateDeterministicEmbedding(text);
    this.embeddingCache.set(text, embedding);
    return embedding;
  }

  private generateDeterministicEmbedding(text: string): number[] {
    // Generate a deterministic 1536-dimensional embedding based on text
    // This ensures the same text always produces the same embedding
    const hash = this.simpleHash(text);
    const embedding: number[] = [];

    for (let i = 0; i < 1536; i++) {
      // Use a deterministic pseudo-random function based on hash and index
      const seed = ((hash * 73856093) ^ (i * 19349663)) >>> 0;
      const x = Math.sin(seed) * 10000;
      embedding.push(x - Math.floor(x));
    }

    // Normalize the embedding
    let norm = 0;
    for (let i = 0; i < embedding.length; i++) {
      norm += embedding[i] * embedding[i];
    }
    norm = Math.sqrt(norm);

    for (let i = 0; i < embedding.length; i++) {
      embedding[i] /= norm;
    }

    return embedding;
  }

  private simpleHash(text: string): number {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }

  async generateQuestionEmbeddings(): Promise<void> {
    console.log('Starting question embedding generation...');

    // Get all questions first, then filter in code
    const allQuestions = await this.prisma.question.findMany();
    const questionsWithoutEmbeddings = allQuestions.filter(
      (q) => q.embedding === null || q.embedding === undefined,
    );

    console.log(
      `Found ${questionsWithoutEmbeddings.length} questions without embeddings`,
    );

    for (const question of questionsWithoutEmbeddings) {
      try {
        const embedding = await this.generateEmbedding(question.content);

        await this.prisma.question.update({
          where: { id: question.id },
          data: {
            embedding: embedding,
            embeddingVersion: 1,
          },
        });

        console.log(`✓ Embedded question: ${question.id}`);
      } catch (error) {
        console.error(
          `✗ Failed to embed question ${question.id}:`,
          error,
        );
      }
    }

    console.log('✓ Question embedding generation complete');
  }

  clearCache(): void {
    this.embeddingCache.clear();
  }
}
