import { IsEnum } from 'class-validator';

export enum TestimonialStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export class UpdateStatusDto {
  @IsEnum(TestimonialStatus)
  status: TestimonialStatus;
}
