import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma/prisma.service';
import { CurriculumModule } from './curriculum/curriculum.module';
import { PhotoModule } from './photo/photo.module';

@Module({
  imports: [UserModule, CurriculumModule, PhotoModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
