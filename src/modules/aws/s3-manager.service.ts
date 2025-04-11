import { Injectable } from '@nestjs/common'
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3'
import { SERVER_CONFIG } from 'src/configs/server.config'
import { MemoryStorageFile } from '@blazity/nest-file-fastify'
import { AwsConfig } from 'src/configs/aws.config'

@Injectable()
export class S3ManagerService {
  private readonly bucket = SERVER_CONFIG.AWS.BUCKET
  private readonly s3 = new S3Client(AwsConfig)

  async uploadFile(key: string, file: MemoryStorageFile) {
    const contentType = file.mimetype
    const fileExtension = contentType.split('/')[1]
    const fileName = `${key}/${Date.now()}.${fileExtension}`
    console.log(SERVER_CONFIG.AWS.ACCESS_KEY_ID)
    await this.s3.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
        Body: file.buffer,
        ContentType: contentType,
      }),
    )
    return this.getFileUrl(fileName)
  }

  async getFileUrl(fileName: string) {
    return `https://${this.bucket}.s3.${SERVER_CONFIG.AWS.REGION}.amazonaws.com/${fileName}`
  }

  async deleteFile(fileName: string) {
    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: this.bucket,
        Key: fileName,
      }),
    )
  }
}