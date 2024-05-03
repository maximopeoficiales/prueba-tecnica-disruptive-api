import { PostFindQueryRequest } from '../../../../domain/dto/post.dto'
import { Post } from '../../model/post.model'

export interface IPostRepository {
  findAll: (filter?: PostFindQueryRequest) => Promise<Post[]>
  findAllShort: (filter: PostFindQueryRequest) => Promise<Post[]>
  findById: (id: string) => Promise<Post | null>
  create: (theme: Partial<Post>) => Promise<Post>
  update: (id: string, theme: Partial<Post>) => Promise<Post>
  delete: (id: string) => Promise<Post>
}
