import { Container, ContainerModule, decorate, injectable } from 'inversify'
import { buildProviderModule } from 'inversify-binding-decorators'
import { Controller } from 'tsoa'
import { App } from '../../../app'
import Server from '../../../server'
import { MongooseDB } from '../../database/mongoose'
import { modelsModule } from './models.module'
import { repositoriesModule } from './repositories.module'
import { serviceModule } from './services.module'
import { APP } from './types'

decorate(injectable(), Controller)

export const iocContainer = new Container()

const appModule = new ContainerModule((bind) => {
  bind<App>(APP.app).to(App).inSingletonScope()
  bind<Server>(APP.server).to(Server).inSingletonScope()
  bind<MongooseDB>(APP.mongoose).to(MongooseDB).inSingletonScope()
})

iocContainer.load(
  appModule,
  serviceModule,
  modelsModule,
  repositoriesModule,
  buildProviderModule(),
)
