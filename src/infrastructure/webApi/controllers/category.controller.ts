import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import { Body, Controller, Get, Middlewares, Post, Put, Route } from 'tsoa'
import { ICategoryService } from '../../../app/category/category.service.interface'
import {
  CategoryCreateDto,
  CategoryUpdateDto,
} from '../../../domain/dto/category.dto'
import { Category } from '../../database/model/category.model'
import { groupPermissions } from '../../shared/constants/dictionary.constant'
import { SERVICES } from '../../shared/containers/types'
import { auth } from '../middlewares/auth.middleware'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'

@fluentProvide(CategoryController).done()
@Route('category')
export class CategoryController extends Controller {
  constructor(
    @inject(SERVICES.category)
    private readonly categoryService: ICategoryService,
  ) {
    super()
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', CategoryCreateDto),
  )
  @Post()
  async create(@Body() body: CategoryCreateDto): Promise<Category> {
    return await this.categoryService.create(body)
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', CategoryUpdateDto),
  )
  @Put('{id}')
  async update(id: string, @Body() body: CategoryUpdateDto): Promise<Category> {
    return await this.categoryService.update(id, body)
  }

  @Middlewares(auth())
  @Get()
  async findAll(): Promise<Category[]> {
    const categories = await this.categoryService.findAll()
    return categories
  }

  @Middlewares(auth(groupPermissions.admin))
  @Get('{id}')
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryService.findOne(id)
    return category
  }
}
