import { ContainerModule } from 'inversify'
import { CategoryRepository } from '../../database/repositories/categories/category.repository'
import { ICategoryRepository } from '../../database/repositories/categories/category.repository.interface'
import { PostRepository } from '../../database/repositories/posts/post.repository'
import { IPostRepository } from '../../database/repositories/posts/post.repository.interface'
import { RoleRepository } from '../../database/repositories/roles/role.repository'
import { IRoleRepository } from '../../database/repositories/roles/role.repository.interface'
import { ThemeRepository } from '../../database/repositories/theme/theme.repository'
import { IThemeRepository } from '../../database/repositories/theme/theme.repository.interface'
import { UserRepository } from '../../database/repositories/user/user.repository'
import { IUserRepository } from '../../database/repositories/user/user.repository.interface'
import { REPOSITORIES } from './types'

export const repositoriesModule = new ContainerModule((bind) => {
  bind<IUserRepository>(REPOSITORIES.user).to(UserRepository).inSingletonScope()
  bind<IRoleRepository>(REPOSITORIES.rol).to(RoleRepository).inSingletonScope()
  bind<IPostRepository>(REPOSITORIES.post).to(PostRepository).inSingletonScope()
  bind<ICategoryRepository>(REPOSITORIES.category)
    .to(CategoryRepository)
    .inSingletonScope()
  bind<IThemeRepository>(REPOSITORIES.theme)
    .to(ThemeRepository)
    .inSingletonScope()
})
