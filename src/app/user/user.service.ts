import { inject, injectable } from 'inversify'
import { UserCreateDto, UserUpdateDto } from '../../domain/dto/user.dto'
import { ErrorMessage } from '../../domain/enums/errorMessage.enum'
import { User } from '../../infrastructure/database/model/user.model'
import { IUserRepository } from '../../infrastructure/database/repositories/user/user.repository.interface'
import { REPOSITORIES } from '../../infrastructure/shared/containers/types'
import { NotFoundException } from '../../infrastructure/shared/errors/notFound.exception'
import { IUserService } from './user.service.interface'

@injectable()
export class UserService implements IUserService {
  constructor(
    @inject(REPOSITORIES.user)
    private readonly userRepository: IUserRepository,
  ) {}

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findById(id)
    if (!user) throw new NotFoundException(ErrorMessage.THEME_NOT_FOUND)
    return user
  }

  async findAll(data: Partial<User> = {}): Promise<User[]> {
    const users = await this.userRepository.findAll(data)
    return users
  }

  async create(data: UserCreateDto): Promise<User> {
    const result = await this.userRepository.create(data)
    return result
  }

  async update(
    id: string,
    { credits, ...resData }: UserUpdateDto,
  ): Promise<User> {
    const user = await this.findOne(id)
    let currentCredits = 0

    if (credits) {
      currentCredits = credits + user.credits
    }

    const query: UserUpdateDto = {
      ...resData,
      credits: currentCredits,
    }

    const result = await this.userRepository.update(id, query)
    return result as unknown as User
  }
}
