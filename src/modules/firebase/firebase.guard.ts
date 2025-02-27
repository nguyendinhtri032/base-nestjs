import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common'
import { FirebaseService } from './firebase.service'
import { User } from '../user/entities'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FastifyRequest } from 'fastify'

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly FirebaseService: FirebaseService,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: FastifyRequest = context.switchToHttp().getRequest()
    const authorization = request.headers['Authorization'] || request.headers['authorization']
    const authorizationHeader = Array.isArray(authorization) ? authorization[0] : authorization

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization token missing')
    }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = await this.FirebaseService.verifyToken(token)
    const user = this.userRepository.findOne({
      where: {
        firebaseUid: decodedToken.uid,
      },
    })
    if (user) {
      request.user = user
      return true
    }
    throw new UnauthorizedException('User not found')
  }
}
