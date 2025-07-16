import { IsArray, IsString } from 'class-validator';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  location: string;

  @IsString()
  employmentType: string;

  @IsString()
  description: string;

  @IsArray()
  @IsString({ each: true })
  responsibilities: string[];

  @IsArray()
  @IsString({ each: true })
  qualifications: string[];
}
