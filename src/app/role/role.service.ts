import { inject, injectable } from 'inversify'
import { RoleCreateDto } from '../../domain/dto/role.dto'
import { ErrorMessage } from '../../domain/enums/errorMessage.enum'
import { Role } from '../../infrastructure/database/model/role.model'
import { IRoleRepository } from '../../infrastructure/database/repositories/roles/role.repository.interface'
import { REPOSITORIES } from '../../infrastructure/shared/containers/types'
import { NotFoundException } from '../../infrastructure/shared/errors/notFound.exception'
import { IRoleService } from './role.service.interface'

@injectable()
export class RoleService implements IRoleService {
  constructor(
    @inject(REPOSITORIES.rol)
    private readonly rolRepository: IRoleRepository,
  ) {}

  async deleteMany(): Promise<void> {
    await this.rolRepository.deleteMany()
  }

  async findOne(data: Partial<Role>): Promise<Role> {
    const role = await this.rolRepository.findOne(data)
    if (!role) throw new NotFoundException(ErrorMessage.INVALID_ROL)
    return role
  }

  async create(data: RoleCreateDto): Promise<Role> {
    return await this.rolRepository.create(data)
  }

  async findById(id: string): Promise<Role> {
    const role = await this.rolRepository.findById(id)
    if (!role) throw new NotFoundException(ErrorMessage.INVALID_ROL)
    return role
  }
}
