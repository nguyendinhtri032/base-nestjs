import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities'
import { FirebaseService } from '../firebase/firebase.service'
import { QueueService } from '../queue/queue.service'
import { UserEventHandler } from './user-event.handler'
import { CaslAbilityFactory } from '../casl/casl-ability.factory'


@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [
    UserController
  ],
  providers: [
    UserService,
    FirebaseService,
    QueueService,
    UserEventHandler,
    CaslAbilityFactory
  ],
  exports: [
    UserService
  ]
})
export class UserModule {}
