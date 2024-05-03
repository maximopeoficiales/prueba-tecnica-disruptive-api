import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { BaseModel } from '../common/baseModel'
import { Schemas } from '../common/schemas'

@modelOptions({
  schemaOptions: { collection: Schemas.ROLES, timestamps: true },
})
export class Role extends BaseModel {
  @prop({ required: true, unique: true })
  name: string

  @prop({ required: true, unique: true })
  role: number
}

export const RoleModel = getModelForClass(Role)
