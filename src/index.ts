import 'reflect-metadata'
import { APP } from './infrastructure/shared/containers/types'
import './infrastructure/shared/utils/dotenv-config'
import { IServer } from './server'

const load = async (): Promise<void> => {
  const { iocContainer } = await import(
    './infrastructure/shared/containers/container'
  )
  const server = iocContainer.get<IServer>(APP.server)
  server.start()
}

load().catch((error) => {
  console.log('error server', error)
  process.exit(1)
})
