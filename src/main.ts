import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { SERVER_CONFIG } from './configs/server.config'
import * as dotenv from 'dotenv'
import { ValidationPipe } from '@nestjs/common'
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify'
import fastifyMultipart from '@fastify/multipart'
import { HandleExceptionFilter } from './exception/handle-exception.filter'
import { CommandFactory } from 'nest-commander'
dotenv.config()

async function bootstrap() {
  const args = process.argv.slice(2)

  if (args.length > 0) {
    await CommandFactory.run(AppModule, {
      logger: console,
    })
  }
  else {
    const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter())

    app.enableCors({ credentials: true, origin: '*' })

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
      }),
    )

    const options = new DocumentBuilder()
      .setTitle('Nest.js')
      .setDescription('Nest Backend Development')
      .setVersion('1.0.0')
      .addBearerAuth()
      .build()

    const document = SwaggerModule.createDocument(app, options)
    SwaggerModule.setup('api', app, document)

    app.useGlobalFilters(new HandleExceptionFilter())

    await app.register(fastifyMultipart as any)

    await app.listen(SERVER_CONFIG.APP_PORT, '0.0.0.0')

    console.log(`Application is running on: ${await app.getUrl()}`)
  }
}
bootstrap()
