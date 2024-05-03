export const userRoles = Object.freeze({
  admin: 1,
  creator: 2,
  reader: 3,
})

export const groupPermissions = Object.freeze({
  admin: [userRoles.admin],
  creator: [userRoles.admin, userRoles.creator],
  all: Object.values(userRoles),
})

export const environment = Object.freeze({
  secretJWT: process.env.JWT_SECRET!,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN!,
  port: process.env.PORT,
  database: {
    host: process.env.DB_HOST!,
    dbName: process.env.DB_NAME!,
    user: process.env.DB_USER!,
    pass: process.env.DB_PASS!,
  },
})
