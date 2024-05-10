import http, { Server as HttpServer } from 'http'
import { inject, injectable } from 'inversify'
import { App } from './app'
import { APP } from './infrastructure/shared/containers/types'

export interface IServer {
  start: () => void
}

@injectable()
export default class Server implements IServer {
  constructor(@inject(APP.app) private readonly app: App) {}

  start(): void {
    const server = http.createServer(this.app.get())
    const environment = process.env.NODE_ENV ?? 'development'
    const port = this.normalizePort(process.env.PORT ?? '3000')

    server
      .listen(port)
      .on('error', (error: any) => {
        this.onError(error, port)
      })
      .on('listening', () => {
        this.onListening(server, environment, port)
      })
  }

  normalizePort(val: string | number): string | number {
    const port = Number(val)
    if (port <= 0 || port > 65535) {
      throw new Error('Invalid port port > 0 || port <= 65535')
    }
    if (isNaN(port)) return '3000'
    return port
  }

  onError(error: any, port: string | number): void {
    if (error.syscall !== 'listen') throw error

    switch (error.code) {
      case 'EACCES':
        console.error(`Port ${port} requires elevated privileges`)
        return process.exit(1)
      case 'EADDRINUSE':
        console.error(`Port ${port} is already in use`)
        return process.exit(1)
      default:
        throw error
    }
  }

  onListening(server: HttpServer, env: string, port: string | number): void {
    const addr = server.address()
    if (addr === null) return

    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`

    console.log(`Starting in ${env} mode`)
    console.log(`Listening on ${bind} `)
    console.log(`Show Docs 📚 http://localhost:${port}/docs`)
  }
}
