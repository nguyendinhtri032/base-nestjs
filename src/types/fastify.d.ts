import { FastifyRequest } from 'fastify'
import { User } from 'src/modules/user/entities'

declare module 'fastify' {
  interface FastifyRequest {
    user?: User
  }
}
