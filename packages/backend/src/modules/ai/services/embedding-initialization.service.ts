import { Injectable, OnModuleInit } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';

@Injectable()
export class EmbeddingInitializationService implements OnModuleInit {
  constructor(private embeddingService: EmbeddingService) {}

  async onModuleInit() {
    console.log('🚀 Initializing embeddings on module load...');
    try {
      await this.embeddingService.generateQuestionEmbeddings();
      console.log('✅ Embeddings initialized successfully');
    } catch (error) {
      console.error('❌ Error initializing embeddings:', error);
    }
  }
}
