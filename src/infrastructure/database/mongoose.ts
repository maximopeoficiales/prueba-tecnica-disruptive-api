import { injectable } from 'inversify'
import mongoose from 'mongoose'
import { environment } from '../shared/constants/dictionary.constant'

@injectable()
export class MongooseDB {
  mongoose: typeof mongoose
  async connect(): Promise<void> {
    try {
      this.mongoose = await mongoose.connect(environment.database.host, {
        dbName: environment.database.dbName,
        user: environment.database.user,
        pass: environment.database.pass,
        retryWrites: true,
        w: 'majority',
      })
      console.log('Database connected:', mongoose.connection.name)
    } catch (error: any) {
      console.error('Error connecting to database:', error.message)
      throw error // Re-throw the error for higher level handling
    }
  }

}
