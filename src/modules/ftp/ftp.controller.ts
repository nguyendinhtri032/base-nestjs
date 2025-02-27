import { Controller, Post, Body, UseInterceptors, Res } from '@nestjs/common'
import { FtpService } from './ftp.service'
import { UploadFileDto } from './dto/create-ftp.dto'
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger'
import { MemoryStorageFile, UploadedFile, FileInterceptor } from '@blazity/nest-file-fastify'
import { SERVER_CONFIG } from 'src/configs/server.config'
import { FastifyReply } from 'fastify'
import { ResponseSuccess } from 'src/common/helpers/response'

@ApiTags(`${SERVER_CONFIG.API_PREFIX_V1}/ftp`)
@Controller(`${SERVER_CONFIG.API_PREFIX_V1}/ftp`)
export class FtpController {
  constructor(private readonly ftpService: FtpService) { }

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
    const pathUploaded = await this.ftpService.uploadFile(path, file)
    return ResponseSuccess(res, null, pathUploaded)
  }
}