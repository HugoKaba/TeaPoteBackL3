import {
  Controller,
  Post,
  Body,
  ParseIntPipe,
  Delete,
  Param,
  Get,
} from '@nestjs/common';
import { GetCurrentUserId } from 'src/common/decorator';
import { AddFriendService } from './service/addFriend.service';
import { AccepteFriendService } from './service/accepteFriend.service';
import { BlockFriendService } from './service/blockFriend.service';
import { DeletedFriendService } from './service/deleteFriend.service';
import { ShareCardDto } from './dto/shareCard.dto';
import { ShareCardService } from './service/shareCard.service';
import { AcceptedShareCardService } from './service/accepteSharedCard.service';
import { AcceptedSharedCardDto } from './dto/accepteSharedCard.dto';
import { DeleteShareCardService } from './service/deleteShareCard.service';
import { GetMyFriendService } from './service/getMyFriend.service';
import { GetAllFriendService } from './service/getAllFriend.service';
import { GetSharedCardService } from './service/getSharedCard.service';

@Controller('friend')
export class FriendController {
  constructor(
    private readonly addFriendService: AddFriendService,
    private readonly accepteFriendService: AccepteFriendService,
    private readonly blockFriendService: BlockFriendService,
    private readonly deleteFriendService: DeletedFriendService,
    private readonly shareCardService: ShareCardService,
    private readonly accepteSharedCardService: AcceptedShareCardService,
    private readonly deleteSharedCardService: DeleteShareCardService,
    private readonly getMyFriendService: GetMyFriendService,
    private readonly getAllFriendService: GetAllFriendService,
    private readonly getSharedCardService: GetSharedCardService,
  ) {}

  @Post('add')
  addFriend(
    @Body('friendId', ParseIntPipe) friendId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.addFriendService.addFriend(userId, friendId);
  }

  @Post('acceptFriend')
  accepteFriend(
    @Body('friendId', ParseIntPipe) friendId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.accepteFriendService.accepteFriend(userId, friendId);
  }

  @Post('blockFriend')
  blockFriend(
    @Body('friendId', ParseIntPipe) friendId: number,
    @GetCurrentUserId() userId: number,
  ) {
    return this.blockFriendService.blockFriend(userId, friendId);
  }

  @Delete('delete/:friendId')
  deleteFriend(
    @GetCurrentUserId() userId: number,
    @Param('friendId', ParseIntPipe) friendId: number,
  ) {
    return this.deleteFriendService.deleteFriend(userId, friendId);
  }

  @Post('sharedCard')
  shareCard(
    @GetCurrentUserId() userId: number,
    @Body() shareCardDto: ShareCardDto,
  ) {
    return this.shareCardService.shareCard(userId, shareCardDto);
  }

  @Post('acceptedShareCard')
  acceptedShareCard(
    @GetCurrentUserId() userId: number,
    @Body() acceptedSharedCardDto: AcceptedSharedCardDto,
  ) {
    return this.accepteSharedCardService.acceptedShareCard(
      userId,
      acceptedSharedCardDto,
    );
  }

  @Delete('deleteSharedCard/:sharedCardId')
  deleteSharedCard(
    @GetCurrentUserId() userId: number,
    @Param('sharedCardId', ParseIntPipe) sharedCardId: number,
  ) {
    return this.deleteSharedCardService.deleteShareCard(userId, sharedCardId);
  }

  @Get('GetMyFriend')
  getMyFriend(@GetCurrentUserId() userId: number) {
    return this.getMyFriendService.getMyFriend(userId);
  }

  @Get('allUser')
  getAllUser(@GetCurrentUserId() userId: number) {
    return this.getAllFriendService.getAllFriend(userId);
  }

  @Get('getSharedCard')
  getSharedCard(@GetCurrentUserId() userId: number) {
    return this.getSharedCardService.getSharedCard(userId);
  }
}
