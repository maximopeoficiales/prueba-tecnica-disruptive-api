import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from '../../domain/dto/category.dto'
import { Category } from '../../infrastructure/database/model/category.model'

export interface ICategoryService {
  create: (body: CategoryCreateDto) => Promise<Category>
  update: (id: string, body: CategoryUpdateDto) => Promise<Category>
  findAll: () => Promise<Category[]>
  findOne: (id: string) => Promise<Category>
  deleteMany: () => Promise<void>
}
