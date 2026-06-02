import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class ContextExtractionService {
  constructor(private prisma: PrismaService) {}

  async extractAndSaveContext(
    responseId: string,
    feedback: string,
    answerText: string,
  ): Promise<void> {
    const strengths = this.extractStrengths(feedback);
    const weaknesses = this.extractWeaknesses(feedback);
    const keywords = this.extractKeywords(answerText);
    const conceptsMatched = this.extractConcepts(feedback);

    await this.prisma.responseContext.upsert({
      where: { responseId },
      update: {
        strengths,
        weaknesses,
        keywords,
        conceptsMatched,
      },
      create: {
        responseId,
        strengths,
        weaknesses,
        keywords,
        conceptsMatched,
      },
    });
  }

  private extractStrengths(feedback: string): string[] {
    const strengthPatterns = [
      /strong\s+(?:point|response|understanding|communication)[\w\s]*/gi,
      /demonstrates?\s+(?:solid|good|excellent)\s+[\w\s]*/gi,
      /good\s+[\w\s]*/gi,
      /clear\s+[\w\s]*/gi,
      /comprehensive\s+[\w\s]*/gi,
      /well[\s\-]?(explained|thought|organized|structured)/gi,
    ];

    const strengths: string[] = [];

    for (const pattern of strengthPatterns) {
      const matches = feedback.match(pattern);
      if (matches) {
        strengths.push(...matches);
      }
    }

    return Array.from(new Set(strengths.map((s) => s.trim()))).slice(0, 5);
  }

  private extractWeaknesses(feedback: string): string[] {
    const weaknessPatterns = [
      /(?:could|should|need|lacks?)\s+(?:more|better|additional)\s+[\w\s]*/gi,
      /missing\s+[\w\s]*/gi,
      /incomplete\s+[\w\s]*/gi,
      /lack(?:s|ing)?\s+[\w\s]*/gi,
      /improve\s+[\w\s]*/gi,
      /insufficient\s+[\w\s]*/gi,
    ];

    const weaknesses: string[] = [];

    for (const pattern of weaknessPatterns) {
      const matches = feedback.match(pattern);
      if (matches) {
        weaknesses.push(...matches);
      }
    }

    return Array.from(new Set(weaknesses.map((w) => w.trim()))).slice(0, 5);
  }

  private extractKeywords(answerText: string): string[] {
    const commonKeywords =
      /\b(?:algorithm|database|api|cache|server|client|network|security|performance|scalability|optimization|design|pattern|architecture|microservice|containerization|kubernetes|docker|rest|graphql|sql|nosql|distributed|concurrent|async|promise|callback|event|stream|buffer|queue|stack|tree|graph|hash|index)\b/gi;

    const matches = answerText.match(commonKeywords);
    const keywords = matches
      ? Array.from(new Set(matches.map((m) => m.toLowerCase())))
      : [];

    return keywords.slice(0, 10);
  }

  private extractConcepts(feedback: string): string[] {
    const conceptPatterns =
      /(?:covers?|addresses?|mentions?|discusses?|explains?)\s+([a-z\s]+?)(?:\.|,|;|and|or)/gi;

    const concepts: string[] = [];
    let match;

    while ((match = conceptPatterns.exec(feedback)) !== null) {
      const concept = match[1].trim();
      if (concept && concept.length > 2) {
        concepts.push(concept);
      }
    }

    return Array.from(new Set(concepts)).slice(0, 5);
  }
}
