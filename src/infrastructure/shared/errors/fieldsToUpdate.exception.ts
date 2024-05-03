import { ErrorMessage } from '../../../domain/enums/errorMessage.enum'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from './base.exception'

export class FieldsToUpdateException extends BaseException {
  constructor() {
    super({
      message: ErrorMessage.FIELDS_UPDATE,
      status: HttpStatusCode.BAD_REQUEST,
    })
    this.name = FieldsToUpdateException.name
  }
}
