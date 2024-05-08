import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import { Controller, Get, Middlewares, Request, Route } from 'tsoa'
import { IUserService } from '../../../app/user/user.service.interface'
import { User } from '../../database/model/user.model'
import { SERVICES } from '../../shared/containers/types'
import { AuthRequest } from '../../shared/interfaces/authRequest.interface'
import { auth } from '../middlewares/auth.middleware'

@fluentProvide(UsersController).done()
@Route('users')
export class UsersController extends Controller {
  constructor(
    @inject(SERVICES.user)
    private readonly userService: IUserService,
  ) {
    super()
  }

  @Middlewares(auth())
  @Get()
  async findAll(): Promise<User[]> {
    const user = await this.userService.findAll()
    return user
  }

  @Middlewares(auth())
  @Get('/detail')
  async findOne(@Request() req: AuthRequest): Promise<User> {
    const user = await this.userService.findOne(req.userId)
    return user
  }
}
