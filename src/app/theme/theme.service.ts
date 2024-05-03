import { inject, injectable } from 'inversify'
import { ThemeCreateDto, ThemeUpdateDto } from '../../domain/dto/theme.dto'
import { ErrorMessage } from '../../domain/enums/errorMessage.enum'
import { Theme } from '../../infrastructure/database/model/theme.model'
import { IThemeRepository } from '../../infrastructure/database/repositories/theme/theme.repository.interface'
import { REPOSITORIES } from '../../infrastructure/shared/containers/types'
import { NotFoundException } from '../../infrastructure/shared/errors/badRequest.exception copy'
import { IThemeService } from './theme.service.interface'

@injectable()
export class ThemeService implements IThemeService {
  constructor(
    @inject(REPOSITORIES.theme)
    private readonly themeRepository: IThemeRepository,
  ) {}

  async findOne(id: string): Promise<Theme> {
    const theme = await this.themeRepository.findById(id)
    if (!theme) throw new NotFoundException(ErrorMessage.THEME_NOT_FOUND)
    return theme
  }

  async findAll(): Promise<Theme[]> {
    return await this.themeRepository.findAll()
  }

  async create(data: ThemeCreateDto): Promise<Theme> {
    const result = await this.themeRepository.create(data)
    return result
  }

  async update(id: string, data: ThemeUpdateDto): Promise<Theme> {
    const result = await this.themeRepository.update(id, data)
    return result
  }
}
