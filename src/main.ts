import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as cors from 'cors';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(cors({
    origin: 'http://localhost:5173', // Defina a origem permitida
    credentials: true, // Permita o compartilhamento de credenciais
  }));
  app.useGlobalPipes(new ValidationPipe(
    {
      whitelist:true
    }
  ))
  await app.listen(process.env.PORT ||3333);
}
bootstrap();
