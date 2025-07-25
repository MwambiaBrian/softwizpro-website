import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MpesaController } from './mpesa.controller';
import { MpesaService } from './mpesa.service';
import { ConfigModule } from '@nestjs/config';
import { Payment, PaymentSchema } from './schema/payment.schema';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // to access env variables
    MongooseModule.forFeature([{ name: Payment.name, schema: PaymentSchema }]),
  ],
  controllers: [MpesaController],
  providers: [MpesaService],
})
export class MpesaModule {}
