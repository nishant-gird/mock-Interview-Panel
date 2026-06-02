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
exports.ResponsesController = void 0;
const common_1 = require("@nestjs/common");
const responses_service_1 = require("../services/responses.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const response_dto_1 = require("../dtos/response.dto");
let ResponsesController = class ResponsesController {
    responsesService;
    constructor(responsesService) {
        this.responsesService = responsesService;
    }
    async submitResponse(dto, req) {
        return this.responsesService.submitResponse(req.user.userId, dto);
    }
    async getInterviewResponses(interviewId, req) {
        return this.responsesService.getInterviewResponses(interviewId, req.user.userId);
    }
    async getResponse(id) {
        return this.responsesService.getResponse(id);
    }
};
exports.ResponsesController = ResponsesController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [response_dto_1.SubmitResponseDto, Object]),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "submitResponse", null);
__decorate([
    (0, common_1.Get)('interview/:interviewId'),
    __param(0, (0, common_1.Param)('interviewId')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "getInterviewResponses", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ResponsesController.prototype, "getResponse", null);
exports.ResponsesController = ResponsesController = __decorate([
    (0, common_1.Controller)('responses'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [responses_service_1.ResponsesService])
], ResponsesController);
//# sourceMappingURL=responses.controller.js.map