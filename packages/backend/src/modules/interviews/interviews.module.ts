import { Module } from '@nestjs/common';
import { InterviewsService } from './services/interviews.service';
import { InterviewsController } from './controllers/interviews.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [InterviewsService],
  controllers: [InterviewsController],
})
export class InterviewsModule {}
