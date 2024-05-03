import { Expose } from 'class-transformer'
import {
  IsAlphanumeric,
  IsEmail,
  IsMongoId,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator'

export class UserCreateDto {
  @Expose()
  @IsAlphanumeric()
  @Length(1, 50)
  username: string

  @Expose()
  @IsEmail()
  @Length(1, 150)
  email: string

  @Expose()
  @IsMongoId()
  role: string

  @Expose()
  @IsOptional()
  @IsNumber()
  credits: number
}

export class UserUpdateDto {
  @Expose()
  @IsAlphanumeric()
  @IsOptional()
  @Length(1, 50)
  username?: string

  @Expose()
  @IsEmail()
  @IsOptional()
  @Length(1, 150)
  email?: string

  @Expose()
  @IsMongoId()
  @IsOptional()
  role?: string

  @Expose()
  @IsOptional()
  @IsNumber()
  credits?: number
}
