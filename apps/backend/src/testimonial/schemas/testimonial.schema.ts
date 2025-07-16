import { Schema } from 'mongoose';

export const TestimonialSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String }, // e.g., CEO, Developer
    message: { type: String, required: true },
    company: { type: String },
    photoUrl: { type: String }, // Optional URL to avatar
  },
  { timestamps: true },
);
import { Document } from 'mongoose';

export interface Testimonial extends Document {
  name: string;
  role?: string;
  message: string;
  company?: string;
  photoUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}
