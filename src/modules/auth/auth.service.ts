import {
  Injectable,
} from '@nestjs/common'
import { User } from '../user/entities/user.entity'
import { FirebaseService } from '../firebase/firebase.service'
import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { FastifyRequest } from 'fastify'
import NodeCache from 'node-cache'

@Injectable()
export class AuthService {
  private cache = new NodeCache({ stdTTL: 180, checkperiod: 180 })

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly firebaseService: FirebaseService,
  ) {}

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
}
