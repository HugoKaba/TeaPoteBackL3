import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Patch,
  ParseIntPipe,
  Delete,
  Query,
} from '@nestjs/common';
import { GetCurrentUserId, Public } from 'src/common/decorator';
import { CreateTeaDto } from './dto/createTea.dto';
import { CreateTeaService } from './service/createTea.service';
import { GetAllTeaService } from './service/getalltea.service';
import { CreateCommentDto } from './dto/createComment.dto';
import { CreateCommentService } from './service/createComment.service';
import { GetOneTeaService } from './service/getOneTea.service';
import { UpdateCommentDto } from './dto/updateComment.dto';
import { UpdateCommentService } from './service/updateComment.service';
import { DeletedTeaService } from './service/deleteTea.service';
import { DeletedCommentService } from './service/deleteComment.service';
import { UpdateTeaService } from './service/updateTea.service';
import { UpdateTeaDto } from './dto/updateTea.dto';
import { GetAdminTeaService } from './service/getTeaAdmin.service';
import { CopyAdminTeaService } from './service/copyAdminTea.service';
import { SearchTeaService } from './service/searchTea.service';
import { SearchTeaDto } from './dto/search.dto';

@Controller('tea')
export class TeaController {
  constructor(
    private readonly createTeaService: CreateTeaService,
    private readonly getAllTeaService: GetAllTeaService,
    private readonly getAdminTeaService: GetAdminTeaService,
    private readonly createCommentService: CreateCommentService,
    private readonly getOneTeaService: GetOneTeaService,
    private readonly updateCommentService: UpdateCommentService,
    private readonly deleteTeaService: DeletedTeaService,
    private readonly deleteCommentService: DeletedCommentService,
    private readonly updateTeaService: UpdateTeaService,
    private readonly copyAdminTeaService: CopyAdminTeaService,
    private readonly searchTeaService: SearchTeaService,
  ) {}

  @Post('create')
  createTea(
    @Body() createTeaDto: CreateTeaDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.createTeaService.createTea(createTeaDto, userId);
  }

  @Get('allTea')
  getAllTea(@GetCurrentUserId() userId: number) {
    return this.getAllTeaService.getAllTea(userId);
  }

  @Get('AdminTea')
  getAdminTea() {
    return this.getAdminTeaService.getAdminTea();
  }

  @Post('copiedAdminTea/:teaId')
  copyAdminTea(
    @Param('teaId', ParseIntPipe) teaId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.copyAdminTeaService.copyAdminTea(teaId, userId);
  }

  @Get(':teaId')
  getOneTea(
    @GetCurrentUserId() userId: number,
    @Param('teaId', ParseIntPipe) teaId: number,
  ) {
    return this.getOneTeaService.getOneTea(teaId, userId);
  }

  @Patch(':teaId')
  updateTea(
    @Param('teaId', ParseIntPipe) teaId: number,
    @Body() updateTeaDto: UpdateTeaDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.updateTeaService.updateTea(updateTeaDto, userId, teaId);
  }

  @Delete(':teaId')
  deleteTea(
    @Param('teaId', ParseIntPipe) teaId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.deleteTeaService.deleteTea(teaId, userId);
  }

  @Post('comment')
  createComment(
    @GetCurrentUserId() userId: number,
    @Body() createCommentDto: CreateCommentDto,
  ) {
    return this.createCommentService.createComment(userId, createCommentDto);
  }

  @Patch('comment/:commentId')
  updateComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @Body() updateCommentDto: UpdateCommentDto,
    @GetCurrentUserId() userId: number,
  ) {
    return this.updateCommentService.updateComment(
      commentId,
      updateCommentDto.text,
      userId,
    );
  }

  @Delete('comment/:commentId')
  deleteComment(
    @Param('commentId', ParseIntPipe) commentId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.deleteCommentService.deleteComment(commentId, userId);
  }

  @Get('search/tea')
  async searchTeaByName(
    @Query('name') name: string,
    @Query('type') type: string,
    @GetCurrentUserId() userId: number,
  ) {
    console.log(`Searching for teas with name containing: ${name}`);
    if (type) {
      console.log(`Filtering by type: ${type}`);
    }
    return this.searchTeaService.searchTeaByName(name, type, userId);
  }
}
