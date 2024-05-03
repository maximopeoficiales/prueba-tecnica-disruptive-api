import { ErrorMessage } from '../../../domain/enums/errorMessage.enum'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from './base.exception'

export class InternalServerException extends BaseException {
  constructor(message: string = ErrorMessage.INTERNAL_SERVER_ERROR) {
    super({
      message,
      status: HttpStatusCode.INTERNAL_SERVER_ERROR,
    })
    this.name = InternalServerException.name
  }
}
