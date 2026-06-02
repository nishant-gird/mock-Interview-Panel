import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { EmbeddingService } from './embedding.service';
import { RetrievalService } from './retrieval.service';
import { ContextExtractionService } from './context-extraction.service';

describe('RAG Integration Tests', () => {
  let module: TestingModule;
  let prisma: PrismaService;
  let embeddingService: EmbeddingService;
  let retrievalService: RetrievalService;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          envFilePath: '.env',
        }),
      ],
      providers: [
        PrismaService,
        EmbeddingService,
        RetrievalService,
        ContextExtractionService,
      ],
    }).compile();

    prisma = module.get<PrismaService>(PrismaService);
    embeddingService = module.get<EmbeddingService>(EmbeddingService);
    retrievalService = module.get<RetrievalService>(RetrievalService);
  });

  afterAll(async () => {
    await module.close();
  });

  describe('✅ Embedding Generation', () => {
    it('should generate deterministic embeddings', async () => {
      const text = 'How would you design a REST API?';
      const embedding1 = await embeddingService.generateEmbedding(text);
      const embedding2 = await embeddingService.generateEmbedding(text);

      expect(embedding1).toEqual(embedding2);
      console.log('✓ Deterministic embeddings work');
    });

    it('should generate different embeddings for different texts', async () => {
      const embedding1 = await embeddingService.generateEmbedding('REST API');
      const embedding2 = await embeddingService.generateEmbedding('GraphQL API');

      expect(embedding1).not.toEqual(embedding2);
      console.log('✓ Different texts produce different embeddings');
    });

    it('should generate 1536-dimensional vectors', async () => {
      const embedding = await embeddingService.generateEmbedding('Test text');
      expect(embedding.length).toBe(1536);
      console.log('✓ Embeddings are 1536-dimensional');
    });

    it('should embed all questions in database', async () => {
      const allQuestions = await prisma.question.findMany();
      const questionsWithoutEmbeddings = allQuestions.filter(
        (q: any) => q.embedding === null || q.embedding === undefined,
      );

      console.log(`  Questions without embeddings before: ${questionsWithoutEmbeddings.length}`);

      await embeddingService.generateQuestionEmbeddings();

      const questionsAfter = await prisma.question.findMany();
      const questionsStillWithout = questionsAfter.filter(
        (q: any) => q.embedding === null || q.embedding === undefined,
      );

      console.log(`  Questions without embeddings after: ${questionsStillWithout.length}`);
      expect(questionsStillWithout.length).toBe(0);
      console.log('✓ All questions have embeddings');
    });
  });

  describe('✅ Semantic Similarity Search', () => {
    it('should find similar backend questions', async () => {
      const backendQuestions = await prisma.question.findMany({
        where: { role: 'Backend Engineer' },
      });

      if (backendQuestions.length < 2) {
        console.log('⚠ Skipping: not enough backend questions');
        return;
      }

      const query = backendQuestions[0].content;
      const similarQuestions = await retrievalService.findSimilarQuestions(
        query,
        'Backend Engineer',
        2,
      );

      console.log(`  Query: "${query.substring(0, 50)}..."`);
      console.log(`  Found ${similarQuestions.length} similar questions`);
      similarQuestions.forEach((q, i) => {
        console.log(`    ${i + 1}. ${q.content.substring(0, 60)}...`);
      });

      expect(similarQuestions.length).toBeGreaterThan(0);
      expect(similarQuestions[0].role).toBe('Backend Engineer');
      console.log('✓ Similarity search returns matching role');
    });

    it('should respect role filtering', async () => {
      const backendQuestions = await prisma.question.findMany({
        where: { role: 'Backend Engineer' },
      });

      if (backendQuestions.length === 0) {
        console.log('⚠ Skipping: no backend questions');
        return;
      }

      const query = backendQuestions[0].content;
      const results = await retrievalService.findSimilarQuestions(
        query,
        'Backend Engineer',
        3,
      );

      const allBackendRole = results.every((q) => q.role === 'Backend Engineer');
      expect(allBackendRole).toBe(true);
      console.log('✓ Role filtering works correctly');
    });
  });

  describe('✅ Context Retrieval', () => {
    it('should build context for evaluation', async () => {
      const question = await prisma.question.findFirst({
        where: { role: 'Backend Engineer' },
      });

      if (!question) {
        console.log('⚠ Skipping: no questions found');
        return;
      }

      const context = await retrievalService.getContextForEvaluation(
        question,
        'Test candidate answer about API design',
      );

      console.log('  Context Retrieved:');
      console.log(`    - Similar Questions: ${context.similarQuestions.length}`);
      console.log(`    - Sample Answers: ${context.sampleAnswers.length}`);
      console.log(
        `    - Historical Strengths: ${context.historicalPatterns.strengths.length}`,
      );
      console.log(
        `    - Historical Weaknesses: ${context.historicalPatterns.weaknesses.length}`,
      );

      expect(context.similarQuestions.length).toBeGreaterThan(0);
      expect(context.similarQuestions[0]).toHaveProperty('content');
      expect(context.similarQuestions[0]).toHaveProperty('expectedPoints');
      console.log('✓ Context structure is correct');
    });
  });

  describe('✅ Context Extraction', () => {
    it('should extract strengths from feedback', () => {
      const contextExtractionService = module.get<ContextExtractionService>(
        ContextExtractionService,
      );
      const feedback =
        'Strong response that demonstrates solid understanding and good communication skills.';
      const strengths = (contextExtractionService as any).extractStrengths(
        feedback,
      );

      console.log(`  Extracted strengths: ${strengths.slice(0, 3).join(', ')}`);
      expect(strengths.length).toBeGreaterThan(0);
      console.log('✓ Strength extraction works');
    });

    it('should extract weaknesses from feedback', () => {
      const contextExtractionService = module.get<ContextExtractionService>(
        ContextExtractionService,
      );
      const feedback =
        'Could provide more technical depth. Missing consideration of edge cases.';
      const weaknesses = (contextExtractionService as any).extractWeaknesses(
        feedback,
      );

      console.log(`  Extracted weaknesses: ${weaknesses.slice(0, 2).join(', ')}`);
      expect(weaknesses.length).toBeGreaterThan(0);
      console.log('✓ Weakness extraction works');
    });

    it('should extract keywords from answer', () => {
      const contextExtractionService = module.get<ContextExtractionService>(
        ContextExtractionService,
      );
      const answer =
        'We would use a REST API with caching strategies and database indexing for optimization. Consider using Redis for distributed caching.';
      const keywords = (contextExtractionService as any).extractKeywords(answer);

      console.log(`  Extracted keywords: ${keywords.slice(0, 5).join(', ')}`);
      expect(keywords.length).toBeGreaterThan(0);
      console.log('✓ Keyword extraction works');
    });
  });

  describe('✅ Performance Metrics', () => {
    it('should measure embedding generation time', async () => {
      const start = Date.now();
      await embeddingService.generateEmbedding('Performance test query');
      const duration = Date.now() - start;

      console.log(`  Embedding generation time: ${duration}ms`);
      expect(duration).toBeLessThan(100);
      console.log('✓ Embedding generation is fast (sub-100ms)');
    });

    it('should measure similarity search time', async () => {
      const question = await prisma.question.findFirst();
      if (!question) return;

      const start = Date.now();
      await retrievalService.findSimilarQuestions(
        question.content,
        question.role,
        3,
      );
      const duration = Date.now() - start;

      console.log(`  Similarity search time: ${duration}ms`);
      expect(duration).toBeLessThan(1000);
      console.log('✓ Similarity search is performant (<1s)');
    });

    it('should verify end-to-end RAG pipeline', async () => {
      console.log('\n  === Complete RAG Pipeline ===');

      const question = await prisma.question.findFirst({
        where: { role: 'Backend Engineer' },
      });

      if (!question) {
        console.log('  ⚠ Skipping: no questions found');
        return;
      }

      console.log(`  1️⃣ Selected Question: "${question.content.substring(0, 50)}..."`);

      const context = await retrievalService.getContextForEvaluation(
        question,
        'I would design a REST API with proper error handling.',
      );

      console.log(`  2️⃣ Retrieved Context:`);
      console.log(`     - ${context.similarQuestions.length} similar questions`);
      console.log(`     - ${context.sampleAnswers.length} sample answers`);
      console.log(
        `     - Expected coverage: ${context.similarQuestions[0]?.expectedPoints[0]?.substring(0, 40) || 'N/A'}...`,
      );

      const enhancedPrompt = `You are evaluating a candidate on: ${question.content.substring(0, 50)}...
      Context: ${context.similarQuestions[0]?.expectedPoints[0]?.substring(0, 40) || 'N/A'}...`;

      console.log(`  3️⃣ Enhanced Prompt Built (${enhancedPrompt.length} chars)`);
      console.log('  ✓ RAG Pipeline Complete\n');

      expect(context.similarQuestions.length).toBeGreaterThan(0);
    });
  });
});
