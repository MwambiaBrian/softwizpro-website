import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Payment, PaymentDocument } from './schema/payment.schema';
import { Model } from 'mongoose';

@Injectable()
export class MpesaService {
  constructor(
    @InjectModel(Payment.name) private paymentModel: Model<PaymentDocument>,
  ) {}

  async handleMpesaCallback(data: any) {
    const callback = data?.Body?.stkCallback;

    if (!callback) throw new Error('Invalid callback payload');

    const metadata = callback.CallbackMetadata?.Item || [];
    const getValue = (name: string) => {
      const item = metadata.find((m) => m.Name === name);
      return item ? item.Value : null;
    };

    const payment = new this.paymentModel({
      transactionType: 'STK_PUSH',
      amount: getValue('Amount'),
      mpesaReceiptNumber: getValue('MpesaReceiptNumber'),
      phoneNumber: getValue('PhoneNumber'),
      orderId: getValue('AccountReference'), // optionally passed in request
      status: callback.ResultCode === 0 ? 'success' : 'failed',
      firstName: getValue('FirstName'),
      lastName: getValue('LastName'),
      
      raw: data,
    });

    await payment.save();

    // Optionally update order status
    if (callback.ResultCode === 0) {
      // You may call OrderService.updateStatus(orderId, 'paid')
    }

    return { success: true };
  }

  async getPaymentByOrderId(orderId: string) {
    const payment = await this.paymentModel
      .findOne({ orderId })
      .sort({ createdAt: -1 });

    if (!payment) {
      throw new NotFoundException('Payment not found');
    }

    return payment;
  }
}
