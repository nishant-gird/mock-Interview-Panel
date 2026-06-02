import { OnModuleInit } from '@nestjs/common';
import { EmbeddingService } from './embedding.service';
export declare class EmbeddingInitializationService implements OnModuleInit {
    private embeddingService;
    constructor(embeddingService: EmbeddingService);
    onModuleInit(): Promise<void>;
}
