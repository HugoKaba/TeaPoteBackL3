import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
} from '@nestjs/common';
import { IngredientsFinderService } from 'src/model/ingredients/ingredientsfinder.service';

@Injectable()
export class GetAllIngredientsService {
  constructor(
    private readonly ingredientsFinderService: IngredientsFinderService,
  ) {}

  async getAllIngredients(userId: number) {
    try {
      const ingredients =
        await this.ingredientsFinderService.findAllIngredients(userId);
      const adminIngredients =
        await this.ingredientsFinderService.findAllIngredients(1);
      if (!ingredients || ingredients.length === 0) {
        throw new NotFoundException('No ingredients found for this user');
      }

      const allIngredients = ingredients.concat(adminIngredients);

      return allIngredients;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'An error occurred while fetching teas',
        error,
      );
    }
  }
}
