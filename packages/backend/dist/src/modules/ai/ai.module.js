"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const ai_service_1 = require("./ai.service");
const ai_controller_1 = require("./ai.controller");
const sarvam_provider_1 = require("./providers/sarvam.provider");
const anthropic_provider_1 = require("./providers/anthropic.provider");
const openai_provider_1 = require("./providers/openai.provider");
const embedding_service_1 = require("./services/embedding.service");
const retrieval_service_1 = require("./services/retrieval.service");
const context_extraction_service_1 = require("./services/context-extraction.service");
const embedding_initialization_service_1 = require("./services/embedding-initialization.service");
const prisma_module_1 = require("../../prisma/prisma.module");
let AIModule = class AIModule {
};
exports.AIModule = AIModule;
exports.AIModule = AIModule = __decorate([
    (0, common_1.Module)({
        imports: [config_1.ConfigModule, prisma_module_1.PrismaModule],
        controllers: [ai_controller_1.AIController],
        providers: [
            ai_service_1.AIService,
            sarvam_provider_1.SarvamAIProvider,
            anthropic_provider_1.AnthropicAIProvider,
            openai_provider_1.OpenAIProvider,
            embedding_service_1.EmbeddingService,
            retrieval_service_1.RetrievalService,
            context_extraction_service_1.ContextExtractionService,
            embedding_initialization_service_1.EmbeddingInitializationService,
        ],
        exports: [ai_service_1.AIService, embedding_service_1.EmbeddingService, retrieval_service_1.RetrievalService, context_extraction_service_1.ContextExtractionService],
    })
], AIModule);
//# sourceMappingURL=ai.module.js.map