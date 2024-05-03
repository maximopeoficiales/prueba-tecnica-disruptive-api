import {
  PostCreateDto,
  PostFindQueryRequest,
  PostUpdateDto,
} from '../../domain/dto/post.dto'
import { Post } from '../../infrastructure/database/model/post.model'

export interface IPostService {
  create: (body: PostCreateDto) => Promise<Post>
  update: (id: string, body: PostUpdateDto) => Promise<Post>
  findAll: (filter: PostFindQueryRequest) => Promise<Post[]>
  findAllShort: (filter: PostFindQueryRequest) => Promise<Post[]>
  findOne: (id: string) => Promise<Post>
  delete: (id: string) => Promise<Post>
}
