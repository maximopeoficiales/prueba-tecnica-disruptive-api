import { Expose } from 'class-transformer'
import {
  IsAlphanumeric,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  Length,
} from 'class-validator'
import { NameRoles } from '../enums/users.enum'

export class AuthCreateDto {
  @Expose()
  @IsAlphanumeric()
  @Length(1, 50)
  @IsNotEmpty()
  username: string

  @Expose()
  @IsEmail()
  @Length(1, 150)
  @IsNotEmpty()
  email: string

  @Expose()
  @IsNotEmpty()
  @IsEnum([NameRoles.CREATOR, NameRoles.READER, NameRoles.ADMIN], {
    message: 'Invalid role',
  })
  role: string
}

export class AuthLoginDto {
  @Expose()
  @IsAlphanumeric()
  @IsNotEmpty()
  @Length(1, 50)
  username: string

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 150)
  email: string
}

export class RefreshTokenDto {
  @Expose()
  @IsNotEmpty()
  token: string
}
