import { inject } from 'inversify'
import { fluentProvide } from 'inversify-binding-decorators'
import { Body, Controller, Get, Middlewares, Post, Put, Route } from 'tsoa'
import { IThemeService } from '../../../app/theme/theme.service.interface'
import { ThemeCreateDto, ThemeUpdateDto } from '../../../domain/dto/theme.dto'
import { Theme } from '../../database/model/theme.model'
import { groupPermissions } from '../../shared/constants/dictionary.constant'
import { SERVICES } from '../../shared/containers/types'
import { FieldsToUpdateException } from '../../shared/errors/fieldsToUpdate.exception'
import { auth } from '../middlewares/auth.middleware'
import { validateClassValidator } from '../middlewares/validateClassValidator.middleware'

@fluentProvide(ThemesController).done()
@Route('theme')
export class ThemesController extends Controller {
  constructor(
    @inject(SERVICES.theme)
    private readonly themeService: IThemeService,
  ) {
    super()
  }

  @Get()
  async findAll(): Promise<Theme[]> {
    const themes = await this.themeService.findAll()
    return themes
  }

  @Middlewares(auth(groupPermissions.admin))
  @Get('{id}')
  async findById(id: string): Promise<Theme> {
    const theme = await this.themeService.findById(id)
    return theme
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', ThemeCreateDto),
  )
  @Post()
  async create(@Body() body: ThemeCreateDto): Promise<Theme> {
    return await this.themeService.create(body)
  }

  @Middlewares(
    auth(groupPermissions.admin),
    validateClassValidator('body', ThemeUpdateDto),
  )
  @Put('{id}')
  async update(id: string, @Body() body: ThemeUpdateDto): Promise<Theme> {
    const qtyFieldsUpdated = Object.values(body).filter(Boolean).length
    if (qtyFieldsUpdated === 0) throw new FieldsToUpdateException()

    return await this.themeService.update(id, body)
  }
}
