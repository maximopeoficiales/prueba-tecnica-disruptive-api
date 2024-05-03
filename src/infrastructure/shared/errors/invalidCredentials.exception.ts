import { ErrorMessage } from '../../../domain/enums/errorMessage.enum'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from './base.exception'

export class InvalidCredentialsException extends BaseException {
  constructor() {
    super({
      message: ErrorMessage.INVALID_USER,
      status: HttpStatusCode.UNAUTHORIZED,
    })
    this.name = InvalidCredentialsException.name
  }
}
