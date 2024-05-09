import { RoleCreateDto } from '../../domain/dto/role.dto'
import { Role } from '../../infrastructure/database/model/role.model'

export interface IRoleService {
  create: (body: RoleCreateDto) => Promise<Role>
  findById: (id: string) => Promise<Role>
  findOne: (data: Partial<Role>) => Promise<Role>
  deleteMany: () => Promise<void>
}
