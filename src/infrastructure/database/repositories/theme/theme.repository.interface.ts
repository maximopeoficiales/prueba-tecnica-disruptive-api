import { Theme } from '../../model/theme.model'

export interface IThemeRepository {
  findAll: () => Promise<Theme[]>
  findById: (id: string) => Promise<Theme | null>
  create: (theme: Partial<Theme>) => Promise<Theme>
  update: (id: string, theme: Partial<Theme>) => Promise<Theme>
}
