import { ModelType } from '@typegoose/typegoose/lib/types'
import { inject } from 'inversify'
import { MODELS } from '../../../shared/containers/types'
import { Theme } from '../../model/theme.model'
import { MongooseCRUD } from '../common/mongoose.repository'
import { IThemeRepository } from './theme.repository.interface'

export class ThemeRepository
  extends MongooseCRUD<Theme>
  implements IThemeRepository
{
  constructor(@inject(MODELS.theme) themeModel: ModelType<Theme>) {
    super({
      model: themeModel,
      entity: 'temática',
    })
  }

  async findOne(filter: Partial<Theme>): Promise<Theme> {
    const result = await this.Model.findOne(filter)
      .populate('categories')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result as unknown as Theme
  }

  async findById(id: string): Promise<Theme> {
    const result = await this.Model.findById(id)
      .populate('categories')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result as unknown as Theme
  }

  async findAll(): Promise<Theme[]> {
    const result = await this.Model.find()
      .populate('categories')
      .exec()
      .catch((error) => this.validateError(error, 'find'))
    return result
  }

  async create(payload: Partial<Theme>): Promise<Theme> {
    const newModel = new this.Model(payload)
    const theme = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))

    const result = await theme
      .populate('categories')
      .catch((error) => this.validateError(error, 'create'))
    return result.toJSON() as unknown as Theme
  }

  async update(id: string, payload: Partial<Theme>): Promise<Theme> {
    const theme = await this.Model.findByIdAndUpdate(
      id,
      { $set: payload as unknown as Record<string, unknown> },
      { new: true },
    )
      .exec()
      .catch((error) => this.validateError(error, 'update'))

    const result = await theme
      ?.populate('categories')
      .catch((error) => this.validateError(error, 'create'))
    return result?.toJSON() as unknown as Theme
  }
}
