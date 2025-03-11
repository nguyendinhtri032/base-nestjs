import { Global, Module } from '@nestjs/common'
import { BullModule } from '@nestjs/bull'
import { BullRedisSource } from 'src/configs/redis.config'
import { QueueService } from './queue.service'
import { QueueProcessor } from './queue.processor'
import { MailModule } from '../mail/mail.module'
@Global()
@Module({
  imports: [
    BullModule.forRoot(BullRedisSource),
    BullModule.registerQueue({
      name: 'taskQueue',
    }),
    MailModule,
  ],
  providers: [QueueService, QueueProcessor],
  exports: [BullModule]
})
export class QueueModule {}
