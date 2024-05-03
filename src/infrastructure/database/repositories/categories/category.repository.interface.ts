import { Category } from '../../model/category.model'

export interface ICategoryRepository {
  findAll: () => Promise<Category[]>
  findById: (id: string) => Promise<Category | null>
  create: (data: Partial<Category>) => Promise<Category>
  update: (id: string, data: Partial<Category>) => Promise<Category>
}
