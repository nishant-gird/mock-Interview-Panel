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
exports.InterviewsController = void 0;
const common_1 = require("@nestjs/common");
const interviews_service_1 = require("../services/interviews.service");
const jwt_auth_guard_1 = require("../../auth/guards/jwt-auth.guard");
const interview_dto_1 = require("../dtos/interview.dto");
let InterviewsController = class InterviewsController {
    interviewsService;
    constructor(interviewsService) {
        this.interviewsService = interviewsService;
    }
    async getRoles() {
        return {
            roles: [
                {
                    id: 'backend-engineer',
                    name: 'Backend Engineer',
                    description: 'Server-side development and system design',
                },
                {
                    id: 'frontend-engineer',
                    name: 'Frontend Engineer',
                    description: 'UI/UX and client-side development',
                },
                {
                    id: 'fullstack-engineer',
                    name: 'Fullstack Engineer',
                    description: 'Both frontend and backend development',
                },
                {
                    id: 'product-manager',
                    name: 'Product Manager',
                    description: 'Product strategy and management',
                },
                {
                    id: 'data-scientist',
                    name: 'Data Scientist',
                    description: 'Data analysis and machine learning',
                },
                {
                    id: 'devops-engineer',
                    name: 'DevOps Engineer',
                    description: 'Infrastructure and deployment',
                },
            ],
        };
    }
    async getInterviewers() {
        return {
            interviewers: [
                {
                    id: 'priya-rao',
                    name: 'Priya Rao',
                    role: 'HR Interviewer',
                    avatar: 'PR',
                },
                {
                    id: 'arjun-sharma',
                    name: 'Arjun Sharma',
                    role: 'Technical Lead',
                    avatar: 'AS',
                },
                {
                    id: 'rahul-kapoor',
                    name: 'Rahul Kapoor',
                    role: 'Engineering Manager',
                    avatar: 'RK',
                },
            ],
        };
    }
    async create(dto, req) {
        return this.interviewsService.create(req.user.userId, dto);
    }
    async findAll(req) {
        return this.interviewsService.findAll(req.user.userId);
    }
    async findOne(id, req) {
        return this.interviewsService.findOne(id, req.user.userId);
    }
    async update(id, dto, req) {
        return this.interviewsService.update(id, req.user.userId, dto);
    }
    async delete(id, req) {
        return this.interviewsService.delete(id, req.user.userId);
    }
    async start(id, req) {
        return this.interviewsService.start(id, req.user.userId);
    }
    async complete(id, req) {
        return this.interviewsService.complete(id, req.user.userId);
    }
};
exports.InterviewsController = InterviewsController;
__decorate([
    (0, common_1.Get)('config/roles'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "getRoles", null);
__decorate([
    (0, common_1.Get)('config/interviewers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "getInterviewers", null);
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [interview_dto_1.CreateInterviewDto, Object]),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, interview_dto_1.UpdateInterviewDto, Object]),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)(':id/start'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "start", null);
__decorate([
    (0, common_1.Post)(':id/complete'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InterviewsController.prototype, "complete", null);
exports.InterviewsController = InterviewsController = __decorate([
    (0, common_1.Controller)('interviews'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [interviews_service_1.InterviewsService])
], InterviewsController);
//# sourceMappingURL=interviews.controller.js.map