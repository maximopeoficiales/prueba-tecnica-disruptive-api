import { ResponseMessage } from '../../../domain/enums/responseMessage.enum'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'

export class HttpResponse<T> {
  message: string
  data: T
  status: HttpStatusCode
  errors: string[]
  constructor(
    data: T,
    message: string = ResponseMessage.SUCCESFULL,
    status: HttpStatusCode = HttpStatusCode.OK,
    errors: string[] = [],
  ) {
    this.message = message
    this.data = data
    this.status = status
    if (errors.length > 0) {
      this.errors = errors
    }
  }
}
