import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';

export class CreateSectionDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  title: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(100)
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message: 'Slug must be lowercase, alphanumeric, and can contain hyphens',
  })
  slug: string;

  @IsNotEmpty()
  @IsString()
  content: string; // Markdown content

  @IsNotEmpty()
  @IsNumber()
  order: number;

  /* [REF ATTRIBUTES] */

  @IsNotEmpty()
  @IsMongoId()
  projectId: Types.ObjectId;

  @IsOptional()
  @IsMongoId()
  parentId?: Types.ObjectId;
}
