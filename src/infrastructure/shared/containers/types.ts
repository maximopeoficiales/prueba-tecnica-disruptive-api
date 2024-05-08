export const APP = {
  app: Symbol.for('App'),
  server: Symbol.for('Server'),
  mongoose: Symbol.for('Mongoose'),
}

export const MODELS = {
  user: Symbol.for('UserModel'),
  rol: Symbol.for('RolModel'),
  category: Symbol.for('CategoryModel'),
  theme: Symbol.for('ThemeModel'),
  post: Symbol.for('PostModel'),
}

export const REPOSITORIES = {
  user: Symbol.for('UserRepository'),
  rol: Symbol.for('RolRepository'),
  category: Symbol.for('CategoryRepository'),
  theme: Symbol.for('ThemeRepository'),
  post: Symbol.for('PostRepository'),
}

export const SERVICES = {
  user: Symbol.for('UserService'),
  category: Symbol.for('CategoryService'),
  theme: Symbol.for('ThemeService'),
  post: Symbol.for('PostService'),
  role: Symbol.for('RoleService'),
  auth: Symbol.for('AuthService'),
  userOperation: Symbol.for('UserOperationService'),
}
