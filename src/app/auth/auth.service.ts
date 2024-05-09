import { inject, injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import { AuthCreateDto, AuthLoginDto } from '../../domain/dto/auth.dto'
import { UserCreateDto } from '../../domain/dto/user.dto'
import { User } from '../../infrastructure/database/model/user.model'
import { environment } from '../../infrastructure/shared/constants/dictionary.constant'
import { SERVICES } from '../../infrastructure/shared/containers/types'
import { UnauthorizedException } from '../../infrastructure/shared/errors/unauthorized.exception'
import { IRoleService } from '../role/role.service.interface'
import { IUserService } from '../user/user.service.interface'
import { IAuthService } from './auth.service.interface'

@injectable()
export class AuthService implements IAuthService {
  constructor(
    @inject(SERVICES.user)
    private readonly userService: IUserService,
    @inject(SERVICES.role)
    private readonly roleService: IRoleService,
  ) {}

  generateToken(user: User): string {
    return jwt.sign({ ...user }, environment.secretJWT, {
      expiresIn: environment.jwtExpiresIn,
    })
  }

  async login({
    username,
  }: AuthLoginDto): Promise<{ user: User; token: string }> {
    const user = await this.userService.findOne({
      username,
    })
    const token = this.generateToken(user)
    return { user, token }
  }

  validateToken(token: string): User {
    try {
      const result = jwt.verify(token, environment.secretJWT) as any
      return result._doc as User
    } catch {
      throw new UnauthorizedException()
    }
  }

  async refreshToken(token: string): Promise<{ user: User; token: string }> {
    try {
      const result = jwt.verify(token, environment.secretJWT) as any
      const user = result._doc as User
      const useCurrent = await this.userService.findById(user._id.toString())
      const newToken = this.generateToken(useCurrent)
      return { user: useCurrent, token: newToken }
    } catch {
      throw new UnauthorizedException()
    }
  }

  async registerUser(data: AuthCreateDto): Promise<User> {
    const role = await this.roleService.findOne({
      name: data.role,
    })

    const payload: UserCreateDto = {
      ...data,
      credits: 0,
      role: role._id.toString(),
    }
    const userCreated = await this.userService.create(payload)
    const userData = await this.userService.findOne({
      _id: userCreated._id,
    })
    return userData
  }
}
