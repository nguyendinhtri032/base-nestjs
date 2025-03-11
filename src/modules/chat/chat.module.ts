import { Module } from '@nestjs/common'
import { ChatGateway } from './chat.gateway'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from '../user/user.module'


@Module({
  providers: [ChatGateway],
  imports: [
    TypeOrmModule.forFeature([
      
    ]),
    UserModule,
  ],
})
export class ChatModule {}
