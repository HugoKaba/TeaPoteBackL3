import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';

export class UserCompletedDto {
  @IsNotEmpty()
  @IsString()
  @Matches(/^[a-zA-Z0-9_]*$/, {
    message: 'Le name ne doit contenir aucun caractère spécial.',
  })
  readonly name: string;

  @IsEmail()
  readonly mail: string;

  @IsNotEmpty()
  @IsString()
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  readonly urlImage: string;
}
