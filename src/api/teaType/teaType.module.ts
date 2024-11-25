import { Module } from '@nestjs/common';
import { TeaTypeController } from './teaType.controller';
import { GetTeaTypeService } from './service/getTeatype.service';

@Module({
  imports: [],
  controllers: [TeaTypeController],
  providers: [GetTeaTypeService],
})
export class TeaTypeModule {}
