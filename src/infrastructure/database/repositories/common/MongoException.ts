import { Error } from 'mongoose'
import { BadRequestException } from '../../../shared/errors/badRequest.exception'
import { InternalServerException } from '../../../shared/errors/internalServer.exception'

type ActionErrorDB = 'create' | 'update' | 'delete' | 'find'

export class MongoException {
  private readonly entity: string
  private readonly messages = {
    create: 'Error al crear el: {{entity}}',
    update: 'Error al actualizar el: {{entity}}',
    delete: 'Error al eliminar el: {{entity}}',
    find: 'Error al obtener el: {{entity}}',
  }

  constructor({ entity }: { entity: string }) {
    this.entity = entity
  }

  validateError(error: any | Error, action?: ActionErrorDB): never {
    console.log('MongoException:', error.message)

    if (error instanceof Error.ValidationError) {
      const keyError = Object.keys(error.errors)[0]
      const message = error.errors[keyError].message
      throw new BadRequestException(message)
    }

    if (error.code === 11000) {
      const value = Object.values(error.keyValue as Record<string, string>)[0]
      throw new BadRequestException(`${this.entity} ${value} ya existe.`)
    }

    if (error.name === 'CastError') {
      throw new BadRequestException('Id inválido')
    }

    if (action !== undefined) {
      const message = this.messages[action].replace('{{entity}}', this.entity)
      throw new InternalServerException(message)
    }

    throw new InternalServerException()
  }
}
