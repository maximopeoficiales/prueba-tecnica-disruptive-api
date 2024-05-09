import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import { Controller, Get, Middlewares, Request, Route } from 'tsoa'
import { IUserService } from '../../../app/user/user.service.interface'
import { User } from '../../database/model/user.model'
import { groupPermissions } from '../../shared/constants/dictionary.constant'
import { SERVICES } from '../../shared/containers/types'
import { AuthRequest } from '../../shared/interfaces/authRequest.interface'
import { HttpResponse } from '../../shared/utils/httpResponse'
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

  @Middlewares(auth(groupPermissions.all))
  @Get()
  async findAll(): Promise<HttpResponse<User[]>> {
    const user = await this.userService.findAll()
    return new HttpResponse(user)
  }

  @Middlewares(auth(groupPermissions.all))
  @Get('/detail')
  async findOne(@Request() req: AuthRequest): Promise<HttpResponse<User>> {
    const user = await this.userService.findById(req.userId)
    return new HttpResponse(user)
  }
}
