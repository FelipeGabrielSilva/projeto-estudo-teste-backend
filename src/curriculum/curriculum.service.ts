import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurriculumDto } from './dto/create-curriculum.dto';
import { UpdateCurriculumDto } from './dto/update-curriculum.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CurriculumService {
  constructor(private prisma: PrismaService) {}

  async create(createCurriculumDto: CreateCurriculumDto) {
    const { name, email, telephone, ...rest } = createCurriculumDto;
    let created: boolean = false;

    try {
      const curriculum = await this.prisma.curriculum.create({
        data: {
          name: name,
          email: email,
          telephone: telephone,
          ...rest,
        },
      });
      created = true;

      return {
        msg: 'Currículo foi criado com sucesso',
        curriculum,
      };
    } catch (error) {
      created = false;

      throw new BadRequestException(
        'Ocorreu um erro ao cadastrar o currículo.',
      );
    }
  }

  async attachFile(
    curriculumId: number,
    fileData: { filename: string; filepath: string; mimetype: string },
  ) {
    const curriculum = await this.prisma.curriculum.findUnique({
      where: { id: curriculumId },
    });

    if (!curriculum) {
      throw new BadRequestException('Curriculum not found');
    }

    const file = await this.prisma.curriculumFile.create({
      data: {
        ...fileData,
        curriculumId: curriculumId,
      },
    });

    await this.prisma.curriculum.update({
      where: { id: curriculumId },
      data: { fileId: file.id },
    });

    return file;
  }

  async findAll() {
    return `This action returns all curriculum`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} curriculum`;
  }

  async update(id: number, updateCurriculumDto: UpdateCurriculumDto) {
    return `This action updates a #${id} curriculum`;
  }

  async remove(id: number) {
    return `This action removes a #${id} curriculum`;
  }
}
