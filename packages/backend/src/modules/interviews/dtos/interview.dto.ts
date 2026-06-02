import { IsString, IsArray, IsEnum } from 'class-validator';

export class CreateInterviewDto {
  @IsString()
  role: string;

  @IsEnum(['Beginner', 'Intermediate', 'Advanced'])
  difficulty: string;

  @IsArray()
  panelTypes: string[];
}

export class UpdateInterviewDto {
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
