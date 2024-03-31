import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { load } from 'js-yaml';
import { readFile } from 'fs/promises';
import { join, dirname } from 'node:path';
import { SwaggerModule, OpenAPIObject } from '@nestjs/swagger';
import { LoggerService } from './logger/logger.service';
import { HttpExceptionFilter } from './filters/exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: new LoggerService(),
  });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT', 4000);

  const logger = app.get(LoggerService);
  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalPipes(new ValidationPipe());
  app.useLogger(logger);
  app.useGlobalFilters(new HttpExceptionFilter(httpAdapterHost));

  const api = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const document = load(api) as OpenAPIObject;
  SwaggerModule.setup('doc', app, document);

  await app.listen(port, () => {
    console.log(`App is running on port ${port}`);
    console.log(`OpenAPI documentation: http://localhost:${port}/doc`);
  });
}
bootstrap();
