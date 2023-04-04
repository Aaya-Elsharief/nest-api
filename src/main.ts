import { ValidationPipe } from '@nestjs/common';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { ValidationExceptionFactory } from './exceptions/exception-factory.exceptions';
import { AllExceptionsFilter } from './filters/allExceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: ValidationExceptionFactory,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
}
bootstrap();
