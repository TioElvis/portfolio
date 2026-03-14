import { IsNotEmpty, IsString } from 'class-validator';

export class GenerateProjectDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}
