import { Global, Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { JwtModule } from '@nestjs/jwt';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { CreatePaymentService } from './service/createPayments.service';


@Global()
@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [PaymentsController],
  providers: [ CreatePaymentService],
})
export class PaymentsModule {}
