import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UserModule } from '../user/user.module'
import { FirebaseModule } from '../firebase/firebase.module'
import { FirebaseService } from '../firebase/firebase.service'

@Module({
  imports: [UserModule, FirebaseModule],
  controllers: [AuthController],
  providers: [AuthService, FirebaseService],
})
export class AuthModule {}
