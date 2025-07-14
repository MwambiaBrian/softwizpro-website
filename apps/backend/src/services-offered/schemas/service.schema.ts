// src/services/schemas/service.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ServiceDocument = Service & Document;

@Schema({ timestamps: true })
export class Service {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  shortDescription: string;

  @Prop()
  longDescription: string;

  @Prop([String])
  features: string[];

  @Prop()
  imageUrl: string;

  @Prop([{ question: String, answer: String }])
  faqs: { question: string; answer: string }[];
}

export const ServiceSchema = SchemaFactory.createForClass(Service);
