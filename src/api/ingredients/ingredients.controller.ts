import { Controller, Get } from '@nestjs/common';

import { GetAllIngredientsService } from './service/getAllIngredients.service';
import { GetCurrentUserId } from 'src/common/decorator';

@Controller('ingredients')
export class IngredientsController {
  constructor(private readonly getAllIngredientsService: GetAllIngredientsService) {}

  @Get('all')
  getAllIngredients(@GetCurrentUserId() userId: number){
    return this.getAllIngredientsService.getAllIngredients(userId);
  }
}
