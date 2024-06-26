import { Theme } from '../../model/theme.model'

export interface IThemeRepository {
  findAll: () => Promise<Theme[]>
  findById: (id: string) => Promise<Theme | null>
  findOne: (filter: Partial<Theme>) => Promise<Theme>
  create: (theme: Partial<Theme>) => Promise<Theme>
  update: (id: string, theme: Partial<Theme>) => Promise<Theme>
  deleteMany: () => Promise<void>
}
