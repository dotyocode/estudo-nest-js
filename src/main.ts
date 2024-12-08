import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // remove chaves que nao estao no DTO
      forbidNonWhitelisted: true, // tras erro quando a chave nao existir
      transform: false, // tenta transformar os tipos de dados de parametros e DTO
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
