import { Ref } from '@typegoose/typegoose'
import { Category } from '../../infrastructure/database/model/category.model'
import { CategoryEntity } from './category.entity'

export class ThemesEntity {
  id: string
  name: string
  image: string
  categories: CategoryEntity[] | string[] | Array<Ref<Category>>
  createdAt?: string
  updatedAt?: string
}
