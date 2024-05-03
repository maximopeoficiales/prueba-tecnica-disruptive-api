import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import { BaseModel } from '../common/baseModel'
import { Schemas } from '../common/schemas'
import { Category } from './category.model'

@modelOptions({
  schemaOptions: { collection: Schemas.THEMES, timestamps: true },
})
export class Theme extends BaseModel {
  @prop({ required: true, unique: true })
  name: string

  @prop({ required: true })
  imageUrl: string

  @prop({ ref: () => Category, type: Schema.Types.ObjectId })
  categories: Category[] | string[]
}

export const ThemeModel = getModelForClass(Theme)
