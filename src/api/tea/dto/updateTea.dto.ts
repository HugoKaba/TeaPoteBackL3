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
  @IsString()
  @IsNotEmpty()
  readonly name: string;
}

export class HasIngredientDto {
  @IsOptional()
  @IsInt()
  readonly ingredientId?: number;

  @ValidateNested()
  @Type(() => IngredientDto)
  readonly Ingredient?: IngredientDto;
}

class TeaTypeDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly urlImage: string;
}

export class HasTypesDto {
  @IsOptional()
  @IsInt()
  readonly teaTypeId?: number;
  
  @ValidateNested()
  @Type(() => TeaTypeDto)
  readonly TeaType: TeaTypeDto;
}

export class ImageDto {
  @IsString()
  readonly urlImage: string;
}

class MomentDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly urlImage: string;
}

export class HasMomentDto {
  @IsOptional()
  @IsInt()
  readonly momentId?: number;

  @ValidateNested()
  @Type(() => MomentDto)
  readonly Moment: MomentDto;
}

export class UpdateTeaDto {
  @IsOptional()
  @IsString()
  readonly name?: string;

  @IsOptional()
  @IsBoolean()
  readonly isInTeabag?: boolean;

  @IsOptional()
  @IsInt()
  readonly tempMin?: number;

  @IsOptional()
  @IsInt()
  readonly tempMax?: number;

  @IsOptional()
  @IsInt()
  readonly timeMin?: number;

  @IsOptional()
  @IsInt()
  readonly timeMax?: number;

  @IsOptional()
  @IsBoolean()
  readonly isBio?: boolean;

  @IsOptional()
  @IsString()
  readonly tips?: string;

  @IsOptional()
  @IsInt()
  readonly countryId?: number;

  @IsOptional()
  @IsInt()
  readonly theine?: number;

  @IsOptional()
  @IsBoolean()
  readonly isFavorite?: boolean;

  @ValidateNested()
  @Type(() => HasMomentDto)
  readonly HasMoment?: HasMomentDto;

  @ValidateNested()
  @Type(() => ImageDto)
  readonly Image?: ImageDto;

  @ValidateNested()
  @Type(() => HasTypesDto)
  readonly HasTypes?: HasTypesDto;

  @ValidateNested()
  @Type(() => HasIngredientDto)
  readonly HasIngredients?: HasIngredientDto[];
}
