import { NextFunction, Response } from 'express'

import { IAuthService } from '../../../app/auth/auth.service.interface'
import { Role } from '../../database/model/role.model'
import { groupPermissions } from '../../shared/constants/dictionary.constant'
import { iocContainer } from '../../shared/containers/container'
import { SERVICES } from '../../shared/containers/types'
import { UnauthorizedException } from '../../shared/errors/unauthorized.exception'
import { AuthRequest } from '../../shared/interfaces/authRequest.interface'

export const auth = (permissions: number[] = groupPermissions.admin) => {
  return async (
    req: AuthRequest,
    _res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const tokenBearer = req.headers.authorization
      if (!tokenBearer) throw new UnauthorizedException()

      const token = tokenBearer.split(' ')[1]

      const session = iocContainer.get<IAuthService>(SERVICES.auth)
      const user = session.validateToken(token)

      const { role: roleId } = user.role as Role

      if (!permissions.includes(roleId)) throw new UnauthorizedException()

      req.userId = user._id.toString()
      req.userRole = roleId
      next()
    } catch (error) {
      next(error)
    }
  }
}
