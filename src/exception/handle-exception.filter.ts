import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
  HttpStatus,
} from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'

@Catch()
export class HandleExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HandleExceptionFilter.name)
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<FastifyReply>()
    const request = ctx.getRequest<FastifyRequest>()

    let status: number
    let message: string

    if (exception instanceof HttpException) {
      status = exception.getStatus()
      const exceptionResponse = exception.getResponse()
      if (typeof exceptionResponse === 'string') {
        message = exceptionResponse
      } else if (typeof exceptionResponse === 'object' && exceptionResponse) {
        const { message: msg } = exceptionResponse as Record<string, any>

        if (Array.isArray(msg)) {
          message = `Bad Request: ${msg.join(', ')}`
        } else {
          message = msg || 'Bad Request'
        }
      }
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR
      message = `Internal server error: (${exception})`
    }

    const logMessage = `
    <${new Date().toISOString().slice(0, 19).replace('T', ' ')}>
        Error Details:
        userId: ${request.user?.id}
        Path: ${request.url}
        Method: ${request.method}
        IP: ${request.ip}
        Status: ${status}
        Message: ${message}
        Stack: ${exception}`

    this.logger.error(logMessage)
    response.status(status).send({
      message,
    })
  }
}
