import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { CurriculumService } from './curriculum.service';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('curriculum')
export class CurriculumController {
  constructor(private readonly curriculumService: CurriculumService) {}

  @Post('register')
  create(@Body() createCurriculumDto: CreateCurriculumDto) {
    return this.curriculumService.create(createCurriculumDto);
  }

  @Post('register/:id/upload')
  @UseInterceptors(FileInterceptor('file', { dest: './uploads' }))
  async uploadFile(
    @Param('id') id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return this.curriculumService.attachFile(Number(id), {
      filename: file.filename,
      filepath: `./uploads/${file.filename}`,
      mimetype: file.mimetype,
    });
  }

  @Get()
  findAll() {
    return this.curriculumService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.curriculumService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCurriculumDto: UpdateCurriculumDto,
  ) {
    return this.curriculumService.update(+id, updateCurriculumDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curriculumService.remove(+id);
  }
}
