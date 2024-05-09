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
import { HttpResponse } from '../../shared/utils/httpResponse'
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
  async create(
    @Body() body: CategoryCreateDto,
  ): Promise<HttpResponse<Category>> {
    const data = await this.categoryService.create(body)
    return new HttpResponse(data)
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', CategoryUpdateDto),
  )
  @Put('{id}')
  async update(
    id: string,
    @Body() body: CategoryUpdateDto,
  ): Promise<HttpResponse<Category>> {
    const data = await this.categoryService.update(id, body)
    return new HttpResponse(data)
  }

  @Middlewares(auth())
  @Get()
  async findAll(): Promise<HttpResponse<Category[]>> {
    const data = await this.categoryService.findAll()
    return new HttpResponse(data)
  }

  @Middlewares(auth(groupPermissions.admin))
  @Get('{id}')
  async findOne(id: string): Promise<HttpResponse<Category>> {
    const data = await this.categoryService.findOne(id)
    return new HttpResponse(data)
  }
}
