import { Request } from 'express'

export type AuthRequest = {
  userId: string
  roleId: string
} & Request
