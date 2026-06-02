import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AIService } from './ai.service';
import { AIController } from './ai.controller';
import { SarvamAIProvider } from './providers/sarvam.provider';
import { AnthropicAIProvider } from './providers/anthropic.provider';
import { OpenAIProvider } from './providers/openai.provider';
import { EmbeddingService } from './services/embedding.service';
import { RetrievalService } from './services/retrieval.service';
import { ContextExtractionService } from './services/context-extraction.service';
import { EmbeddingInitializationService } from './services/embedding-initialization.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [AIController],
  providers: [
    AIService,
    SarvamAIProvider,
    AnthropicAIProvider,
    OpenAIProvider,
    EmbeddingService,
    RetrievalService,
    ContextExtractionService,
    EmbeddingInitializationService,
  ],
  exports: [AIService, EmbeddingService, RetrievalService, ContextExtractionService],
})
export class AIModule {}
