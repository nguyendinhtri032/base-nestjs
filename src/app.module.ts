import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { AppDataSource } from './configs/orm.config'
import { ConfigModule } from '@nestjs/config'
import { FirebaseModule } from './modules/firebase/firebase.module'
import { FtpModule } from './modules/ftp/ftp.module'
import { ScheduleModule } from '@nestjs/schedule'
import { QueueModule } from './modules/queue/queue.module'
import { RedisModule } from './modules/redis/redis.module' 
import { EventEmitterModule } from '@nestjs/event-emitter'
import { CaslModule } from './modules/casl/casl.module'
import { S3ManagerModule } from './modules/aws/s3-manager.module'
import { AgencyModule } from './modules/agency/agency.module'
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    EventEmitterModule.forRoot(),
    UserModule,
    FirebaseModule,
    FtpModule,
    ScheduleModule.forRoot(),
    QueueModule,
    RedisModule,
    CaslModule,
    AgencyModule,
    S3ManagerModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
  exports: [
  ]
})
export class AppModule {}
