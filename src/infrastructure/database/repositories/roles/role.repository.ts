import { ModelType } from '@typegoose/typegoose/lib/types'
import { inject } from 'inversify'
import { MODELS } from '../../../shared/containers/types'
import { Role } from '../../model/role.model'
import { MongooseCRUD } from '../common/mongoose.repository'
import { IRoleRepository } from './role.repository.interface'

export class RoleRepository
  extends MongooseCRUD<Role>
  implements IRoleRepository
{
  constructor(@inject(MODELS.rol) rolModel: ModelType<Role>) {
    super({
      model: rolModel,
      entity: 'rol',
    })
  }
}
