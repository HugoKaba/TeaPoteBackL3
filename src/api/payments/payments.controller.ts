import { Body, Controller, Post } from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorator';
import { CreatePaymentService } from './service/createPayments.service';
import { CreatePaymentDto } from './dto/createPayment.dto';

@Controller('payments')
export class PaymentsController {
  constructor(private readonly createPaymentService: CreatePaymentService) {}

  @Post('create')
  async createPaymentIntent(
    @Body() createPaymentDto: CreatePaymentDto,
    @GetCurrentUserId() userId: number,
  ) {
    return await this.createPaymentService.createPayment(
      userId,
      createPaymentDto,
    );
  }
}
