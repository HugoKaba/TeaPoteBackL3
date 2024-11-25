import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

class IngredientDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

class HasIngredientDto {
  @IsOptional()
  @IsInt()
  readonly ingredientId?: number;

  @ValidateNested()
  @IsOptional()
  @Type(() => IngredientDto)
  readonly Ingredient?: IngredientDto;
}

class TeaTypeDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly urlImage: string;
}

class HasTypesDto {
  @IsOptional()
  @IsInt()
  readonly teaTypeId?: number;

  @ValidateNested()
  @IsOptional()
  @Type(() => TeaTypeDto)
  readonly TeaType?: TeaTypeDto;
}

class ImageDto {
  @IsNotEmpty()
  @IsString()
  readonly urlImage: string;
}

class MomentDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  readonly urlImage: string;
}

class HasMomentDto {
  @IsOptional()
  @IsInt()
  readonly momentId?: number;

  @ValidateNested()
  @Type(() => MomentDto)
  @IsOptional()
  readonly Moment?: MomentDto;
}

export class CreateTeaDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsNotEmpty()
  @IsBoolean()
  readonly isInTeabag: boolean;

  @IsNotEmpty()
  @IsInt()
  readonly tempMin: number;

  @IsNotEmpty()
  @IsInt()
  readonly tempMax: number;

  @IsNotEmpty()
  @IsInt()
  readonly timeMin: number;

  @IsNotEmpty()
  @IsInt()
  readonly timeMax: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isBio: boolean;

  @IsNotEmpty()
  @IsString()
  readonly tips: string;

  @IsNotEmpty()
  @IsInt()
  readonly countryId: number;

  @IsNotEmpty()
  @IsInt()
  readonly theine: number;

  @IsNotEmpty()
  @IsBoolean()
  readonly isFavorite: boolean;

  @ValidateNested()
  @Type(() => HasMomentDto)
  readonly HasMoment: HasMomentDto;

  @ValidateNested()
  @Type(() => ImageDto)
  readonly Image: ImageDto;

  @ValidateNested()
  @Type(() => HasTypesDto)
  readonly HasTypes: HasTypesDto;

  @ValidateNested()
  @Type(() => HasIngredientDto)
  readonly HasIngredients: HasIngredientDto[];
}
