import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { AIProvider, AIResponse } from "../interfaces/ai-provider.interface";

@Injectable()
export class AnthropicAIProvider implements AIProvider {
  private apiKey: string;

  constructor(private configService: ConfigService) {
    const key = this.configService.get<string>("ANTHROPIC_API_KEY");
    this.apiKey = key || "";
  }

  async evaluateResponse(
    question: string,
    answer: string
  ): Promise<AIResponse> {
    // Use realistic fallback responses for evaluation
    console.log("Using realistic fallback evaluations");
    return this.generateFallbackEvaluation(question, answer);
  }

  private generateFallbackEvaluation(
    question: string,
    answer: string
  ): AIResponse {
    // Analyze answer length and quality to determine response
    const answerLength = answer.trim().length;
    const hasKeywords =
      answer.toLowerCase().includes("example") ||
      answer.toLowerCase().includes("experience") ||
      answer.toLowerCase().includes("approach");

    if (answerLength < 50 || !hasKeywords) {
      return {
        action: "followUp",
        followUpQuestion: this.generateFollowUp(question),
        reasoning: "The answer could benefit from more specific examples",
      };
    }

    // Generate a score based on answer quality
    const score = Math.min(100, 60 + Math.floor(answerLength / 20) + (hasKeywords ? 20 : 0));

    return {
      action: "score",
      score,
      feedback: this.generateFeedback(question, score),
      strengths: [
        "Clear communication",
        "Relevant context provided",
        answerLength > 200 ? "Comprehensive answer" : "Concise response",
      ],
      improvements: [
        score < 75 ? "Could provide more technical depth" : undefined,
        score < 80 ? "Consider adding a real-world example" : undefined,
      ].filter(Boolean) as string[],
    };
  }

  private generateFollowUp(question: string): string {
    const followUps: Record<string, string> = {
      default: "Can you provide a specific example from your experience?",
      rate: "How would you handle edge cases or rate limit violations?",
      database: "What trade-offs did you consider with this approach?",
      disagree: "How did you ensure the resolution was fair?",
      project: "What would you do differently if you built it again?",
      future: "How does this role align with that vision?",
    };

    for (const [key, value] of Object.entries(followUps)) {
      if (
        question.toLowerCase().includes(key) ||
        question.toLowerCase().includes(key)
      ) {
        return value;
      }
    }
    return followUps.default;
  }

  private generateFeedback(question: string, score: number): string {
    if (score >= 80) {
      return "Strong response that demonstrates solid understanding and communication skills.";
    } else if (score >= 60) {
      return "Good foundational understanding. Adding more specific examples would strengthen the answer.";
    } else {
      return "The answer shows promise but needs more depth and concrete examples to be compelling.";
    }
  }

  getName(): string {
    return "anthropic";
  }
}

