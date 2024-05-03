import { Request as Req } from 'express'
import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import { Controller, Get, Middlewares, Request, Route } from 'tsoa'
import { IUserService } from '../../../app/user/user.service.interface'
import { User } from '../../database/model/user.model'
import {
  groupPermissions,
  userRoles,
} from '../../shared/constants/dictionary.constant'
import { SERVICES } from '../../shared/containers/types'
import { UnauthorizedException } from '../../shared/errors/unauthorized.exception'
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

  @Middlewares(auth(groupPermissions.all))
  @Get('/{id}')
  async findOne(id: string, @Request() req: Req): Promise<User> {
    const { userId, userRole } = req as unknown as {
      userId: string
      userRole: number
    }
    if (userId !== id && userRoles.admin !== userRole) {
      throw new UnauthorizedException()
    }

    const user = await this.userService.findOne(id)
    return user
  }
}
