import { Module } from '@nestjs/common';
import { ResponsesService } from './services/responses.service';
import { ResponsesController } from './controllers/responses.controller';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [ResponsesService],
  controllers: [ResponsesController],
})
export class ResponsesModule {}
