import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { server } from './config/app';
0
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(server.port, () => {
    console.clear();
    console.log(`Server started on port ${server.port}`);
  });
}
bootstrap();
