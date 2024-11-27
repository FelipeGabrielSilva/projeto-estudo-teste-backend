import {
  BadRequestException,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('photo')
export class PhotoController {
  constructor(private readonly prisma: PrismaService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('photo', {
      dest: './uploads',
    }),
  )
  async uploadSingle(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('Arquivo não enviado ou formato inválido.');
    }

    const newPhoto = await this.prisma.photo.create({
      data: {
        filename: file.filename,
        filepath: `./uploads/${file.filename}`,
        mimetype: file.mimetype,
      },
    });

    return {
      message: 'Upload realizado com sucesso!',
      fileDetails: newPhoto, 
    };
  }

  @Get('list')
  async listFiles() {
    try {
      const files = await this.prisma.photo.findMany();
      return {
        msg: 'Lista de arquivos',
        files,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao listar os arquivos');
    }
  }

  @Get('download/:filename')
  downloadFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = `./uploads/${filename}`;
    return res.download(filePath, filename, (err) => {
      if (err) {
        throw new BadRequestException('Erro ao baixar o arquivo');
      }
    });
  }
}
