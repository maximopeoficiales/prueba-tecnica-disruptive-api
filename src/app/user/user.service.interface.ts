import { UserCreateDto, UserUpdateDto } from '../../domain/dto/user.dto'
import { User } from '../../infrastructure/database/model/user.model'

export interface IUserService {
  create: (body: UserCreateDto) => Promise<User>
  update: (id: string, data: UserUpdateDto) => Promise<User>
  findAll: (data?: Partial<User>) => Promise<User[]>
  findOne: (filter: Partial<User>) => Promise<User>
  findById: (id: string) => Promise<User>
  deleteMany: () => Promise<void>
}
