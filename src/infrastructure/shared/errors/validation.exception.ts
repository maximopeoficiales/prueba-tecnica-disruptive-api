import { ErrorMessage } from '../../../domain/enums/errorMessage.enum'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from './base.exception'

export interface ValidationExceptionInterface {
  payload?: string
  type?: string
}

export class ValidationException extends BaseException {
  readonly options?: ValidationExceptionInterface

  constructor(errors: string[]) {
    super({
      message: ErrorMessage.VALIDATION_ERROR,
      status: HttpStatusCode.BAD_REQUEST,
      errors,
    })
    this.name = ValidationException.name
  }
}
