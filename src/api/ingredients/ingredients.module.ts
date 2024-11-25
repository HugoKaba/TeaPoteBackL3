import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { CustomJwtModelModule } from 'src/model/jwt/jwtModel.module';
import { IngredientsController } from './ingredients.controller';
import { GetAllIngredientsService } from './service/getAllIngredients.service';

@Module({
  imports: [JwtModule.register({}), CustomJwtModelModule],
  controllers: [IngredientsController],
  providers: [GetAllIngredientsService],
})
export class IngredientsModule {}
