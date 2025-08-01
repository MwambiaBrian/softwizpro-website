import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ enum: ['admin', 'user'], default: 'user' })
  role: 'admin' | 'user';

  @Prop({ default: false })
  isActive: boolean;

  @Prop()
  activationToken?: string;

  @Prop()
  resetToken?: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);
