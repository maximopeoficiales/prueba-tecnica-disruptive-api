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
  ): Promise<Posts> {
    return await this.userOperationService.createPost(req.userId, data)
  }

  @Middlewares(
    auth(groupPermissions.all),
    validateClassValidator('query', PostFindQueryRequest),
  )
  @Get()
  async findAll(@Request() req: Req): Promise<Posts[]> {
    const posts = await this.postService.findAll(
      req.query as unknown as PostFindQueryRequest,
    )
    return posts
  }

  @Middlewares(validateClassValidator('query', PostFindQueryRequest))
  @Get('short')
  async findAllShort(@Request() req: Req): Promise<Posts[]> {
    const posts = await this.postService.findAllShort(
      req.query as unknown as PostFindQueryRequest,
    )
    return posts
  }

  @Middlewares(auth(groupPermissions.all))
  @Get('{id}')
  async findOne(id: string): Promise<Posts> {
    const posts = await this.postService.findOne(id)
    return posts
  }

  @Middlewares(
    auth(groupPermissions.creator),
    validateClassValidator('body', PostUpdateDto),
  )
  @Put('{id}')
  async update(id: string, @Body() body: PostUpdateDto): Promise<Posts> {
    const qtyFieldsUpdated = Object.values(body).filter(Boolean).length
    if (qtyFieldsUpdated === 0) throw new FieldsToUpdateException()

    return await this.postService.update(id, body)
  }

  @Middlewares(auth(groupPermissions.admin))
  @Delete('{id}')
  async delete(id: string): Promise<Posts> {
    return await this.postService.delete(id)
  }

  @Middlewares(auth(groupPermissions.all))
  @Get('count/{themeId}')
  async countByTheme(themeId: string): Promise<CountPost> {
    const result = await this.postService.countByTheme(themeId)
    return result
  }
}
