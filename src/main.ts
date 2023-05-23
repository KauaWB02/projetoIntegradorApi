import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { server } from './config/app';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(server.port);
}
bootstrap();
