import { ModelType } from '@typegoose/typegoose/lib/types'
import { ContainerModule } from 'inversify'
import { Category, CategoryModel } from '../../database/model/category.model'
import { Post, PostModel } from '../../database/model/post.model'
import { Role, RoleModel } from '../../database/model/role.model'
import { Theme, ThemeModel } from '../../database/model/theme.model'
import { User, UserModel } from '../../database/model/user.model'
import { MODELS } from './types'

export const modelsModule = new ContainerModule((bind) => {
  bind<ModelType<User>>(MODELS.user).toConstantValue(UserModel)
  bind<ModelType<Role>>(MODELS.rol).toConstantValue(RoleModel)
  bind<ModelType<Category>>(MODELS.category).toConstantValue(CategoryModel)
  bind<ModelType<Theme>>(MODELS.theme).toConstantValue(ThemeModel)
  bind<ModelType<Post>>(MODELS.post).toConstantValue(PostModel)
})
