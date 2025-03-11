import { Injectable, NestMiddleware } from '@nestjs/common'
import { FastifyRequest } from 'fastify'
import { SERVER_CONFIG } from 'src/configs/server.config'
@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: FastifyRequest, next: () => void) {
    const lang = req.headers['accept-language'] || SERVER_CONFIG.DEFAULT_LANG
    req['lang'] = lang
    next()
  }
}
