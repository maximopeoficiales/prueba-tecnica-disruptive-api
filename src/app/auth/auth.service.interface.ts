import { AuthCreateDto, AuthLoginDto } from '../../domain/dto/auth.dto';
import { User } from '../../infrastructure/database/model/user.model';

export interface IAuthService {
  login: (data: AuthLoginDto) => Promise<{ user: User; token: string }>
  generateToken: (user: User) => string
  validateToken: (token: string) => User
  registerUser: (data: AuthCreateDto) => Promise<User>
  refreshToken: (token: string) => Promise<{
    user: User
    token: string
  }>
}
