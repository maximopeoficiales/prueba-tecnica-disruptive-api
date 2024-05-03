import { Role } from '../../model/role.model'

export interface IRoleRepository {
  findAll: () => Promise<Role[]>
  create: (role: Partial<Role>) => Promise<Role>
  findById: (id: string) => Promise<Role> | null
  findOne: (data: Partial<Role>) => Promise<Role> | null
}
