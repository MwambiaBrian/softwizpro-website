import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type JobApplicationDocument = JobApplication & Document;

@Schema({ timestamps: true })
export class JobApplication {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  resumePath: string;

  @Prop({ type: Types.ObjectId, ref: 'JobPosting' })
  jobId: Types.ObjectId;
}

export const JobApplicationSchema =
  SchemaFactory.createForClass(JobApplication);
