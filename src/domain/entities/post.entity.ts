import { ThemesEntity } from './themes.entity'
import { UserEntity } from './user.entity'

export class PostEntity {
  id: string
  name: string
  image?: string
  video?: string
  text?: string
  theme: ThemesEntity | string
  user: UserEntity | string
  createdAt?: string
  updatedAt?: string
}
