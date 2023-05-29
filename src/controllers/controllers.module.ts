import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [userModule, EventModule],
})
export class controllersModule {}
