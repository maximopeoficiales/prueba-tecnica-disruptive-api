import { inject, injectable } from 'inversify'
import {
  PostCreateDto,
  PostFindQueryRequest,
  PostUpdateDto,
} from '../../domain/dto/post.dto'
import { ErrorMessage } from '../../domain/enums/errorMessage.enum'
import { CountPost } from '../../domain/interfaces/countPost.interface'
import { Post } from '../../infrastructure/database/model/post.model'
import { IPostRepository } from '../../infrastructure/database/repositories/posts/post.repository.interface'
import { REPOSITORIES } from '../../infrastructure/shared/containers/types'
import { NotFoundException } from '../../infrastructure/shared/errors/notFound.exception'
import { IPostService } from './post.service.interface'

@injectable()
export class PostService implements IPostService {
  constructor(
    @inject(REPOSITORIES.post)
    private readonly postRepository: IPostRepository,
  ) {}

  async deleteMany(): Promise<void> {
    await this.postRepository.deleteMany()
  }

  async findOne(id: string): Promise<Post> {
    const post = await this.postRepository.findById(id)
    if (!post) throw new NotFoundException(ErrorMessage.POST_NOT_FOUND)
    return post
  }

  async findAll(query: PostFindQueryRequest): Promise<Post[]> {
    return await this.postRepository.findAll(query)
  }

  async find(filter: Partial<Post>): Promise<Post[]> {
    return await this.postRepository.find(filter)
  }

  async findAllShort(query: PostFindQueryRequest): Promise<Post[]> {
    return await this.postRepository.findAllShort(query)
  }

  async create(data: PostCreateDto): Promise<Post> {
    const result = await this.postRepository.create(data)
    return result
  }

  async update(id: string, data: PostUpdateDto): Promise<Post> {
    const result = await this.postRepository.update(id, data)
    return result
  }

  async delete(id: string): Promise<Post> {
    return await this.postRepository.delete(id)
  }

  async resume(): Promise<CountPost> {
    return await this.postRepository.resume()
  }
}
