import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaService } from './prisma/prisma.service';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const host = `http://127.0.0.1:${process.env.PORT}`;

  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.LOG_LEVEL === '2'
        ? ['log', 'debug', 'error', 'verbose', 'warn']
        : process.env.LOG_LEVEL === '1'
        ? ['debug', 'error', 'warn']
        : ['debug'],
    bufferLogs: true,
  });
  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(new LoggerService());
  app.use(cookieParser());

  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  const config = new DocumentBuilder()
    .setTitle('Home Library API Service 2023')
    .setDescription('Home Library API Service 2023')
    .setVersion('0.0.1')
    .addServer('/')
    .addServer(host)
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
