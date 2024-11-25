import { IsInt, IsNotEmpty } from 'class-validator';

export class AcceptedSharedCardDto {
  @IsNotEmpty()
  @IsInt()
  readonly sharedCardId: number;
}
