import { ModelType } from '@typegoose/typegoose/lib/types'
import { inject } from 'inversify'
import { PopulateOptions } from 'mongoose'
import { MODELS } from '../../../shared/containers/types'
import { Post } from '../../model/post.model'
import { MongooseCRUD } from '../common/mongoose.repository'
import { IPostRepository } from './post.repository.interface'

export class PostRepository
  extends MongooseCRUD<Post>
  implements IPostRepository
{
  constructor(@inject(MODELS.post) postModel: ModelType<Post>) {
    super({
      model: postModel,
      entity: 'publicación',
    })
  }

  async findAll(filter: Record<string, any> = {}): Promise<Post[]> {
    if (filter.name) {
      filter.name = new RegExp(filter.name as string, 'i')
    }

    const posts = await this.Model.find(filter)
      .sort({ createdAt: -1 })
      .populate(this.buildPopulate())
      .exec()
      .catch((error) => this.validateError(error, 'find'))

    return posts as unknown as Post[]
  }

  async findAllShort(filter: Record<string, any> = {}): Promise<Post[]> {
    if (filter.name) {
      filter.name = new RegExp(filter.name as string, 'i')
    }

    const posts = await this.Model.find(filter)
      .select('-video -text -image')
      .sort({ createdAt: -1 })
      .populate(this.buildPopulate())
      .exec()
      .catch((error) => this.validateError(error, 'find'))

    return posts as unknown as Post[]
  }

  async findById(id: string): Promise<Post> {
    const posts = await this.Model.findById(id)
      .populate(this.buildPopulate())
      .exec()
      .catch((error) => this.validateError(error, 'find'))

    return posts as unknown as Post
  }

  async create(payload: Partial<Post>): Promise<Post> {
    const newModel = new this.Model(payload)
    const post = await newModel
      .save()
      .catch((error) => this.validateError(error, 'create'))

    const result = await post.populate(this.buildPopulate())

    return result.toJSON() as unknown as Post
  }

  private buildPopulate(): PopulateOptions[] {
    return [
      {
        path: 'theme',
        populate: {
          path: 'categories',
          select: '-createdAt -updatedAt',
        },
        select: '-createdAt -updatedAt',
      },
      {
        path: 'user',
        select: '-rol -_id -createdAt -updatedAt',
      },
    ]
  }
}
