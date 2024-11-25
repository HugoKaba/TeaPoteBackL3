import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { nestCsrf, CsrfFilter } from 'ncsrf';
import * as cookieParser from 'cookie-parser';
import { customCorsOptions } from './config/cors/corsOptions';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.use(nestCsrf());
  app.useGlobalFilters(new CsrfFilter());
  app.enableCors(customCorsOptions);
  await app.listen(3000);
}
bootstrap();
