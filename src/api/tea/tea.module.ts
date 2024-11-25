import { Module } from '@nestjs/common';
import { TeaController } from './tea.controller';
import { CreateTeaService } from './service/createTea.service';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { GetAllTeaService } from './service/getalltea.service';
import { CreateCommentService } from './service/createComment.service';
import { GetOneTeaService } from './service/getOneTea.service';
import { UpdateCommentService } from './service/updateComment.service';
import { DeletedTeaService } from './service/deleteTea.service';
import { DeletedCommentService } from './service/deleteComment.service';
import { UpdateTeaService } from './service/updateTea.service';
import { GetAdminTeaService } from './service/getTeaAdmin.service';
import { CopyAdminTeaService } from './service/copyAdminTea.service';
import { SearchTeaService } from './service/searchTea.service';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [TeaController],
  providers: [
    CreateTeaService,
    CreateCommentService,
    DeletedTeaService,
    DeletedCommentService,
    GetAllTeaService,
    GetAdminTeaService,
    GetOneTeaService,
    UpdateCommentService,
    UpdateTeaService,
    CopyAdminTeaService,
    SearchTeaService,
  ],
})
export class TeaModule {}
