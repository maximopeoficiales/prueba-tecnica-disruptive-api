import { ThemeCreateDto, ThemeUpdateDto } from '../../domain/dto/theme.dto'
import { Theme } from '../../infrastructure/database/model/theme.model'

export interface IThemeService {
  create: (body: ThemeCreateDto) => Promise<Theme>
  update: (id: string, body: ThemeUpdateDto) => Promise<Theme>
  findAll: () => Promise<Theme[]>
  findOne: (id: string) => Promise<Theme>
}
