import { Module } from '@nestjs/common';
import { controllersModule } from './controllers/controllers.module';
@Module({
  imports: [controllersModule],
})
export class AppModule {}
