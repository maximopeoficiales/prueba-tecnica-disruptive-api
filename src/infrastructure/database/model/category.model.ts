import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { BaseModel } from '../common/baseModel'
import { Schemas } from '../common/schemas'

@modelOptions({
  schemaOptions: { collection: Schemas.CATEGORIES, timestamps: true },
})
export class Category extends BaseModel {
  @prop({ required: true, unique: true })
  name: string

  @prop({ required: true })
  imageUrl: string
}

export const CategoryModel = getModelForClass(Category)
