import { QuestionsService } from '../services/questions.service';
export declare class QuestionsController {
    private questionsService;
    constructor(questionsService: QuestionsService);
    findByRoleAndDifficulty(role: string, difficulty: string, limit?: string): Promise<any>;
    getRandomQuestions(role: string, difficulty: string, count?: string): Promise<any>;
    findOne(id: string): Promise<any>;
}
