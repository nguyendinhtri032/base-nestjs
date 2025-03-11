import { Controller, Post, Body, UseInterceptors, Res } from '@nestjs/common'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { MemoryStorageFile, UploadedFile, FileInterceptor } from '@blazity/nest-file-fastify'
import { SERVER_CONFIG } from 'src/configs/server.config'
import { FastifyReply } from 'fastify'
import { ResponseSuccess } from 'src/common/helpers/response'
import { S3ManagerService } from './s3-manager.service'
import { UploadFileDto } from '../ftp/dto/create-ftp.dto'

@ApiTags(`${SERVER_CONFIG.API_PREFIX_V1}/s3`)
@Controller(`${SERVER_CONFIG.API_PREFIX_V1}/s3`)
export class S3ManagerController {
  constructor(private readonly s3Manager: S3ManagerService) { }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({
    description: 'File upload with path info',
    type: UploadFileDto,
  })
  async upload(@Body() uploadFileDto: UploadFileDto,
    @UploadedFile() file: MemoryStorageFile,
    @Res() res: FastifyReply) {
    const { path } = uploadFileDto
    const pathUploaded = await this.s3Manager.uploadFile(path, file)
    return ResponseSuccess(res, null, pathUploaded)
  }
}