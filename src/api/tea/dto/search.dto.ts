import { IsString } from 'class-validator';

export class SearchTeaDto {
  @IsString()
  name: string;
}
