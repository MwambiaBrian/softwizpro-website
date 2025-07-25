import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentDocument = Payment & Document;

@Schema({ timestamps: true })
export class Payment {
  @Prop({ required: true })
  transactionType: string;

  @Prop({ required: true })
  amount: number;

  @Prop()
  mpesaReceiptNumber: string;

  @Prop()
  phoneNumber: string;

  @Prop()
  orderId: string;

  @Prop({ default: 'pending' }) // success, failed, refunded
  status: string;

  @Prop()
  raw: Record<string, any>;
}

export const PaymentSchema = SchemaFactory.createForClass(Payment);
