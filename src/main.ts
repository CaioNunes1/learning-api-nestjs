import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const whitelist = [
    'https://cadastro-front-end-com-backend-nestjs.netlify.app',
    'http://localhost:5173',
    'http://localhost:5174',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      console.log(`Origin: ${origin}`); // Log para verificar a origem
      if (!origin || whitelist.includes(origin)) {
        callback(null, true);
      } else {
        console.error(`Origin: ${origin} not allowed by CORS`);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  });

  app.use(cookieParser());

  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  }));

  const port = process.env.PORT || 3333;
  await app.listen(port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

bootstrap();
