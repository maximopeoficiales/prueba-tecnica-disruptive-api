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
import { IUserService } from '../../../app/user/user.service.interface'
import {
  PostCreateRequest,
  PostFindQueryRequest,
  PostUpdateDto,
} from '../../../domain/dto/post.dto'
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
    @inject(SERVICES.user)
    private readonly userService: IUserService,
    @inject(SERVICES.post)
    private readonly postService: IPostService,
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
    await this.userService.update(req.userId, { credits: 1 })
    const newPost = await this.postService.create({ ...data, user: req.userId })
    return newPost
  }

  @Middlewares(
    auth(groupPermissions.all),
    validateClassValidator('query', PostFindQueryRequest),
  )
  @Get()
  async findAll(@Request() req: Req): Promise<Posts[]> {
    const themes = await this.postService.findAll(
      req.query as unknown as PostFindQueryRequest,
    )
    return themes
  }

  @Middlewares(validateClassValidator('query', PostFindQueryRequest))
  @Get('short')
  async findAllShort(@Request() req: Req): Promise<Posts[]> {
    const themes = await this.postService.findAllShort(
      req.query as unknown as PostFindQueryRequest,
    )
    return themes
  }

  @Middlewares(auth(groupPermissions.all))
  @Get('{id}')
  async findOne(id: string): Promise<Posts> {
    const theme = await this.postService.findOne(id)
    return theme
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
}
