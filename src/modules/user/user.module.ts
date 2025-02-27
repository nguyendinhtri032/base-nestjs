import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities'
import { FirebaseService } from '../firebase/firebase.service'
import { AuthService } from '../auth/auth.service'

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, FirebaseService, AuthService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
