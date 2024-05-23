import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enableCors({
    origin: 'https://cadastro-front-end-com-backend-nestjs.netlify.app', // Permita a origem do Netlify
    credentials: true, // Permitir credenciais
  });

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  await app.listen(process.env.PORT || 3333); // Use a porta do ambiente ou 3333 como padrão
}

bootstrap();
