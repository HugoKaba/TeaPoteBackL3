import { IsNotEmpty, IsEmail, IsOptional, ValidateIf } from 'class-validator';

export class SigninDto {
  @ValidateIf((o) => o.mail)
  @IsEmail({}, { message: 'Invalid email' })
  readonly mail: string;

  @ValidateIf((o) => o.name)
  @IsNotEmpty({ message: 'Name is required' })
  readonly name: string;

  @IsNotEmpty({ message: 'Password is required' })
  readonly password: string;
}
