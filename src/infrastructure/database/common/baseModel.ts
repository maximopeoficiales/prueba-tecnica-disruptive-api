import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Types } from 'mongoose'

export class BaseModel extends TimeStamps implements Base {
  _id: Types.ObjectId
  id: string
}
