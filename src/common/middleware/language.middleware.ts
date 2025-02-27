import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest } from 'fastify';

@Injectable()
export class LanguageMiddleware implements NestMiddleware {
  use(req: FastifyRequest, next: () => void) {
    const lang = req.headers['accept-language'] || 'en';
    req['lang'] = lang;
    next();
  }
}
