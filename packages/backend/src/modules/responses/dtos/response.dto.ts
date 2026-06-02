import { IsString, IsNumber, IsArray, IsOptional } from 'class-validator';

export class SubmitResponseDto {
  @IsString()
  interviewId: string;

  @IsString()
  questionId: string;

  @IsString()
  answerText: string;

  @IsNumber()
  @IsOptional()
  aiScore?: number;

  @IsString()
  @IsOptional()
  aiFeedback?: string;

  @IsArray()
  @IsOptional()
  strengths?: string[];

  @IsArray()
  @IsOptional()
  improvements?: string[];
}
