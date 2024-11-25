import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsNotEmpty()
  @IsInt()
  readonly teaId: number;

  @IsNotEmpty()
  @IsString()
  readonly text: string;
}
