import {
  Injectable,
  NotFoundException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities'
import { EntityManager, Repository } from 'typeorm'
import { UpdateUserDto, UserDto } from './dtos'

@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async update(user: User, updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userRepository.save(user)
  }

  async updateDeviceId(user: User, deviceId: string): Promise<boolean> {
    user.deviceId = deviceId
    await this.userRepository.save(user)
    return true
  }
}
