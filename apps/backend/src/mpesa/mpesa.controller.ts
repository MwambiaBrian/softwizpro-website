import { Body, Controller, Post } from '@nestjs/common';
import { MpesaService } from './mpesa.service';
import { C2BCallbackDto } from './dto/c2b-callback.dto';

@Controller('mpesa')
export class MpesaController {
  constructor(private readonly mpesaService: MpesaService) {}

  @Post('c2b/callback')
  async receiveC2BCallback(@Body() body: any) {
    const callbackData: C2BCallbackDto = body;

    return await this.mpesaService.handleMpesaCallback(callbackData);
  }
}
