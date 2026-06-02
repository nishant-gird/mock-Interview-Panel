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
exports.UpdateInterviewDto = exports.CreateInterviewDto = void 0;
const class_validator_1 = require("class-validator");
class CreateInterviewDto {
    role;
    difficulty;
    panelTypes;
}
exports.CreateInterviewDto = CreateInterviewDto;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateInterviewDto.prototype, "role", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(['Beginner', 'Intermediate', 'Advanced']),
    __metadata("design:type", String)
], CreateInterviewDto.prototype, "difficulty", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    __metadata("design:type", Array)
], CreateInterviewDto.prototype, "panelTypes", void 0);
class UpdateInterviewDto {
    role;
    difficulty;
    panelTypes;
    status;
    totalScore;
    averageScore;
    startedAt;
    completedAt;
    durationSeconds;
}
exports.UpdateInterviewDto = UpdateInterviewDto;
//# sourceMappingURL=interview.dto.js.map