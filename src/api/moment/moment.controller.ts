import { Controller, Get } from '@nestjs/common';

import { GetAllMomentService } from './service/getAllMoment.service';
import { GetCurrentUserId } from 'src/common/decorator';

@Controller('Moment')
export class MomentController {
  constructor(private readonly getAllMomentService: GetAllMomentService) {}

  @Get('all')
  getAllIngredients(@GetCurrentUserId() userId: number) {
    return this.getAllMomentService.getAllIngredients(userId);
  }
}
