import { ModelType } from '@typegoose/typegoose/lib/types'
import { inject } from 'inversify'
import { MODELS } from '../../../shared/containers/types'
import { Category } from '../../model/category.model'
import { MongooseCRUD } from '../common/mongoose.repository'
import { ICategoryRepository } from './category.repository.interface'

export class CategoryRepository
  extends MongooseCRUD<Category>
  implements ICategoryRepository
{
  constructor(@inject(MODELS.category) categoryModel: ModelType<Category>) {
    super({
      model: categoryModel,
      entity: 'categoría',
    })
  }

  async deleteMany(): Promise<void> {
    await this.Model.deleteMany({})
  }
}
