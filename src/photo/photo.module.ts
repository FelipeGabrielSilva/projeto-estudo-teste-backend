import { Module } from '@nestjs/common';
import { PhotoController } from './photo.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [PhotoController],
  providers: [PrismaService]
})
export class PhotoModule {}
