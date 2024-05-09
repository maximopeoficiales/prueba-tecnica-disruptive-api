import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import { Body, Controller, Middlewares, Post, Route } from 'tsoa'
import { IAuthService } from '../../../app/auth/auth.service.interface'
import {
  AuthCreateDto,
  AuthLoginDto,
  RefreshTokenDto,
} from '../../../domain/dto/auth.dto'
import { User } from '../../database/model/user.model'
import { SERVICES } from '../../shared/containers/types'
import { HttpResponse } from '../../shared/utils/httpResponse'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'

@fluentProvide(AuthController).done()
@Route('auth')
export class AuthController extends Controller {
  constructor(
    @inject(SERVICES.auth)
    private readonly authService: IAuthService,
  ) {
    super()
  }

  @Middlewares(validateClassValidator('body', AuthLoginDto))
  @Post('login')
  async login(
    @Body() body: AuthLoginDto,
  ): Promise<HttpResponse<{ token: string; user: User }>> {
    const user = await this.authService.login(body)
    return new HttpResponse(user)
  }

  @Middlewares(validateClassValidator('body', AuthCreateDto))
  @Post('register')
  async create(
    @Body() body: AuthCreateDto,
  ): Promise<HttpResponse<{ token: string; user: User }>> {
    const user = await this.authService.registerUser(body)
    console.log(user)
    const token = this.authService.generateToken(user)
    return new HttpResponse({ user, token })
  }

  @Middlewares(validateClassValidator('body', RefreshTokenDto))
  @Post('refresh')
  async refreshToken(
    @Body() body: RefreshTokenDto,
  ): Promise<HttpResponse<{ token: string; user: User }>> {
    const result = await this.authService.refreshToken(body.token)
    return new HttpResponse(result)
  }
}
