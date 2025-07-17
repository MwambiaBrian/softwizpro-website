import { PartialType } from '@nestjs/mapped-types';
import { CreateServiceDto } from './Create-service.dto';

export class UpdateServiceDto extends PartialType(CreateServiceDto) {}
