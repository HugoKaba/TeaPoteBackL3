import { IsNotEmpty, IsEmail, IsInt, IsString } from 'class-validator';

export class ResetPasswordConfirmationDto {
  @IsEmail()
  readonly mail: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
  @IsNotEmpty()
  @IsInt()
  readonly code: string;
}
