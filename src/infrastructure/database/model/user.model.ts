import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { BaseModel } from '../common/baseModel'
import { Schemas } from '../common/schemas'
import { Role } from './role.model'

@modelOptions({
  schemaOptions: { collection: Schemas.USERS, timestamps: true },
})
export class User extends BaseModel {
  @prop({ required: true })
  credits: number

  @prop({ required: true, unique: true })
  username: string

  @prop({ required: true, unique: true })
  email: string

  @prop({
    ref: () => Role,
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  })
  role: Role | string
}

export const UserModel = getModelForClass(User)
