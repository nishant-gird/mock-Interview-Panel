import { Controller, Post } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Controller('seed')
export class SeedController {
  constructor(private prisma: PrismaService) {}

  @Post('questions')
  async seedQuestions() {
    try {
      // Clear existing questions
      await this.prisma.question.deleteMany({});

      const questions = [
        // Backend Engineer - Intermediate
        {
          role: 'Backend Engineer',
          difficulty: 'Intermediate',
          category: 'Technical',
          content:
            'Explain how you would design a REST API for a social media platform.',
          expectedPoints:
            'API design patterns, scalability, error handling, versioning',
          sampleAnswers:
            'Should mention endpoints, HTTP methods, status codes...',
        },
        {
          role: 'Backend Engineer',
          difficulty: 'Intermediate',
          category: 'SystemDesign',
          content: 'Design a system to handle 1 million concurrent users.',
          expectedPoints:
            'Caching, load balancing, database sharding, message queues',
          sampleAnswers:
            'Should mention horizontal scaling, CDN, database optimization...',
        },
        {
          role: 'Backend Engineer',
          difficulty: 'Intermediate',
          category: 'Technical',
          content:
            'How would you optimize a database query that is running slowly?',
          expectedPoints:
            'Indexing, query analysis, caching strategies, data structure optimization',
          sampleAnswers:
            'Check execution plan, add indexes, denormalize if needed...',
        },
        {
          role: 'Backend Engineer',
          difficulty: 'Intermediate',
          category: 'Technical',
          content: 'What is eventual consistency and when would you use it?',
          expectedPoints: 'Distributed systems, CAP theorem, trade-offs',
          sampleAnswers:
            'Should mention DynamoDB, Cassandra, conflict resolution...',
        },
        {
          role: 'Backend Engineer',
          difficulty: 'Intermediate',
          category: 'Technical',
          content: 'How would you implement rate limiting in your API?',
          expectedPoints:
            'Token bucket, sliding window, Redis, scalability, fairness',
          sampleAnswers:
            'Should discuss algorithms and implementation considerations...',
        },
        // Data Scientist - Intermediate
        {
          role: 'Data Scientist',
          difficulty: 'Intermediate',
          category: 'Technical',
          content: 'How would you handle missing data in a dataset?',
          expectedPoints:
            'Understanding of imputation techniques, when to drop data, validation',
          sampleAnswers:
            'Should discuss various imputation methods and their trade-offs...',
        },
        {
          role: 'Data Scientist',
          difficulty: 'Intermediate',
          category: 'Technical',
          content: 'Explain the bias-variance tradeoff.',
          expectedPoints:
            'Underfitting, overfitting, regularization, model complexity',
          sampleAnswers:
            'Should explain with examples and mitigation strategies...',
        },
        {
          role: 'Data Scientist',
          difficulty: 'Intermediate',
          category: 'Technical',
          content:
            'How would you evaluate a machine learning model\'s performance?',
          expectedPoints:
            'Metrics selection, validation strategy, cross-validation, class imbalance',
          sampleAnswers:
            'Should mention precision, recall, ROC-AUC, F1 score...',
        },
        // Frontend Engineer - Intermediate
        {
          role: 'Frontend Engineer',
          difficulty: 'Intermediate',
          category: 'Technical',
          content:
            'How would you optimize a React application that is rendering slowly?',
          expectedPoints:
            'Memoization, code splitting, lazy loading, virtual lists, profiling',
          sampleAnswers:
            'Should mention React DevTools, Chrome DevTools, optimization techniques...',
        },
        {
          role: 'Frontend Engineer',
          difficulty: 'Intermediate',
          category: 'Technical',
          content:
            'Explain the difference between var, let, and const in JavaScript.',
          expectedPoints:
            'Scope, hoisting, temporal dead zone, best practices',
          sampleAnswers:
            'Should explain function vs block scope, hoisting behavior...',
        },
        // Product Manager - Intermediate
        {
          role: 'Product Manager',
          difficulty: 'Intermediate',
          category: 'Behavioral',
          content: 'How do you prioritize features in a product roadmap?',
          expectedPoints:
            'User research, business impact, technical feasibility, stakeholder management',
          sampleAnswers:
            'Should mention frameworks like RICE, user interviews...',
        },
      ];

      const created = await this.prisma.question.createMany({
        data: questions,
      });

      return {
        success: true,
        message: `Created ${created.count} questions`,
        count: created.count,
      };
    } catch (error) {
      return {
        success: false,
        error: error.message,
      };
    }
  }
}
