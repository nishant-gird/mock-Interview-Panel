export declare class CreateInterviewDto {
    role: string;
    difficulty: string;
    panelTypes: string[];
}
export declare class UpdateInterviewDto {
    role?: string;
    difficulty?: string;
    panelTypes?: string[];
    status?: string;
    totalScore?: number;
    averageScore?: number;
    startedAt?: Date;
    completedAt?: Date;
    durationSeconds?: number;
}
