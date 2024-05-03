import dotenv from 'dotenv'

const environment = process.env.NODE_ENV ?? 'local'

dotenv.config({
  path: environment === 'local' ? '.env' : `.env.${environment}`,
})
