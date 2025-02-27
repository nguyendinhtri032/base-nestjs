import { MemoryStorageFile } from '@blazity/nest-file-fastify'
import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common'
import { Client } from 'basic-ftp'
import { SERVER_CONFIG } from 'src/configs/server.config'
import { Readable } from 'stream'
import fileType from 'file-type'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class FtpService {
  private ftpClient: Client
  constructor() {
    this.ftpClient = new Client()
  }

  private async connectToFtp() {
    await this.ftpClient.access({
      host: SERVER_CONFIG.FTP_HOST,
      user: SERVER_CONFIG.FTP_USERNAME,
      password: SERVER_CONFIG.FTP_PASSWORD,
      secure: false,
      secureOptions: {
        timeout: 20000,
      },
    })
  }

  async uploadFile(path: string, file: MemoryStorageFile) {
    if (!file.buffer) {
      throw new Error('File buffer is missing')
    }
    const fileBuffer = file.buffer
    const readableStream = Readable.from(fileBuffer)
    const fileTypeInfo = await fileType.fromBuffer(fileBuffer)
    await this.connectToFtp()
      const { ext } = fileTypeInfo || { ext: 'unknown' }
      const newFilePath = `${path}/${uuidv4()}.${ext}`
      try {
        await this.ftpClient.cd(path)
      } catch {
        await this.ftpClient.ensureDir(path)
      }
      const res = await this.ftpClient.uploadFrom(readableStream, newFilePath)

      if (res.code === 226) {
        this.closeConnection()
        return this.getFullPath(newFilePath)
      }
    this.closeConnection()
    throw new InternalServerErrorException(`File upload failed`)
  }

  closeConnection() {
    return this.ftpClient.close()
  }
  getFullPath(path: string) {
    return `${SERVER_CONFIG.FTP_HOST}${path}`
  }
}
