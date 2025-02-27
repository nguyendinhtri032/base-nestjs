import {
  Controller,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { SERVER_CONFIG } from 'src/configs/server.config'
@ApiTags('Auth')
@Controller(`${SERVER_CONFIG.API_PREFIX_V1}/auth`)
export class AuthController {
  constructor(private readonly authService: AuthService) { }

}
