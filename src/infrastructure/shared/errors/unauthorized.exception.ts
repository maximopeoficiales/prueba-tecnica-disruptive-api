import { ErrorMessage } from '../../../domain/enums/errorMessage.enum'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from './base.exception'

export class UnauthorizedException extends BaseException {
  constructor() {
    super({
      message: ErrorMessage.UNAUTHORIZED,
      status: HttpStatusCode.UNAUTHORIZED,
    })
    this.name = UnauthorizedException.name
  }
}
