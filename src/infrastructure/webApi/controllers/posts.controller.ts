import { Request as Req } from 'express'
import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import {
  Body,
  Controller,
  Delete,
  Get,
  Middlewares,
  Post,
  Put,
  Request,
  Route,
} from 'tsoa'
import { IPostService } from '../../../app/post/post.service.interface'
import { UserOperationService } from '../../../app/userOperation.service'
import {
  PostCreateRequest,
  PostFindQueryRequest,
  PostUpdateDto,
} from '../../../domain/dto/post.dto'
import { CountPost } from '../../../domain/interfaces/countPost.interface'
import { Post as Posts } from '../../database/model/post.model'
import { groupPermissions } from '../../shared/constants/dictionary.constant'
import { SERVICES } from '../../shared/containers/types'
import { FieldsToUpdateException } from '../../shared/errors/fieldsToUpdate.exception'
import { AuthRequest } from '../../shared/interfaces/authRequest.interface'
import { HttpResponse } from '../../shared/utils/httpResponse'
import { auth } from '../middlewares/auth.middleware'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'

@fluentProvide(PostsController).done()
@Route('posts')
export class PostsController extends Controller {
  constructor(
    @inject(SERVICES.post)
    private readonly postService: IPostService,
    @inject(SERVICES.userOperation)
    private readonly userOperationService: UserOperationService,
  ) {
    super()
  }

  @Middlewares(
    auth(groupPermissions.creator),
    validateClassValidator('body', PostCreateRequest),
  )
  @Post()
  async create(
    @Request() req: AuthRequest,
    @Body() data: PostCreateRequest,
  ): Promise<HttpResponse<Posts>> {
    const result = await this.userOperationService.createPost(req.userId, data)
    return new HttpResponse(result)
  }

  @Middlewares(
    auth(groupPermissions.all),
    validateClassValidator('query', PostFindQueryRequest),
  )
  @Get()
  async findAll(@Request() req: Req): Promise<HttpResponse<Posts[]>> {
    const posts = await this.postService.findAll(
      req.query as unknown as PostFindQueryRequest,
    )
    return new HttpResponse(posts)
  }

  @Middlewares(validateClassValidator('query', PostFindQueryRequest))
  @Get('short')
  async findAllShort(@Request() req: Req): Promise<HttpResponse<Posts[]>> {
    const posts = await this.postService.findAllShort(
      req.query as unknown as PostFindQueryRequest,
    )
    return new HttpResponse(posts)
  }

  @Middlewares(auth(groupPermissions.all))
  @Get('{id}')
  async findOne(id: string): Promise<HttpResponse<Posts>> {
    const post = await this.postService.findOne(id)
    return new HttpResponse(post)
  }

  @Middlewares(
    auth(groupPermissions.creator),
    validateClassValidator('body', PostUpdateDto),
  )
  @Put('{id}')
  async update(
    id: string,
    @Body() body: PostUpdateDto,
  ): Promise<HttpResponse<Posts>> {
    const qtyFieldsUpdated = Object.values(body).filter(Boolean).length
    if (qtyFieldsUpdated === 0) throw new FieldsToUpdateException()
    const updatePost = await this.postService.update(id, body)
    return new HttpResponse(updatePost)
  }

  @Middlewares(auth(groupPermissions.admin))
  @Delete('{id}')
  async delete(id: string): Promise<HttpResponse<Posts>> {
    const postDeleted = await this.postService.delete(id)
    return new HttpResponse(postDeleted)
  }

  @Get('/resume/count')
  async resume(): Promise<HttpResponse<CountPost>> {
    const result = await this.postService.resume()
    return new HttpResponse(result)
  }
}
