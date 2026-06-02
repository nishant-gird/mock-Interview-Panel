import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { InterviewsService } from '../services/interviews.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { CreateInterviewDto, UpdateInterviewDto } from '../dtos/interview.dto';

@Controller('interviews')
@UseGuards(JwtAuthGuard)
export class InterviewsController {
  constructor(private interviewsService: InterviewsService) {}

  @Get('config/roles')
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

  @Get('config/interviewers')
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

  @Post()
  async create(@Body() dto: CreateInterviewDto, @Request() req) {
    return this.interviewsService.create(req.user.userId, dto);
  }

  @Get()
  async findAll(@Request() req) {
    return this.interviewsService.findAll(req.user.userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    return this.interviewsService.findOne(id, req.user.userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateInterviewDto,
    @Request() req,
  ) {
    return this.interviewsService.update(id, req.user.userId, dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    return this.interviewsService.delete(id, req.user.userId);
  }

  @Post(':id/start')
  async start(@Param('id') id: string, @Request() req) {
    return this.interviewsService.start(id, req.user.userId);
  }

  @Post(':id/complete')
  async complete(@Param('id') id: string, @Request() req) {
    return this.interviewsService.complete(id, req.user.userId);
  }
}
