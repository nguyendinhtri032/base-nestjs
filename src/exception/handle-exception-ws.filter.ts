import {
  Catch,
  ArgumentsHost,
  Logger,
} from '@nestjs/common'
import { BaseWsExceptionFilter } from '@nestjs/websockets'
import { Socket } from 'socket.io'
import { WsException } from '@nestjs/websockets'

@Catch()
export class HandleExceptionWsFilter extends BaseWsExceptionFilter {
  private readonly logger = new Logger(HandleExceptionWsFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToWs()
    const client = ctx.getClient<Socket>()
    const data = ctx.getData()

    let message: string

    if (exception instanceof WsException) {
      message = exception.message || 'Bad Request'
    } else {
      message = `WebSocket server error: ${exception}`
    }

    const logMessage = `
    <${new Date().toISOString().slice(0, 19).replace('T', ' ')}>
        Error Details:
        Path: ${data?.path || 'Unknown Path'}
        Method: ${data?.method || 'Unknown Method'}
        Message: ${message}
        Exception: ${exception instanceof Error ? exception.stack : exception}
    `
    this.logger.error(logMessage)

    client.emit('error', { message })
  }
}
