import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { MomentController } from './moment.controller';
import { GetAllMomentService } from './service/getAllMoment.service';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [MomentController],
  providers: [GetAllMomentService],
})
export class MomentModule {}
