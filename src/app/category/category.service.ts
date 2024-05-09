import { inject, injectable } from 'inversify'
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from '../../domain/dto/category.dto'
import { ErrorMessage } from '../../domain/enums/errorMessage.enum'
import { Category } from '../../infrastructure/database/model/category.model'
import { ICategoryRepository } from '../../infrastructure/database/repositories/categories/category.repository.interface'
import { REPOSITORIES } from '../../infrastructure/shared/containers/types'
import { NotFoundException } from '../../infrastructure/shared/errors/notFound.exception'
import { ICategoryService } from './category.service.interface'

@injectable()
export class CategoryService implements ICategoryService {
  constructor(
    @inject(REPOSITORIES.category)
    private readonly categoryRepository: ICategoryRepository,
  ) {}

  async deleteMany(): Promise<void> {
    await this.categoryRepository.deleteMany()
  }

  async update(id: string, data: CategoryUpdateDto): Promise<Category> {
    const result = await this.categoryRepository.update(id, data)
    return result
  }

  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findById(id)
    if (!category) throw new NotFoundException(ErrorMessage.CATEGORY_NOT_FOUND)
    return category
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.findAll()
  }

  async create(data: CategoryCreateDto): Promise<Category> {
    const result = await this.categoryRepository.create(data)
    return result
  }
}
