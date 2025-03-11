import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
  HttpStatus,
  Res,
  Req,
  UnauthorizedException,
  NotFoundException,
  UseInterceptors,
  Query,
  Param,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiBearerAuth,
  ApiResponse,
} from '@nestjs/swagger'
import { FirebaseAuthGuard } from '../firebase/firebase.guard'
import { UserService } from './user.service'
import { User } from './entities'
import { UserDto, UpdateUserDto } from './dtos'
import { FastifyReply, FastifyRequest } from 'fastify'
import { ResponseSuccess } from 'src/common/helpers/response'
import { SERVER_CONFIG } from 'src/configs/server.config'
import { CurrentUser } from 'src/common/decorators/current-user.decorator'
import { UserResponseDto } from './dtos/user-response.dto'
import { UpdateDeviceIdDto } from './dtos/update-device-id.dto'
import { QueueService } from '../queue/queue.service'
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager'
import { ApiPaginationQuery, PaginateQuery } from 'nestjs-paginate'
import { PaginationQueryDto } from './dtos/pagination-query.dto'
import { CheckAbilities } from 'src/common/decorators/check-abilities.decorator'
import { Action } from "src/enums/action"
import { AbilitiesGuard } from '../casl/abilities.guard'
@ApiTags('User')

@Controller(`${SERVER_CONFIG.API_PREFIX_V1}/user`)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly queueService: QueueService,
  ) { }

  @Get('profile')
  @ApiOperation({ summary: 'Get profile' })
  @ApiBearerAuth()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Retrieved profile successfully.',
    type: UserResponseDto,
  })
  async profile(
    @Req() req: FastifyRequest,
    @Res() res: FastifyReply,
  ): Promise<UserResponseDto> {
    const headerAuthorization = req.headers.authorization
    if (!headerAuthorization) {
      throw new UnauthorizedException('No token provided')
    }
    const token = headerAuthorization.split(' ')[1]
    if (!token) {
      throw new UnauthorizedException('Invalid token')
    }
    const c = await this.userService.verifyToken(token)
    if (c) {
      const user = await this.userService.getOrCreateUserByUid(c)
      return ResponseSuccess(res, null, user)
    }
    throw new NotFoundException('User Firebase not found')
  }

  @ApiBearerAuth()
  @UseGuards(FirebaseAuthGuard)
  @Put('profile')
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The user has been successfully updated.',
    type: UserResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Failed to update user',
  })
  async update(
    @CurrentUser() user: User,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res: FastifyReply,
  ): Promise<UserDto> {
    const userUpdated = await this.userService.update(user, updateUserDto)
    return ResponseSuccess(res, null, userUpdated)
  }

  @UseGuards(FirebaseAuthGuard)
  @ApiBearerAuth()
  @Put('device-id')
  @ApiOperation({ summary: 'Update device id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Device id updated successfully',
  })
  @ApiResponse({
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    description: 'Failed to update device id',
  })
  async updateDeviceId(
    @CurrentUser() user: User,
    @Body() updateDeviceIdDto: UpdateDeviceIdDto,
    @Res() res: FastifyReply,
  ): Promise<boolean> {
    const { deviceId } = updateDeviceIdDto
    await this.userService.updateDeviceId(user, deviceId)
    return ResponseSuccess(res, 'Device id updated successfully', null)
  }

  @Get('test-cache')
  // @CacheKey('test')
  // @CacheTTL(300000)
  @ApiOperation({ summary: 'Test cache' })
  async testCache() {
    const data = await this.userService.testCache()
  }

  @Get('users')
  // @UseGuards(FirebaseAuthGuard)
  // @CheckAbilities(Action.Manage, User)
  // @ApiPaginationQuery(USER_PAGINATION_CONFIG)
  @ApiOperation({ summary: 'Get users' })
  async getUsers(
    @Query() query: PaginateQuery,
    @Res() res: FastifyReply,
  ) {
    const queryAddPath = { ...query, path: `${SERVER_CONFIG.API_PREFIX_V1}/user/users`}
    const data = await this.userService.getUsers(queryAddPath)
    return res.send(data)
  }

  @Get('users/:id')
  // @UseGuards(FirebaseAuthGuard, AbilitiesGuard)
  // @CheckAbilities(Action.Read, User)
  async getUserById(@Param('id') id: string, @Res() res: FastifyReply) {
    const user = await this.userService.getUserById(id)
    return ResponseSuccess(res, null, user)
  }
}
