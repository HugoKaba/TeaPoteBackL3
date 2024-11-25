import { IsInt, IsNotEmpty } from 'class-validator';

export class ShareCardDto {
  @IsNotEmpty()
  @IsInt()
  readonly friendId: number;

  @IsNotEmpty()
  @IsInt()
  readonly teaId: number;
}
