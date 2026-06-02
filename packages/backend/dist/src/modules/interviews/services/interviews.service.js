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
exports.InterviewsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
let InterviewsService = class InterviewsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        return this.prisma.interview.create({
            data: {
                userId,
                role: dto.role,
                difficulty: dto.difficulty,
                panelTypes: dto.panelTypes,
                status: 'scheduled',
            },
        });
    }
    async findAll(userId) {
        return this.prisma.interview.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id, userId) {
        const interview = await this.prisma.interview.findUnique({
            where: { id },
            include: { responses: { include: { question: true } } },
        });
        if (!interview || interview.userId !== userId) {
            throw new common_1.NotFoundException('Interview not found');
        }
        return interview;
    }
    async update(id, userId, dto) {
        await this.findOne(id, userId);
        return this.prisma.interview.update({
            where: { id },
            data: dto,
        });
    }
    async delete(id, userId) {
        await this.findOne(id, userId);
        return this.prisma.interview.delete({
            where: { id },
        });
    }
    async start(id, userId) {
        const interview = await this.findOne(id, userId);
        return this.prisma.interview.update({
            where: { id },
            data: {
                status: 'in_progress',
                startedAt: new Date(),
            },
        });
    }
    async complete(id, userId) {
        const interview = await this.findOne(id, userId);
        return this.prisma.interview.update({
            where: { id },
            data: {
                status: 'completed',
                completedAt: new Date(),
            },
        });
    }
};
exports.InterviewsService = InterviewsService;
exports.InterviewsService = InterviewsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InterviewsService);
//# sourceMappingURL=interviews.service.js.map