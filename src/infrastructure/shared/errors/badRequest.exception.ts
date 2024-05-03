import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from './base.exception'

export class BadRequestException extends BaseException {
  constructor(message: string) {
    super({
      message,
      status: HttpStatusCode.BAD_REQUEST,
    })
    this.name = BadRequestException.name
  }
}
