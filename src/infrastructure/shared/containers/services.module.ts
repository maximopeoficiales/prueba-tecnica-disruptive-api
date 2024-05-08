import { ContainerModule } from 'inversify'
import { AuthService } from '../../../app/auth/auth.service'
import { IAuthService } from '../../../app/auth/auth.service.interface'
import { CategoryService } from '../../../app/category/category.service'
import { ICategoryService } from '../../../app/category/category.service.interface'
import { PostService } from '../../../app/post/post.service'
import { IPostService } from '../../../app/post/post.service.interface'
import { RoleService } from '../../../app/role/role.service'
import { IRoleService } from '../../../app/role/role.service.interface'
import { ThemeService } from '../../../app/theme/theme.service'
import { IThemeService } from '../../../app/theme/theme.service.interface'
import { UserService } from '../../../app/user/user.service'
import { IUserService } from '../../../app/user/user.service.interface'
import { UserOperationService } from '../../../app/userOperation.service'
import { SERVICES } from './types'

export const serviceModule = new ContainerModule((bind) => {
  bind<IUserService>(SERVICES.user).to(UserService).inSingletonScope()
  bind<IThemeService>(SERVICES.theme).to(ThemeService).inSingletonScope()
  bind<IPostService>(SERVICES.post).to(PostService).inSingletonScope()
  bind<IAuthService>(SERVICES.auth).to(AuthService).inSingletonScope()
  bind<IRoleService>(SERVICES.role).to(RoleService).inSingletonScope()
  bind<UserOperationService>(SERVICES.userOperation)
    .to(UserOperationService)
    .inSingletonScope()
  bind<ICategoryService>(SERVICES.category)
    .to(CategoryService)
    .inSingletonScope()
})
