import { ModelType } from '@typegoose/typegoose/lib/types'
import { inject } from 'inversify'
import { MODELS } from '../../../shared/containers/types'
import { User } from '../../model/user.model'
import { MongooseCRUD } from '../common/mongoose.repository'
import { IUserRepository } from './user.repository.interface'

export class UserRepository
  extends MongooseCRUD<User>
  implements IUserRepository
{
  constructor(@inject(MODELS.user) userModel: ModelType<User>) {
    super({
      model: userModel,
      entity: 'usuario',
    })
  }

  async deleteMany(): Promise<void> {
    await this.Model.deleteMany({})
  }

  async findById(id: string): Promise<User> {
    const user = await this.Model.findById(id)
      .populate('role')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return user as unknown as User
  }

  async findAll(filter: Partial<User> = {}): Promise<User[]> {
    const user = await this.Model.find(filter)
      .populate('role')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return user as unknown as User[]
  }

  async find(filter: Partial<User>): Promise<User[]> {
    const user = await this.Model.find(filter)
      .populate('role')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return user as unknown as User[]
  }

  async findOne(filter: Partial<User>): Promise<User> {
    const user = await this.Model.findOne(filter)
      .populate('role')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return user as unknown as User
  }

  async create(payload: Partial<User>): Promise<User> {
    const newModel = new this.Model(payload)
    const user = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))

    const result = await user
      .populate('role')
      .catch((error) => this.validateError(error, 'create'))
    return result.toJSON() as unknown as User
  }
}
