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
import { AuthService } from '../auth/auth.service'
import { UpdateDeviceIdDto } from './dtos/update-device-id.dto'
@ApiTags('User')
@Controller(`${SERVER_CONFIG.API_PREFIX_V1}/user`)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

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
    const c = await this.authService.verifyToken(token)
    if (c) {
      const user = await this.authService.getOrCreateUserByUid(c)
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
}
