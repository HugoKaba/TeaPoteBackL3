import { IsInt, IsPositive } from 'class-validator';

export class CartItemDto {
  @IsInt()
  @IsPositive()
  productId: number;

  @IsInt()
  @IsPositive()
  quantity: number;
}
