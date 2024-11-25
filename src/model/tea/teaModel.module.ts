import { Global, Module } from '@nestjs/common';
import { TeaFinderService } from './service/teafinder.service';
import { DeleteTeaService } from './service/deleteTea.service';
import { CreateTeaService } from './service/createTea.service';

@Global()
@Module({
  providers: [TeaFinderService, DeleteTeaService, CreateTeaService],
  exports: [TeaFinderService, DeleteTeaService, CreateTeaService],
})
export class TeaModelModule {}
