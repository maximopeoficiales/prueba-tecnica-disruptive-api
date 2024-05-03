import { NextFunction, Request, Response } from 'express'
import { HttpStatusCode } from '../../../domain/enums/statusCode.enum'
import { BaseException } from '../../shared/errors/base.exception'
import { ValidationException } from '../../shared/errors/validation.exception'
import { HttpResponse } from '../../shared/utils/httpResponse'

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void => {
  if (err instanceof ValidationException) {
    res
      .status(err.status)
      .json(new HttpResponse(err.data, err.message, err.status, err.errors))
  } else if (err instanceof BaseException) {
    res
      .status(err.status)
      .json(new HttpResponse(err.data, err.message, err.status, err.errors))
  } else {
    res
      .status(HttpStatusCode.INTERNAL_SERVER_ERROR)
      .json(
        new HttpResponse(
          {},
          (err.message as string) ?? 'error desconocido',
          HttpStatusCode.INTERNAL_SERVER_ERROR,
        ),
      )
  }
}
