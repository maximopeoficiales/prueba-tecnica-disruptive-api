import { Request } from 'express'

export type AuthRequest = {
  userId: string
  userRole: number
} & Request
