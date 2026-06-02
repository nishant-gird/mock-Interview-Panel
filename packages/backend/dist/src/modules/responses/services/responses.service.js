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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResponsesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let ResponsesService = class ResponsesService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async submitResponse(userId, dto) {
        const interview = await this.prisma.interview.findUnique({
            where: { id: dto.interviewId },
        });
        if (!interview || interview.userId !== userId) {
            throw new common_1.NotFoundException('Interview not found');
        }
        return this.prisma.response.create({
            data: {
                interviewId: dto.interviewId,
                questionId: dto.questionId,
                answerText: dto.answerText,
                aiScore: dto.aiScore,
                aiFeedback: dto.aiFeedback || '',
                strengths: dto.strengths || [],
                improvements: dto.improvements || [],
            },
        });
    }
    async getInterviewResponses(interviewId, userId) {
        const interview = await this.prisma.interview.findUnique({
            where: { id: interviewId },
        });
        if (!interview || interview.userId !== userId) {
            throw new common_1.NotFoundException('Interview not found');
        }
        return this.prisma.response.findMany({
            where: { interviewId },
            include: { question: true },
            orderBy: { submittedAt: 'asc' },
        });
    }
    async getResponse(id) {
        return this.prisma.response.findUnique({
            where: { id },
            include: { question: true, interview: true },
        });
    }
};
exports.ResponsesService = ResponsesService;
exports.ResponsesService = ResponsesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ResponsesService);
//# sourceMappingURL=responses.service.js.map