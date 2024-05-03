import { ClassConstructor, plainToClass } from 'class-transformer'
import { ValidationError, validate } from 'class-validator'
import { NextFunction, Request, Response } from 'express'

import { ValidationException } from '../../shared/errors/validation.exception'

type Key = 'headers' | 'body' | 'query' | 'params'

/**
 * Middleware que se encarga de validar el request con class-validator.
 * @param key - Llave del request a validar. Ejemplo: 'body', 'query', 'params', 'headers'.
 * @param schema - Schema de class-validator.
 */
export const validateClassValidator = (
  key: Key,
  schema: ClassConstructor<unknown>,
) => {
  return async (
    req: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    const data = req[key] as Record<string, unknown>

    const model = plainToClass(schema, data, {
      excludeExtraneousValues: true,
      exposeUnsetFields: false,
    }) as Record<string, unknown>

    const errors = await validate(model)
    if (errors.length) {
      const error = new ValidationException(processErrors(errors))
      next(error)
    }

    req[key] = model
    next()
  }
}

export const processErrors = (
  errors: ValidationError[] | undefined,
): string[] => {
  if (!errors) return []
  return errors.flatMap((error): string[] => {
    if (error.constraints) {
      const firstConstraint = Object.values(error.constraints)[0]
      const formattedConstraint = firstConstraint.split(' ').slice(1).join(' ')
      return [
        `${error.property} with value '${error.value}' is invalid, ${formattedConstraint}`,
      ]
    }

    return processErrors(
      error.children?.map((x) => ({
        ...x,
        property: `${error.property}.${x.property}`,
      })),
    )
  })
}
