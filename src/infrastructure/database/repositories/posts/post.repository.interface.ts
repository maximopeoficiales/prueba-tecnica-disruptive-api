import { PostFindQueryRequest } from '../../../../domain/dto/post.dto'
import { CountPost } from '../../../../domain/interfaces/countPost.interface'
import { Post } from '../../model/post.model'

export interface IPostRepository {
  findAll: (filter?: PostFindQueryRequest) => Promise<Post[]>
  find: (filter: Partial<Post>) => Promise<Post[]>
  findAllShort: (filter: PostFindQueryRequest) => Promise<Post[]>
  findById: (id: string) => Promise<Post | null>
  create: (post: Partial<Post>) => Promise<Post>
  update: (id: string, theme: Partial<Post>) => Promise<Post>
  delete: (id: string) => Promise<Post>
  countByTheme: (themeId: string) => Promise<CountPost>
}
