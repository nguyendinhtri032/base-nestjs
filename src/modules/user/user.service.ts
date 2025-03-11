import {
  Injectable,
  Logger,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities'
import { Repository } from 'typeorm'
import { UpdateUserDto, UserDto } from './dtos'
import { Cron, CronExpression } from '@nestjs/schedule'
import { FastifyRequest } from 'fastify'
import { FirebaseService } from '../firebase/firebase.service'
import { RedisService } from '../redis/redis.service'
import axios from 'axios'
import { FilterOperator, FilterSuffix, paginate, Paginated, PaginateQuery } from 'nestjs-paginate'
import { PaginationQueryDto } from './dtos/pagination-query.dto'
import { EventEmitter2 } from '@nestjs/event-emitter'
@Injectable()
export class UserService {
  private logger = new Logger(UserService.name)
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
    private readonly redisService: RedisService,
    private eventEmitter: EventEmitter2
  ) { }

  async getUserByUid(uid: string) {
    return await this.userRepository.findOne({ where: { firebaseUid: uid } })
  }
  async verifyToken(token: string) {
    return await this.firebaseService.verifyToken(token)
  }
  async getOrCreateUserByUid(userFirebase: any) {
    let user = await this.getUserByUid(userFirebase.uid)
    if (!user) {
      user = this.userRepository.create({
        fullName: userFirebase.name,
        email: userFirebase.email,
        firebaseUid: userFirebase.uid,
      })
      await this.userRepository.save(user)
    }
    return user
  }
  async authenticateUser(request: FastifyRequest): Promise<boolean> {
    const authorization =
      request.headers['Authorization'] || request.headers['authorization']
    const authorizationHeader = Array.isArray(authorization)
      ? authorization[0]
      : authorization

    if (authorizationHeader) {
      const token = authorizationHeader.split(' ')[1] || undefined
      if (token) {
        const decodedToken = await this.firebaseService.verifyToken(token)
        const user = await this.userRepository.findOne({
          where: {
            firebaseUid: decodedToken.uid,
          },
        })
        request.user = user
        return true
      }
    }
    return false
  }
  @Cron(CronExpression.EVERY_5_SECONDS)
  handleCron() {
    // this.logger.debug('test schedule')
  }
  async update(user: User, updateUserDto: UpdateUserDto): Promise<UserDto> {
    return await this.userRepository.save(user)
  }

  async updateDeviceId(user: User, deviceId: string): Promise<boolean> {
    user.deviceId = deviceId
    await this.userRepository.save(user)
    return true
  }
  async testCache() {
    let dataCached = await this.redisService.getData('test')
    if (dataCached) {
      return dataCached
    }
    const response = await axios.get('https://api.escuelajs.co/api/v1/products?limit=1000&offset=10')
    if (response.data) {
      await this.redisService.setData('test', response.data)
      dataCached = await this.redisService.getData('test')
    }
    return dataCached
  }
  async getUsers(query: PaginateQuery): Promise<Paginated<User>> {
    const queryBuilder = this.userRepository.createQueryBuilder('user')
    queryBuilder.select([
      'user.id',
      'user.fullName',
      'user.email',
      'user.phoneNumber',
      'user.avatar',
    ])
    if (query.search) {
      queryBuilder.andWhere(
        `MATCH (user.fullName) AGAINST (:search IN BOOLEAN MODE)`,
        { search: query.search },
      )
    }
    this.eventEmitter.emit('user.search', { search: query.search })
    return paginate(query, queryBuilder, {
      sortableColumns: ['createdAt', 'deletedAt'],
      nullSort: 'last',
      defaultSortBy: [['createdAt', 'DESC']],
      // searchableColumns: ['fullName'],
      select: ['id', 'fullName', 'email', 'phoneNumber', 'avatar'],
      filterableColumns: {
        // fullName: [FilterOperator.EQ, FilterSuffix.NOT],
        email: true,
        phoneNumber: true
      },
    })
  }
  async getUserById(id: string) {
    return await this.userRepository.findOne({ where: { id } })
  }
}
