import { User } from '../../model/user.model'

export interface IUserRepository {
  findAll: (filter: Partial<User>) => Promise<User[]>
  findById: (id: string) => Promise<User | null>
  findOne: (filter: Partial<User>) => Promise<User | null>
  create: (user: Partial<User>) => Promise<User>
  update: (id: string, user: Partial<User>) => Promise<User | null>
  deleteMany: () => Promise<void>
}
