import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import { Controller, Get, Route, Tags } from 'tsoa'
import { ICategoryService } from '../../../app/category/category.service.interface'
import { IPostService } from '../../../app/post/post.service.interface'
import { IRoleService } from '../../../app/role/role.service.interface'
import { IThemeService } from '../../../app/theme/theme.service.interface'
import { IUserService } from '../../../app/user/user.service.interface'
import { ResponseMessage } from '../../../domain/enums/responseMessage.enum'
import { Post } from '../../database/model/post.model'
import { SERVICES } from '../../shared/containers/types'
import { HttpResponse } from '../../shared/utils/httpResponse'

@Tags('Seed')
@fluentProvide(SeedController).done()
@Route('seed')
export class SeedController extends Controller {
  constructor(
    @inject(SERVICES.role)
    private readonly roleService: IRoleService,
    @inject(SERVICES.user)
    private readonly userService: IUserService,
    @inject(SERVICES.category)
    private readonly categoryService: ICategoryService,
    @inject(SERVICES.theme)
    private readonly themeService: IThemeService,
    @inject(SERVICES.post)
    private readonly postService: IPostService,
  ) {
    super()
  }

  @Get()
  async seedCheck(): Promise<HttpResponse<{ msg: string; posts: Post[] }>> {
    await this.roleService.deleteMany()
    await this.userService.deleteMany()
    await this.categoryService.deleteMany()
    await this.themeService.deleteMany()
    await this.postService.deleteMany()
    const imgRamdom = 'https://picsum.photos/seed/picsum/200/300'
    const videoRamdom = 'https://www.youtube.com/watch?v=wyhPQ2t_MOI'

    const loremIpsum =
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut voluptatem, nobis accusamus quae deserunt iusto corrupti neque quaerat illo molestias quasi nesciunt vel nisi quibusdam aliquam corporis facilis alias odio!'
    const { _id: categoryImageId } = await this.categoryService.create({
      name: 'image',
      imageUrl: imgRamdom,
    })

    const { _id: categoryVideoId } = await this.categoryService.create({
      name: 'video',
      imageUrl: imgRamdom,
    })
    const { _id: categoryTextId } = await this.categoryService.create({
      name: 'text',
      imageUrl: imgRamdom,
    })
    const roleAdmin = await this.roleService.create({
      name: 'admin',
      role: 1,
    })
    const roleCreator = await this.roleService.create({
      name: 'creator',
      role: 2,
    })
    const roleReader = await this.roleService.create({
      name: 'reader',
      role: 3,
    })

    await this.userService.create({
      credits: 0,
      email: 'admin@gmail.com',
      username: 'admin',
      role: roleAdmin._id.toString(),
    })
    const { _id: userCreatorId } = await this.userService.create({
      credits: 0,
      email: 'creator@gmail.com',
      username: 'creator',
      role: roleCreator._id.toString(),
    })
    const { _id: userCreatorMaximoId } = await this.userService.create({
      credits: 0,
      email: 'maximopeoficiales@gmail.com',
      username: 'maximopeoficiales',
      role: roleCreator._id.toString(),
    })

    await this.userService.create({
      credits: 0,
      email: 'reader@gmail.com',
      username: 'reader',
      role: roleReader._id.toString(),
    })

    const { _id: themeProgrammerId } = await this.themeService.create({
      name: 'programming',
      imageUrl: imgRamdom,
      categories: [
        categoryImageId.toString(),
        categoryTextId.toString(),
        categoryVideoId.toString(),
      ],
    })
    const { _id: themeDeportsId } = await this.themeService.create({
      name: 'deports',
      imageUrl: imgRamdom,
      categories: [categoryImageId.toString(), categoryTextId.toString()],
    })
    const { _id: themeMusicId } = await this.themeService.create({
      name: 'music',
      imageUrl: imgRamdom,
      categories: [categoryVideoId.toString()],
    })
    const posts = []
    const post1 = await this.postService.create({
      name: 'Javascript el mejor lenguaje 2024',
      image: imgRamdom,
      text: loremIpsum,
      video: videoRamdom,
      theme: themeProgrammerId.toString(),
      user: userCreatorMaximoId.toString(),
    })
    const post2 = await this.postService.create({
      name: 'Curso de React Native',
      image: imgRamdom,
      text: loremIpsum,
      video: videoRamdom,
      theme: themeProgrammerId.toString(),
      user: userCreatorMaximoId.toString(),
    })
    const post3 = await this.postService.create({
      name: 'La caida de Google',
      image: imgRamdom,
      text: loremIpsum,
      video: videoRamdom,
      theme: themeProgrammerId.toString(),
      user: userCreatorId.toString(),
    })
    const post4 = await this.postService.create({
      name: 'La decaida del Futbol',
      image: imgRamdom,
      text: loremIpsum,
      theme: themeDeportsId.toString(),
      user: userCreatorId.toString(),
    })
    const post5 = await this.postService.create({
      name: 'Top Canciones del 2024',
      video: videoRamdom,
      theme: themeMusicId.toString(),
      user: userCreatorId.toString(),
    })
    const post6 = await this.postService.create({
      name: 'Ed Sheeran gira Mundial',
      video: videoRamdom,
      theme: themeMusicId.toString(),
      user: userCreatorMaximoId.toString(),
    })
    posts.push(post1, post2, post3, post4, post5, post6)
    return new HttpResponse(
      {
        msg: 'Seed Ejecutado',
        posts,
      },
      ResponseMessage.HEALTH_CHECK,
    )
  }
}
