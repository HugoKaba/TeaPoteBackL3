import { IsOptional, IsString, IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @Length(3, 65)
  name?: string;

  @IsOptional()
  @IsEmail()
  mail?: string;

  @IsOptional()
  @IsString()
  @Length(8, 65)
  password?: string;

  @IsOptional()
  @IsString()
  urlImage?: string;
}
