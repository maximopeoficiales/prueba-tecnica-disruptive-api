import { Expose } from 'class-transformer'
import {
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsUrl,
  MaxLength,
} from 'class-validator'

export class PostCreateRequest {
  @Expose()
  @IsNotEmpty()
  @MaxLength(150)
  name: string

  @Expose()
  @IsOptional()
  @MaxLength(250)
  @IsUrl()
  video?: string

  @Expose()
  @IsOptional()
  @MaxLength(3000)
  text?: string

  @Expose()
  @IsOptional()
  @MaxLength(1000)
  @IsUrl()
  image?: string

  @Expose()
  @IsMongoId()
  theme: string
}

export class PostCreateDto extends PostCreateRequest {
  user: string
}

export class PostUpdateDto extends PostCreateDto {
  @Expose()
  @IsOptional()
  @MaxLength(150)
  declare name: string

  @Expose()
  @IsOptional()
  @MaxLength(1000)
  @IsUrl()
  declare image?: string

  @Expose()
  @IsOptional()
  @MaxLength(250)
  @IsUrl()
  declare video?: string

  @Expose()
  @IsOptional()
  @MaxLength(3000)
  declare text?: string

  @Expose()
  @IsOptional()
  @IsMongoId()
  declare theme: string
}

export class PostFindQueryRequest {
  @Expose()
  @IsOptional()
  declare name: string
}
