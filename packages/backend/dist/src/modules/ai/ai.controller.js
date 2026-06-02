"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIController = void 0;
const common_1 = require("@nestjs/common");
const ai_service_1 = require("./ai.service");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let AIController = class AIController {
    aiService;
    constructor(aiService) {
        this.aiService = aiService;
    }
    async evaluateResponse(dto, req) {
        if (!dto.question || !dto.answer) {
            return {
                error: 'Missing question or answer',
                status: 400,
            };
        }
        try {
            const result = await this.aiService.evaluateResponse(dto.question, dto.answer);
            return {
                ...result,
                provider: this.aiService.getActiveProvider(),
                userId: req.user.userId,
            };
        }
        catch (error) {
            console.error('❌ Evaluation error:', error);
            return {
                error: error.message,
                status: 500,
            };
        }
    }
    switchProvider(dto) {
        try {
            this.aiService.switchProvider(dto.provider);
            return {
                success: true,
                message: `Switched to ${dto.provider}`,
                activeProvider: this.aiService.getActiveProvider(),
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
    getProviders() {
        return {
            active: this.aiService.getActiveProvider(),
            available: this.aiService.getAvailableProviders(),
        };
    }
};
exports.AIController = AIController;
__decorate([
    (0, common_1.Post)('evaluate'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], AIController.prototype, "evaluateResponse", null);
__decorate([
    (0, common_1.Post)('switch-provider'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AIController.prototype, "switchProvider", null);
__decorate([
    (0, common_1.Post)('providers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AIController.prototype, "getProviders", null);
exports.AIController = AIController = __decorate([
    (0, common_1.Controller)('ai'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [ai_service_1.AIService])
], AIController);
//# sourceMappingURL=ai.controller.js.map