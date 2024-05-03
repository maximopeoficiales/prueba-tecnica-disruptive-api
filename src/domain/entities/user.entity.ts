export class UserEntity {
  username: string
  email: string
  rol: string
  credits: number
}

export class UpdateUserEntity {
  username: string
  password: string
  email: string
}
