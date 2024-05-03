/* eslint-disable @typescript-eslint/no-unsafe-argument */
import cors from 'cors'
import express, { type Application } from 'express'
import { inject, injectable } from 'inversify'
import * as swaggerUI from 'swagger-ui-express'
import { ValidationService } from 'tsoa'
import { ResponseMessage } from './domain/enums/responseMessage.enum'
import { HttpStatusCode } from './domain/enums/statusCode.enum'
import { MongooseDB } from './infrastructure/database/mongoose'
import { APP } from './infrastructure/shared/containers/types'
import { HttpResponse } from './infrastructure/shared/utils/httpResponse'
import { errorHandler } from './infrastructure/webApi/middlewares/errorHandler.middleware'
import { RegisterRoutes } from './routes'
import * as swaggerJson from './swagger.json'

@injectable()
export class App {
  private readonly app: Application

  constructor(@inject(APP.mongoose) private readonly mongoose: MongooseDB) {
    this.app = express()
    void this.init()
  }

  async init(): Promise<void> {
    await this.mongoose.connect()
  }

  get(): Application {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    // desabilito que tecnologia estoy utilizando en los headers
    this.app.disable('x-powered-by')
    this.app.use(
      ['/openapi', '/docs', '/swagger'],
      swaggerUI.serve,
      swaggerUI.setup(swaggerJson),
    )

    // ---- Deshabilita validacion de tsoa
    ValidationService.prototype.ValidateParam = (
      _property,
      rawValue,
      _name = '',
      _fieldErrors,
      _parent = '' as any,
      _minimalSwaggerConfig,
    ) => rawValue
    RegisterRoutes.prototype.getValidatedArgs = (args: {}) => Object.keys(args)

    RegisterRoutes(this.app)

    this.app.use(errorHandler)
    this.app.use((_req, res, _next) => {
      res.json(
        new HttpResponse(
          {},
          ResponseMessage.NOT_FOUND,
          HttpStatusCode.NOT_FOUND,
        ),
      )
    })

    return this.app
  }
}
