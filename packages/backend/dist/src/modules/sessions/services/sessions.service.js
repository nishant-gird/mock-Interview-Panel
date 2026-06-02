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
exports.SessionsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let SessionsService = class SessionsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createSession(userId, interviewId, totalScore, averageScore, durationSeconds) {
        const interview = await this.prisma.interview.findUnique({
            where: { id: interviewId },
        });
        if (!interview || interview.userId !== userId) {
            throw new common_1.NotFoundException('Interview not found');
        }
        return this.prisma.session.create({
            data: {
                userId,
                interviewId,
                durationSeconds,
                totalScore,
                averageScore,
                status: 'completed',
            },
        });
    }
    async getUserSessions(userId) {
        return this.prisma.session.findMany({
            where: { userId },
            include: { interview: true },
            orderBy: { completedAt: 'desc' },
        });
    }
    async getSession(id, userId) {
        const session = await this.prisma.session.findUnique({
            where: { id },
            include: { interview: { include: { responses: { include: { question: true } } } }, user: true },
        });
        if (!session || session.userId !== userId) {
            throw new common_1.NotFoundException('Session not found');
        }
        return session;
    }
};
exports.SessionsService = SessionsService;
exports.SessionsService = SessionsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SessionsService);
//# sourceMappingURL=sessions.service.js.map