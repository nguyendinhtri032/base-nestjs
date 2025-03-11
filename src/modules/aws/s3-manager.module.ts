import { Module } from '@nestjs/common'
import { S3ManagerService } from './s3-manager.service' 
import { AwsSdkModule } from 'nest-aws-sdk'
import { S3ManagerController } from './s3-manager.controller'
import { AwsConfig } from 'src/configs/aws.config'

@Module({
  imports: [
    AwsSdkModule.forRootAsync(AwsConfig),
  ],
  controllers: [S3ManagerController],
  providers: [S3ManagerService],
  exports: [S3ManagerService],
})
export class S3ManagerModule {}