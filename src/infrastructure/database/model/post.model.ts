import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { Schema } from 'mongoose'
import { BaseModel } from '../common/baseModel'
import { Schemas } from '../common/schemas'
import { Theme } from './theme.model'
import { User } from './user.model'

@modelOptions({
  schemaOptions: { collection: Schemas.POSTS, timestamps: true },
})
export class Post extends BaseModel {
  @prop({ required: true })
  name: string

  @prop({ required: true })
  video: string

  @prop({ required: true })
  text: string

  @prop({ required: true })
  image: string

  @prop({ ref: () => Theme, type: Schema.Types.ObjectId, required: true })
  theme: Theme | string

  @prop({ ref: () => User, type: Schema.Types.ObjectId, required: true })
  user: User | string
}

export const PostModel = getModelForClass(Post)
