import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCurriculumDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  telephone: string;

  @IsOptional()
  @IsString()
  objective?: string;

  @IsOptional()
  @IsString()
  pro_experience?: string;

  @IsOptional()
  @IsString()
  back_academic?: string;

  @IsOptional()
  @IsString()
  skills?: string;

  @IsOptional()
  @IsString()
  references?: string;
}
