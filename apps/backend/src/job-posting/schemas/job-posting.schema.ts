import { Schema } from 'mongoose';

export const JobPostingSchema = new Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    employmentType: { type: String, required: true }, // e.g., Full-Time, Part-Time
    description: { type: String, required: true },
    responsibilities: { type: [String], required: true },
    qualifications: { type: [String], required: true },
  },
  { timestamps: true },
);
import { Document } from 'mongoose';

export interface JobPosting extends Document {
  title: string;
  location: string;
  employmentType: string;
  description: string;
  responsibilities: string[];
  qualifications: string[];
  createdAt: Date;
  updatedAt: Date;
}
