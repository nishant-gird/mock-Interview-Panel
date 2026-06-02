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
exports.SeedController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SeedController = class SeedController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async seedQuestions() {
        try {
            await this.prisma.question.deleteMany({});
            const questions = [
                {
                    role: 'Backend Engineer',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'Explain how you would design a REST API for a social media platform.',
                    expectedPoints: 'API design patterns, scalability, error handling, versioning',
                    sampleAnswers: 'Should mention endpoints, HTTP methods, status codes...',
                },
                {
                    role: 'Backend Engineer',
                    difficulty: 'Intermediate',
                    category: 'SystemDesign',
                    content: 'Design a system to handle 1 million concurrent users.',
                    expectedPoints: 'Caching, load balancing, database sharding, message queues',
                    sampleAnswers: 'Should mention horizontal scaling, CDN, database optimization...',
                },
                {
                    role: 'Backend Engineer',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'How would you optimize a database query that is running slowly?',
                    expectedPoints: 'Indexing, query analysis, caching strategies, data structure optimization',
                    sampleAnswers: 'Check execution plan, add indexes, denormalize if needed...',
                },
                {
                    role: 'Backend Engineer',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'What is eventual consistency and when would you use it?',
                    expectedPoints: 'Distributed systems, CAP theorem, trade-offs',
                    sampleAnswers: 'Should mention DynamoDB, Cassandra, conflict resolution...',
                },
                {
                    role: 'Backend Engineer',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'How would you implement rate limiting in your API?',
                    expectedPoints: 'Token bucket, sliding window, Redis, scalability, fairness',
                    sampleAnswers: 'Should discuss algorithms and implementation considerations...',
                },
                {
                    role: 'Data Scientist',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'How would you handle missing data in a dataset?',
                    expectedPoints: 'Understanding of imputation techniques, when to drop data, validation',
                    sampleAnswers: 'Should discuss various imputation methods and their trade-offs...',
                },
                {
                    role: 'Data Scientist',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'Explain the bias-variance tradeoff.',
                    expectedPoints: 'Underfitting, overfitting, regularization, model complexity',
                    sampleAnswers: 'Should explain with examples and mitigation strategies...',
                },
                {
                    role: 'Data Scientist',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'How would you evaluate a machine learning model\'s performance?',
                    expectedPoints: 'Metrics selection, validation strategy, cross-validation, class imbalance',
                    sampleAnswers: 'Should mention precision, recall, ROC-AUC, F1 score...',
                },
                {
                    role: 'Frontend Engineer',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'How would you optimize a React application that is rendering slowly?',
                    expectedPoints: 'Memoization, code splitting, lazy loading, virtual lists, profiling',
                    sampleAnswers: 'Should mention React DevTools, Chrome DevTools, optimization techniques...',
                },
                {
                    role: 'Frontend Engineer',
                    difficulty: 'Intermediate',
                    category: 'Technical',
                    content: 'Explain the difference between var, let, and const in JavaScript.',
                    expectedPoints: 'Scope, hoisting, temporal dead zone, best practices',
                    sampleAnswers: 'Should explain function vs block scope, hoisting behavior...',
                },
                {
                    role: 'Product Manager',
                    difficulty: 'Intermediate',
                    category: 'Behavioral',
                    content: 'How do you prioritize features in a product roadmap?',
                    expectedPoints: 'User research, business impact, technical feasibility, stakeholder management',
                    sampleAnswers: 'Should mention frameworks like RICE, user interviews...',
                },
            ];
            const created = await this.prisma.question.createMany({
                data: questions,
            });
            return {
                success: true,
                message: `Created ${created.count} questions`,
                count: created.count,
            };
        }
        catch (error) {
            return {
                success: false,
                error: error.message,
            };
        }
    }
};
exports.SeedController = SeedController;
__decorate([
    (0, common_1.Post)('questions'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SeedController.prototype, "seedQuestions", null);
exports.SeedController = SeedController = __decorate([
    (0, common_1.Controller)('seed'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SeedController);
//# sourceMappingURL=seed.controller.js.map