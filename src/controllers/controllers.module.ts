import { Module } from '@nestjs/common';
import { userModule } from './user/user.module';
import { EventModule } from './event/event.module';
import { ProfileModules } from './profile/profile.module';

@Module({
  imports: [userModule, EventModule, ProfileModules],
})
export class controllersModule { }
