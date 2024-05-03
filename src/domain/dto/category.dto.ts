import { Expose } from 'class-transformer'
import {
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator'

export class CategoryCreateDto {
  @Expose()
  @IsNotEmpty()
  @Length(4, 50)
  name: string

  @Expose()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsUrl()
  imageUrl: string
}

export class CategoryUpdateDto {
  @Expose()
  @Length(4, 50)
  @IsOptional()
  name?: string

  @Expose()
  @MaxLength(1000)
  @IsUrl()
  imageUrl: string
}
