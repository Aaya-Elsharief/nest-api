import * as fs from 'fs';

import { ValidationPipe } from '@nestjs/common';
import {
  HttpAdapterHost,
  NestFactory,
  PartialGraphHost,
  SerializedGraph,
} from '@nestjs/core';
import { useContainer } from 'class-validator';
// import express from 'express';
// import * as functions from 'firebase-functions';

import { AppModule } from './app.module';
import { ValidationExceptionFactory } from './exceptions/exception-factory.exceptions';
import { AllExceptionsFilter } from './filters/allExceptions.filter';
import { LoggingInterceptor } from './interceptors/logging.interceptor';

// const server = express();
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
    // abortOnError: false,
  });
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: ValidationExceptionFactory,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter(app.get(HttpAdapterHost)));
  app.useGlobalInterceptors(new LoggingInterceptor());
  await app.listen(3000);
  fs.writeFileSync('fullGraph.json', app.get(SerializedGraph).toString());
}

bootstrap().catch((err) => {
  fs.writeFileSync('graph.json', PartialGraphHost.toString() ?? '');
  process.exit(1);
});
