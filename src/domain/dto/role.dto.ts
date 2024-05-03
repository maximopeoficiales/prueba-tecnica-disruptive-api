import { Expose } from 'class-transformer'
import { IsNumber, Length } from 'class-validator'

export class RoleCreateDto {
  @Expose()
  @Length(4, 50)
  name: string

  @Expose()
  @IsNumber()
  role: number
}

export class RoleUpdateDto extends RoleCreateDto {}
