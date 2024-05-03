import { Expose } from 'class-transformer'
import {
  ArrayNotEmpty,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  Length,
  MaxLength,
} from 'class-validator'

export class ThemeCreateDto {
  @Expose()
  @IsNotEmpty()
  @Length(4, 50)
  name: string

  @Expose()
  @IsNotEmpty()
  @MaxLength(1000)
  @IsUrl()
  imageUrl: string

  @Expose()
  @IsArray()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  categories: string[]
}

export class ThemeUpdateDto extends ThemeCreateDto {
  @Expose()
  @IsOptional()
  @Length(4, 50)
  declare name: string

  @Expose()
  @IsOptional()
  @MaxLength(1000)
  @IsUrl()
  declare imageUrl: string

  @Expose()
  @IsArray()
  @IsOptional()
  @ArrayNotEmpty()
  @IsMongoId({ each: true })
  declare categories: string[]
}
