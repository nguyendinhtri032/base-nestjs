import { Injectable } from '@nestjs/common'
import { InjectAwsService } from 'nest-aws-sdk'
import { S3 } from 'aws-sdk'
import { SERVER_CONFIG } from 'src/configs/server.config'
import { MemoryStorageFile } from '@blazity/nest-file-fastify'

@Injectable()
export class S3ManagerService {
    private readonly bucket = SERVER_CONFIG.AWS.BUCKET
    constructor(@InjectAwsService(S3) private readonly s3: S3) { }

    async listBucketContents() {
        const response = await this.s3.listObjectsV2({ Bucket: this.bucket }).promise()
        return response.Contents.map(c => c.Key)
    }

    async uploadFile(key: string, file: MemoryStorageFile) {
        const contentType = file.mimetype
        const fileExtension = contentType.split('/')[1]
        const fileName = `${key}/${Date.now()}.${fileExtension}`
        const response = await this.s3.upload({ Bucket: this.bucket, Key: fileName, Body: file.buffer, ContentType: contentType }).promise()
        return response.Location
    }

    async downloadFile(key: string) {
        const response = await this.s3.getObject({ Bucket: this.bucket, Key: key }).promise()
        return response.Body
    }

    async deleteFile(key: string) {
        await this.s3.deleteObject({ Bucket: this.bucket, Key: key }).promise()
    }

    async getFileUrl(key: string) {
        return `https://${this.bucket}.s3.${SERVER_CONFIG.AWS.REGION}.amazonaws.com/${key}`
    }

    async getFileMetadata(key: string) {
        const response = await this.s3.headObject({ Bucket: this.bucket, Key: key }).promise()
        return response
    }

    async getFileSize(key: string) {
        const response = await this.s3.headObject({ Bucket: this.bucket, Key: key }).promise()
        return response.ContentLength
    }

    async getFileLastModified(key: string) {
        const response = await this.s3.headObject({ Bucket: this.bucket, Key: key }).promise()
        return response.LastModified
    }

    async getFileContentType(key: string) {
        const response = await this.s3.headObject({ Bucket: this.bucket, Key: key }).promise()
        return response.ContentType
    }

    async getFileETag(key: string) {
        const response = await this.s3.headObject({ Bucket: this.bucket, Key: key }).promise()
        return response.ETag
    }
}