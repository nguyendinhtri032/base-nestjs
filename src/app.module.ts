import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AuthModule } from './modules/auth/auth.module'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './modules/user/user.module'
import { AppDataSource } from './configs/orm.config'
import { ConfigModule } from '@nestjs/config'
import { FirebaseModule } from './modules/firebase/firebase.module'
import { AuthService } from './modules/auth/auth.service'
import { FirebaseService } from './modules/firebase/firebase.service'
import { FtpModule } from './modules/ftp/ftp.module'
import { TelegramLoggerService } from './modules/logger/telegram-logger.service'
import { HandleExceptionFilter } from './exception/handle-exception.filter'
import { APP_FILTER } from '@nestjs/core'
import { DeleteAllUserCommand } from './modules/firebase/command/delete-all-user.command'

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
      autoLoadEntities: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UserModule,
    FirebaseModule,
    FtpModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    FirebaseService,
    TelegramLoggerService,
    {
      provide: APP_FILTER,
      useClass: HandleExceptionFilter,
    },
    DeleteAllUserCommand,
  ],
})
export class AppModule {}
