import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from './base.exception'

export class NotFoundException extends BaseException {
  constructor(message: string) {
    super({
      message,
      status: HttpStatusCode.NOT_FOUND,
    })
    this.name = NotFoundException.name
  }
}
