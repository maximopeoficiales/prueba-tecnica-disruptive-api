import { isNotEmpty } from 'class-validator'
import { inject, injectable } from 'inversify'
import { PostCreateRequest } from '../domain/dto/post.dto'
import { ErrorMessage } from '../domain/enums/errorMessage.enum'
import { Category } from '../infrastructure/database/model/category.model'
import { Post } from '../infrastructure/database/model/post.model'
import { SERVICES } from '../infrastructure/shared/containers/types'
import { BadRequestException } from '../infrastructure/shared/errors/badRequest.exception'
import { IPostService } from './post/post.service.interface'
import { IThemeService } from './theme/theme.service.interface'
import { IUserService } from './user/user.service.interface'

@injectable()
export class UserOperationService {
  constructor(
    @inject(SERVICES.user)
    private readonly userService: IUserService,
    @inject(SERVICES.post)
    private readonly postService: IPostService,
    @inject(SERVICES.theme)
    private readonly themeService: IThemeService,
  ) {}

  async createPost(userId: string, data: PostCreateRequest): Promise<Post> {
    // agrega un credito al usuario por crear un post
    await this.userService.update(userId, { credits: 1 })
    // validacion de contenido segun categoria
    const theme = await this.themeService.findById(data.theme)
    const categories = theme.categories as unknown as Category[]
    if (!this.isValidCategories(data, categories)) {
      throw new BadRequestException(ErrorMessage.CANNOT_CREATE_CONTENT)
    }
    const newPost = await this.postService.create({ ...data, user: userId })
    return newPost
  }

  isValidCategories(
    data: PostCreateRequest,
    categorysValid: Category[],
  ): boolean {
    const categoryData: string[] = []
    if (isNotEmpty(data.image)) categoryData.push('image')
    if (isNotEmpty(data.text)) categoryData.push('text')
    if (isNotEmpty(data.video)) categoryData.push('video')

    const validCategories = categorysValid.map((e) => e.name)
    return categoryData.every((category) => validCategories.includes(category))
  }
}
