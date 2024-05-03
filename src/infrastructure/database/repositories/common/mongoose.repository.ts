import { ModelType } from '@typegoose/typegoose/lib/types'
import { injectable } from 'inversify'
import { MongoException } from './MongoException'

interface Params<T> {
  model: ModelType<T>
  entity: string
}

@injectable()
export class MongooseCRUD<T> extends MongoException {
  protected Model: ModelType<T>
  constructor({ model, entity }: Params<T>) {
    super({ entity })
    this.Model = model
  }

  async findAll(): Promise<T[]> {
    const result = await this.Model.find()
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result as unknown as T[]
  }

  async findOne(filter: Partial<T>): Promise<T> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = await this.Model.findOne(filter as any)
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result as unknown as T
  }

  async findById(id: string): Promise<T> {
    const result = await this.Model.findById(id)
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result as unknown as T
  }

  async create(payload: Partial<T>): Promise<T> {
    const newModel = new this.Model(payload)
    const result = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))
    return result.toJSON() as unknown as T
  }

  async update(id: string, payload: Partial<T>): Promise<T> {
    const result = await this.Model.findByIdAndUpdate(
      id,
      { $set: payload as unknown as Record<string, unknown> },
      { new: true },
    )
      .exec()
      .catch((error) => this.validateError(error, 'update'))
    return result?.toJSON() as unknown as T
  }

  async delete(id: string): Promise<T> {
    const result = await this.Model.findByIdAndDelete(id)
      .exec()
      .catch((error) => this.validateError(error, 'delete'))

    return result?.toJSON() as unknown as T
  }
}
