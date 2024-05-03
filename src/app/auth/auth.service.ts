import { inject, injectable } from 'inversify'
import jwt from 'jsonwebtoken'
import { AuthCreateDto, AuthLoginDto } from '../../domain/dto/auth.dto'
import { UserCreateDto } from '../../domain/dto/user.dto'
import { User } from '../../infrastructure/database/model/user.model'
import { environment } from '../../infrastructure/shared/constants/dictionary.constant'
import { SERVICES } from '../../infrastructure/shared/containers/types'
import { InvalidCredentialsException } from '../../infrastructure/shared/errors/invalidCredentials.exception'
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

  async login(data: AuthLoginDto): Promise<{ user: User; token: string }> {
    const users = await this.userService.findAll(data)
    if (!users.length) throw new InvalidCredentialsException()
    const user = users[0]
    const token = this.generateToken(user)
    return { user, token }
  }

  validateToken(token: string): User {
    try {
      const { exp, iat, ...user } = jwt.verify(
        token,
        environment.secretJWT,
      ) as jwt.JwtPayload & User

      return user
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
    return await this.userService.create(payload)
  }
}
