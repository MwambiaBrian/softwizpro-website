import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { MpesaService } from './mpesa.service';
import { C2BCallbackDto } from './dto/c2b-callback.dto';

@Controller('mpesa')
export class MpesaController {
  constructor(private readonly mpesaService: MpesaService) {}

  @Post('payment/callback')
  async receiveC2BCallback(@Body() body: any) {
    const callbackData: C2BCallbackDto = body;

    return await this.mpesaService.handleMpesaCallback(callbackData);
  }
  @Get('payment')
  async getPayment() {
    return this.mpesaService.getPayment();
  }
  @Delete('payment/:id')
  remove(@Param('id') id: string) {
    return this.mpesaService.remove(id);
  }
}
