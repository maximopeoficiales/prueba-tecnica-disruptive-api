import { ErrorMessage } from '../../../domain/enums/errorMessage.enum'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'

export abstract class BaseException extends Error {
  status: number
  code?: string
  errors?: string[]
  data?: Record<string, string>

  constructor({
    message,
    status,
    cause,
    errors,
    data,
  }: {
    message: string
    status: number
    cause?: Error
    errors?: string[]
    data?: Record<string, string>
  }) {
    super()
    this.message = message ?? ErrorMessage.INTERNAL_SERVER_ERROR
    this.name = BaseException.name
    this.status = status ?? HttpStatusCode.INTERNAL_SERVER_ERROR
    this.cause = cause
    this.data = data
    this.errors = errors
    this.stack = undefined
  }
}
