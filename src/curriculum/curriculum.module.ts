import { Module } from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CurriculumController } from './curriculum.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [CurriculumController],
  providers: [PrismaService, CurriculumService],
})
export class CurriculumModule {}
