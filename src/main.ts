import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const config = new DocumentBuilder()
    .setTitle('Amarangi Rest API')
    .setDescription('Car free-zone spots booking API description')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/v1/docs', app, document);
  const configService: ConfigService = app.get(ConfigService);
  const Port: number = parseInt(configService.get('PORT'), 10);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.use(cookieParser());

  await app.listen(configService.get('NODE_ENV')=='production'?process.env.PORT:Port||3000, () => {
    console.info(`=====================================`);
    console.info(`🚀 App listening on the port: ${Port}`);
    console.info(`=====================================`);
  });
}
bootstrap();
