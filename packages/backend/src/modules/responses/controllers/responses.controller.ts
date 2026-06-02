import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ResponsesService } from '../services/responses.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { SubmitResponseDto } from '../dtos/response.dto';

@Controller('responses')
@UseGuards(JwtAuthGuard)
export class ResponsesController {
  constructor(private responsesService: ResponsesService) {}

  @Post()
  async submitResponse(@Body() dto: SubmitResponseDto, @Request() req) {
    return this.responsesService.submitResponse(req.user.userId, dto);
  }

  @Get('interview/:interviewId')
  async getInterviewResponses(
    @Param('interviewId') interviewId: string,
    @Request() req,
  ) {
    return this.responsesService.getInterviewResponses(
      interviewId,
      req.user.userId,
    );
  }

  @Get(':id')
  async getResponse(@Param('id') id: string) {
    return this.responsesService.getResponse(id);
  }
}
