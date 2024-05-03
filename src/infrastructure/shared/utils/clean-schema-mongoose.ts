/* eslint-disable @typescript-eslint/naming-convention */
import { Document, Schema } from 'mongoose'

/**
 * Limpia el esquema de mongoose para que no devuelva __v y _id
 * @param schema - Esquema de mongoose
 */
export const cleanSchemaMongoose = (schema: Schema): void => {
  schema.set('toJSON', {
    transform: (
      _doc: Document,
      { __v, _id, ...rest }: Record<string, any>,
    ) => ({
      ...rest,
      id: _id,
    }),
  })
}
