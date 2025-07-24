// src/services/dto/create-service.dto.ts
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

class FaqDto {
  @IsString()
  @IsNotEmpty()
  question: string;

  @IsString()
  @IsNotEmpty()
  answer: string;
}

export class CreateServiceDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  shortDescription: string;

  @IsString()
  @IsOptional()
  longDescription?: string;

  @IsArray()
  @IsString({ each: true })
  features: string[];

  @ValidateNested({ each: true })
  @Type(() => FaqDto)
  faqs: FaqDto[];
  @IsArray()
  @IsString({ each: true })
  photos?: string[];
}
